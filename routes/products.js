const router = require('express').Router()
const ProductController = require('../controller/product-controller')

router.get('/', async (req, res) => {
    const sortType = ProductController.queryFilter(req.query)
    const products = await ProductController.aggregate({
        $sort: sortType[1]
    })

    const productCategories = await ProductController.aggregate(
        {
            $group: {
                _id: "$category"
            }
        }
    )

    res.render('products', { 
        pageHeader: `Products (${products.length})`,
        pageUrl: "/products",
        productCategories,
        sortType: sortType[0],
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
    const sortType = ProductController.queryFilter(req.query)
    const products = await ProductController.aggregate([
        {
            $match: {
                "category": req.params.category
            }
        },
        {
            $sort: sortType[1]
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
            sortType: sortType[0],
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


/* Add to Cart */
router.post('/', (req, res) => {
})

module.exports = router