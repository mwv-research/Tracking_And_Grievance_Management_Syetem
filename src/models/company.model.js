import mongoose from "mongoose";

const Schema = mongoose.Schema;

const company = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    companyId: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscription: {
        type: String,
        default: "free"
    },
    registrationNumber: {
        type: Number,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    ceoName: {
        type: String,
        required: true
    },
    ceoContactNumber: {
        type: String,
        required: true
    },
    ceoEmail: {
        type: String,
        required: true
    },

    ceoAadhaarNumber: {
        type: Number,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken: {
        type: String,
        default: null,
    },

    verificationTokenExpires: {
        type: Number,
        default: null,
    }

}, {timestamps: true});

const Company = mongoose.model('Company', company);

export{
    Company
}