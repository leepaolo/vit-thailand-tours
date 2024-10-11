import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button
      mat-raised-button
      [color]="color || 'primary'"
      [attr.type]="type || 'submit'"
      (click)="onClick()"
    >
      {{ text }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() type?: string; // Allows passing the button type (e.g., 'button', 'submit')
  @Input() color?: string; // Optional input for button color ('primary', 'accent', 'warn')
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit(); // Emit click event when button is clicked
  }
}
