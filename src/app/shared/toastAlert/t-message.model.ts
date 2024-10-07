export class IToastMessage {
  constructor(
    public message: string,
    public type: 'saved' | 'edited' | 'success' | 'error' | 'warning',
    public duration: number = 3000
  ) {}
}
