import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <mat-form-field appearance="outline" class="w-full mt-4">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <textarea
        matInput
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="isDisabled"
        (input)="onInput($event)"
        (blur)="onBlur()"
        rows="6"
      ></textarea>
    </mat-form-field>

    <!-- Optionally display text below the textarea if provided -->
    <div *ngIf="text" class="mt-2 text-sm text-slate-700">
      {{ text }}
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() text!: string;
  @Input() label!: string;
  @Input() placeholder!: string;

  value: string = '';
  isDisabled: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  // Write a new value to the element
  writeValue(value: string): void {
    this.value = value || '';
  }

  // Register the function to call when the control value changes
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Register the function to call when the control is touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Enable or disable the control
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Handle input events
  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    this.value = value;
    this.onChange(value);
  }

  // Handle blur events
  onBlur(): void {
    this.onTouched();
  }
}
