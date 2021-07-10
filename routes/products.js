const router = require('express').Router()
const ProductController = require('../controller/product-controller')

router.get('/', async (req, res) => {
    const products = await ProductController.aggregate({
        $sort: ProductController.queryFilter(req.query)
    })

    const productCategories = await ProductController.aggregate({
        $group: {
            _id: "$category"
        }
    })

    res.render('products', { 
        pageHeader: `Products (${products.length})`,
        pageUrl: "/products",
        productCategories,
        products 
    })
})

router.get('/categories', async (req, res) => {
    const categories = await ProductController.aggregate({
        $group: {
            _id: "$category"
        }
    })

    res.send(categories)
})

router.get('/category/:category', async (req, res) => {
    const products = await ProductController.aggregate([
        {
            $match: {
                "category": req.params.category
            }
        },
        {
            $sort: ProductController.queryFilter(req.query)
        }
    ])

    if (products === null)
        res.redirect('/products/categories') // 404
    else {
        const productCategories = await ProductController.aggregate({
            $group: {
                _id: "$category"
            }
        })
        //res.send(products)
        res.render('products', {
            pageHeader: `Products - ${req.params.category} (${products.length})`,
            pageUrl: `/products/category/${req.params.category}`,
            productCategory: req.params.category,
            productCategories,
            products,
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await ProductController.findById(req.params.id, null)
        res.render('product-detail', {
            product
        })
    } catch (error) {
        res.redirect('/products') // 404
    }
})

module.exports = router