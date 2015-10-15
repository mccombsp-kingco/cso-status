var map, layerControl, rsidebar, lsidebar, drawControl, drawnItems = null;
//var autocompdata = [];


$(document).ready(function() {

    L.mapbox.accessToken = 'pk.eyJ1IjoibWFwaXRwayIsImEiOiIxMk5pN0drIn0.RoUFzCiXmh0xYCwmuXYCRw';

    var map = L.map('map', {maxZoom: 22}).setView([47.619124, -122.3272], 12);

    // var redsquare = new L.Icon({
    //   iconUrl: 'symbols/square_red_16.png'
    // });

    var featureLayer = L.mapbox.featureLayer()
        .loadURL('/data_display/cso_test_file.geojson')
        .addTo(map);


    featureLayer.on('layeradd', function(e) {
    // featureLayer.getBounds() returns the corners of the furthest-out markers,
    // and map.fitBounds() makes sure that the map contains these.
       var marker = e.layer,
           feature = marker.feature;


      var popupContent ='Overflow Status: ' + feature.properties.description + '<br \/>' +
        feature.properties.Name + '<br \/>' + 
        //'CSO Status: ' + feature.properties.CSO_Status + '<br \/>' +
        'Outfall #: ' + feature.properties.DSN + '<br \/>' +
        'Location(Long/Lat): ' + feature.properties.Location + '<br \/>'+
         'Time: ' + feature.properties.Time_stamp + '<br \/>';

//      marker.setIcon(redsquare);
      //marker.setIcon(L.icon(feature.properties.icon));
      marker.bindPopup(popupContent);
    });

    var southWest = L.latLng(48.039701, -122.409571),
    northEast = L.latLng(48.040085, -122.405913),
    bounds = L.latLngBounds(southWest, northEast);

    //var tileLayer = L.tileLayer('/gisdata/tiles/langley-2nd-street-2014/{z}/{x}/{y}.png', {foo: 'bar', tms: true, minZoom:1, maxZoom:22, bounds:bounds}).addTo(map);

    layerControl = L.control.layers({
        'Base Map': L.mapbox.tileLayer('mapbox.streets').addTo(map),
        'Grey Map': L.mapbox.tileLayer('mapbox.light'),
        //'Satellite Map': L.mapbox.tileLayer('mapbox.satellite'),
        //'Pencil Map': L.mapbox.tileLayer('mapbox.pencil')
    },{
       // "Quadcopter Stitch": tileLayer,
       // "CSO Status": featureLayer
    },{'collapsed': false});

    layerControl.addTo(map);


});
