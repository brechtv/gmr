var markers = [];

// reset functions
function reset_map() {
  map.data.revertStyle();
  map.data.setStyle({
    fillColor: 'lightgrey',
    strokeColor: '#656565',
    strokeWeight: 2,
    fillOpacity: 0.8
  });
  remove_all_markers();
  console.log("DEBUG:: reset_map");
}

function remove_all_markers() {
  for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
  markers = [];
}

///

// for all region clicks
function add_arr_click_listeners() {
    var i = 0;
    map.data.addListener('click', function(event) {
      area_clicked(event);
      i++;
    });

    console.log(i);
}

// main

function area_clicked(event) {
  reset_map();

  // get the id of the arr
  var arr_id = event.feature.f.cartodb_id;
  // get geometry for area
  create_marker(event.feature);
  // color it
  map.data.overrideStyle(event.feature, {fillColor: 'red', strokeWeight: 2, strokeColor: '#757575'});

  // get neighbours for selected area from json
  var arr = ARRONDISSEMENTS.filter(function(el) {
                    return el.cartodbid === arr_id;
                });
  // assign it to var neighbours
  neighbours = arr[0].neighbours


  map.data.forEach(function(feature){
    var id = feature.f.cartodb_id
    if (neighbours.includes(id)) {
      map.data.overrideStyle(feature, {fillColor: 'green', strokeWeight: 2, strokeColor: '#757575'});
      add_marker_by_id(id);
    }
  });
}

// markers
function add_marker_by_id(id) {
  map.data.forEach(function(feature){
      if (feature.f.cartodb_id == id) {
        create_marker(feature);
      }
  });
}

function create_marker(feature) {
  var geometry = [];
  // add it to the geometry array
  feature.getGeometry().forEachLatLng(function (latlng) {
    geometry.push(latlng);
  });
  // create a bounds so we can take the center
  var bounds = new google.maps.LatLngBounds();
  // add geometry to bounds
  for (i = 0; i < geometry.length; i++) {
    bounds.extend(geometry[i]);
  }
  // create marker in center of area
  var marker = new google.maps.Marker({
          position: bounds.getCenter(),
          map: map,
          title: 'Hello World!',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#FFB74D',
            fillOpacity: 1,
            strokeColor: '#FFB74D',
            strokeWeight: 8
          },
          label: feature.f.cartodb_id.toString()

        });
  markers.push(marker);
}
