import { Component, Input } from '@angular/core';
import { MonthData } from '../../structures/models';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
  host: {
    "style": "display: block; width: 100%; height: 100%",
  }
})
export class MonthComponent {
  @Input() data!: MonthData;
  @Input() active: boolean = true;
  @Input() editable: boolean = false;
}
