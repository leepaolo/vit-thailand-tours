import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [attr.type]="type || 'submit'"
      class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      (click)="onClick()"
    >
      {{ text }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() type?: string; // Allow passing the button type (e.g., 'button', 'submit')
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit(); // Emit click event when button is clicked
  }
}
