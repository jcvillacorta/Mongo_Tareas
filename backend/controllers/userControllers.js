const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {

    //desestructuramos los datos del body
    const {name, email, password} = req.body

    //verificamos que estén completos los datos, sino nos manda un dato de error
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Te faltan datos')
    }

    //verificar que no existe el usuario
    const userExist = await User.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creamos el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json ({
            id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Datos no válidos')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    
    // desestructuramos el req.body
    const {email, password} = req.body

    // verificamos si el usuario existe
    const user = await User.findOne({email})
    
    // si existe el usuario vamos a comparar el password con el hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }

})

const perfilUser = asyncHandler(async(req, res) => {
    const {id, name, email} = req.user

    res.status(200).json({
        id,
        name,
        email
    })

})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    perfilUser
}