module.exports=(sequelize,DataTypes)=>{


    const Product=sequelize.define("product", {
        name:{
            type:DataTypes.STRING
        },

        price:{
            type:DataTypes.STRING
        },
        image:{
            type:DataTypes.STRING
        },
    
    })
    
        return Product
    }
    