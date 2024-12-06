const userController=require('../controllers/userController.js');

//router
const router=require('express').Router();



//use routes
router.post('/addUser',userController.addUser);
router.post('/loginUser',userController.loginUser);
router.get('/allUsers',userController.getUsers);
router.delete('/delete/:id',userController.deleteUser);



module.exports = router