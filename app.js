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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})