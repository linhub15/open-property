import { Component } from '@angular/core';
import { Property } from '../core/property.model';
import { AssessmentService } from '../core/assessment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  public properties$: Observable<Property[]>;

  constructor(private assessmentService: AssessmentService) {}

  ngOnInit() {
    this.properties$ = this.assessmentService.properties$;
  }

  select(property: Property) {
    this.assessmentService.select(property);
  }
}
