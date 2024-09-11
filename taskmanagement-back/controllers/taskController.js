const tasks=require('../models/taskModel')



// Create New Task
exports.addTask = async (req, res) => {
    // destructuring datas
    const { taskTitle, description,done, date } = req.body
    const userId = req.payload

    try {
        const existingTask = await tasks.findOne({ taskTitle })
        if (existingTask) {
            res.status(406).json("Task already exist!")
        }
        else {
            // if not existing task, create another object
            const newTask = new tasks({
                taskTitle, description, done, date: new Date(date), userId
            })
            await newTask.save()
            res.status(200).json(newTask)
        }
    }
    catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
}

// Get All Tasks of user
exports.allTasks = async (req, res) => {
    // to search tasks
    const search=req.query.search

    try {
        const query={
            title:{$regex:search,$options:'i'}
        }
        const userId = req.payload
        const result = await tasks.find({ userId })
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Tasks !")
        }
    } catch (err) {
        res.status(400).json(err)
    }

}

// to delete a task
exports.deleteTask = async (req, res) => {
    const { tid } = req.params
    try {
        const result = await tasks.findByIdAndDelete({ _id: tid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

// Specific Task Details
exports.taskDetail = async (req, res) => {

    const { tid } = req.params
    const userId = req.payload

    try {
        const result = await tasks.findById({ _id: tid })
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Task  !")
        }
    }
    catch (err) {
        console.log(err)
        res.status(406).json(err)
    }
}

// to update Tasks
exports.UpdateTask = async (req, res) => {
    const { taskTitle, description,  done, date } = req.body
    const userId = req.payload
    const { tid } = req.params
    try {
        const editTask = await tasks.findByIdAndUpdate({ _id: tid },
            { taskTitle, description,done, date, userId }, { new: true })
        await editTask.save
        res.status(200).json(updateTask)
    }
    catch (err) {
        console.log(err)
        res.status(406).json(err)
    }
}

