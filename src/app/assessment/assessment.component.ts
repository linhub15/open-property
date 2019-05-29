import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../core/assessment.service';
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
    private assessmentService: AssessmentService
  ) {}

  ngOnInit() {
    this.property$ = this.assessmentService.selectedProperty$;
    this.route.queryParams.subscribe(params => {
      this.account = params['a'];
    });
  }
}
