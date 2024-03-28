import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  product$!: Observable<any>;
  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute,
  ){}


  addProduct(product:any){
		this.productServ.addProduct(product);
	}
  
  ngOnInit(){
    this.product$ = this.route.params
    .pipe( switchMap( params =>{
      return this.productServ.getById(params['id'])
    }))}
}
