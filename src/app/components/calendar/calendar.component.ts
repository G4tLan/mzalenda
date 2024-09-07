import { ChangeDetectionStrategy, Component, computed, input, Input, OnInit, signal } from '@angular/core';
import {
  Animation,
  CarouselComponent,
  CarouselSlideDirective,
} from '../carousel/carousel.component';
import { Breakpoints } from '@angular/cdk/layout';
import { MonthData } from '../../structures/models';
import { CalendarType } from '../../structures/enums';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MonthComponent } from '../month/month.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselSlideDirective,
    MonthComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  @Input() data!: Array<MonthData>;
  @Input() fromYear: number = 1997;
  @Input() toYear: number = (new Date()).getUTCFullYear();
  screenSize = input<string>(Breakpoints.Small);

  
  _selectedYear = signal(2024);
  _CalendarTypeOptions = [{value: CalendarType.Mampara, label: CalendarType[CalendarType.Mampara]}, {value: CalendarType.Nswempu, label: CalendarType[CalendarType.Nswempu]}];
  _currentCalendar = signal(this._CalendarTypeOptions[1]);
  _carouselHeight = computed(() => {
    switch (this.screenSize()) {
      case Breakpoints.Small:
      case Breakpoints.XSmall:
        return "calc(100vh - 500px)";
      default:
        return "calc(100vh - 300px)";
    }
  })
  _carouselMinHeight = computed(() => {
    switch (this.screenSize()) {
      case Breakpoints.Small:
      case Breakpoints.XSmall:
        return "200px";
      case Breakpoints.Medium:
        return "400px";
      default:
        return "600px";
    }
  })
  _slides = computed(() => {

    //data might need to be a signal as well.
    const filtered = this.data.filter(d => d.year === this._selectedYear());
    const newSlides = [];

    switch (this.screenSize()) {
      case Breakpoints.XSmall:
        return filtered;
      case Breakpoints.Small:
        for (let index = 0; index < filtered.length; index += 2) {
          newSlides.push({ id: index, month1: filtered[index], month2: filtered[index+1]});
        }
        return newSlides;
      case Breakpoints.Medium:
        for (let index = 0; index < filtered.length; index += 4) {
          newSlides.push({ 
            id: index, 
            month1: filtered[index], 
            month2: filtered[index+1], 
            month3: filtered[index+2], 
            month4: filtered[index+3]
          });
        }
        return newSlides;
      default:
        const slides: { [key: string]: any} = { id: 0};
        for (let index = 0; index < filtered.length; index += 1) {
            slides[`month${index+1}`] = filtered[index];
        }
        return [slides];
    }
  });
  _animationType = Animation.Slide;
  _breakpoints = Breakpoints;
  _years = Array.from({ length: this.toYear - this.fromYear + 1 }, (v, k) => this.fromYear + k);
  _months = (l: number) => Array.from({length: l}, (v, k) => k+1);

  ngOnInit(): void {
  }
}
