import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit{

  removeItem(id: string){
    this.productServ.removeItem(id).subscribe( () =>{
      this.products = this.products.filter( product => product.id != id)
    })
  }
  
    products:any[] = []
    productSub: Subscription = new Subscription
    removeSub: Subscription = new Subscription

    constructor(
      private productServ: ProductService,
      ){}

    ngOnInit(){
      this.productSub = this.productServ.getAll().subscribe(products =>{ 
        this.products = products
        console.log(products);
        
      })
    }

    ngOnDestroy(){
      if(this.productSub){
        this.productSub.unsubscribe();
      }
    }

  


  
}
