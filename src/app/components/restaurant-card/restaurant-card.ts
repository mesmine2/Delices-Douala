import { Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-restaurant-card',
  imports: [StarRating],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  // RESTAURANT RECU DU PARENT
  restaurant = input.required<Restaurant>();
  // EVENEMENT VERS LE PARENT
  restaurantRated = output<{
    id: number;
    rating: number;
  }>();
  // RECEPTION DE LA NOTE
  onRatingChanged(rating: number): void {
    const currentRating = this.restaurant().rating;
    // Si on clique sur la même note : on enlève la note
    const newRating = currentRating === rating ? 0 : rating;
    this.restaurantRated.emit({
      id: this.restaurant().id,
      rating: newRating,
    });
  }
}
