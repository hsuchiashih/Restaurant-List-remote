// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res ) => {
    res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    // console.log(req.params.restaurant_id)
    const restaurantfiltered = restaurantList.results.find( restaurant => restaurant.id.toString() === req.params.restaurant_id )
    res.render('show', { restaurant: restaurantfiltered })
})

app.get('/search', (req, res) => {
    // console.log('req.query', req.query)
    const keyword = req.query.keyword
    const restaurants =  restaurantList.results.filter
    ( restaurant => 
      restaurant.name.includes(keyword) || 
      restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.includes(keyword))
    res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})