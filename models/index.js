const dbConfig=require('../config/dbconfig.js');
const {Sequelize,DataTypes}=require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db={}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users=require('./userModel.js')(sequelize,DataTypes),
db.products=require('./productModel.js')(sequelize,DataTypes),



db.sequelize.sync({force:false})
.then(()=>{
    console.log('connected-successfully')
})



db.users.hasMany(db.products, {
    foreignKey: 'userId',
    as: 'products'
})

db.products.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user'
})




module.exports = db;
