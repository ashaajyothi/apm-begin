import { effect, inject, Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { httpResource } from '@angular/common/http';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';
  private productService = inject(ProductService);

  // Retrieve data into a signal
  // Use appropriate regular expression syntax to get an exact match on the id
  // Otherwise an id = 1 will match 10, 11, ... 100, 101, etc.
  // reviewsResource = httpResource<Review[]>( () =>
  //   `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$`, 
  //   { defaultValue: [] }
  // );

  // Prevent retrieval if there is no selected product.
  reviewsResource = httpResource<Review[]>(() => {
    const p = this.productService.selectedProduct();
    if (p) {
      return `${this.reviewsUrl}?productId=^${p.id}$`;
    } else {
      return undefined;
    }
  },
    { defaultValue: [] }
  );

  // A shorter way to write the above code using a ternary operator
  // reviewsResource = httpResource<Review[]>(() => 
  //   this.productService.selectedProduct() ? 
  //     `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$` : undefined,
  //   { defaultValue: [] }
  // );

  // Use the options object
  // reviewsResource = httpResource<Review[]>(() => ({
  //   url: this.reviewsUrl,
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json'
  //   },
  //   params: {
  //     productId: `^${this.productService.selectedProduct()?.id ?? 0}$`
  //   }
  // }));

  // Use the options object
  // Prevent retrieval if there is no selected product
  // reviewsResource = httpResource<Review[]>(() => {
  //   const p = this.productService.selectedProduct();
  //   if (p) {
  //     return {
  //       url: this.reviewsUrl,
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json'
  //       },
  //       params: {
  //         productId: `^${p.id}$`
  //       }
  //     }
  //   } else {
  //     return undefined;
  //   }
  // },
  //   { defaultValue: [] }
  // );

  // Log out when reviews are loading
  eff = effect(() => console.log('loading reviews', this.reviewsResource.isLoading()));
}
