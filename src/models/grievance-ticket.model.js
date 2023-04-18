import mongoose from "mongoose";

const Schema = mongoose.Schema;

const grievanceTicket = new Schema({
    ticketId: {
        type: String,
        required: true,
        unique: true
    },
    deliveryId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhoneNumber: {
        type: Number,
        required: true
    },
    grievanceIssue: {
        type: String,
        required: true
    },
    grievanceStatus: {
        type: String,
        enum: ["successful", "unsuccessful"],
        required: true
    },
    grievanceOfficerId: {
        type: String,
        required: true,
        unique: true
    },

}, {timestamps: true});

const GrievanceTicket = mongoose.model('GrievanceTicket', grievanceTicket);

export{
    GrievanceTicket
}