let currentTab = null
let inventory = []
let navAnchors = document.querySelectorAll(".navLinks")

window.onload = function () {
    if (window.localStorage.getItem('currentTab') == null) {
        currentTab = navAnchors[0]
        window.localStorage.setItem('currentTab', 'home')
        inventory = getInventory()
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
            return data
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
    }
}

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

function clearPageContent() {
    document.getElementById("page-content").innerHTML = ""
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
            <form class="mt-5">
              <div class="form-group pb-2">
                <label for="zipcode" class="pb-1">Zipcode</label>
                <input type="number" class="form-control" id="zipcode" placeholder="Enter Zip Code" maxlength="5" 
                    oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    `
}

function data() {
    console.log("data")
}
