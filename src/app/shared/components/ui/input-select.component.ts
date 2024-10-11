import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <mat-select
        [(ngModel)]="value"
        (selectionChange)="onSelectChange($event.value)"
        [disabled]="isDisabled"
      >
        <!-- Non-selectable Placeholder Option -->
        <mat-option value="" disabled>{{ placeholder }}</mat-option>

        <!-- Selectable Options -->
        <mat-option *ngFor="let option of options" [value]="option">
          {{ option }}
        </mat-option>
      </mat-select>
    </mat-form-field>
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
  @Input() options: string[] = []; // List of options
  @Input() placeholder: string = ''; // Placeholder text
  @Input() label: string = ''; // Label for the select

  value: string = '';
  isDisabled: boolean = false;

  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || ''; // Safely handle null value
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

  onSelectChange(value: string): void {
    this.value = value; // Update the selected value
    this.onChange(value); // Notify the Angular form control about the change
  }
}
