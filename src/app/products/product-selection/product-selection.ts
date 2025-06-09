import { Component, computed, effect, inject, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { ReviewList } from '../../reviews/review-list/review-list';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe, ReviewList],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';
  private productService = inject(ProductService);

  // Signals used by the template
  selectedProduct = this.productService.selectedProduct;
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1
  });

  // If calling a method in the service to create the resource
  // productsResource = this.productService.createProducts();

  // Reference the resource properties to simplify the code
  products = this.productService.productsResource.value;
  isLoading = this.productService.productsResource.isLoading;
  error = this.productService.productsResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  // If using a method in the service:
  // productsResource = this.productService.createProducts()
  // products = this.productsResource.value;

  // React to changes and recompute
  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'green' : 'blue');

  onDecrease() {
    this.quantity.update(q => q <= 0 ? 0 : q - 1);
  }
  onIncrease() {
    this.quantity.update(q => q + 1);
    // To see how the effect is scheduled
    // this.quantity.set(2);
    // this.quantity.set(42);
    // this.quantity.set(12);
  }

  qtyEffect = effect(() => console.log('quantity', this.quantity()));
  selEffect = effect(() => console.log('selected product:', this.selectedProduct()?.productName));
  // Accessing the resource generates an error if the http request fails
  prodEff = effect(() => {
    if (!this.error()) {
      console.log('Products', JSON.stringify(this.products()));
    } else {
      console.error('Failed to load products', this.error());
    }
  });
  statusEff = effect(() => console.log('request status:', this.productService.productsResource.status()));


}
