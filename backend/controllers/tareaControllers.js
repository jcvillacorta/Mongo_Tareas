// Como con Mongoose se trabaja con promesas, se trabaja con async y await
const asyncHandler = require('express-async-handler');

const getTareas = asyncHandler (async(req, res) => {
    res.status(200).json({message: 'Obtener Tareas'})
})

const postTareas = asyncHandler (async(req, res) => {
    if(!req.body.text) {
       // res.status(400).json({message: 'Por favor, teclea una tarea'})
       res.status(400)
       throw new Error('Por favor, teclea una tarea')
    }
//    console.log(req.body)
    res.status(200).json({message: 'Crear una Tarea'})
})

const putTareas = asyncHandler (async(req, res) => {
    res.status(200).json({message: `Modificar Tarea ${req.params.id}`})
})

const delTareas = asyncHandler (async(req, res) => {
    res.status(200).json({message: `Eliminar Tarea ${req.params.id}`})
})

module.exports = {
    getTareas,
    postTareas,
    putTareas,
    delTareas
}