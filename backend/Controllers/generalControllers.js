import Property from '../Schemas/propertySchema.js';
import Booking from '../Schemas/bookingSchema.js';
import User from '../Schemas/authSchemas.js';

const getAllProperties = async (req, res) => {
    try{
        const properties = await Property.find();
        if(properties.length === 0){
            res.status(404).send("No properties found");
        }
        res.status(200).json({message: 'Properties fetched successfully', properties});

    }catch(error){
        res.status(500).json({message: 'Error fetching properties', error});
    }
}

const getPropertyDetails = async (req, res) => {
    try{
        const {id} = req.params;
        const propertyDetails =  await Property.findById(id);
        if(!propertyDetails){
            console.log('Property not found');
            res.status(404).json({message: 'Property not found'});
            return;
        }
        res.status(200).json({message: 'Property details fetched successfully', propertyDetails});
    }catch(error){
        res.status(500).json({message: 'Error fetching property details', error});
    }
}

const bookProperty = async (req, res) => {
    try{
        const userId = req.user._id;
        const user = await User.findById(userId).select('username');
        const { propertyId } = req.body;
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        const ownerId = property.ownerId;
        const newBooking = new Booking({
            propertyId,
            userId,
            ownerId,
            username: user.username
        });
        await newBooking.save();
        res.status(200).json({message: 'Booking created successfully', booking: newBooking});
    }catch(error){
        res.status(500).json({message: 'Error booking property', error});
    }
}

const getMyBookings = async (req,res)=>{
    try{
        const userId = req.user._id;
        const userBookings =  await Booking.find({userId});
        if(!userBookings || userBookings.length === 0){
            console.log('No bookings found');
            res.status(404).json({message: 'No bookings found'});
            return;
        }
        res.status(200).json({message: 'Bookings fetched successfully', userBookings: userBookings});
    }catch(error){
        res.status(500).json({message: 'Error fetching bookings', error});
    }
}

export {getAllProperties,getMyBookings,bookProperty,getPropertyDetails}