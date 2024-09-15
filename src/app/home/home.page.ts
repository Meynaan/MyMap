import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  constructor() {}
  //Variabel
  latitude: number | undefined;
  longitude: number | undefined;

  public async ngOnInit() {
    // this.longitude = 110.3670505289091;
    // this.latitude = -7.782996327423349;

    // Cari lokasi pengguna
    const coordinates = await Geolocation.getCurrentPosition();
    this.longitude = coordinates.coords.longitude;
    this.latitude = coordinates.coords.latitude;

    //instance Peta
    const map = new Map({
      basemap: "topo-vector"
    });

    //Tampilan peta
    const view = new MapView({
      container: "container",
      map: map,
      zoom: 17,
      center: [this.longitude, this.latitude]
    });

    //Simbol Marker
    const markerSymbol = new SimpleMarkerSymbol({
      color: [165, 42, 42], // Coklat
      outline: {
        color: [255, 248, 220], // Cornsilk
        width: 1
      }
    });

    //Marker
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    //Grafik marker
    const markerGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });
    //tambahkan grafik ke peta
    view.graphics.add(markerGraphic);


  }

}
