import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { interval } from 'rxjs';

import { toSignal } from '@angular/core/rxjs-interop';

import { MenuService } from '../../services/menu.service';

import { Plat } from '../../models/plat';


@Component({
  selector: 'app-carte',

  standalone: true,

  imports: [
    CurrencyPipe
  ],

  templateUrl: './carte.html',

  styleUrl: './carte.css'
})
export class Carte {

  // ============================================================
  // SERVICE
  // ============================================================

  private readonly menuService = inject(MenuService);


  // ============================================================
  // DONNÉES DU MENU
  // ============================================================

  readonly menu = this.menuService.plats;


  // ============================================================
  // RESSOURCE HTTP
  // ============================================================

  readonly menuResource = this.menuService.menuResource;


  // ============================================================
  // CATÉGORIE SÉLECTIONNÉE
  // ============================================================

  readonly categorie = signal<string>('Toutes');


  // ============================================================
  // LISTE DES CATÉGORIES
  // ============================================================

  readonly categories: string[] = [
    'Toutes',
    'Plats',
    'Grillades',
    'Végétarien',
    'Boissons'
  ];


  // ============================================================
  // PLATS FILTRÉS
  // ============================================================

  readonly platsFiltres = computed<Plat[]>(() => {

    const plats = this.menu();

    const categorieSelectionnee = this.categorie();


    // Afficher tous les plats
    if (categorieSelectionnee === 'Toutes') {
      return plats;
    }


    // Afficher uniquement les plats
    // de la catégorie sélectionnée
    return plats.filter(
      plat => plat.categorie === categorieSelectionnee
    );

  });


  // ============================================================
  // ROTATION DU PLAT DU JOUR
  // ============================================================

  private readonly rotation$ = interval(5000);


  // ============================================================
  // INDEX DU PLAT ACTUEL
  // ============================================================

  readonly indexPlat = toSignal(
    this.rotation$,
    {
      initialValue: 0
    }
  );


  // ============================================================
  // PLAT DU JOUR
  // ============================================================

  readonly platDuJour = computed<Plat | undefined>(() => {

    const plats = this.menu();


    // Aucun plat
    if (plats.length === 0) {
      return undefined;
    }


    // Index actuel
    const index = this.indexPlat();


    // Retourne un plat
    return plats[index % plats.length];

  });


  // ============================================================
  // CHOISIR UNE CATÉGORIE
  // ============================================================

  choisirCategorie(categorie: string): void {

    this.categorie.set(categorie);

  }


  // ============================================================
  // AFFICHER TOUS LES PLATS
  // ============================================================

  afficherToutesLesCategories(): void {

    this.categorie.set('Toutes');

  }

}