const addProperty = async (req, res) => {
    console.log('Adding property');
    res.send("adding property")
}
const getOwnerProperties = async (req, res) => {
    console.log('Getting owner properties');
    res.send('Getting owner properties')
}
const deleteProperty = async (req, res) => {
    console.log('Deleting property');
    res.send('Deleting property');
}
const updateProperty = async (req, res) => {
    console.log('Updating property');
    res.send('Updating property')
    
}
const getOwnerBookings = async (req, res) => {
    console.log('Getting owner bookings');
    res.send('Getting owner bookings')
}

export { addProperty, getOwnerProperties, deleteProperty, updateProperty, getOwnerBookings };