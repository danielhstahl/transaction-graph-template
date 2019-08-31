const { createClient, getResults } = require('./janusConvertor')
const fastify = require('fastify')({ logger: true })
const {
    url,
    port
} = require('./config.json')
// Declare a route
const client = createClient(url)
fastify.get('/account/:account_number', (request, reply) => {
    console.log(request.params)
    getResults(client).then(res => {
        reply.send({ data: res })
    }).catch(e => {
        reply.send({ err: e })
    })
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(port)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()