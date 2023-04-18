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
    customer_phone_number: {
        type: Number,
        required: true
    },
    itemDetails: {
        type: String,
        required: true
    },
    purchaseDetails: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        enum: ["Order Processing", "Packaging and Labelling", "Transit", "Customer Clearance", "Delivery"],
        required: true
    },
    delivery_status: {
        type: String,
        enum: ["successful", "unsuccessful"],
        required: true
    },
    customerClearanceDate: {
        type: String,
        required: true
    },
    deliveryOfficerIds: {
        type: Schema.Types.ObjectId,
        required: true
    },
    currentStageOfficerId: {
        type: String,
        required: true
    },
    currentStageStartTime: {
        type: String,
        required: true
    },
    currentStageLocation: {
        type: String,
        required: true
    },
    
}, {timestamps: false});

const DeliveryProcess = mongoose.model('DeliveryProcess', deliveryProcess);

module.exports = DeliveryProcess;