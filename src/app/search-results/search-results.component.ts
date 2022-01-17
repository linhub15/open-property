import { Component } from '@angular/core';
import { PropertyService } from '../core/property.service';
import { Observable } from 'rxjs';
import { Property } from '../core/property.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  public properties$: Observable<Property[]>;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.properties$ = this.propertyService.properties$;
  }

  select(property: Property) {
    this.propertyService.select(property);
  }
}
