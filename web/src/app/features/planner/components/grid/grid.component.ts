import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import * as interact from 'interactjs';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) { }

  resources: any[] = [
    'Miro', 'Phong', 'Yves'
  ];

  @ViewChildren('renderedDays') renderedDays!: QueryList<ElementRef>;

  months: any[] = [
    new Month('Jan', 1, new Array(31)),
    new Month('Feb', 2, new Array(31)),
    new Month('Mar', 3, new Array(31)),
    new Month('Apr', 4, new Array(31)),
    new Month('May', 5, new Array(31)),
    new Month('Jun', 6, new Array(31)),
    new Month('Jul', 7, new Array(31)),
    new Month('Aug', 8, new Array(31)),
    new Month('Sep', 9, new Array(31)),
    new Month('Oct', 10, new Array(31)),
    new Month('Nov', 11, new Array(31)),
    new Month('Dec', 12, new Array(31)),
  ];

  ngOnInit(): void {

  }

  public slotClicked(event: MouseEvent): void {

    console.log(event)

    const d = this.renderer.createElement('div');

    this.renderer.setStyle(d, 'background-color', 'red');
    this.renderer.setStyle(d, 'height', '50px');
    this.renderer.setStyle(d, 'width', '50px');
    this.renderer.setStyle(d, 'position', 'absolute');
    this.renderer.setStyle(d, 'touch-action', 'none');
    this.renderer.setStyle(d, 'left', event.pageX + 'px');
    this.renderer.setStyle(d, 'top', event.pageY + 'px');
    // this.renderer.setStyle(d.nativeElement, 'background-color', 'red');

    // @ts-ignore
    this.renderer.appendChild(event.target?.parentNode, d);

    // @ts-ignore
    interact(d)
      .resizable({
        edges: { left: true, right: true, bottom: false, top: false}
      })
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: 'parent',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        // tslint:disable-next-line:typedef no-shadowed-variable
        onend(event: any) {
          const textEl = event.target.querySelector('p');

          // tslint:disable-next-line:no-unused-expression
          textEl && (textEl.textContent =
            'moved a distance of '
            // tslint:disable-next-line:no-bitwise
            + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px');
        }
      })
      // tslint:disable-next-line:no-shadowed-variable only-arrow-functions
      .on('resizemove', (event: any) => {
        // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

      // update the element's style
      target.style.width  = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      target.textContent = event.rect.width + '×' + event.rect.height;
    });
    // @ts-ignore
    console.log(event.target?.parentNode);
  }

  public jumpToday(): void {

    const element = this.renderedDays.find(el => el.nativeElement.getAttribute('data-day-ident') === '2-20');
    element?.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end'});
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

class Month {
  constructor(public name: string, public ident: number, public days: any[]) {
  }
}
