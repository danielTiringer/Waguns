import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexYAxis,
  ApexLegend
} from "ng-apexcharts";
import { StatService } from 'src/app/services/statservice/stat.service';

export type CarbonOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stats3',
  templateUrl: './stats3.component.html',
  styleUrls: ['./stats3.component.css']
})
export class Stats3Component implements OnInit {
  carbonChartReady: boolean;

  constructor(private stat: StatService) { 
    this.carbonChartReady = false;
  }

  ngOnInit(): void {
    this.getCarbonMetrics();
  }

  @ViewChild("chart") chart: ChartComponent;
  public carbonOptions: Partial<CarbonOptions>;

  getCarbonMetrics() {
    this.stat.getAdminMetrics('footprint').subscribe(res => {
      this.renderCarbonChart(res.months, res.emissions);
    })
  }

  renderCarbonChart(months, emissions){
    this.carbonOptions = {
      series: [
        {
          name: "Carbon Footprint",
          data: emissions
        },
        {
          name: "Expected Carbon Footprint",
          data: [520, 650, 1130, 3297]
        }
      ],
      chart: {
        height: 500,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Expected vs Actual carbon footprint",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: months,
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Carbon Emmissions"
        },
        min: 0,
        max: 10000
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -2,
        offsetX: -35
      }
    };
    this.carbonChartReady = true;
  }
}
