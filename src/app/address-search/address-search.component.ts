import { Component, OnInit, Input } from '@angular/core';
import { PropertyAddress } from '../property-address';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit {
  title: string = "Address Search";
  
  constructor() { }

  ngOnInit() {
  }

  submitSearch(suite: number,house: number, street: string):void {
    let address = new PropertyAddress(suite, house, street);
  }
}
