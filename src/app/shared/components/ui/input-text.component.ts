import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <input
        matInput
        [type]="type || 'text'"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="isDisabled"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
    </mat-form-field>

    <!-- Optionally display text below the input if provided -->
    <div *ngIf="text" class="mt-2 text-sm text-slate-700">
      {{ text }}
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() text!: string | number;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';

  value: string = '';
  isDisabled: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  // Write a new value to the element
  writeValue(value: string | number): void {
    if (value !== null && value !== undefined) {
      this.value = value.toString();
    } else {
      this.value = '';
    }
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
    const target = event.target as HTMLInputElement;
    let value: any = target.value;

    // Parse value to a number if the input type is 'number'
    if (this.type === 'number') {
      value = parseFloat(value);
      if (isNaN(value)) {
        value = null; // Handle invalid number input
      }
    }

    this.value = value;
    this.onChange(value);
  }

  // Handle blur events
  onBlur(): void {
    this.onTouched();
  }
}
