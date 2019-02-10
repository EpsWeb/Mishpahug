import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[maxBorderZero]'
})
export class BorderZeroDirective implements OnInit {

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.element.nativeElement.firstChild.firstChild.firstChild.nextSibling.nextSibling.style.border = '0';
  }
}
