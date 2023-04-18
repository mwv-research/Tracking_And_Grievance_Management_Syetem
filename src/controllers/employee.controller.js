import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import GenerateResponse from "../utils/response.creator.js";
import * as companyServices from "../services/company.service.js";
import * as employeeServices from "../services/employee.service.js";

const RegisterEmployee = async (req, res) => {
    try {
        const newEmployee = {
            employeeId : req.body.employeeId,
            companyId : req.body.companyId,
            employeeName : req.body.employeeName,
            employeeType : req.body.employeeType,
            employeeContactNumber : req.body.employeeContactNumber,
            employeeEmail : req.body.employeeEmail,
            employeePassword : req.body.employeePassword,
            verificationToken : crypto.randomBytes(32).toString("hex"),
            verificationTokenExpires : Date.now() + 3600000,
        };
        
        const existingCompany = await companyServices.FetchCompanyById(newEmployee.companyId);
    
        if(!existingCompany){
            return GenerateResponse(
                res, 
                400,
                {},
                "The Company does not Exist"
            );
        };

        const existingEmployee = await employeeServices.FetchEmployeeById(newEmployee.employeeId);
    
        if(existingEmployee){
            return GenerateResponse(
                res, 
                400,
                {},
                "The employee already Exist"
            );
        };
    
        const token = newEmployee.verificationToken;

        newEmployee.employeePassword = await bcrypt.hash(newEmployee.employeePassword, parseInt(process.env.SALT));
    
        await employeeServices.CreateEmployee(newEmployee);
    
        return GenerateResponse(
            res,
            200,
            {token},
            "The Employee has been enlisted for our services",
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

const VerifyEmployee = async(req, res) => {
    try {
        const verifyEmployee = {
            verificationToken: req.body.verificationToken,
            verifictionTokenExpires: { $gt: Date.now() },
        };

        const validToken = await employeeServices.FetchByToken(verifyEmployee.verificationToken);

        if(!validToken){
            return GenerateResponse(res, 400)
        }

        await employeeServices.UpdateVerificationStatus(validToken.employeeId);

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

const LoginEmployee = async(req, res) => {
    try {
        const employeeLoginDetails = {
            employeeEmail: req.body.employeeEmail,
            employeePassword: req.body.employeePassword,
        } 

        const employeePresent = await employeeServices.FetchEmployeeByEmail(employeeLoginDetails.employeeEmail);

        if (!employeePresent) return GenerateResponse(res, 404);

        const isMatched = await bcrypt.compare(
            employeeLoginDetails.employeePassword,
            String(employeePresent.employeePassword)
        );
        
        if (!isMatched) return GenerateResponse(res, 401)

        if (employeePresent.isVerified === false) return GenerateResponse(res, 401)

        const payload = {
            employee: {
                id: employeePresent._id,
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
            "The Employee is now LoggedIn"
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
    RegisterEmployee,
    VerifyEmployee,
    LoginEmployee,
}