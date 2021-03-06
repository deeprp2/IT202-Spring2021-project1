function data() {
    clearPageContent()
    let result = JSON.parse(window.localStorage.getItem('filteredList'))

    if (!result) {
        result = JSON.parse(window.localStorage.getItem('list'))
    }

    if (offset > result.length) {
        offset = result.length - 1
    }

    for (let i = 0; i <= offset; i++) {
        document.getElementById('page-content').innerHTML += `
            <div class="card m-2">
              <div class="card-body">
               <div>
                    ${result[i]?.community_area_name || "N/A"} - ${result[i]?.pin || "N/A"}
                </div>
                <div>
                    ${result[i]?.address || "N/A"} - ${result[i]?.sq_ft || "N/A"} sq-ft
                </div>
             </div> 
            </div>
        `
    }

    if (result.length - offset > 0) {
        let btn = addLoadMoreButton()
        btn.addEventListener('click', function loop() {
            document.body.removeChild(document.getElementById('load-more'))
            let index = offset + 1;

            if (result.length - offset < 20) {
                offset = result.length
            } else {
                offset += 20;
            }

            for (let i = index; i < offset; i++) {
                document.getElementById('page-content').innerHTML += `
                    <div class="card m-2">
                      <div class="card-body">
                         <div>
                            ${result[i]?.community_area_name || "N/A"} - ${result[i]?.pin || "N/A"}
                        </div>
                        <div>
                            ${result[i]?.address || "N/A"} - ${result[i]?.sq_ft || "N/A"} sq-ft
                        </div>
                     </div> 
                    </div>
                `
            }

            if (offset > index) {
                let btn = addLoadMoreButton()
                btn.addEventListener('click', loop)
            }
        })
    }
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
