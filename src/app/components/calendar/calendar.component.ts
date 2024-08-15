import { Component, Input, OnInit } from '@angular/core';
import {
  Animation,
  CarouselComponent,
  CarouselSlideDirective,
} from '../carousel/carousel.component';
import { Breakpoints } from '@angular/cdk/layout';
import { MonthData } from '../../interfaces/models';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselSlideDirective,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  @Input() data!: Array<MonthData>;
  @Input() screenSize: string = Breakpoints.XSmall;

  slides: any = [];
  animationType = Animation.Slide;

  ngOnInit(): void {
    if(this.data) {
      this.slides = this.data.filter(d => d.year === 2024);
    }
  }

}
