const PageRepository = require('src/infra/repositories/page')

const getByName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const page = await PageRepository.getByName(name)
            resolve(page)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getByName
}