const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    id: Number,
    email: String,
    username: String,
    password: String,
    name: {
        firstname: String,
        lastname: String,
    },
    address: {
        city: String,
        street: String,
        number: Number,
        zipcode: String,
        geolocation: {
            lat: String,
            long: String
        }
    },
    phone: String
}, { collection: 'users' })

UserSchema.pre('save', function (next) {
    const user = this

    if (!this.isModified("password"))
        return next()

    bcrypt.genSalt(10, (saltError, salt) => {
        if (saltError) {
            return next(saltError)
        }

        bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError)
            }

            user.password = hash
            next()
        })
    })
})

const UserModel = mongoose.model('User', UserSchema)


module.exports = UserModel