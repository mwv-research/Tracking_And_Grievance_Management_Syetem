import { Router } from 'express';
import * as employeeController from "../controllers/employee.controller.js";
import * as employeeValidator from "../middleware/employee.middleware.js";

export const employeeRouter = Router();

//Route to register a employee
employeeRouter.post(
    "/register",
    employeeValidator.registerValidator,
    employeeController.RegisterEmployee,
);

employeeRouter.post(
    "/verify",
    employeeController.VerifyEmployee,
);

//Route to login a employee
employeeRouter.post(
    "/login",
    employeeValidator.loginValidator,
    employeeController.LoginEmployee,
);