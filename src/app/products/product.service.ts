import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  // Signals to support the template
  selectedProduct = signal<Product | undefined>(undefined);

  // Retrieve data into a signal
  productsResource = httpResource<Product[]>(() => this.productsUrl, { defaultValue: [] });

  // Using a method moves the management and lifetime of the resource to the component
  // createProducts() {
  //   return httpResource<Product[]>(() => this.productsUrl, {defaultValue: []});
  // }

  // To wait to get the product data until something happens
  // Set this signal when that something happens
  // getProductsNow = signal(false);
  // productsResource = httpResource<Product[]>(()=> 
  //   this.getProductsNow() ? this.productsUrl : undefined, 
  //   { defaultValue: []});

}
