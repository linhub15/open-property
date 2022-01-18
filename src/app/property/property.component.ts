import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../core/property.service';
import { PropertyHistory } from '../core/property-history.model';
import { Observable } from 'rxjs';
import { PropertyInfo } from '../core/property-info.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  public property$: Observable<PropertyInfo>;
  public histories$: Observable<PropertyHistory[]>;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.property$ = this.propertyService.selectedProperty$;
    this.histories$ = this.propertyService.propertyHistories$;
  }
}
