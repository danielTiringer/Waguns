import { StatService } from "./../../services/statservice/stat.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-earn",
  templateUrl: "./earn.component.html",
  styleUrls: ["./earn.component.css"]
})
export class EarnComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  private _chartOptions: Partial<ChartOptions>;
  private _keys = [];
  private _values = [];

  constructor(private statService: StatService) {
    this.statService.getAdminMetrics("earning").subscribe(data => {
      this._values = Object.values(data);
      this._keys = Object.keys(data);
      this._chartOptions = {
        series: [
          {
            name: "Rental",
            data: this.values
          }
        ],
        chart: {
          height: 500,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Income",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.keys
        }
      };
    });
  }

  ngOnInit(): void {}

  public get chartOptions() {
    return this._chartOptions;
  }

  public get keys() {
    return this._keys;
  }

  public get values() {
    return this._values;
  }
}
