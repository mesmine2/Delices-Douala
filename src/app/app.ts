import { Component, computed, signal } from '@angular/core';

import { Restaurant } from './models/restaurant';

import { Header} from './components/header/header';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { Carte } from './components/carte/carte';
import { Inscription } from './inscription/inscription/inscription';

@Component({
  selector: 'app-root',

  imports: [
    Header,
    RestaurantList,
    Carte,
    Inscription
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // LISTE DES RESTAURANTS
  restaurants = signal<Restaurant[]>([
    {
      id: 1,
      name: 'Le Calao Doré',
      district: 'Akwa',
      specialty: 'Ndolé aux crevettes',
      rating: 0,
      image: 'assets/images/calao-dore.jpg'
    },

    {
      id: 2,
      name: 'Chez Madame Ngono',
      district: 'Bonapriso',
      specialty: 'Eru aux pieds de bœuf',
      rating: 0,
      image: 'assets/images/madame-ngono.jpg'
    },

    {
      id: 3,
      name: 'La Fourchette Camerounaise',
      district: 'Bonanjo',
      specialty: 'Poulet DG',
      rating: 0,
      image: 'assets/images/fourchette-camerounaise.jpg'
    },

    {
      id: 4,
      name: 'Saveurs du Wouri',
      district: 'Bonamoussadi',
      specialty: 'Poisson braisé',
      rating: 0,
      image: 'assets/images/saveurs-wouri.jpg'
    },

    {
      id: 5,
      name: "L'Akwa Gourmand",
      district: 'Akwa',
      specialty: 'Bobolo et sauce arachide',
      rating: 0,
      image: 'assets/images/akwa-gourmand.jpg'
    },

    {
      id: 6,
      name: 'Le Royal de Bali',
      district: 'Bali',
      specialty: 'Koki et plantain',
      rating: 0,
      image: 'assets/images/royal-bali.jpg'
    }
  ]);

  // CONTROLES DE FILTRE / TRI
  
  //Indique si le tri décroissant est activé
  sortDescending = signal(false);


  // Indique si on affiche seulement les restaurants
   // ayant une note >= 4
   
  showOnlyFourStars = signal(false);

  // LISTE AFFICHÉE
  displayedRestaurants = computed(() => {

    let result = [...this.restaurants()];

    // FILTRE : NOTE >= 4
    if (this.showOnlyFourStars()) {

      result = result.filter(
        restaurant => restaurant.rating >= 4
      );

    }
    // TRI DÉCROISSANT
    if (this.sortDescending()) {

      result.sort(
        (a, b) =>
          b.rating - a.rating
      );

    }


    return result;

  });

  // NOMBRE DE RESTAURANTS NOTÉS
  ratedCount = computed(() => {

    return this.restaurants()
      .filter(
        restaurant =>
          restaurant.rating > 0
      )
      .length;

  });

  // MOYENNE DES NOTES
  averageRating = computed(() => {

    const ratedRestaurants =
      this.restaurants()
        .filter(
          restaurant =>
            restaurant.rating > 0
        );


    if (ratedRestaurants.length === 0) {
      return 0;
    }


    const total =
      ratedRestaurants.reduce(
        (sum, restaurant) =>
          sum + restaurant.rating,
        0
      );


    return Number(
      (
        total / ratedRestaurants.length
      ).toFixed(1)
    );

  });

  // ACTIVER / DÉSACTIVER LE TRI DÉCROISSANT
  toggleSortDescending(): void {

    this.sortDescending.update(
      value => !value
    );

  }

  // ACTIVER / DÉSACTIVER LE FILTRE >= 4
  toggleFourStarsFilter(): void {

    this.showOnlyFourStars.update(
      value => !value
    );

  }
  // RÉINITIALISER LES FILTRES
  resetFilters(): void {

    this.sortDescending.set(false);

    this.showOnlyFourStars.set(false);

  }

  // RÉCEPTION DE LA NOTE
  
  onRestaurantRated(event: {
  id: number;
  rating: number;
}): void {

  this.restaurants.update(restaurants =>
    restaurants.map(restaurant =>
      restaurant.id === event.id
        ? {
            ...restaurant,
            rating: event.rating
          }
        : restaurant
    )
  );

}

}