/* Angular-client joka käyttää websocket-serviceä
Websocket-serveriltä tuleva datastream on haettu
Angular-templaattiin kahdella eri tavalla.
*/

import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  realtimedata!: string; // Haetaan tähän stringinä.
  chart!: any;
  chartData: number[];
  realtimedata2!: Observable<string>; // Haetaan tähän observablena.

  constructor(private wsService: WebsocketService) {
    this.chartData = [20];
  }

  ngOnInit() {
    this.chart = new Chart('chartid', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [0, 3, 6, 9, 12, 15, 18, 21, 24],
        datasets: [
          {
            label: 'lämpötila',
            data: this.chartData,
            borderColor: '#3e95cd',
            fill: false,
          },
        ],
      },

      options: {
        plugins: {
          title: {
            display: true,
            text: 'Reaaliaikainen lämpötila',
          },
        },
      },
    });

    this.wsService.createSocketObservable().subscribe((data) => {
      this.realtimedata = data;
      this.updateChart(this.realtimedata);
    });
  }
  // Päivitetään tiedot diagrammiin
  // Lisätään loppuun aina kolme sekuntia alapalkkiin.
  updateChart(realtimedata: String) {
    let length = this.chart.data.labels.length;
    this.chart.data.labels.push(Number(this.chart.data.labels[length - 1] + 3));
    this.chartData.push(Number(realtimedata));
    this.chart.update();
  }
}
