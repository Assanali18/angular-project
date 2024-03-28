import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartPageComponent } from '../../cart-page/cart-page.component';
import { log } from 'node:console';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  type = 'Phone'
  cartSize: number = 0;
  
  constructor(
    private router: Router,
    private productServ: ProductService,
  ){}



  setType(type:string){

    this.type = type

    if(this.type !== 'Cart'){
      this.router.navigate(['/'],{
        queryParams: {
          type: this.type
        }
      })

      this.productServ.setType(this.type);

    }
  }
  ngOnInit(): void {
    this.productServ.cartSize$.subscribe(size => {
      this.cartSize = size;
    });
  }


}

