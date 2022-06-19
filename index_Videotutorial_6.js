/*
*****
index_Videotutorial_6
*****
*/

//console.log('Hola midudev, como estamos?')

//importamos el modulo http (sirve para crear un Servior)
//const http = require('http')
//importamos el modulo express
const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

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


//importamos el modulo http (sirve para crear un Servior)
const http = require('http')

// creo el Servidor pasándole un parámetro que es un Callback
//A callback is a function which is called when a task is completed
// cada vez que le llegue una "request" (una petición va a funcionar este servidor)
// request parámetro donde le va a llegar la info
// response mediante el cual va a devolver la info
/*
const app = http.createServer((request, response) => {
    //escribe la cabecera de la respuesta
    //estado del código:200 y de typo:texto plano
    response.writeHead(200, { 'Content-Type': 'application/json' })
    //devuelve "Hello World"
    response.end(JSON.stringify(notes))
})
*/



//indica por que puerto escucha el servidor por defecto es el puerto 80
const PORT = 3000
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})
