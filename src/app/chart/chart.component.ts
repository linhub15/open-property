import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { map } from 'rxjs/operators';
import { PropertyHistory } from '../core/property-history.model';
import { PropertyService } from '../core/property.service';

const labels = [
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021'
];

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  data: ChartData;
  type: ChartType = 'line';
  options: ChartOptions = {
    layout: { autoPadding: true },
    plugins: {
      title: { text: 'Assessment Data', display: true },
      legend: { display: false }
    }
  };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.propertyHistories$
      .pipe(
        map(histories => {
          if (!histories) return;

          const data = histories.map(history =>
            this.propertyHistoryToPoint(history)
          );

          return {
            datasets: [
              {
                weight: 100,
                label: 'assessment',
                data: data,
                clip: 20,
                pointRadius: 5,
                cubicInterpolationMode: 'monotone'
              } as ChartDataset
            ]
          };
        })
      )
      .subscribe(chartData => (this.data = chartData));
  }

  private propertyHistoryToPoint(history: PropertyHistory) {
    return {
      x: history.assessment_year,
      y: history.assessed_value
    };
  }
}
