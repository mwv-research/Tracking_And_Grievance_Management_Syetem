import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employee = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    companyId: {
        type: String,
        required: true,
        unique: true
    },
    employeeName: {
        type: String,
        required: true
    },
    employeeType: {
        type: String,
        enum: ["delivery officer", "grievance officer"],
        required: true
    },
    employeeContactNumber: {
        type: String,
        required: true
    },
    employeeEmail: {
        type: String,
        required: true
    },
    employeePassword: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    
}, {timestamps: true});

const Employee = mongoose.model('Employee', employee);

module.exports = Employee;