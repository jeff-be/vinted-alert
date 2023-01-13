const { PostNotFound } = require('../errors/PostNotFound')
const { convertToSlug } = require('../helper/functions')
const vinted = require('../vinted-api')

const getPost = async (req, res) => {
    const search = req.body
    const searchSlug = convertToSlug(search)
    const result = await vinted.search(
        `https://www.vinted.fr/api/v2/catalog/items?order=newest_first&search_text=${searchSlug}&page=1&per_page=1`,
    )
    if (result === undefined) {
        throw new PostNotFound('Impossible de trouver le dernier post')
    }
    const post = result.items[0]
    return post
}

const init = async (req, res) => {
    return res.view('./templates/index.ejs', { post: null })
}

module.exports = {
    getPost,
    init,
}
