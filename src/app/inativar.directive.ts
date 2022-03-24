import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[inativar]'
})
export class InativarDirective {
  @HostListener("click") inativar (): void{
      this._renderer.addClass(this._elementRef.nativeElement.parentNode,"disabled");
  }
  constructor(private _elementRef:ElementRef,private _renderer:Renderer2) {

  }

}
