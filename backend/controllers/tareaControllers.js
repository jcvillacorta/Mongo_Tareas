// Como con Mongoose se trabaja con promesas, se trabaja con async y await
const asyncHandler = require('express-async-handler');

const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler (async(req, res) => {

    const tareas = await Tarea.find()

    res.status(200).json(tareas)
})

const postTareas = asyncHandler (async(req, res) => {
    if(!req.body.text) {
       // res.status(400).json({message: 'Por favor, teclea una tarea'})
       res.status(400)
       throw new Error('Por favor, teclea una tarea')
    }
//    console.log(req.body)

    const tarea = await Tarea.create({
        text: req.body.text
    })

    res.status(200).json(tarea)
})

const putTareas = asyncHandler (async(req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error ('Tarea no encontrada')
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(tareaUpdated)
})

const delTareas = asyncHandler (async(req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error ('Tarea no encontrada')
    }

    await tarea.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTareas,
    postTareas,
    putTareas,
    delTareas
}