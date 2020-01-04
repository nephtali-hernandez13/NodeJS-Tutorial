const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');


const app = express();

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join( __dirname, 'views/layouts' )
}))

app.get('/', (req, res) => {
    res.render('home', {
        name: 'N. Hernández'
    })
});

app.set( 'view engine', '.hbs' );
app.set( 'views', path.join(__dirname, 'views') );

app.listen(3000);