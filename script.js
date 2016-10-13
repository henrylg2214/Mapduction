/**
 * Created by henry on 2016-10-12.
 */
var mapsapi = 'AIzaSyBgbI_nNqjw1HM7PUPOw_0a37Cy5sVEuaE'
var map;
var bounds = {
    north: 49.282,
    south: 49.281,
    east: -123.114,
    west: -123.115
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.283, lng: -123.111},
        zoom: 16
    });

    google.maps.event.addListener(map, 'click', function (event) {
        console.log(event.latLng.lat())
        console.log(event.latLng.lng())
    })
    rectangle = new google.maps.Rectangle({
        bounds: bounds,
        editable: true,
        draggable: true
    });

    rectangle.setMap(map);

    google.maps.event.addListener(rectangle, 'click', function (event) {
alert ('kapow')
    })





}
