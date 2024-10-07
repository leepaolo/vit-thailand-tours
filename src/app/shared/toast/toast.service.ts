import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IToast } from './toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private showToast$ = new BehaviorSubject<IToast | null>(null); // Set initial value as null

  setToast(message: IToast) {
    console.log('ToastService: Setting toast with message:', message);
    this.showToast$.next(message);
  }

  showToast(): Observable<IToast | null> {
    return this.showToast$.asObservable();
  }
}
