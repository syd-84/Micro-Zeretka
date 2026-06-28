import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

export function imageUrlValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return new Observable(observer => {
      const url = control.value?.trim();

      if (!url) {
        observer.next(null);
        observer.complete();
        return;
      }

      const image = new Image();

      image.onload = () => {
        observer.next(null);
        observer.complete();
      };

      image.onerror = () => {
        observer.next({ imageLoadFailed: true });
        observer.complete();
      };

      image.src = url;
    });
  };
}