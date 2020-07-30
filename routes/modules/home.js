// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model model
const restaurantList = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res ) => {
  console.log(restaurantList)
  restaurantList.find()
  .lean()
  .sort({ name: 'asc' })
  .then( restaurants => res.render('index', { restaurants }))
  .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router