import express from 'express';
import checkRole from '../middleware/checkRole.js';
import { addProperty, getOwnerProperties, deleteProperty, updateProperty, getOwnerBookings,approve } from '../Controllers/ownerControllers.js';
 
const ownerRouter = express.Router();

ownerRouter.post('/add-property', checkRole('owner'), addProperty);
ownerRouter.get('/get-owner-properties', checkRole('owner'), getOwnerProperties);
ownerRouter.delete('/delete-property/:id', checkRole('owner'), deleteProperty);
ownerRouter.put('/update-property/:id', checkRole('owner'), updateProperty);
ownerRouter.get('/get-owner-bookings', checkRole('owner'), getOwnerBookings);
ownerRouter.put('/approve-booking/:bookingId', checkRole('owner'), approve);

export default ownerRouter;