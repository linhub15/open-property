import { Component } from '@angular/core';
import { PropertyService } from '../core/property.service';
import { Observable } from 'rxjs';
import { SearchService } from '../core/search.service';
import { PropertyInfo } from '../core/property-info.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  public properties$: Observable<PropertyInfo[]>;

  constructor(
    private searchService: SearchService,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.properties$ = this.searchService.searchResults$;
  }

  select(property: PropertyInfo) {
    this.propertyService.select(property);
    this.searchService.clear();
  }
}
