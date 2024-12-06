const db=require('../models')
const User=db.users
const Product=db.products

const multer=require('multer');


//create product
const addProduct = async (req, res) => {
    try {
        const { name, type } = req.body;
        let  productInfo = {
            image:req.body.path,
            name: name,
            price: price,
           }
        const product = await Product.create(productInfo);
        res.status(200).send(product);
        }

     catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user" });
    }
};


//get products

const getAllProducts = async (req, res) => {
    try {

    let products = await Product.findAll({})
    res.status(200).send(products)
} catch (err) {
    res.status(500).json({ error: "Failed to get products" });
    }

}


//get product by id

const getProductById = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await Product.findOne({ where: { id: id } });
        res.status(200).send(product);
    } catch (err) {
        res.status(500).json({ error: "Failed to get product" });
    }
};



const getUserProducts =  async (req, res) => {

    const id = req.params.id

    const data = await User.findOne({
        include: [{
            model: Product,
            as: 'products'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')



module.exports={
    addProduct,
    getAllProducts,
    getProductById,
    getUserProducts,
    upload
}