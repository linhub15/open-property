import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../core/property.service';
import { Property } from '../core/property.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  public account: number;
  public property$: Observable<Property>;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  async ngOnInit() {
    this.property$ = this.propertyService.selectedProperty$;
    this.route.queryParams.subscribe(params => {
      this.account = params['a'];
    });
  }
}
