import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../core/property.service';
import { PropertyHistory } from '../core/property-history.model';
import { Observable } from 'rxjs';
import { PropertyInfo } from '../core/property-info.model';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  public property$: Observable<PropertyInfo>;
  public histories$: Observable<PropertyHistory[]>;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.property$ = this.propertyService.selectedProperty$;
    this.histories$ = this.propertyService.historicalProperties$;
  }
}
