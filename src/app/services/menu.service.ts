import {
  Injectable,
  effect,
  signal
} from '@angular/core';

import { httpResource } from '@angular/common/http';

import { Plat } from '../models/plat';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  /*
   * État privé du menu.
   *
   * Il ne peut pas être modifié directement
   * depuis un autre composant.
   */
  private readonly _plats = signal<Plat[]>([]);


  /*
   * Version accessible en lecture seule.
   */
  readonly plats = this._plats.asReadonly();


  /*
   * Chargement du menu depuis le "serveur".
   */
  readonly menuResource = httpResource<Plat[]>(
    () => `${environment.serverUrl}/api/plats.json`
  );


  /*
   * Synchronisation des données HTTP
   * avec le signal privé.
   *
   * Pas de subscribe().
   */
  private readonly synchronisation = effect(() => {

    const donnees = this.menuResource.value();

    if (donnees) {
      this._plats.set(donnees);
    }

  });


  /*
   * Méthode de mutation.
   * Elle permet de modifier le menu
   * sans rendre le signal public mutable.
   */
  ajouterPlat(plat: Plat): void {

    this._plats.update(plats => [
      ...plats,
      plat
    ]);

  }

}