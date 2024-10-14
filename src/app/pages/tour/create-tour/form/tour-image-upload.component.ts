import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tour-image-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="w-full">
      <!-- Image Drag and Drop Section -->
      <div
        class="image-drop-area"
        (drop)="onDrop($event)"
        (dragover)="onDragOver($event)"
        class="drop-box flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md text-center cursor-pointer"
        [ngClass]="{ 'border-green-500': image, 'border-gray-300': !image }"
        (click)="fileInput.click()"
      >
        <mat-icon>cloud_upload</mat-icon>
        <p *ngIf="!image">Drag and drop an image here or click to select</p>
        <p *ngIf="image">{{ image.name }}</p>

        <!-- Image preview -->
        <img
          *ngIf="imagePreview"
          [src]="imagePreview"
          alt="Image Preview"
          class="h-40 w-40 object-cover"
        />

        <input
          type="file"
          accept="image/*"
          class="hidden"
          #fileInput
          (change)="onFileSelected($event)"
        />
      </div>
    </div>
  `,
  styles: [],
})
export class TourImageUploadComponent {
  @Input() image: File | null = null; // Pass the image file
  @Input() imagePreview: string | null = null; // Pass the image preview
  @Output() fileSelected = new EventEmitter<File>(); // Emit the selected file

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.fileSelected.emit(input.files[0]); // Emit the selected file
    }
  }

  // Handle drag and drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.fileSelected.emit(event.dataTransfer.files[0]); // Emit the dropped file
    }
  }

  // Allow drag over
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
