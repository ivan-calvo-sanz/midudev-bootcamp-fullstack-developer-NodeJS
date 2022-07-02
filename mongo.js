//requiero la libreria de mongoose
const mongoose = require('mongoose')
const password = require('./password.js')
//conectar a mongodb con mongoose
const connectionString = process.env.MONGO_DB_URI



const Note = require('./models/Note.js')

//conexion a mongobd
mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.log('ERROR!!!')
        console.error(err)
    })

//creo una instancia del modelo anterior
const note = new Note({
    content: 'MongoDB es increible, midu',
    date: new Date(),
    important: true
})

// guardo la note en la bbdd
//mongoose devuelve siempre promesas por lo que podemos capturar si nos devuelve un resultado correcto
note.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err => {
        console.error(err)
    })

Note.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
})
