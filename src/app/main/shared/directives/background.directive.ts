import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[maxBackground]'
})
export class BackgroundDirective implements OnInit {

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.element.nativeElement.firstChild.firstChild.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    this.element.nativeElement.firstChild.firstChild.firstChild.nextSibling.nextSibling.style.border = '0';
    this.element.nativeElement.firstChild.firstChild.style.paddingLeft = '0.5rem';
  }
}
