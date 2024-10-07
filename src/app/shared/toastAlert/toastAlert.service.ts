import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IToastMessage } from './t-message.model';

@Injectable({
  providedIn: 'root',
})
export class ToastAlertService {
  _toastId: number;
  constructor() {
    this._toastId = Math.random() * 1000;
  }

  private toastMessageSource = new Subject<IToastMessage>();
  toastMessage$ = this.toastMessageSource.asObservable();

  show(
    message: string,
    type: 'saved' | 'edited' | 'success' | 'error' | 'warning',
    duration: number = 5000
  ) {
    const toastMessage = new IToastMessage(message, type, duration);
    this.toastMessageSource.next(toastMessage);
    console.log('Toast message emitted:', toastMessage);
  }

  get toastId(): number {
    return this._toastId;
  }
}
