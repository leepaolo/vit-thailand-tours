import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full mt-4">
      <!-- If label is provided, display it -->
      <label
        *ngIf="label"
        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
      >
        {{ label }}
      </label>

      <!-- Textarea field with dynamic placeholder -->
      <textarea
        class="block w-full h-[150px] px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="isDisabled"
        (input)="onInput($event)"
        (blur)="onBlur()"
      ></textarea>

      <!-- Optionally display text below the textarea if provided -->
      <div *ngIf="text" class="mt-2 text-sm text-slate-700">
        {{ text }}
      </div>
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
