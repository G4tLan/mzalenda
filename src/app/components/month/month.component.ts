import { Component, Input, OnInit } from '@angular/core';
import { MonthData } from '../../structures/models';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
  host: {
    "style": "display: block; width: 100%; height: 100%; max-width: 300px",
  }
})
export class MonthComponent implements OnInit {
  @Input() data!: MonthData;
  @Input() active: boolean = true;
  @Input() editable: boolean = false;

  _imagePosMap: { [index: number]: string } = {};

  constructor() {
  }
  ngOnInit(): void {
    
    this.imagPos()
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
      if(numImages < 2) {
        imagePosMap[index++] = `${rowStart}/${colStart}/ span ${rowSpan}/ span ${colSpan}`;
        return;
      }

      //row first partition
      let halfImg = Math.floor(numImages/2);
      if(partRow) {
        let newRowEnd = rowStart - 1 + rowSpan/2;
        part(rowStart, newRowEnd,colStart, colEnd, numImages - halfImg, false);
        part(newRowEnd+1,rowEnd,colStart, colEnd, halfImg, false);
      } else {
        let colRowEnd = colStart - 1 + colSpan/2;
        part(rowStart, rowEnd, colStart, colRowEnd, numImages - halfImg,);
        part(rowStart, rowEnd, colRowEnd+1, colEnd, halfImg);
      }
    }

    if(numImg > 0) {
      part(1,n,1,n, numImg);
      this._imagePosMap = imagePosMap;
    }
  }
}
