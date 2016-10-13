/**
 * Created by henry on 2016-10-12.
 */
var mapsapi = 'AIzaSyBgbI_nNqjw1HM7PUPOw_0a37Cy5sVEuaE'
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.283, lng: -123.111},
        zoom: 16
    });

google.maps.event.addListener(map,'click',function (event) {
    console.log(event.latLng.lat())
    console.log(event.latLng.lng())
})

}
