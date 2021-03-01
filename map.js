// Initialize and add the map
function initMap() {
    let lastOpenedInfoWindow = null;
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng({lat: 41.887, lng: -87.713})
    });

    let list = JSON.parse(window.localStorage.getItem('filteredList'))

    if (!list) {
        list = JSON.parse(window.localStorage.getItem('list'))
    }

    list.forEach((item) => {
        if (item.location) {
            let lat = parseFloat(item?.location?.latitude)
            let lng = parseFloat(item?.location?.longitude)

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
        }
    })
}

function map() {
    clearPageContent()
    document.getElementById('page-content').innerHTML = `
        <div id="map" style="height: 85vh; width: 85vw"></div> 
    `
    initMap()
}
