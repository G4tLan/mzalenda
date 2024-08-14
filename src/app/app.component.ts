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
import {
  CarouselComponent,
  Animation,
  CarouselSlideDirective,
} from './components/carousel/carousel.component';

enum CalendarType {
  Nswempu,
  Mampara,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CarouselComponent,
    CarouselSlideDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zalendar';
  destroyed = new Subject<void>();
  logoWidth = 300;
  logoHeight = 80;
  CalendarType = CalendarType;
  currentCalendar = CalendarType.Nswempu;
  selectedYear = 2024;
  years = Array.from({ length: 5 }, (v, k) => 2024 + k);
  animationType = Animation.Slide;
  slides = Array.from({length: 5}, (v, i) => ({
    url: `https://picsum.photos/seed/random=${i+1}/200/300`, 
    id: i
  }));

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

  switchCalendar() {
    this.currentCalendar = (this.currentCalendar + 1)%2;
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
