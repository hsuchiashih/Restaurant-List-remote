// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')

// require body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override') 
// 引用路由器
const routes = require('./routes')
// 引用mongoose
require('./config/mongoose')

const restaurantList = require('./models/restaurant')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

// routes setting
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