import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Nominee, Story } from '../../structures/models';


@Component({
  selector: 'app-nominees',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './nominees.component.html',
  styleUrl: './nominees.component.scss'
})
export class NomineesComponent {
  readonly nominees = signal<Array<Nominee>>(Array.from({length: 4}, (v, i) => new Nominee(
    `n-${i}`,
     [{ id: `lm-${i}`, link: "https://x.com/swiper_x_swipe/status/1831374931420180651", social_media: "twitter/x"}],
     new Story(
      `s-${i}`, 
      `https://picsum.photos/seed/random=${i+1}/300/300`,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    (() => {
      const a = Math.floor(Math.random() * 4);
      const b = Math.floor(Math.random() * 5) ?? 1;

      return ["https://www.sample.com/?crown=building", "http://www.pan.sample.edu/shake/tongue?power=exchange#jeans", "#MZalenda", "Musi Khawume", "#Hulio Ima"].slice(a,b)
    })() )
  )));
}
