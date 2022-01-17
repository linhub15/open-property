import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../core/property.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit {
  public searchValue$: Observable<string>;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.searchValue$ = this.propertyService.searchValue$;
  }

  search(searchValue: string) {
    this.propertyService.search(searchValue);
  }

  clear() {
    this.propertyService.clear();
  }
}
