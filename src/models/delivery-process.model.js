import mongoose from "mongoose";

const Schema = mongoose.Schema;

const deliveryProcess = new Schema({
    deliveryId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true,
    },
    customerPhoneNumber: {
        type: Number,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    deliveryStage: {
        type: String,
        enum: ["Order Processing", "Packaging and Labelling", "Transit", "Customer Clearance", "Delivery"],
        default: "Order Processing"
    },
    deliveryStatus: {
        type: String,
        enum: ["successful", "unsuccessful"],
        default: "unsuccessful"
    },
    customerClearanceDate: {
        type: String,
    },
    deliveryOfficerIds: {
        type: Schema.Types.ObjectId,
    },
    currentStageOfficerId: {
        type: String,
    },
    currentStageStartTime: {
        type: String,
    },
    currentStageLocation: {
        type: String,
    },
    
}, {timestamps: false});

const DeliveryProcess = mongoose.model('DeliveryProcess', deliveryProcess);

export {
    DeliveryProcess
}