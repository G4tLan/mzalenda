import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { MonthData, Story } from '../../structures/models';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Overlay } from '@angular/cdk/overlay';

export interface DialogData {
  stories: Array<Story>;
  name: string,
  id: string,
  year: string
}

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
  host: {
    "month": "main"
  }
})
export class MonthComponent implements OnInit {
  @Input() data!: MonthData;
  @Input() active: boolean = true;
  @Input() editable: boolean = false;

  _imagePosMap: { [index: number]: string } = {};

  readonly dialog = inject(MatDialog);
  readonly scroll = inject(Overlay);

  constructor() {}
  ngOnInit(): void {
    this.imagPos();
  }

  imagPos() {
    const n = 4;
    const numImg = this.data?.stories?.length ?? 0;
    let index = 0;
    const imagePosMap = this._imagePosMap;

    function part(rowStart: number,rowEnd: number, colStart: number, colEnd: number,numImages: number, partRow = true) {
      let rowSpan, colSpan;
      rowSpan = rowEnd + 1 - rowStart;
      colSpan = colEnd + 1 - colStart;
      if (numImages < 2) {
        imagePosMap[index++] = `${rowStart}/${colStart}/ span ${rowSpan}/ span ${colSpan}`;
        return;
      }

      //row first partition
      let halfImg = Math.floor(numImages / 2);
      if (partRow) {
        let newRowEnd = rowStart - 1 + rowSpan / 2;
        part(rowStart, newRowEnd, colStart, colEnd, numImages - halfImg, false);
        part(newRowEnd + 1, rowEnd, colStart, colEnd, halfImg, false);
      } else {
        let colRowEnd = colStart - 1 + colSpan / 2;
        part(rowStart, rowEnd, colStart, colRowEnd, numImages - halfImg);
        part(rowStart, rowEnd, colRowEnd + 1, colEnd, halfImg);
      }
    }

    if (numImg > 0) {
      part(1, n, 1, n, numImg);
      this._imagePosMap = imagePosMap;
    }
  }

  openDialog(hasStories: boolean, data: MonthData) {
    if (!hasStories) return;
    const dialogRef = this.dialog.open(MonthStoriesDialog, {
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '150ms',
      minWidth: '300px',
      width: '80%',
      maxWidth: '900px',
      panelClass: "month-stories-dialog",
      scrollStrategy: this.scroll.scrollStrategies.noop(),
      data: {
        stories: data.stories,
        name: data.name,
        id: data.id,
        year: data.year
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'month-stories-dialog',
  templateUrl: 'month-stories-dialog.html',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthStoriesDialog {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
