const taskmodel = require("../models/projectmodel");

const createTask = async (req, res) =>{
    const {title, description} = req.body;

    try{
        const Task = await taskmodel.create({title, description});
        res.status(200).json(task)
    }catch(e) {
        res.status(400).json({error: e.message});
    }
};

module.exports = {createTask};