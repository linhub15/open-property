import { Component, OnInit, Input } from '@angular/core';
import { AssessmentService } from '../assessment.service';
import { Assessment } from '../assessment';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  @Input() found: boolean;
  @Input() assessment: Assessment;

  constructor(private assessmentService: AssessmentService) { }

  ngOnInit() {
  }
}
