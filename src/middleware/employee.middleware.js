import { body, validationResult, oneOf } from "express-validator";
import GenerateResponse from "../utils/response.creator.js"

//Validator for registering a user
const registerValidator = [
    body("employeeId", "Id is required").trim().notEmpty(),
    body("companyId", "Id is required").trim().notEmpty(),
    body("employeeName", "Name is required").trim().notEmpty(),
    body("employeeType", "Type is required").trim().notEmpty(),
    body("employeeContactNumber", "Please enter a valid contact number").matches(/^(\+\d{1,3}[- ]?)?\d{10}$/),
    body("employeeEmail", "Please enter a valid email address").isEmail(),
    body("employeePassword", "Please enter a password with 6 or more characters").optional().trim().isLength({ min: 6 }),
    
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

        const employeeType = req.body.employeeType;
        if (employeeType !== "delivery officer" && employeeType !== "grievance officer") {
            return GenerateResponse(
                res,
                400,
                {
                error: "Invalid employeeType",
                }
            );
        }

        next();
    }
];

//Validator for logging a variable
const loginValidator = [
    body("employeeEmail", "Please enter a valid email address").isEmail(),
    body("employeePassword", "Password is required").trim().notEmpty().isLength({ min: 6 }),
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