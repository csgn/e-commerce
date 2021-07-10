const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('base', { 
        pageHeader: "Home"
    })
})

module.exports = router