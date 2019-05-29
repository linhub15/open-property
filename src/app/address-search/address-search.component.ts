import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../core/assessment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit {
<<<<<<< HEAD

  public properties$: Observable<Property[]>;
=======
  public searchValue$: Observable<string>;
>>>>>>> a0ecf7c... single-view implemented

  constructor(private assessmentService: AssessmentService) { }

  ngOnInit() {
    this.searchValue$ = this.assessmentService.searchValue$;
  }

  search(searchValue: string) {
    this.assessmentService.update(searchValue);
  }

  clear() {
    this.assessmentService.clear();
  }
}
