const Restaurant = require('../restaurant') // 載入 restaurant 
const restaurant_list = require('../seeds/restaurant.json')

// 引用mongoose
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  const results = restaurant_list.results
  for (let i = 0; i < results.length; i++) {
      Restaurant.create(results[i])
  }
  console.log('done!')
})