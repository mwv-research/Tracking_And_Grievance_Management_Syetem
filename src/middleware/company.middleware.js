import { body, validationResult, oneOf } from "express-validator";
import GenerateResponse from "../utils/response.creator.js"

//Validator for registering a user
const registerValidator = [
    body("companyName", "Name is required").trim().notEmpty(),
    body("companyId", "Id is required").trim().notEmpty(),
    body("email", "Please enter a valid email address").isEmail(),
    body("password", "Please enter a password with 6 or more characters").optional().trim().isLength({ min: 6 }),
    body("address", "Address is required").trim().notEmpty(),
    body("registrationNumber", "Registration Number is required").trim().notEmpty(),
    body("phoneNumber", "Please enter a valid phone number").matches(/^(\+\d{1,3}[- ]?)?\d{10}$/),
    body("ceoName", "CEO Name is required").trim().notEmpty(),
    body("ceoContactNumber", "CEO Contact Number is required").matches(/^(\+\d{1,3}[- ]?)?\d{10}$/),
    body("ceoEmail", "CEO Email is required").isEmail(),
    body("ceoAadhaarNumber", "CEO Aadhaar Number is required").trim().notEmpty(),

    
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return GenerateResponse(
                res,
                400,
                {
                    error: errors.array(),
                }
            );
        }

        next();
    }
];

//Validator for logging a variable
const loginValidator = [
    body("email", "Please enter a valid email address").isEmail(),
    body("password", "Password is required").trim().notEmpty().isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return GenerateResponse(res, 400, {
                error: errors.array(),
            });
        } 

        next();
    }
];

export {
    registerValidator,
    loginValidator,
}