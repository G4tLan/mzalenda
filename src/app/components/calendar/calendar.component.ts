import { Component, Input, OnInit } from '@angular/core';
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  @Input() data!: Array<MonthData>;
  @Input() screenSize: string = Breakpoints.XSmall;
  @Input() fromYear: number = 1997;
  @Input() toYear: number = (new Date()).getUTCFullYear();

  _slides: any = [];
  _animationType = Animation.Slide;
  CalendarType = CalendarType;
  _currentCalendar = CalendarType.Nswempu;
  _selectedYear = 2024;
  _years = Array.from({ length: this.toYear - this.fromYear + 1 }, (v, k) => this.fromYear + k);

  ngOnInit(): void {
    if(this.data) {
      this._slides = this.data
        .filter(d => d.year === 2024);
    }
  }

  onSwitchCalendar() {
    this._currentCalendar = (this._currentCalendar + 1)%2;
  }

  onSelectYear(event: MatSelectChange) {
    this._slides = this.data.filter(d => d.year === event.value);
  }
}
