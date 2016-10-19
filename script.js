/**
 * Created by henry on 2016-10-12.
 */
var mapsapi = 'AIzaSyBgbI_nNqjw1HM7PUPOw_0a37Cy5sVEuaE'
var map;
var db = firebase.database();
var myTeam = "";
var theirTeam = "";


var crowds = [];


function initMap() {


    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.283, lng: -123.111},
        styles: mapstyle,
        zoom: 16
    });

    google.maps.event.addListener(map, 'click', function (event) {
        drawTarget([
            event.latLng.lat(),
            event.latLng.lng()
        ], 'mine');
        console.log(event.latLng.lat());
        console.log(crowds);
        if (crowds.length !== 3) {

            // console.log(event.latLng.lng())
        } else {
            //start the game
        }
    });

    function drawRect(bounds) {

        rectangle = new google.maps.Rectangle({
            bounds: bounds,
            // editable: true,
            // draggable: true,
            fillOpacity: 0,
            strokeOpacity: 0.0
        });

        rectangle.setMap(map);

        rectangle.addListener('click', function (event) {
            alert('Found one');
        });
    }


    function storeMap(coords) {

        console.log(coords);
        crowds.push(coords);


        if (crowds.length === 3) {

            alert('You place all the points');
            firebase.database().ref('crowds/' + myTeam).set(crowds);

        }


    }

    function drawTarget(coords, whose) {
        var lat = coords[0];
        var lng = coords[1];
        var bounds = {
            north: lat + .0006,
            south: lat - .0006,
            east: lng + .001,
            west: lng - .001
        };
        if(whose === 'theirs'){

            drawRect(bounds);
        }else{
            storeMap(bounds);
        }
    }

    function pickteam(choice) {
        var team = {};
        team['team'] = choice;

        firebase.database().ref('players/').set(team);
    }

    function addEnemyCrowds() {
        firebase.database().ref('crowds/' + opposite(myTeam)).on("value", function (snapshot) {
            // console.log(snapshot.val());
            var enCrowds = snapshot.val();

            for(var i = 0; i < enCrowds.length; i++){
                drawTarget([
                    enCrowds[i].north - .0006,
                    enCrowds[i].east - .001
                ], 'theirs');
            }


        })
    }

    function opposite(choice) {
        if (choice === "red") {
            return "blue"
        } else {
            return "red"
        }
    }

    function resetTeams() {
        myTeam = "";
        var team = {};
        team['team'] = "";
        firebase.database().ref('players/').set(team);
        firebase.database().ref('crowds/').set({});
        $('.teamselect').show();
    }

    $('.reset').click(resetTeams);

    $('.teamselect').click(function (event) {
        console.log(event.target);
        // $(event.target).siblings().removeClass('active');
        // $(event.target).addClass('active');
        var choice = event.target.getAttribute('data-team');
        myTeam = choice;
        theirTeam = opposite(choice);
        pickteam(choice);
    });

    firebase.database().ref('crowds/').on("value", function (snapshot) {


        if(snapshot.val() !== null){
            console.log("team chosen" + snapshot.val());
            console.log("Players ready: " + Object.keys(snapshot.val()).length);
            if(Object.keys(snapshot.val()).length === 2){
                addEnemyCrowds();
            }
        }

    });


    firebase.database().ref('players/').on("child_changed", function (snapshot) {
        // console.log(snapshot.val());
        choice = snapshot.val();
        if (choice !== "") {
            if (myTeam === "") {
                myTeam = opposite(choice);
                theirTeam = choice;
                $(".teamselect").hide();
                console.log("You've been given " + myTeam);
            } else {
                $(".teamselect").hide();
                console.log("You have selected " + myTeam);
            }
        }

    })


}
