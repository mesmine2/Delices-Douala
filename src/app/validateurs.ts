import { AbstractControl, ValidationErrors } from '@angular/forms';

export function motsDePasseIdentiques(
  group: AbstractControl
): ValidationErrors | null {

  const password = group.get('password')?.value;
  const confirmation = group.get('confirmation')?.value;

  if (password === confirmation) {
    return null;
  }

  return {
    motsDePasseDifferents: true
  };
}