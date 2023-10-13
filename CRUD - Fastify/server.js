// Criando servidor com node puro
// import { createServer } from 'node:http'
// const server = createServer((request, response) => {    
//     response.write('Testando Response.')
//     return response.end()
// })
// server.listen(3333)

// Criando server com FASTIFY
import { fastify } from "fastify";
import { DatabaseMemoria } from "./db_memoria.js";

const server = fastify()
const database = new DatabaseMemoria()

server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body
    
    database.create ({
        title,
        description,
        duration
    })

    // console.log(database.getall());
    return reply.status(201).send()

})

server.get('/videos', (request) => {
    const search = request.query.search
    const videos = database.getall(search)
    return videos 
})

server.put('/videos/:id', (request, reply) => {
    const idVideo = request.params.id
    const { title, description, duration } = request.body

    database.update(idVideo, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})


server.delete('/videos/:id', (request, reply) => {
    const id_video = request.params.id
    database.delete(id_video)
    return reply.status(204).send()
})

server.listen({
    port: 3333
})


