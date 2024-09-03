import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
export class AppComponent {
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
      active: true,
    },
    {
      label: 'Nominees',
      icon: 'ballot',
      link: '/nominees',
      active: false,
    },
  ]);

  onMenuItem(icon: string) {
    this.menuItems.update((menus) =>
      menus.map((m) => {
        m.active = m.icon === icon;
        return m;
      })
    );
  }
}
