import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zalendar';
  destroyed = new Subject<void>();
  logoWidth = 300;
  logoHeight = 80;

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
        const breakpoint = Object.keys(result.breakpoints).filter(
          (b) => result.breakpoints[b]
        )[0];
        this.title = breakpoint;
        switch (breakpoint) {
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
