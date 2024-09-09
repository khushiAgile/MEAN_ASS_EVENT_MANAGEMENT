import { InjectionToken } from '@angular/core';

export const LocalStorageToken = new InjectionToken<Storage>('local storage', {
  providedIn: 'root',
  factory: () => localStorage,
});
