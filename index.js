const express = require('express');
const app = express();
const port = 3000;
const home = require('./routes/home');
const product = require('./routes/product');
const brand = require('./routes/brand');
const prodbrand = require('./routes/prodbrand');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

app.use('/', home);
app.use('/products', product)
app.use('/brands', brand)
app.use('/productbrands', prodbrand)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})