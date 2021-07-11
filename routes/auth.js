const router = require('express').Router()
const UserController = require('../controller/user-controller')

router.get('/', (req, res) => {
    !req.session.loggedIn ? res.redirect('/auth/login') : res.redirect('/')
})

router.get('/login', (req, res) => {
    !req.session.loggedIn ? res.render('auth', { loginType: true }) : res.redirect('/')
})

router.get('/register', (req, res) => {
    !req.session.loggedIn ? res.render('auth', { loginType: false }) : res.redirect('/')
})

router.post('/login', async (req, res) => {
    try {
        const user = await UserController.findByOther({ email: req.body.email })
        if (user === null) {
            res.render('auth', { loginType: true, errorMessage: "Email and/or password are not correct" })
        } else {
            UserController.passwordHash(req.body.password, user.password, function (error, isMatch) {
                if (error) {
                    res.sendStatus(404)
                } else if (!isMatch) {
                    res.render('auth', { loginType: true, errorMessage: "Password is not correct" })
                } else {
                    if (req.body.userSession === 'on')
                        req.session.cookie.maxAge = 2628000000
                    UserController.setSession(req.session, user._id)
                    res.redirect('/')
                }
            })
        }
    } catch (error) {
        res.sendStatus(404);
    }
})

router.post('/register', async (req, res) => {
    try {
        if (req.body.password !== req.body.passwordagain) {
            res.render('auth', { loginType: false, errorMessage: "Passwords are not same" })
        } else {
            let user = await UserController.findByOther({ email: req.body.email })

            if (user !== null) {
                res.render('auth', { loginType: false, errorMessage: "This e-mail is being used" })
            } else {
                user = new UserController.model({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    name: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                    },
                    address: {
                        city: null,
                        street: null,
                        number: null,
                        zipcode: null,
                        geolocation: {
                            lat: null,
                            long: null 
                        }
                    },
                    phone: null
                })
                await UserController.add(user)

                UserController.setSession(req.session, user._id)
                res.redirect('/')
            }
        }

    } catch (error) {
        console.error(error);
        res.sendStatus(404)
    }
})


module.exports = router