import { Component, OnInit, Input } from '@angular/core';
import { AssessmentService } from '../assessment.service';
import { Assessment } from '../assessment';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  @Input() suite: number;
  @Input() house: number;
  @Input() street: string;
  @Input() assessmentValue: number;

  public assessments: Assessment[];

  constructor(private assessmentService: AssessmentService) { }

  ngOnInit() {
  }
}
