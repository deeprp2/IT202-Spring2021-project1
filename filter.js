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
