import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductData } from '../product-data';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';
  selectedProduct = signal<Product | undefined>(undefined);
  //quantity = signal(1)
  //rest the value of a writable signal we use a linkedSignal
  quantity = linkedSignal({
    source : this.selectedProduct,
    computation: p=> 1
  });
  products = signal(ProductData.products);
  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'green' : 'red');

  decreaseQuantity()
  {
    this.quantity.update(q => q <=0 ? 1 : q - 1);
  }

  increaseQuantity()
  {
    this.quantity.update(q => q <=0 ? 1 : q + 1);
    //this.quantity.set(2);
    //this.quantity.set(42);
    //this.quantity.set(12);
  }

  //An effect() is scheduled to be run whenever any if its dependent signals change.
  qtyEffect = effect(() => console.log(this.quantity()));
   selectedProductEffect = effect(() => {
    const product = this.selectedProduct();
    if (product) {
      console.log(`Selected product: ${product.productName}, Quantity: ${this.quantity()}`);
    } else {
      console.log('No product selected');
    }});

  }
  