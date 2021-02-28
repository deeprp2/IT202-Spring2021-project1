let currentTab = null
let inventory = []
let offset = 20;
let navAnchors = document.querySelectorAll(".navLinks")

navAnchors.forEach((item) => {
    item.addEventListener('click', function (event) {
        currentTab.classList.remove('active')
        currentTab = event.target;
        let page = currentTab.getAttribute('data-screen')
        window.localStorage.setItem('currentTab', page)
        currentTab.classList.add('active')
        clearPageContent();
        renderContent(page)
    })
})

window.onload = function () {
    getInventory()
    if (window.localStorage.getItem('currentTab') == null) {
        currentTab = navAnchors[0]
        window.localStorage.setItem('currentTab', 'home')
    } else {
        let page = window.localStorage.getItem('currentTab')
        currentTab = document.querySelector(`a[data-screen=${page}]`)
        currentTab.classList.add('active')
        renderContent(page)
    }
}

function getInventory() {
    fetch('https://data.cityofchicago.org/resource/aksk-kvfp.json')
        .then(response => response.json())
        .then(data => {
            inventory = data
        })
}

function renderContent(page) {
    switch (page) {
        case 'home':
            home()
            break;
        case 'filter':
            filter()
            break;
        case 'data':
            data();
            break;
        case 'map':
            map();
            break;
        case 'about':
            about();
            break;
    }
}

function clearPageContent() {
    document.getElementById("page-content").innerHTML = ""
    document.getElementById('load-more')?.remove()
}
