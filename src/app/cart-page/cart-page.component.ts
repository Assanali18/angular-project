import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {

  cartProducts: Product[] = [];
  totalPrice: number = 0;
  constructor(
    public productServ: ProductService
  ){}

  ngOnInit(){
    this.cartProducts = this.productServ.cartProducts;
    for(let i = 0; i < this.cartProducts.length; i++){
      this.totalPrice +=  parseInt(this.cartProducts[i].price.replace(/\s/g, ''), 10);
      
    }
  }

  removeProduct(product:any){
    this.totalPrice -= +parseInt(product.price.replace(/\s/g, ''), 10);
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
    this.productServ.updateCartSize()
  }
}

