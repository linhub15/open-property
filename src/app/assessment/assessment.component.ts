import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor() { }

  @Input() suite: number;
  @Input() house: number;
  @Input() street: string;
  
  ngOnInit() {
  }

}
