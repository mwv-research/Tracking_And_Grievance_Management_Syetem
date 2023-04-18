import mongoose from "mongoose";

const Schema = mongoose.Schema;

const grievanceSession = new Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    ticketId: {
        type: String,
        required: true,
        unique: true
    },
    customerLastActiveTime: {
        type: String,
        required: true
    },
    grievanceOfficerLastActiveTime: {
        type: String,
        required: true
    },
    grievanceStatus: {
        type: String,
        enum: ["successful", "unsuccessful"],
        required: true
    },
}, {timestamps: true});

const GrievanceSession = mongoose.model('GrievanceSession', grievanceSession);

export{
    GrievanceSession
}