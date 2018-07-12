import { Component, OnInit, Input } from '@angular/core';
import { PropertyAddress } from '../property-address';
import { AssessmentService } from '../assessment.service';
import { Assessment } from '../assessment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit {

  title: string = "Address Search";

  public assessments: Assessment[]
  
  constructor(private assessmentService: AssessmentService) { }

  ngOnInit() {
  }

  submitSearch(suite: number,house: number, street: string):void {
    let address = new PropertyAddress(suite, house, street);
    if (address.hasHouse() && address.hasStreet()) {
      this.assessmentService.getAssessments(address)
        .subscribe((assessments: Assessment[]) => {
          this.assessments = assessments;
          console.log(this.assessments);
        });
    }
  }
}
