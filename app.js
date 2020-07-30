// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
// require mongoose
const mongoose = require('mongoose')
// require body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override') 
// 引用路由器
const routes = require('./routes')
// const restaurantList = require('./models/seeds/restaurant.json')
const restaurantList = require('./models/restaurant')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// setting mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

// routes setting
app.get('/', (req, res ) => {
    console.log(restaurantList)
    restaurantList.find()
    .lean()
    .sort({ name: 'asc' })
    .then( restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 搜尋
app.get('/search', (req, res) => {
    // console.log('req.query', req.query)
    const keyword = req.query.keyword
   restaurantList.find({ 
     name: { $regex: keyword, $options: "i" },})
   .lean()
   .then(restaurants => res.render('index', { restaurants: restaurants }))
   .catch(error => console.log(error))
    // const restaurants =  restaurantList.results.filter
    // ( restaurant => 
    //   restaurant.name.includes(keyword) || 
    //   restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
    //   restaurant.category.includes(keyword))
    // res.render('index', { restaurants: restaurants, keyword: keyword })
})

// 新增
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description      
  return restaurantList.create({ 
    name, name_en, category, image, location, phone, google_map, rating,description
    })     
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

//瀏覽
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .sort({_id: 'asc'})
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//修改
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description 
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
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})