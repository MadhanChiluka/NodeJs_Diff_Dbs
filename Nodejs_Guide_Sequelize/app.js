const path = require('path');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user')
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item')
const Order = require('.//models/order');
const OrderItem = require('./models/orderItem')

const express = require('express');
const bodyParser = require('body-parser');
const errorController =  require('./controllers/error')
//const expressHbs = require('express-handlebars');

const app = express();
//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname : 'handlebars'}));
//app.set('view engine', 'handlebars');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
    User.findById(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

app.use(errorController.get404);

sequelize
.sync()
//.sync({force: true})
.then(
    res => {
        return User.findById(1);
        app.listen(3000);
    }
)
.then(user => {
    if(!user) {
        return User.create({name: 'Madhan', email:'madhan.chiluka123@gmail.com'})
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})
.catch(err => console.log(err));


