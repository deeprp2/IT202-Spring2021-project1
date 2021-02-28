function data() {
    clearPageContent()
    let result = JSON.parse(window.localStorage.getItem('list')) || inventory

    for (let i = 0; i < offset; i++) {
        document.getElementById('page-content').innerHTML += `
            <div class="card m-2">
              <div class="card-body">
               <div>
                    ${result[i]?.community_area_name || "N/A"} - ${result[i]["pin"] || "N/A"}
                </div>
                <div>
                    ${result[i]["address"] || "N/A"} - ${result[i]["sq_ft"] || "N/A"} sq-ft
                </div>
             </div> 
            </div>
        `
    }

    let btn = addLoadMoreButton()
    btn.addEventListener('click', function loop () {
        document.body.removeChild(document.getElementById('load-more'))
        let index = offset + 1;

        if (offset + 20 > inventory.length) {
            offset = inventory.length - offset
        } else {
            offset += 20;
        }

        for (let i = index; i < offset; i++) {
            document.getElementById('page-content').innerHTML += `
            <div class="card m-2">
              <div class="card-body">
                 <div>
                    ${result[i]?.community_area_name || "N/A"} - ${result[i]["pin"] || "N/A"}
                </div>
                <div>
                    ${result[i]["address"] || "N/A"} - ${result[i]["sq_ft"] || "N/A"} sq-ft
                </div>
             </div> 
            </div>
        `
        }

        let btn = addLoadMoreButton()
        btn.addEventListener('click', loop)
    })
}

function addLoadMoreButton() {
    let btn = document.createElement("btn")
    btn.classList.add("btn")
    btn.classList.add("btn-primary")
    btn.innerText = 'Load More'
    btn.id = 'load-more'
    btn.type = "button"
    btn.style.marginLeft = '20px'
    btn.style.marginBottom = '20px'
    document.body.appendChild(btn)
    return btn
}
