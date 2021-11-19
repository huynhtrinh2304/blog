const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const cookieSession = require('cookie-session');



const methodOverride = require('method-override'); // Ghi đè phương thức trong form





const app = express();

const port = 3000;

const route = require('./routes');

const db = require('./config/db/index');

// Connect toDB
db.connect();



app.use(express.urlencoded());

app.use(express.json());

app.use(methodOverride('_method'));

//Middleware



app.use(express.static(path.join(__dirname, 'public')));




//Http logger
// app.use(morgan('combined'));

//cookie
app.use(cookieParser());



// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: 'src/resources/views/layouts',
        helpers: require('./helpers/handlebars'),
    }),
);



// View sử dụng handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'), );





route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});