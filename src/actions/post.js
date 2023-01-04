const { PostNotFound } = require("../errors/PostNotFound")
const vinted = require("../vinted-api");

const getPost = async (req, res) => {
    const result = await vinted.search('https://www.vinted.fr/api/v2/catalog/items?order=newest_first&search_text=paraboot&page=1&per_page=1')
    if (result === undefined) {
        throw new PostNotFound('Impossible de trouver le dernier post')
    }
    const post = result.items[0]
    return post
}

const init = async (req, res) => {
    const post = await getPost()
    return res.view('./templates/index.ejs', {
        post
    })
}

module.exports = {
    getPost, init
}