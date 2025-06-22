import express from 'express';
import checkRole from '../middleware/checkRole';
import { getAllProperties, getPropertyDetails, bookProperty, getMyBookings } from '../controllers/generalController';

const generalRouter = express.Router();

generalRouter.get('/get-all-properties', getAllProperties);
generalRouter.get('/get-property-details/:id', getPropertyDetails);
generalRouter.post('/book-property', bookProperty);
generalRouter.get('/get-my-bookings', getMyBookings);

export default generalRouter;