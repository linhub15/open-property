import { Component, Input } from '@angular/core';
import { Property } from '../core/property.model';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent {

  @Input() properties: Property[];

  constructor() { }
}
