const express=require ('express');
const cors=require('cors');
const app =express()
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//routers
const router=require('./routes/userRoute.js');
app.use('/api/users',router);

const productrouter=require('./routes/productRoute.js');
app.use('/api/products',productrouter);


//static Images Folder

app.use('/Images', express.static('./Images'))




const PORT=process.env.PORT || 8088;


app.listen(PORT,()=>{
    console.log( `Server is running on ${PORT}`);
})
