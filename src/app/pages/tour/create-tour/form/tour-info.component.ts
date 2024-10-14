import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/ui/input-text.component';
import { TextAreaComponent } from '../../../../shared/components/ui/text-area.component';
import { ValidateFormBorderDirective } from '../../../../shared/directives/validate-form-border.directive';

@Component({
  selector: 'app-tour-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    TextAreaComponent,
    ValidateFormBorderDirective,
  ],
  template: `
    <div [formGroup]="tourInfoForm">
      <!-- Add formGroup directive here -->
      <div class="w-full">
        <!-- Title Field -->
        <app-input-text
          [placeholder]="'Title of the tour'"
          formControlName="title"
          validateFormBorder
        ></app-input-text>
        <div
          *ngIf="tourInfoForm.get('title')?.errors?.['required'] && tourInfoForm.get('title')?.touched"
          class="text-red-600 text-sm"
        >
          Title is required.
        </div>
      </div>

      <div class="w-full">
        <!-- Main Description Field -->
        <app-text-area
          [placeholder]="'Description of the tour'"
          formControlName="mainDescription"
          validateFormBorder
        ></app-text-area>
        <div
          *ngIf="tourInfoForm.get('mainDescription')?.errors?.['required'] && tourInfoForm.get('mainDescription')?.touched"
          class="text-red-600 text-sm"
        >
          Main Description exceeds the maximum length.
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TourInfoComponent {
  @Input() tourInfoForm!: FormGroup; // Expect a FormGroup to be passed in
}
