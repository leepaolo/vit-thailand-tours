import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Label, if provided -->
      <label
        *ngIf="label"
        class="block text-sm text-slate-700 dark:text-gray-300"
        >{{ label }}</label
      >

      <!-- Select dropdown -->
      <select
        [value]="value"
        (change)="onSelectChange($event)"
        (blur)="onTouched()"
        [disabled]="isDisabled"
        class="block w-full px-5 py-2.5 mt-2 bg-white border border-gray-200 rounded-lg text-gray-700  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
      >
        <!-- Placeholder Option (disabled and pre-selected) -->
        <option *ngIf="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>

        <!-- Options -->
        <option *ngFor="let option of options" [value]="option">
          {{ option }}
        </option>
      </select>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent implements ControlValueAccessor {
  @Input() options: string[] = []; // The list of options
  @Input() placeholder: string = ''; // Placeholder text
  @Input() label: string = ''; // Label for the select

  value: string = '';
  isDisabled: boolean = false;

  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || ''; // Handle null value safely
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Type cast to HTMLSelectElement
    const value = target.value; // Access the value safely
    this.onChange(value); // Notify Angular form control of the change
  }
}
