const mongoose = require('mongoose');

const userProfilesImagesSchema = new mongoose.Schema(
{
    image:String
},
{
    collection: "ImageDetails", 
}

);

module.exports = mongoose.model('userProfilesPics', userProfilesImagesSchema);

 