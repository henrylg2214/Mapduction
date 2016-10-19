/**
 * Created by henry on 2016-10-12.
 */
var mapsapi = 'AIzaSyBgbI_nNqjw1HM7PUPOw_0a37Cy5sVEuaE'
var map;
var db = firebase.database();



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.283, lng: -123.111},
        styles:mapstyle,
        zoom: 16
    });

    google.maps.event.addListener(map, 'click', function (event) {
        console.log(event.latLng.lat());
        drawTarget([
            event.latLng.lat(),
            event.latLng.lng()
        ]);
        console.log(event.latLng.lng())
    });

    function drawRect(bounds) {

        rectangle = new google.maps.Rectangle({
            bounds: bounds,
            editable: true,
            draggable: true
        });

        rectangle.setMap(map);
    }

    //google.maps.event.addListener(rectangle, 'click', function (event) {

    // })
    function storeMap(coords) {
        firebase.database().ref('rects/').set({
            rect: coords
        });
    }

    function drawTarget(coords) {
        var lat = coords[0];
        var lng = coords[1];
        var bounds = {
            north: lat + .0006,
            south: lat - .0006,
            east: lng + .001,
            west: lng - .001
        };
        drawRect(bounds);
        storeMap(bounds);
    }
    function pickteam(choice){

        var team ={}
        team[choice]='test'

        firebase.database().ref('players/').set(team);
    }

$ ('.teamselect').click(function(event){
    console.log(event.target)
    $(event.target).siblings().removeClass('active')
    $(event.target).addClass('active')
    var choice=event.target.getAttribute('data-team')
    pickteam(choice)

})

}
