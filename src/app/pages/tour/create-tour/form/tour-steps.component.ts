import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/ui/button.component';
import { InputTextComponent } from '../../../../shared/components/ui/input-text.component';
import { TextAreaComponent } from '../../../../shared/components/ui/text-area.component';
import { ValidateFormBorderDirective } from '../../../../shared/directives/validate-form-border.directive';

@Component({
  selector: 'app-tour-steps',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    TextAreaComponent,
    ButtonComponent,
    ValidateFormBorderDirective,
  ],
  template: `
    <div [formGroup]="parentForm">
      <div formArrayName="steps" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          *ngFor="let step of steps.controls; let i = index"
          [formGroupName]="i"
        >
          <!-- Step Title -->
          <div class="w-full">
            <app-input-text
              [placeholder]="'Step Title'"
              formControlName="tourStepTitle"
              validateFormBorder
            ></app-input-text>
            <div
              *ngIf="step.get('tourStepTitle')?.errors?.['required'] && step.get('tourStepTitle')?.touched"
              class="text-red-600 text-sm"
            >
              Step Title is required.
            </div>
          </div>

          <!-- Step Description -->
          <div class="w-full">
            <app-text-area
              [placeholder]="'Step Description'"
              formControlName="tourStepDescription"
              validateFormBorder
            ></app-text-area>
            <div
              *ngIf="step.get('tourStepDescription')?.errors?.['required'] && step.get('tourStepDescription')?.touched"
              class="text-red-600 text-sm"
            >
              Step Description is required.
            </div>
          </div>

          <!-- Button to Add/Remove Steps -->
          <section class="flex justify-end gap-2">
            <app-button [text]="'Remove step'" (click)="onRemoveStep(i)">
            </app-button>

            <app-button
              [text]="'Add next step'"
              [type]="'button'"
              (click)="onAddStep()"
            ></app-button>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TourStepsComponent {
  @Input() steps!: FormArray; // Receive the steps FormArray
  @Input() parentForm!: FormGroup; // Receive the parent FormGroup
  @Output() removeStep = new EventEmitter<number>(); // Emit index for removal
  @Output() addStep = new EventEmitter<void>(); // Event to add a step

  onRemoveStep(index: number): void {
    this.removeStep.emit(index); // Emit the step index
  }

  onAddStep(): void {
    this.addStep.emit(); // Correctly emit the add step event
  }
}
