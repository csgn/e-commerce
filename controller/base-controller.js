module.exports = class BaseController {
    async add(other) {
        return await this.model.create(other)
    }

    async findAll() {
        return await this.model.find()
    }

    async findById(id) {
        return await this.model.findById(id)
    }

    async findByOther(other) {
        return await this.model.findOne(other)
    }

    async aggregate(stage) {
        const results = await this.model.aggregate([ stage ])

        return JSON.stringify(results) === '[]' ? null : results
    }
}