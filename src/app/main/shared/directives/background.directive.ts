import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[maxBackground]'
})
export class BackgroundDirective implements OnInit {

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.element.nativeElement.firstChild.firstChild.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
  }
}
