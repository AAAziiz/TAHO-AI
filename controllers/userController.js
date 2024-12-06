const db=require('../models')
const User=db.users
const bcrypt = require('bcrypt')








//create user
const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const userInfo = {
            username: username,
            email: email,
            password: hashedPassword }
            const user = await User.create(userInfo);
        res.status(200).send(user);
        }

     catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user" });
    }
};

//login user

const loginUser = async (req, res) => {   
    let { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(403).send({ auth: false, message: "Invalid Email or Password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(403).send({ auth: false, message: "Invalid Email or Password." });
    }

    res.status(200).send({ auth: true, user: user });
};



//get users
const getUsers=async(req,res)=> {
    try{
    let users=await User.findAll({})
    res.status(200).send(users)
    }   catch(err){
        console.error("Error getting users:", err);
    }
}


//delteuser

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        const oldUser = await User.findOne({ where: { id: id } });

        if (!oldUser) {
            return res.status(404).json({ error: "User not found" });
        }

        let user = await User.destroy({ where: { id: id } });
        
        res.status(200).json({ success: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Failed to delete user" });
    }
};




module.exports ={
    addUser,
    loginUser,
    getUsers,
    deleteUser,
    
}