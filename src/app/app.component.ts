import { Component, Inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink, RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    LogoComponent,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  title = 'zalendar';
  logoWidth = 300;
  logoHeight = 70;
  menuItems = signal([
    {
      label: 'Nominate',
      icon: 'person_add',
      link: '/nominate',
      active: false,
    },
    {
      label: 'calendar',
      icon: 'calendar_month',
      link: '/calendar',
      active: false,
    },
    {
      label: 'Nominees',
      icon: 'ballot',
      link: '/nominees',
      active: false,
    },
  ]);

  constructor(private router: Location ) {

    this.onMenuItem(this.menuItems().find(m => m.link === this.router.path())?.icon || "calendar_month");
  }

  ngOnInit(): void {}

  onMenuItem(icon: string) {
    this.menuItems.update((menus) =>
      menus.map((m) => {
        m.active = m.icon === icon;
        return m;
      })
    );
  }
}
