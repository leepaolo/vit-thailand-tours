import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from '../../../../shared/components/ui/input-select.component';
import { InputTextComponent } from '../../../../shared/components/ui/input-text.component';
import { ValidateFormBorderDirective } from '../../../../shared/directives/validate-form-border.directive';

@Component({
  selector: 'app-tour-meta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputSelectComponent,
    ValidateFormBorderDirective,
  ],
  template: `
    <div [formGroup]="tourMetaForm">
      <section class="flex items-center gap-3">
        <!-- Price Section -->
        <div class="w-full">
          <app-input-text
            [placeholder]="'Price for Adults'"
            formControlName="priceAdult"
            type="number"
            validateFormBorder
          ></app-input-text>
          <div
            *ngIf="tourMetaForm.get('priceAdult')?.errors?.['required'] && tourMetaForm.get('priceAdult')?.touched"
            class="text-red-600 text-sm"
          >
            Price for Adults is required.
          </div>
        </div>

        <div class="w-full">
          <app-input-text
            [placeholder]="'Price for Children'"
            formControlName="priceChild"
            type="number"
            validateFormBorder
          ></app-input-text>
          <div
            *ngIf="tourMetaForm.get('priceChild')?.errors?.['required'] && tourMetaForm.get('priceChild')?.touched"
            class="text-red-600 text-sm"
          >
            Price for Children is required.
          </div>
        </div>
      </section>

      <!-- Location and Type Section -->
      <section class="flex items-center gap-3">
        <div class="w-full">
          <app-input-select
            [placeholder]="'Select Location'"
            [options]="locationArea"
            formControlName="location"
            validateFormBorder
          ></app-input-select>
          <div
            *ngIf="tourMetaForm.get('location')?.errors?.['required'] && tourMetaForm.get('location')?.touched"
            class="text-red-600 text-sm"
          >
            Location is required.
          </div>
        </div>

        <div class="w-full">
          <app-input-select
            [placeholder]="'Select Type of Tour'"
            [options]="tourType"
            formControlName="tourType"
            validateFormBorder
          ></app-input-select>
          <div
            *ngIf="tourMetaForm.get('tourType')?.errors?.['required'] && tourMetaForm.get('tourType')?.touched"
            class="text-red-600 text-sm"
          >
            Tour Type is required.
          </div>
        </div>
      </section>

      <!-- Time Start Section -->
      <section class="flex items-center gap-3">
        <div class="w-full">
          <app-input-select
            [placeholder]="'Select Start Time'"
            [options]="tourTimes"
            formControlName="startAt"
            validateFormBorder
          ></app-input-select>
          <div
            *ngIf="tourMetaForm.get('startAt')?.errors?.['required'] && tourMetaForm.get('startAt')?.touched"
            class="text-red-600 text-sm"
          >
            Start Time is required.
          </div>
        </div>

        <div class="w-full">
          <app-input-select
            [placeholder]="'Select Finish Time'"
            [options]="tourTimes"
            formControlName="finishAt"
            validateFormBorder
          ></app-input-select>
          <div
            *ngIf="tourMetaForm.get('finishAt')?.errors?.['required'] && tourMetaForm.get('finishAt')?.touched"
            class="text-red-600 text-sm"
          >
            Finish Time is required.
          </div>
        </div>
      </section>

      <!-- Language Section -->
      <section class="flex items-center gap-3">
        <div class="w-full">
          <app-input-select
            [placeholder]="'Select Primary Language'"
            [options]="language"
            formControlName="primaryLanguage"
            validateFormBorder
          ></app-input-select>
          <div
            *ngIf="tourMetaForm.get('primaryLanguage')?.errors?.['required'] && tourMetaForm.get('primaryLanguage')?.touched"
            class="text-red-600 text-sm"
          >
            Primary language is required.
          </div>
        </div>

        <div class="w-full">
          <app-input-select
            [placeholder]="'Select Secondary Language'"
            [options]="language"
            formControlName="secondaryLanguage"
            validateFormBorder
          ></app-input-select>
          <div
            *ngIf="tourMetaForm.get('secondaryLanguage')?.errors?.['required'] && tourMetaForm.get('secondaryLanguage')?.touched"
            class="text-red-600 text-sm"
          >
            Secondary language is required.
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [],
})
export class TourMetaComponent {
  @Input() tourMetaForm!: FormGroup;
  @Input() locationArea!: string[];
  @Input() tourType!: string[];
  @Input() tourTimes!: string[];
  @Input() language!: string[];
}
