import { Component, inject, signal } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nominate-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './nominate-form.component.html',
  styleUrl: './nominate-form.component.scss'
})
export class NominateFormComponent {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly _hashtags = signal<string[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  
    if (value) {
      this._hashtags.update(hashtags => {
        const index = hashtags.indexOf(value);
        if (index > -1) {
          return hashtags;
        }
        return [...hashtags, value]
      });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(hashtag: string): void {
    this._hashtags.update(hashtags => {
      const index = hashtags.indexOf(hashtag);
      if (index < 0) {
        return hashtags;
      }

      hashtags.splice(index, 1);
      this.announcer.announce(`Removed ${hashtag}`);
      return [...hashtags];
    });
  }

  edit(hashtag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(hashtag);
      return;
    }

    // Edit existing fruit
    this._hashtags.update(hashtags => {
      const index = hashtags.indexOf(hashtag);
      if (index >= 0) {
        hashtags[index] = value;
        return [...hashtags];
      }
      return hashtags;
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
       
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
