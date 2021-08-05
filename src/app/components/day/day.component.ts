import { Component, OnInit, Input } from '@angular/core';
import { dailyForecast } from 'src/app/interfaces/dailyForecast';
import {temperature, maximum, minimum} from '../../interfaces/helpinterfaces'


@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  constructor() { }
  
  max:maximum={Value:0, Unit:'c',UnitType:12}
  min:minimum={Value:0, Unit:'c',UnitType:12}
  temp:temperature={Maximum:this.max, Minimum:this.min}
  @Input()
  day: dailyForecast={name:'', temperature:this.temp};
  
  ngOnInit(): void {
  }

}
