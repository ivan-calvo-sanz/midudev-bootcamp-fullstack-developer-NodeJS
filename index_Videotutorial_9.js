/*
*****
index_Videotutorial_9
*****
*/

//requiero el archivo mongo.js y posteriormente importo la Nota
require('dotenv').config()
require('./mongo')
const Note = require('./models/Note.js')

const { response } = require('express')
const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')
const handleErrors = require('./middleware/handleErrors.js')
const notFound = require('./middleware/notFound.js')
const handleError = require('./middleware/handleErrors.js')

app.use(cors())
app.use(express.json())

//MIDDLEWARE
app.use(logger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    const { id } = request.params
    console.log({ id })

    Note.findById(id).then(note => {
        if (note) {
            console.log({ note })
            return response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
    const { id } = request.params
    Note.findByIdAndRemove(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(notes => notes.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    response.status(201).json(newNote)
})

// *** controlar ruta NO existente ***   status 404
app.use(notFound)

// "middleware" se utiliza para controlar errores
app.use(handleErrors)

//indica por que puerto escucha el servidor por defecto es el puerto 80
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})