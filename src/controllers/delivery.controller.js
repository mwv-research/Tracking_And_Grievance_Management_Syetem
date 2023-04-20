import GenerateResponse from "../utils/response.creator.js";
import * as deliveryServices from "../services/delivery.service.js"

const InitiateDelivery = async (req, res) => {
    try {
        const newDelivery = {
            deliveryId : req.body.deliveryId,
            customerName : req.body.customerName,
            customerPhoneNumber : req.body.customerPhoneNumber,
            itemId : req.body.itemId,
        }

        const existingDelivery = await deliveryServices.FetchDeliveryById(newDelivery.deliveryId);

        if(existingDelivery){
            return GenerateResponse(
                res,
                400,
                {},
                "The delivery has already initiated"
            );
        }

        await deliveryServices.NewDelivery(newDelivery)

        return GenerateResponse(res, 201)

    } catch (error) {
        if(process.env.DEBUG == "TRUE") console.log(error);
        if (
            error.name == "ValidationError" ||
            error.name == "CastError" ||
            error.name == "BSONTypeError"
        ) {
            return GenerateResponse(
                res,
                400,
                {},
                "One or more inputs are invalid"
            );
        }
        return GenerateResponse(res, 500);
    }
}

const UpdateDelivery = async (req, res) => {
    try {
        const updateDeliveryStatus = {
            deliveryId : req.body.deliveryId,
            deliveryStage : req.body.deliveryStage,
            currentStageOfficerId : req.body.currentStageOfficerId,
            currentStageStartTime : req.body.currentStageStartTime,
            currentStageLocation : req.body.currentStageLocation,
        }

        const deliveryProcess = deliveryServices.FetchDeliveryById(updateDeliveryStatus.deliveryId);

        if(!deliveryProcess){
            return GenerateResponse(
                res,
                400,
                {},
                "NO such delivery process exists"
            );
        }

        await deliveryProcess.UpdateDeliveryStatusById(deliveryId, {deliveryStage, currentStageOfficerId, currentStageStartTime, currentStageLocation});

        return GenerateResponse(res, 201)

    } catch (error) {
        if(process.env.DEBUG == "TRUE") console.log(error);
        if (
            error.name == "ValidationError" ||
            error.name == "CastError" ||
            error.name == "BSONTypeError"
        ) {
            return GenerateResponse(
                res,
                400,
                {},
                "One or more inputs are invalid"
            );
        }
        return GenerateResponse(res, 500);
    }
}

const FetchDeliveryInfo = async (req, res) => {
    try {
        const fetchDelivery = {
            deliveryId : req.body.deliveryId,
            customerName : req.body.customerName
        }

        const deliveryProcess = deliveryServices.FetchDeliveryById(fetchDelivery.deliveryId);

        if(!deliveryProcess){
            return GenerateResponse(
                res,
                400,
                {},
                "NO such delivery process exists"
            );
        }

        if ( deliveryProcess.customerName !== customerName ){
            return GenerateResponse(
                res,
                400,
                {},
                "Unknown user"
            );
        }

        const deliveryStage = deliveryProcess.deliveryStage;
        const currentStageOfficerId = deliveryProcess.currentStageOfficerId;
        const currentStageStartTime = deliveryProcess.currentStageStartTime;
        const currentStageLocation = deliveryProcess.currentStageLocation

        return GenerateResponse(
            res,
            200,
            {deliveryStage, currentStageOfficerId, currentStageStartTime, currentStageLocation},
            "Successfully Retrieved Information"
        )

    } catch (error) {
        if(process.env.DEBUG == "TRUE") console.log(error);
        if (
            error.name == "ValidationError" ||
            error.name == "CastError" ||
            error.name == "BSONTypeError"
        ) {
            return GenerateResponse(
                res,
                400,
                {},
                "One or more inputs are invalid"
            );
        }
        return GenerateResponse(res, 500);
    }
}

const CompleteDelivery = async(req, res) =>{
    try {
        const deliveryId = req.body.deliveryId;

        const deliveryProcess = deliveryServices.FetchDeliveryById(deliveryId);

        if(!deliveryProcess){
            return GenerateResponse(
                res,
                400,
                {},
                "NO such delivery process exists"
            );
        }

        await deliveryServices.MarkDeliveryComplete(deliveryId)

        return GenerateResponse(res, 201)

    } catch (error) {
        if(process.env.DEBUG == "TRUE") console.log(error);
        if (
            error.name == "ValidationError" ||
            error.name == "CastError" ||
            error.name == "BSONTypeError"
        ) {
            return GenerateResponse(
                res,
                400,
                {},
                "One or more inputs are invalid"
            );
        }
        return GenerateResponse(res, 500);
    }
}

export {
    InitiateDelivery,
    UpdateDelivery,
    FetchDeliveryInfo,
    CompleteDelivery,
}