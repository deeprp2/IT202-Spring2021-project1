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

function home() {
    document.getElementById("page-content").innerHTML = `
        <h4 class="mt-4 ml-5">
            App Description
        </h4>
        <div style="line-height: 30px">
            A Single-Page App that allows users to search for Chicago City-Owned Land Inventory data. <br>
            You can find more information about the data at : <a href="https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp">https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp </a>
        </div>
        <br/>
        <h4 class="mt-4 ml-5">
            Instructions
        </h4>
        <div style="line-height: 30px">
            <ul>
                <li>Navigate to Filter page for filtering inventory to customize your preferences</li>
                <li>Learn more about each listing using the Data Page</li>
                <li>Get an overview of available listings in your area using the map page</li>
                <li>Find more information about the app from the about page</li>
            </ul>
        </div>
    `
}

function filter() {
    document.getElementById("page-content").innerHTML = `
        <div class="container-fluid" style="margin-left: auto; margin-right: auto; max-width: 50%">
            <form class="mt-5" id="filter-form">
              <div class="form-group pb-2">
                <label for="zipcode" class="pb-1">Zipcode</label>
                <input type="number" class="form-control" id="zipcode" placeholder="Enter Zip Code" maxlength="5" 
                    oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                    
                <label for="community" class="pb-1 pt-3">Community</label>
                <input type="text" class="form-control" id="community" placeholder="Fuller Park" maxlength="1000" 
                    oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                    
                <label for="ward" class="pb-1 pt-3">Ward</label>
                <input type="number" class="form-control" id="ward" placeholder="10" maxlength="5" 
                    oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
              </div>
                <a class="btn btn-info" role="button" onclick="setFilteredList(document.querySelector('#filter-form'))">Submit</a>
            </form>
        </div>
    `
}

function data() {
    clearPageContent()
    let result = JSON.parse(window.localStorage.getItem('list')) || inventory

    for (let i = 0; i < offset; i++) {
        document.getElementById('page-content').innerHTML += `
            <div class="card m-2">
              <div class="card-body">
               <div>
                    ${result[i].community_area_name || "N/A"} - ${result[i]["pin"] || "N/A"}
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
                    ${result[i].community_area_name || "N/A"} - ${result[i]["pin"] || "N/A"}
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

function setFilteredList(data) {
    let result

    if (data) {
        let zipCode = parseInt(data.querySelector("#zipcode").value)
        let communityName = data.querySelector('#community').value?.toUpperCase()
        let ward = parseInt(data.querySelector("#ward").value)

        result = inventory.filter(function (x) {
            if (parseInt(x.zip_code) == zipCode)
                return x
            else if (x.community_area_name == communityName)
                return x
            else if (x.ward == ward)
                return x
        })
    } else {
        result = inventory
    }

    window.localStorage.setItem('list', JSON.stringify(result))
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

function about() {
    document.getElementById('page-content').innerHTML = `
        <h4 class="mt-4 ml-5">
            About
        </h4>
        <div style="line-height: 30px">
            A Single-Page App that allows users to search for Chicago City-Owned Land Inventory data. <br>
            You can find more information about the data at : <a href="https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp">https://dev.socrata.com/foundry/data.cityofchicago.org/aksk-kvfp </a>
        </div>
        <br/>
         <h4 class="mt-4 ml-5">
            By:
        </h4>
        <div style="line-height: 30px">
           Deep Patel
        </div>
        <br/>
    `
}

// Initialize and add the map
function initMap() {
    let lastOpenedInfoWindow = null;
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng({lat: 41.887, lng: -87.713})
    });

    let list = JSON.parse(window.localStorage.getItem('list')) || []

    list.forEach((item) => {
        let lat = parseFloat(item.location.latitude)
        let lng = parseFloat(item.location.longitude)

        let infoWindow = new google.maps.InfoWindow({
            content: `<div class="container">
                        <div>${item["community_area_name"] || "N/A"} - ${item["pin"] || "N/A"}</div>
                        <div>${item["address"] || "N/A"} - ${item["sq_ft"] || "N/A"} sq-ft</div>
                     </div>
                     `
        })

        const marker = new google.maps.Marker({
            position: {lat, lng},
            map
        });

        google.maps.event.addListener(marker, 'click', () => {
            if (lastOpenedInfoWindow)
                lastOpenedInfoWindow.close()

            infoWindow.open(map, marker)
            lastOpenedInfoWindow = infoWindow
        })
    })
}

function map() {
    clearPageContent()
    document.getElementById('page-content').innerHTML = `
        <div id="map" style="height: 85vh; width: 85vw"></div> 
    `
    initMap()
}
