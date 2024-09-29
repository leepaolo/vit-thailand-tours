import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- If label is provided, display it -->
      <label
        *ngIf="label"
        for="inputField"
        class="block text-sm text-slate-700 dark:text-gray-300"
      >
        {{ label }}
      </label>

      <!-- Input field with dynamic placeholder -->
      <input
        id="inputField"
        type="text"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="isDisabled"
        (input)="onInput($event)"
        (blur)="onBlur()"
        class="block w-full px-5 py-2.5 mt-2 placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
      />

      <!-- Optionally display text below the input if provided -->
      <div *ngIf="text" class="mt-2 text-sm text-slate-700">
        {{ text }}
      </div>
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
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value = value;
    this.onChange(value);
  }

  // Handle blur events
  onBlur(): void {
    this.onTouched();
  }
}
