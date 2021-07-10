const BaseController = require('./base-controller')
const ProductModel = require('../models/product')

class ProductController extends BaseController {
    model = ProductModel

    queryFilter (query) {
        let filter = { id: 1 }
        let sort = query.sort

        if (sort != null) { // or undefined
            if (sort === 'ascprice')
                filter = { price: 1 }
            else if (sort === 'descprice')
                filter = { price: -1 }
        }

        return filter
    }
}

module.exports = new ProductController()