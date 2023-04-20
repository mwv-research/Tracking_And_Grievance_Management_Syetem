import { Router } from 'express';
import * as deliveryController from "../controllers/delivery.controller.js";
// import * as deliveryValidator from "../middleware/delivery.middleware.js";

export const deliveryRouter = Router();

deliveryRouter.post(
    "/initiate",
    deliveryController.InitiateDelivery,
);

deliveryRouter.post(
    "/update",
    deliveryController.UpdateDelivery,
);

deliveryRouter.post(
    "/fetch",
    deliveryController.FetchDeliveryInfo,
);

deliveryRouter.post(
    "/complete",
    deliveryController.CompleteDelivery,
);