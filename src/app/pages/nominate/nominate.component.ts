import { Component } from '@angular/core';
import { NominateFormComponent } from '../../components/nominate-form/nominate-form.component';

@Component({
  selector: 'app-nominate',
  standalone: true,
  imports: [
    NominateFormComponent
  ],
  templateUrl: './nominate.component.html',
  styleUrl: './nominate.component.scss'
})
export class NominateComponent {

}
