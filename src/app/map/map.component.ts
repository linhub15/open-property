import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: google.maps.LatLng;

  options: google.maps.MapOptions;
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor() {}

  ngOnInit() {
    this.options = {
      center: this.location,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    // this.setMarker(this.location);
  }

  private setMarker(location: google.maps.LatLng) {
    new google.maps.Marker({
      position: location
      // map: this.map
    });
  }
}
