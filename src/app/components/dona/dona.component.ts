import { Component, Input } from '@angular/core';

import { ChartData, Color, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title: string = 'Sin título';

  @Input('labels') public doughnutChartLabels: string[] = [
    'Label 1',
    'Label 2',
    'Label 3'
  ];

  @Input('data') public data: any = [350, 455, 100]

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.data,
        backgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBorderColor:['#000000','#000000','#00000003']
      }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  ngOnChanges() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#00821C','#09DB36','#024D0F'],
          hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
          hoverBorderColor:['#000000','#000000','#00000003']
        }
      ]
    }
  }

}
