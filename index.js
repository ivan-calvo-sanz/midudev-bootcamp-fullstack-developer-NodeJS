/*
*****
index_Videotutorial_7
*****
*/

const { response } = require('express')
const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

//MIDDLEWARE
app.use(logger)

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30 17:30:31",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        date: "2019-05-30 18:39:34",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of",
        date: "2019-05-30 19:20:14",
        important: true
    },
    {
        id: 4,
        content: "PRUEBA!",
        date: "2022-06-17 19:20:14",
        important: false
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log({ id })
    const note = notes.find(note => note.id === id)
    if (note) {
        console.log({ note })
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
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
app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

//indica por que puerto escucha el servidor por defecto es el puerto 80
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})