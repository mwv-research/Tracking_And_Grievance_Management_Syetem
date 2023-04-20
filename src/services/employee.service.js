import { Employee } from "../models/employee.model.js"

const FetchEmployeeById = async ( employeeId ) => { Employee.findOne({employeeId}) };

const CreateEmployee = async ( newEmployee ) => { Employee.create({...newEmployee}) };

const FetchByToken = async ( verificationToken ) => { Employee.findOne({verificationToken}) };

const UpdateVerificationStatus = async ( employeeId ) => {
    Employee.findOneAndUpdate(employeeId, {$set: {isVerified : true}})
};

const FetchEmployeeByEmail = async ( employeeEmail ) => { Employee.findOne({employeeEmail}) };

export {
    FetchEmployeeById,
    CreateEmployee,
    FetchByToken,
    UpdateVerificationStatus,
    FetchEmployeeByEmail,
}