const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`La conexión a MongoDB fue exitosa: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1) //detiene la ejecución del programa si hubo un error
    }
}

module.exports = connectDB