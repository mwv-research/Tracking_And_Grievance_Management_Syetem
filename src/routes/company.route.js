import { Router } from 'express';
import * as companyController from "../controllers/company.controller.js";
import * as validator from "../middleware/company.middleware.js";

export const companyRouter = Router();

//Route to register a company
companyRouter.post(
    "/register",
    validator.registerValidator,
    companyController.RegisterCompany,
);

companyRouter.post(
    "/verify",
    companyController.VerifyCompany,
);

//Route to login a company
companyRouter.post(
    "/login",
    validator.loginValidator,
    companyController.LoginCompany,
);