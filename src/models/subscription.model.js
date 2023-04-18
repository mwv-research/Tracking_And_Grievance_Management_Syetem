import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subscription = new Schema({
    subscriptionId: {
        type: String,
        required: true,
        unique: true
    },
    companyId: {
        type: String,
        required: true,
        unique: true
    },
    subscriptionType: {
        type: String,
        enum: ["Free", 1000, 2000],
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Subscription = mongoose.model('Subscription', subscription);

export{
    Subscription
}