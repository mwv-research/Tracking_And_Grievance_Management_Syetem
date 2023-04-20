import { DeliveryProcess } from "../models/delivery-process.model.js"

const FetchDeliveryById = async (deliveryId) => { DeliveryProcess.findOne({deliveryId}) };

const NewDelivery = async (newDelivery) => { DeliveryProcess.create({...newDelivery}) };

const UpdateDeliveryStatusById = async ( deliveryId, {deliveryStage, currentStageOfficerId, currentStageStartTime, currentStageLocation} ) => {
    DeliveryProcess.findOneAndUpdate(deliveryId, 
        {$set: {
            deliveryStage : deliveryStage, 
            currentStageOfficerId : currentStageOfficerId, 
            currentStageStartTime : currentStageStartTime, 
            currentStageLocation : currentStageLocation
        }}
    )
};

const MarkDeliveryComplete = async( deliveryId ) => {
    DeliveryProcess.findOneAndUpdate(delivryId,
        {$set: {
            deliveryStatus : "successful"
        }}
    )
};

export {
    FetchDeliveryById,
    NewDelivery,
    UpdateDeliveryStatusById,
    MarkDeliveryComplete,
}