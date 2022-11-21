import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApexOptions } from 'apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
  ChartComponent
} from "ng-apexcharts";
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoI } from 'src/app/core/models/ingreso-egreso.interface';
import { AppState } from 'src/app/core/store/app.reducer';
import { SteteLazyIngreso } from 'src/app/core/store/ingreso-egreso/ingreso-egreso.reducer';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: any[];
  
};


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: [
  ]
})
export class StatsComponent implements OnInit, OnDestroy {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> ;
  ingresos= 0
  egresos = 0
  ingresoValor = 0 
  egresoValor = 0
  percentEgreso = 0
  percentIngreso = 0
  ingresoSubscription!:Subscription

  constructor(private store:Store<SteteLazyIngreso>) {
   
  }
  
  porcentajeIE(){
    let total = this.ingresoValor + this.egresoValor
    this.percentEgreso = Math.round(this.egresoValor*100/total)
    this.percentIngreso = Math.round(this.ingresoValor*100/total)
  }

  ngOnInit(): void {
    this.ingresoSubscription = this.store.select('ingresoegreso').pipe(
      filter(list=>list?.items.length!=0)
    )
    .subscribe(res=>{
      this.makeStats(res.items)
      this.makeChart()
      this.porcentajeIE()
    })
    
  }
  
  ngOnDestroy(): void {
    this.ingresoSubscription?.unsubscribe()
  }

  makeChart(){
    this.chartOptions = {
      series: [this.ingresos, this.egresos],
      chart: {
        width: 450,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
        
      },
      
      colors:['#00ce68','#e65251'],
      labels: [`Cantidad de Ingresos`, `Cantidad de Egresos`],
      fill: {
        type: "gradient"
      },
      legend: {
        show: true,
        position: 'bottom',
        fontWeight: 'bold',
        itemMargin:{
          horizontal: 20
        },
        formatter: function(val, opts) {
          return val + ": " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  makeStats(items:IngresoEgresoI[]){
  this.ingresos= 0
  this.egresos = 0
  this.ingresoValor = 0 
  this.egresoValor = 0
   for (let item of items) {
  
      if(item.type === 'ingreso'){
        this.ingresoValor+=item.monto;
        
        this.ingresos++;
      }else{
        this.egresoValor+=item.monto
          this.egresos++;
      }
      
   }
   
  }

}
