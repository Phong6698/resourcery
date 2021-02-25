import {
  AfterViewInit,
  Component,
  ElementRef, HostBinding,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';
import * as interactLib from 'interactjs';

const interact: any = interactLib;

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[r-booking]',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements AfterViewInit {

  @Input()
  public top: number;

  @Input()
  public left: number;

  @Input()
  grid: any[];

  constructor(private renderer: Renderer2, private self: ElementRef) {
  }

  public ngAfterViewInit(): void {
    console.log(this.self);
    console.log(this.grid)
    this.renderer.setStyle(this.self.nativeElement, 'left', this.left + 'px');
    this.renderer.setStyle(this.self.nativeElement, 'top', 0 + 'px');
    this.initInteract();
  }

  private initInteract(): void {
    interact(this.self.nativeElement)
      .resizable({
        inertia: false,
        edges: {left: true, right: true, bottom: false, top: false},
        listeners: {
          // tslint:disable-next-line:typedef no-shadowed-variable
          move(event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
          }
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),
          interact.modifiers.snapEdges({
            targets: this.grid,
            range: Infinity,
          }),
        ],

      })
      .draggable({
        listeners: {move: this.dragMoveListener},
        modifiers: [
          interact.modifiers.snapEdges({
            targets: this.grid,
            range: Infinity,
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent'
          })
        ],
        inertia: false,
      });
  }

  // tslint:disable-next-line:typedef
  private dragMoveListener(event: any) {
    // tslint:disable-next-line:one-variable-per-declaration
    const target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

}
