let navAnchors = document.querySelectorAll(".navLinks")

navAnchors.forEach((item) => {
    item.addEventListener('click', function (event) {
        let page = event.target.getAttribute('data-screen')
        clearPageContent();

        switch (page) {
            case 'home': home()
                        break;
            case 'filter': filter()
                        break;
        }
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
        API: <a href="https://data.cityofchicago.org/resource/aksk-kvfp.json">https://data.cityofchicago.org/resource/aksk-kvfp.json</a>
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

}
