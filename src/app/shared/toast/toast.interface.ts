import { ToastType } from './toastType.enum';

export interface IToast {
  type: ToastType;
  text: string;
}
