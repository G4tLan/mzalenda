import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MonthData, Story } from './structures/models';
import { CalendarComponent } from './components/calendar/calendar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoComponent,
    CalendarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zalendar';
  destroyed = new Subject<void>();
  logoWidth = 300;
  logoHeight = 80;
  breakpoint = Breakpoints.XSmall;
  data: Array<MonthData> = Array.from({length: 12}, (v, i) => new MonthData(
    `m-${i}`, new Date(2024, i, 12).toLocaleString('default', {month: 'long'}),
    2024,
    Array.from({length: 2}, (s,gui) => new Story(`m-${i}-${gui}`,
      `https://picsum.photos/seed/random=${i+gui+1}/200/300`,
      "story",
      ["https://www.sample.com/?crown=building", "http://www.pan.sample.edu/shake/tongue?power=exchange#jeans"]
    ))
  ));

  constructor(breakpointObserver: BreakpointObserver) {
    //use cdk portal to load different screen for larger screens
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        this.breakpoint = Object.keys(result.breakpoints).filter(
          (b) => result.breakpoints[b]
        )[0];
        switch (this.breakpoint) {
          case Breakpoints.XSmall:
            return this.xSmallScreen();
          case Breakpoints.Small:
            return this.smallScreen();
          case Breakpoints.Medium:
            return this.mediumScreen();
          case Breakpoints.Large:
            return this.largeScreen();
          default:
            return this.xLargeScreen();
        }
      });
  }

  xSmallScreen() {
    this.logoWidth = 300;
    this.logoHeight = 80;
  }

  smallScreen() {
    this.logoWidth = 560;
    this.logoHeight = 80;
  }

  mediumScreen() {
    this.logoWidth = 900;
    this.logoHeight = 80;
  }

  largeScreen() {
    this.logoWidth = 1200;
    this.logoHeight = 90;
  }

  xLargeScreen() {
    this.logoWidth = 1900;
    this.logoHeight = 100;
  }
}
