const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT

const app = express()

app.use('/api/tareas', require('./routes/tareaRoutes'))


app.listen(port, () => console.log(`El servidor inició en el puerto ${port}`))
