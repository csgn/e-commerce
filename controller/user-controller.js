const bcrypt = require('bcrypt')

const BaseController = require('./base-controller')
const UserModel = require('../models/user')

class UserController extends BaseController {
    model = UserModel

    setSession(session, userId) {
        session.loggedIn = true
        session.userId = userId
        session.save()
    }

    passwordHash(plainTextPassword, hash, callback) {
        bcrypt.compare(plainTextPassword, hash, function(error, isMatch) {
            if (error) {
                return callback({ error: true })
            }
            
            return callback(null, isMatch)
        })
    }
}

module.exports = new UserController()