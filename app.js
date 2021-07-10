require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')


async function configMongo() {
    try {
        await mongoose.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("System Info: Connected successfully to mongodb");
    } catch (error) {
        console.error(error);
    }
}

function configSets(app) {
    app.set('view engine', 'pug')
    app.set('views', __dirname + '/views')
}

function configUses(app, routes) {
    app.use(express.urlencoded())
    app.use(express.json())

    /* ROUTES */
    app.use('/', routes.indexRouter)
    app.use('/products', routes.productsRouter)
}

function configRoutes(app) {
    return {
        indexRouter: require('./routes/index'),
        productsRouter: require('./routes/products')
    }
}

function main() {
    const app = express()

    configMongo()
    configSets(app)
    configUses(app, configRoutes(app))

    app.listen(process.env.PORT || 3000, (error) => {
        if (error)
            console.error(error);
        else
            console.log(`System Info: Listening from ${process.env.PORT || 3000}`);
    })
}

main()