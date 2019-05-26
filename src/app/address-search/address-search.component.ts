import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../core/assessment.service';
import { Observable } from 'rxjs';
import { Property } from '../core/property.model';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit {

  public properties$: Observable<Property[]>;

  constructor(private assessmentService: AssessmentService) { }

  ngOnInit() { }

  search(searchValue: string) {
    searchValue = searchValue.toUpperCase();
    this.properties$ = this.assessmentService.fetchProperties(searchValue);
  }
}
