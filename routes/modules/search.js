// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const restaurantList = require('../../models/restaurant')

// 定義路由
// 搜尋
router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  restaurantList.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword)
        || restaurant.name_en.toLowerCase().includes(keyword)
        || restaurant.category.toLowerCase().includes(keyword)
      )
    })
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(err => console.log(err))
})
// 匯出路由模組
module.exports = router