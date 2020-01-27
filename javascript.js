var map = L.map("map").setView([47.25, -122.44], 11);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWpzbGFnZXIiLCJhIjoiZUMtVjV1ZyJ9.2uJjlUi0OttNighmI-8ZlQ",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/dark-v10",
    tileSize: 512,
    zoomOffset: -1
  }
).addTo(map);

var control = L.Routing.control({
  // waypoints: [L.latLng(47.246587, -122.43883), L.latLng(47.318017, -122.54297)],
  routeWhileDragging: true,
  units: "imperial",
  collapsible: true,
  expand: "touch",
  router: L.Routing.mapbox(
    "pk.eyJ1IjoiZ2VudGVuIiwiYSI6ImNrMmdzOHFsdTA2Z2UzY252b3B1cjJqdXQifQ.B2doXxjSELmQIf7wIIDBZg"
  ),
  geocoder: L.Control.Geocoder.mapbox(
    "pk.eyJ1IjoiZ2VudGVuIiwiYSI6ImNrMmdzOHFsdTA2Z2UzY252b3B1cjJqdXQifQ.B2doXxjSELmQIf7wIIDBZg"
  )
}).addTo(map);

function createButton(label, container) {
  var btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
}

map.on("click", function(e) {
  var container = L.DomUtil.create("div"),
    startBtn = createButton("Start from this location", container),
    destBtn = createButton("Go to this location", container);

  L.popup()
    .setContent(container)
    .setLatLng(e.latlng)
    .openOn(map);

  L.DomEvent.on(startBtn, "click", function() {
    control.spliceWaypoints(0, 1, e.latlng);
    map.closePopup();
  });

  L.DomEvent.on(destBtn, "click", function() {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    control.show();
    map.closePopup();
  });
});

function onLocationFound(e) {
  var radius = e.accuracy; //this defines a variable radius as the accuracy value returned by the locate method divided by 2. It is divided by 2 because the accuracy value is the sum of the estimated accuracy of the latitude plus the estimated accuracy of the longitude. The unit is meters.

  // L.marker(e.latlng).addTo(map)  //this adds a marker at the lat and long returned by the locate function.
  //   .bindPopup("You are within " + Math.round(radius * 3.28084) + " feet from this point").openPopup(); //this binds a popup to the marker. The text of the popup is defined here as well. Note that we multiply the radius by 3.28084 to convert the radius from meters to feet and that we use Math.round to round the conversion to the nearest whole number.

  // L.circle(e.latlng, radius).addTo(map); //this adds a circle to the map centered at the lat and long returned by the locate function. Its radius is set to the var radius defined above.
}

map.on("locationfound", onLocationFound); //this is the event listener

function onLocationError(e) {
  alert(e.message);
}

map.on("locationerror", onLocationError);

map.locate({ setView: true, maxZoom: 16 });
