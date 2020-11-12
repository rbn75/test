
const { Schema, model } = require('mongoose')

const placeSchema = new Schema({
  name: {
    type: String,
    
  },
  location: {
    latitude: {
      type: String,
    }
  },
  // logintude:{
  //   type:String,

  // },
  placeType:{
    type:String,
    enum:['coffee shop', 'bookstore']
  }

},
  {
    timestamps: true
  });

module.exports = model('Place', placeSchema)