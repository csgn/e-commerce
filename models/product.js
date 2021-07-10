const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String
}, { collection: "products" })

const ProductModel = mongoose.model('ProductModel', ProductSchema)

module.exports = ProductModel