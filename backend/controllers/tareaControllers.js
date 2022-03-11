const getTareas = (req, res) => {
    res.status(200).json({message: 'Obtener Tareas'})
}

const postTareas = (req, res) => {
    res.status(200).json({message: 'Crear una Tarea'})
}

const putTareas = (req, res) => {
    res.status(200).json({message: `Modificar Tarea ${req.params.id}`})
}

const delTareas = (req, res) => {
    res.status(200).json({message: `Eliminar Tarea ${req.params.id}`})
}

module.exports = {
    getTareas,
    postTareas,
    putTareas,
    delTareas
}