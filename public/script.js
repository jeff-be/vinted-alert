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

document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app')
    const audio = document.getElementById('audio')
    const historyList = document.querySelector('.history')
    const currentValue = app.href
    let history = []
    setInterval(async () => {
        const res = await fetch('/item')
        const post = await res.json()
        if (history.indexOf(post.url) === -1 && post.url !== currentValue) {
            history.push(post.url)
            genereHistory(historyList, {
                url: app.href,
                title: app.textContent
            })
            updateCurrentPost(app, post)
            audio.play()
            window.open(post.url, '_blank').focus();
        }
    }, 10000)
})