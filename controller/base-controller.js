module.exports = class BaseController {
    async findAll() {
        return await this.model.find()
    }

    async findById(id) {
        return await this.model.findById(id)
    }

    async aggregate(stage) {
        const results = await this.model.aggregate([ stage ])

        return JSON.stringify(results) === '[]' ? null : results
    }
}