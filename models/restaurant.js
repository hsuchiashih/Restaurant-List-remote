const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id :{
    type: Number, // 資料型別是字串
    required: false  // 這是個必填欄位
  },
  name: {
    type: String,
    required: true 
  },
  name_en: {
    type: String,
    required: false 
  },
  category: {
    type: String,
    required: false 
  },
  image: {
    type: String,
    default: "https://upload.cc/i1/2020/07/22/QU9vWD.png",
    required: false 
  },
  location: {
    type: String,
    required: false 
  },
  phone: {
    type: String,
    required: false 
  },
  google_map: {
    type: String,
    required: false 
  },
  rating: {
    type: Number,
    required: false,
    max: 5,
    min: 1 
  },
  description: {
    type: String,
    required: false 
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)