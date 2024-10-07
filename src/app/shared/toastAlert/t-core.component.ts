import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IToastMessage } from './t-message.model';

@Component({
  selector: 'vit-t-core',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="toast p-4 rounded text-white mb-2.5 text-lg inline-block"
      [ngClass]="{
        'bg-emerald-300': toast.type === 'saved',
        'bg-yellow-300': toast.type === 'edited',
        'bg-blue-300': toast.type === 'success',
        'bg-red-300': toast.type === 'error',
        'bg-rose-500': toast.type === 'warning'
      }"
    >
      {{ toast.message }}
    </div>
  `,
})
export class TCoreComponent {
  @Input() toast!: IToastMessage;
}
