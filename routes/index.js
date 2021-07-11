const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('base', { 
        pageHeader: "Home",
        sessionIsExist: req.session.loggedIn ? true: false
    })
})

module.exports = router