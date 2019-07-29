import { Component, OnInit, ViewChild, Input } from '@angular/core';

import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: google.maps.LatLng;
  @ViewChild('map') mapElement: any;

  map: google.maps.Map;

  constructor() {}

  ngOnInit() {
    const mapProp: google.maps.MapOptions = {
      center: this.location,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
    this.setMarker(this.location);
  }

  private setMarker(location: google.maps.LatLng) {
    new google.maps.Marker({
      position: location,
      map: this.map
    });
  }
}
