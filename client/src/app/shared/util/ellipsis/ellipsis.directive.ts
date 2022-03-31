import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEllipsifyMe]',
})
export class EllipsifyMeDirective implements AfterViewInit, OnInit {
  @Input('appEllipsifyMe')
  options: any;

  domElement: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.domElement = this.elementRef.nativeElement; // to get DOM element and store it in global variable
  }

  ngOnInit(): void {
    if (this.options && !this.options.apply) {
      return;
    }

    // setting compulsory required styles to the DOM element
    const elipsifyme = {
      'text-overflow': 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap',
    };
    Object.keys(elipsifyme).forEach((newStyle) => {
      this.renderer.setStyle(this.domElement, `${newStyle}`, elipsifyme[newStyle]);
    });
  }

  // to check and add title attribute on the element at the time when application renders first time.
  ngAfterViewInit(): void {
    // to see effect try removing below two lines and check if the title is added at the first time rendering.
    this.renderer.setProperty(this.domElement, 'scrollTop', 1);
    this.isTitleAttribute();
  }

  @HostListener('window:resize', ['$event.target'])
  isTitleAttribute(): void {
    // to add or remove title attribute on the element when it is changing width.
    this.domElement.offsetWidth < this.domElement.scrollWidth
      ? this.renderer.setAttribute(this.domElement, 'title', this.domElement.firstChild.textContent)
      : this.renderer.removeAttribute(this.domElement, 'title');
  }
}
