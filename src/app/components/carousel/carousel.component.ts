import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export enum Direction {
  Next,
  Prev,
}

export enum Animation {
  Fade = 'fade',
  Slide = 'slide',
}

export interface ActiveSlides {
  previous: number;
  current: number;
  next: number;
}

@Directive({
  selector: '[carouselSlide]',
  standalone: true,
})
export class CarouselSlideDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() data: Array<any> = [];
  @Input() isNavigationVisible = true;
  @Input() animation: Animation = Animation.Fade;
  @Input() width!: number;
  @Input() height!: number;
  @ContentChild(CarouselSlideDirective) _carouselSlide!: CarouselSlideDirective;

  differ!: KeyValueDiffer<ActiveSlides, any>;

  private _direction: Direction = Direction.Next;
  get direction() {
    return this._direction;
  }
  set direction(direction: Direction) {
    this._direction = direction;
  }

  private _activeSlides!: ActiveSlides;
  get activeSlides() {
    return this._activeSlides;
  }
  set activeSlides(activeSlides: ActiveSlides) {
    this._activeSlides = activeSlides;
  }

  constructor(
    private cd: ChangeDetectorRef,
    private differs: KeyValueDiffers
  ) {}

  ngOnInit(): void {
    if (this.data.length > 0) {
      this.activeSlides = this.getPreviousCurrentNextIndexes(0);
      this.differ = this.differs.find(this.activeSlides).create();
    }
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }

  select(event: Event, index: number): void {
    event.stopPropagation();
    this.activeSlides = this.getPreviousCurrentNextIndexes(index);
    this.direction = this.getDirection(this.activeSlides.current, index);

    if (this.differ.diff(this.activeSlides)) {
      this.cd.detectChanges();
    }
  }

  getDirection(oldIndex: number, newIndex: number): Direction {
    const images = this.data;

    if (oldIndex === images.length - 1 && newIndex === 0) {
      return Direction.Next;
    } else if (oldIndex === 0 && newIndex === images.length - 1) {
      return Direction.Prev;
    }

    return oldIndex < newIndex ? Direction.Next : Direction.Prev;
  }

  getPreviousCurrentNextIndexes(index: number): ActiveSlides {
    const images = this.data;

    return {
      previous: (index === 0 ? images.length - 1 : index - 1) % images.length,
      current: index % images.length,
      next: (index === images.length - 1 ? 0 : index + 1) % images.length,
    };
  }

  getSlideSizing(index: number) {
    let diff = this.activeSlides.current - index;

    if(diff < 0) {
      if(diff < -1) {
        return { left: '55%', height: '80%', top: '10%', zIndex: 1 }
      }
      return { left: '55%', height: '80%', top: '10%', zIndex: 2 }
    }

    if(diff > 0) {
      if(diff > 1) {
        return { left: '45%', height: '80%', top: '10%', zIndex: 1 }
      }
      return { left: '45%', height: '80%', top: '10%', zIndex: 2 }
    }

    return { left: '50%', height: '100%', top: '0%', zIndex: 3 };
  }
}
