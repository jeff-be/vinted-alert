/**
 * Genere list of posts history
 * @param {HTMLElement} tag 
 * @param {{url: string, title: string}} post 
 */
function genereHistory (tag, post) {
    const li = document.createElement('li')
    const item = document.createElement('a')
    item.setAttribute('href', post.url)
    item.setAttribute('target', '_blank')
    item.textContent = post.title
    li.appendChild(item)
    tag.insertBefore(li, tag.firstChild)
}

/**
 * @param {HTMLElement} tag 
 * @param {{url: string, title: string}} post 
 */
function updateCurrentPost (tag, post) {
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
    const historyList = document.querySelector('.history')
    const currentValue = app.href
    let history = []
    setInterval(async () => {
        const post = await fetchSearch(search)
        if (post && history.indexOf(post.url) === -1 && post.url !== app.href) {
            history.push(app.href)
            genereHistory({
                url: app.href,
                title: app.textContent
            })
            updateCurrentPost(app, post)
            audio.play()
            window.open(post.url, '_blank').focus();
        }
    }, 10000)
})