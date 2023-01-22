const fastifyView = require('@fastify/view')
const fastify = require('fastify')
const ejs = require('ejs')
const fastfyStatic = require('@fastify/static')
const { dirname, join } = require('node:path')
const { getPost, init } = require('./actions/post')
const fastifyFavicon = require('fastify-favicon')

const app = fastify()

app.register(fastifyView, {
    engine: {
        ejs,
    },
})

app.register(fastfyStatic, {
    root: join(dirname(__dirname), 'public'),
})

app.register(fastifyFavicon, { path: './public/favicon', name: 'favicon.ico', maxAge: 3600 })

app.get('/', init)
app.get('/item', getPost)

app.setErrorHandler((error, req, res) => {
    res.statusCode = 500
    return {
        error: error.message,
    }
})

const start = async () => {
    try {
        await app.listen({ port: 3000 })
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()
