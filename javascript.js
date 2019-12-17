var citySearch = $("#citySearchInput");
var searchButton = $("#searchButton");

function logtest() {
    console.log(citySearch.val());
}

searchButton.on("click", logtest);