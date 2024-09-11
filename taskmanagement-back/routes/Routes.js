const express=require('express')
const router=express.Router()

// middleware
const jwtMiddle=require('../middlewares/jwtMiddle')

// controllers
const userController=require('../controllers/userController')
const taskController=require('../controllers/taskController')

// registration
router.post('/register',userController.userRegister)

// login
router.post('/login',userController.userLogin)


// create task
router.post('/add',jwtMiddle,taskController.addTask)

// view task lists
router.get('/allTasks',jwtMiddle,taskController.allTasks)

// delete task
router.delete('/deleteTask/:tid',jwtMiddle,taskController.deleteTask)

// specefic task details
router.get('/speceficTask/:tid',jwtMiddle,taskController.taskDetail)

// edit tasks
router.put('/editTask/:tid',jwtMiddle,taskController.UpdateTask)



module.exports=router