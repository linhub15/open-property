import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() location: google.maps.LatLng;

  zoom = 17;

  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    draggable: false
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
}
