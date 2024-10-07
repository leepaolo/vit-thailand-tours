import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validateErrorMessage]',
  standalone: true,
})
export class ValidateErrorMessageDirective implements OnInit {
  @Input() controlName!: string; // Optional control name for error messages

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {}

  ngOnInit(): void {
    this.control.control?.statusChanges?.subscribe(() => {
      this.displayErrorMessage();
    });

    this.displayErrorMessage(); // Initially check and apply error
  }

  private displayErrorMessage(): void {
    const control = this.control.control;

    if (control && control.invalid && (control.touched || control.dirty)) {
      const errorMessage = this.getErrorMessage(control.errors);
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        errorMessage
      );
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
    }
  }

  private getErrorMessage(errors: any): string {
    if (errors?.required) {
      return `${this.controlName || 'This field'} is required.`;
    }
    if (errors?.minlength) {
      return `${this.controlName || 'This field'} must be at least ${
        errors.minlength.requiredLength
      } characters long.`;
    }
    if (errors?.maxlength) {
      return `${this.controlName || 'This field'} cannot exceed ${
        errors.maxlength.requiredLength
      } characters.`;
    }
    if (errors?.min) {
      return `${this.controlName || 'This field'} must be a positive number.`;
    }
    return ''; // Return empty if no error message is needed
  }
}
