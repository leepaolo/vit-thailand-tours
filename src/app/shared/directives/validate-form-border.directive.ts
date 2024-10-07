import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[validateBorder]',
  standalone: true,
})
export class ValidateFormBorderDirective implements OnInit {
  @Input() validateBorder!: FormControl;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {}

  ngOnInit(): void {
    this.control.control?.statusChanges?.subscribe(() => {
      this.updateBorder();
    });

    // Initial border update when directive initializes
    this.updateBorder();
  }

  private updateBorder(): void {
    const control = this.control.control;

    if (control && control.invalid && (control.touched || control.dirty)) {
      this.renderer.addClass(this.el.nativeElement, 'border-red-500');
      this.renderer.removeClass(this.el.nativeElement, 'border-gray-300');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'border-gray-300');
      this.renderer.removeClass(this.el.nativeElement, 'border-red-500');
    }
  }
}
