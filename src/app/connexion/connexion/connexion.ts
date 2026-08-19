import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class ConnexionComponent {

  private readonly fb = inject(FormBuilder);

  readonly connexionForm = this.fb.nonNullable.group({

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
    ]

  });


  get email() {
    return this.connexionForm.controls.email;
  }


  get password() {
    return this.connexionForm.controls.password;
  }


  soumettre(): void {

    if (this.connexionForm.invalid) {

      this.connexionForm.markAllAsTouched();

      return;
    }

    console.log(
      'Connexion :',
      this.connexionForm.getRawValue()
    );

    alert('Connexion réussie !');
  }
}