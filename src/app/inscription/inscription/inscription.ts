import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { motsDePasseIdentiques } from '../../validateurs';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription{

  private readonly fb = inject(FormBuilder);

  readonly inscriptionForm = this.fb.nonNullable.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmation: [
        '',
        [
          Validators.required
        ]
      ]
    },
    {
      validators: motsDePasseIdentiques
    }
  );

  get firstName() {
    return this.inscriptionForm.controls.firstName;
  }

  get lastName() {
    return this.inscriptionForm.controls.lastName;
  }

  get email() {
    return this.inscriptionForm.controls.email;
  }

  get password() {
    return this.inscriptionForm.controls.password;
  }

  get confirmation() {
    return this.inscriptionForm.controls.confirmation;
  }

  soumettre(): void {

    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
      return;
    }

    console.log(
      'Inscription :',
      this.inscriptionForm.getRawValue()
    );

    alert('Inscription réussie !');

    this.inscriptionForm.reset();
  }
}