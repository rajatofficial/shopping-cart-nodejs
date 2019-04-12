const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/ShoppingApp.db'
  // database : '',
  // host: 'localhost',
  // username: '',
  // password: '',
  // port: ''
})

const Users = db.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncreament: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
})

const Vendors = db.define('vendor',{
    id:{
        type: Sequelize.INTEGER,
        autoIncreament: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Products = db.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncreament: true,
        primaryKey: true
    },
    productName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    productPrice:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:0.00
    },
    productQuantity:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    // vendorId:{
    //     type:Sequelize.STRING
    // }
})

const Cart = db.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        autoIncreament: true,
        primaryKey: true
    },
    userName:{
        type: Sequelize.STRING
    },
    productQuantity:{
        type: Sequelize.INTEGER
    },
    // productId:{
    //     type:Sequelize.INTEGER
    // }
})

Products.belongsTo(Vendors, {onDelete:'cascade'});
Vendors.hasMany(Products, {onDelete:'cascade'});
Cart.belongsTo(Products, {onDelete:'cascade'});
// Cart.belongsTo(Users, {onDelete:'cascade'});
// Users.hasMany(Cart, {onDelete:'cascade'});
Products.hasMany(Cart, {onDelete:'cascade'});

//Vendors.hasMany(Products, { onDelete: 'cascade' });

db.sync()
  .then(() => {
    console.log('Database Created')})

    exports = module.exports = {
        db,Vendors,Products,Users,Cart
    }