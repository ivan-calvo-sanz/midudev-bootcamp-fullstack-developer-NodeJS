//recuperar el Schema de mongoose
const { model, Schema } = require('mongoose')

//indicar el Esquema que debe seguir (es el "contrato" a seguir en la bbdd)
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// creo un modelo que siga el Esquema anteriormente creado
const Note = model('Note', noteSchema) //los nombres de los modelos se ponen en singular

module.exports = Note