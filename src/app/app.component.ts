import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MonthData, Story } from './structures/models';
import { CalendarComponent } from './components/calendar/calendar.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoComponent,
    MatToolbarModule,
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
    Array.from({length: Math.floor(Math.random() * 17)}, (s,gui) => new Story(`m-${i}-${gui}`,
      `https://picsum.photos/seed/random=${i+gui+1}/300/300`,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      (() => {
        const a = Math.floor(Math.random() * 4);
        const b = Math.floor(Math.random() * 5) ?? 1;

        return ["https://www.sample.com/?crown=building", "http://www.pan.sample.edu/shake/tongue?power=exchange#jeans", "#MZalenda", "Musi Khawume", "#Hulio Ima"].slice(a,b)
      })()
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
    this.logoHeight = 70;
  }

  smallScreen() {
    // this.logoWidth = 560;
    // this.logoHeight = 80;
  }

  mediumScreen() {
    // this.logoWidth = 900;
    // this.logoHeight = 80;
  }

  largeScreen() {
    // this.logoWidth = 1200;
    // this.logoHeight = 90;
  }

  xLargeScreen() {
    // this.logoWidth = 1900;
    // this.logoHeight = 100;
  }
}
