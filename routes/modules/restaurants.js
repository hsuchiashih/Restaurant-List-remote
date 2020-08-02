// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const restaurantList = require('../../models/restaurant')

// 定義路由
// 新增
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body    
  return restaurantList.create({ 
    name, name_en, category, image, location, phone, google_map, rating,description
    })     
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

//瀏覽
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .sort({_id: 'asc'})
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//修改
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return restaurantList.findById(id)
    .then(restaurant => {
      restaurant.name = name,
      restaurant.name_en = name_en,
      restaurant.category = category,
      restaurant.image = image,
      restaurant.location = location,
      restaurant.phone = phone,
      restaurant.google_map = google_map,
      restaurant.rating = rating,
      restaurant.description = description
      return restaurant.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router