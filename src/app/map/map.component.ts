import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from '../core/property.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: google.maps.LatLng;

  zoom = 17;
  center: google.maps.LatLng;

  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    draggable: false
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.selectedProperty$.subscribe(
      property => (this.center = property.latLng)
    );
  }
}
