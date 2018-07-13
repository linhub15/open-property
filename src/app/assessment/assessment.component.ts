import { Component, OnInit, Input } from '@angular/core';
import { PropertyAddress } from '../property-address';
import { AssessmentService } from '../assessment.service';
import { Assessment } from '../assessment';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  public assessments: Assessment[];
  constructor(private assessmentService: AssessmentService) { }

  @Input() suite: number;
  @Input() house: number;
  @Input() street: string;
  @Input() assessmentValue: number;


  
  ngOnInit() { }
}
