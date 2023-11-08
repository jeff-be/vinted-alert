/**
 * Genere list of posts history
 * @param {{url: string, title: string}} post
 */
function genereHistory({ url, title }) {
    const tag = document.querySelector('.history')
    const li = document.createElement('li')
    const item = document.createElement('a')
    item.setAttribute('href', url)
    item.setAttribute('target', '_blank')
    item.textContent = title
    li.appendChild(item)
    tag.insertBefore(li, tag.firstChild)
}

/**
 * Search and genere current post link
 * @param {String} search
 * @return {HTMLElement}
 */
async function generateCurrentPost(search) {
    const app = document.getElementById('app')
    const tag = document.createElement('a')
    const post = await fetchSearch(search)
    tag.href = post.url
    tag.textContent = post.title
    tag.target = '_blank'
    app.appendChild(tag)
    return tag
}

/**
 * @param {String} search 
 */
function generateCurrentSearch(search) {
    const searchTag = document.getElementById('search')
    searchTag.textContent = `Recherche en cours : "${search}"`
}

/**
 * @param {HTMLElement} tag
 * @param {{url: string, title: string}} post
 */
function updateCurrentPost(tag, post) {
    tag.setAttribute('href', post.url)
    tag.textContent = post.title
}

/**
 * Search
 * @param {String} search 
 * @returns {Object}
 */
async function fetchSearch(search) {
    try {
        const res = await fetch('/item', {
            method: 'POST',
            body: search,
        })
        const post = await res.json()
        return post
    } catch (e) {
        console.log(e)
        throw new Error('Erreur dans l\'obtention du dernier article.')
    }
}

function alert() {
    const audio = document.getElementById('audio')
    audio.play()
}

function wait(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(duration), duration)
    })
}

document.addEventListener('DOMContentLoaded', async function () {
    let search
    do {
        search = prompt('Sur quelle recherche activer les alertes Vinted ?')
    } while (!search)
    generateCurrentSearch(search)
    const app = await generateCurrentPost(search)
    let history = []
    setInterval(async () => {
        const post = await fetchSearch(search)
        if (post.url && history.indexOf(post.url) === -1 && post.url !== app.href) {
            history.push(app.href)
            genereHistory({
                url: app.href,
                title: app.textContent,
            })
            updateCurrentPost(app, post)
            alert()
            window.open(post.url, '_blank').focus()
        }
    }, 12000)
})
