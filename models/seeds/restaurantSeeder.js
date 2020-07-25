const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant 
const restaurant_list = require('../seeds/restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    const results = restaurant_list.results
    for (let i = 0; i < results.length; i++) {
        Restaurant.create(results[i])
    }
    console.log('done!')
})