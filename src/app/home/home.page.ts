import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
// import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapView: MapView | any;
  userLocationGraphic: Graphic | any;
  latitude: number | undefined;
  longitude: number | undefined;
  selectedBasemap!: string;

  constructor() { }

  async ngOnInit() {
    // Lokasi awal (misalnya: koordinat suatu kota)
    this.longitude = -94.87588125760244;
    this.latitude = 38.40988967351812;
    const map = new Map({
      basemap: "topo-vector"
    });

    // Menampilkan peta pada lokasi awal yang telah ditentukan
    this.mapView = new MapView({
      container: "container",
      map: map,
      zoom: 7,
      center: [this.longitude, this.latitude] // Lokasi default
    });

    // Menambahkan layer citra cuaca
    const weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    map.add(weatherServiceFL);

    // Tambahkan marker ke lokasi yang diinginkan
    this.addMarker(this.longitude, this.latitude);
  }

  // Fungsi untuk mengubah basemap
  async changeBasemap() {
    this.mapView.map.basemap = this.selectedBasemap;
  }

  // Fungsi untuk menambahkan marker pada peta
  addMarker(longitude: number, latitude: number) {
    const point = new Point({
      longitude: longitude,
      latitude: latitude
    });

    const markerSymbol = new SimpleMarkerSymbol({
      color: [165, 42, 42], // Coklat
      outline: {
        color: [255, 248, 220], // Cornsilk
        width: 3
      }
    });

    const markerGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    // Menambahkan marker ke MapView
    this.mapView.graphics.add(markerGraphic);
  }

}

const WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';
