import { Component, inject, signal, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

export function ArrayValidator(control: AbstractControl<string[]>): ValidationErrors|null {
  if(!control.value || control.value.length == 0) {
    control.markAsDirty();
    return { noLinks: true };
  }

  return null;
}

export function ImageValidator(control: AbstractControl<File>): ValidationErrors|null {
  if(!control.value) {
    return { required: true };
  }

  if(control.value.size > 1000000) {
    return { sizeExceeded: true };
  }

  return null;
}


export interface HashTag {
  value: string
}

@Component({
  selector: 'app-nominate-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './nominate-form.component.html',
  styleUrl: './nominate-form.component.scss'
})
export class NominateFormComponent {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);

  @ViewChild("chooseImage") chooseImage!: MatButton;

  _nominationForm = new FormGroup({
    image: new FormControl<File | null>(null, [ImageValidator]),
    description: new FormControl('', [Validators.required]),
    hashtags: new FormControl<string[]>([], [Validators.required,ArrayValidator])
  })


  get _hashtags() {
    return this._nominationForm.controls.hashtags;
  }
  
  get _description() {
    return this._nominationForm.controls.description;
  }
  
  get _image() {
    return this._nominationForm.controls.image;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    
    if (value) {
      // Clear the input value
      event.chipInput!.clear();
      if(this._hashtags.value && this._hashtags.value.indexOf(value) > -1) {
        return;
      }
      let newArray = this._hashtags.value ? [...this._hashtags.value, value]: [value];
      this._hashtags.patchValue(newArray);
    }
  }

  remove(hashtag: string): void {
    if(this._hashtags.value) {
      let index = this._hashtags.value.indexOf(hashtag);

      if(index < 0) {
        return;
      }
      this._hashtags.value.splice(index, 1);
      this._hashtags.patchValue(this._hashtags.value);
      this.announcer.announce(`Removed ${hashtag}`);
    }
  }

  edit(hashtag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(hashtag);
      return;
    }
    if(this._hashtags.value) {
      let index = this._hashtags.value.indexOf(hashtag);
      // Edit existing fruit
        if (index >= 0) {
          this._hashtags.value[index] = value;
          this._hashtags.patchValue(this._hashtags.value);
        }
    }
  }

  onFileSelected(evt: any) {
    var files: FileList = evt.target?.files; // FileList object
      if(!files || files.length == 0) {
        this._image.patchValue(null);
        return;
      }
      // Only process image files.
      if (!files[0].type.match('image.*')) {
        this._image.patchValue(null);
        return;
      }


      var reader = new FileReader();
      let comp = this;
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        comp._image.patchValue(theFile);
        return function(e: any) {
          comp.chooseImage._elementRef.nativeElement.style.backgroundImage =  `url('${e.target?.result}')`;
        };
      })(files[0]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[0]);
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onFormSubmit(evt: any) {
    debugger
  }
}
