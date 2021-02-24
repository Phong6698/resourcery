import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import * as interactLib from 'interactjs';
import {Element} from '@angular/compiler';


const interact: any = interactLib;

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  days = new Array(31);

  constructor(
    private renderer: Renderer2
  ) {
  }

  resources: any[] = [
    'Miro', 'Phong', 'Yves'
  ];

  @ViewChildren('renderedDays') renderedDays!: QueryList<ElementRef>;

  ngOnInit(): void {

  }

  public slotClicked(event: MouseEvent): void {

    console.log(event);

    // @ts-ignore
    // const rect = event.target?.getBoundingClientRect();
    const rect = event.target?.parentNode.getBoundingClientRect();
    console.log(rect);

    const d = this.renderer.createElement('div');

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // debugger;

    this.renderer.addClass(d, 'draggable');
    // this.renderer.setStyle(d, 'left', rect.left + 'px');
    // this.renderer.setStyle(d, 'top', (rect.top + 6) + 'px');
    this.renderer.setStyle(d, 'left', x + 'px');
    this.renderer.setStyle(d, 'top', 0 + 'px');
    // @ts-ignore
    this.renderer.appendChild(event.target?.parentNode, d);


    interact(d)
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
            target.style.width = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
          }
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),
          interact.modifiers.snapEdges({
            targets: this.makeGridXY(event.target),
            range: Infinity,
          }),
        ],

      })
      .draggable({
        listeners: { move: this.dragMoveListener },
        modifiers: [
          interact.modifiers.snapEdges({
            targets: this.makeGridXY(event.target),
            range: Infinity,
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent'
          })
        ],
        inertia: false,
      });

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

  private makeGridXY(clickedDaySlot: EventTarget): { left, top }[] {
    // @ts-ignore
    const parent = clickedDaySlot.parentNode;
    const targets = [];

    [...parent.children].map((el: Element) => {
      // @ts-ignore
      const rect = el.getBoundingClientRect();
      targets.push(interact.snappers.grid({x: rect.left, y: 1}));
    });
    console.log(targets);
    return targets;
  }
}

