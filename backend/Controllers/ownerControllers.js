import mongoose from 'mongoose';
import Property from '../Schemas/propertySchema.js';
import Booking from '../Schemas/bookingSchema.js';

const addProperty = async (req, res) => {
    const ownerId = req.user._id;
    const {propType,adType,isAvailable,address,contact,amount,images,additionalInfo} = req.body;
    const newProperty = new Property({
        ownerID: ownerId,
        propType,
        adType,
        isAvailable,
        address,
        contact,
        amount,
        images,
        additionalInfo
    });
    newProperty.save()
        .then(() => {
            console.log('Property added successfully');
            res.status(201).json({message: 'Property added successfully', property: newProperty});
        })
        .catch((error) => {
            console.error('Error adding property:', error);
            res.status(500).json({message: 'Error adding property', error});
        });
}
const getOwnerProperties = async (req, res) => {
    const ownerId = req.user._id;
    try{
        const ownerProperties = await Property.find({ownerID: ownerId});
        if(ownerProperties.length === 0){
            console.log('No properties found for this owner');
            return res.status(404).json({message: 'No properties found for this owner'});
        }
        console.log('Owner properties fetched successfully');
        res.status(200).json({message: 'Owner properties fetched successfully', properties: ownerProperties});
    } catch (error) {
        console.error('Error fetching owner properties:', error);
        res.status(500).json({message: 'Error fetching owner properties', error});
    }
}
const deleteProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
            console.log('Property not found');
            return res.status(404).json({ message: 'Property not found' });
        }
        console.log('Property deleted successfully');
        res.status(200).json({ message: 'Property deleted successfully', property: deletedProperty });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Error deleting property', error });
    }
}
const updateProperty = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedProperty = await Property.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!updatedProperty) {
            console.log('Property not found');
            return res.status(404).json({ message: 'Property not found' });
        }
        console.log('Property updated successfully');
        res.status(200).json({message:"property updated",updatedProperty});
    } catch (err) {
        console.error('Error updating property:', err);
        res.status(500).json({ message: 'Error updating property', error: err });
    }
}
const getOwnerBookings = async (req, res) => {
    const ownerId = req.user._id;
    try{
        const ownerBookings = await Booking.find({ ownerId: ownerId }).populate('propertyId')
        if(ownerBookings.length === 0){
            console.log('No bookings found for this owner');
            return res.status(404).json({message: 'No bookings found for this owner'});
        }
        res.status(200).json({message: 'Owner bookings fetched successfully', bookings: ownerBookings});
    }
    catch (err) {
        console.error('Error fetching owner bookings:', err);
        res.status(500).json({message: 'Error fetching owner bookings', error: err});
    }
};
const approve = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            console.log('Booking not found');
            return res.status(404).json({ message: 'Booking not found' });
        }
        booking.status = 'approved';
        await booking.save();
        console.log('Booking approved successfully');
        res.status(200).json({ message: 'Booking approved successfully', booking });
    } catch (err) {
        console.error('Error approving booking:', err);
        res.status(500).json({ message: 'Error approving booking', error: err });
    }
};

export { addProperty, getOwnerProperties, deleteProperty, updateProperty, getOwnerBookings, approve };