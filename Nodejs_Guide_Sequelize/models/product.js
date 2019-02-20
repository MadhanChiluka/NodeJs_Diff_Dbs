// const Cart = require('./cart');
// const db = require('../util/database')



// module.exports = class Product {
//     constructor(id, title, imageUrl, price, description) {
//         this.id = id;
//         this.title = title,
//         this.imageUrl = imageUrl,
//         this.price = price,
//         this.description = description
//     }

//     save() {  
//         return db.execute('INSERT INTO products(title, price, imageUrl, description) VALUES (?,?,?,?)', 
//         [this.title, this.price, this.imageUrl, this.description])
//     }

//     static deleteById(id) {
        
//     }

//     static fetchAllProducts(cb) {
//       return db.execute('Select * from products');
//     }

//     static findById(id) {
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//     }
// } 

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product;