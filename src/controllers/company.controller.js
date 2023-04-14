import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import GenerateResponse from "../utils/response.creator.js"
import * as customerServices from "../services/customer.service.js";

const RegisterCompany = async (req, res) => {
    try {
        const newRegistration = {
            companyName : req.body.companyName,
            companyId : req.body.companyId,
            email : req.body.email,
            password : req.body.password,
            address : req.body.address,
            registrationNumber : req.body.registrationNumber,
            phoneNumber : req.body.phoneNumber,
            ceoName : req.body.ceoName,
            ceoContactNumber : req.body.ceoContactNumber,
            ceoEmail : req.body.ceoEmail,
            ceoAadhaarNumber : req.body.ceoAadhaarNumber,
            verificationToken : crypto.randomBytes(32).toString("hex"),
            verificationTokenExpires : Date.now() + 3600000,
        };
    
        const existingCompany = await customerServices.FetchCompanyById(newRegistration.companyId);
    
        if(existingCompany){
            return GenerateResponse(
                res, 
                400,
                {},
                "The Registration already Exist"
            );
        };
    
        const token = newRegistration.verificationToken;

        newRegistration.password = await bcrypt.hash(newRegistration.password, parseInt(process.env.SALT));

        console.log(newRegistration.password);
    
        await customerServices.CreateCompany(newRegistration);
    
        return GenerateResponse(
            res,
            200,
            {token},
            "The Company has been enlisted for our services please proceed to filling the form",
        );
    } catch (error) {
        if(process.env.DEBUG == "TRUE") console.log(error);
        if (
            error.name == "ValidationError" ||
            error.name == "CastError" ||
            error.name == "BSONTypeError"
        ) {
            return GenerateResponse(
                res,
                400,
                {},
                "One or more inputs are invalid"
            );
        }
        return GenerateResponse(res, 500);
    }
}

const VerifyCompany = async(req, res) => {
    try {
        const verifyRegistration = {
            verificationToken: req.body.verificationToken,
            verifictionTokenExpires: { $gt: Date.now() },
        };

        const validToken = await customerServices.FetchByToken(verifyRegistration.verificationToken);

        if(!validToken){
            return GenerateResponse(res, 400)
        }

        await customerServices.UpdateVerificationStatus(validToken._id);

        return GenerateResponse(res, 201)

    } catch (error) {
        if(process.env.DEBUG == "TRUE") console.log(error);
        if (
            error.name == "ValidationError" ||
            error.name == "CastError" ||
            error.name == "BSONTypeError"
        ) {
            return GenerateResponse(
                res,
                400,
                {},
                "One or more inputs are invalid"
            );
        }
        return GenerateResponse(res, 500);
    }
}

const LoginCompany = async(req, res) => {
    try {
        const loginDetails = {
            email: req.body.email,
            password: req.body.password,
        } 

        const companyPresent = await customerServices.FetchCompanyByEmail(loginDetails.email);

        if (!companyPresent) return GenerateResponse(res, 404);

        const isMatched = await bcrypt.compare(
            loginDetails.password,
            String(companyPresent.password)
        );
        
        if (!isMatched) return GenerateResponse(res, 401)

        if (companyPresent.isVerified === false) return GenerateResponse(res, 401)

        const payload = {
            company: {
                id: companyPresent.id,
            }
        };

        const authToken = jwt.sign(payload, String(process.env.JWT_SECRET), {
            expiresIn: process.env.JWT_EXPIRY,
        });

        const refToken = jwt.sign(payload, String(process.env.REF_TOKEN_SECRET), {
            expiresIn: process.env.REF_EXPIRY,
        });

        return GenerateResponse (
            res,
            200,
            {authToken, refToken},
            "The User is now LoggedIn"
        );
    } catch (error) {
        if(process.env.DEBUG == "TRUE") console.log(error);
        if (
            error.name == "ValidationError" ||
            error.name == "CastError" ||
            error.name == "BSONTypeError"
        ) {
            return GenerateResponse(
                res,
                400,
                {},
                "One or more inputs are invalid"
            );
        }
        return GenerateResponse(res, 500);
    }
}

export {
    RegisterCompany,
    VerifyCompany,
    LoginCompany,
    
}