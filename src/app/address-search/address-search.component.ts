import { Component, OnInit } from '@angular/core';

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

}
