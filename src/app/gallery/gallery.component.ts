import { Component, Input } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/interfaces';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  product$!: Observable<Product>;
  imageUrls$!: Observable<string[]>;
  product!: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ){}

  ngOnInit(){
    this.product$ = this.route.params
    .pipe( switchMap( params =>{
      return this.productService.getById(params['id'])
    }))
    // this.product$.subscribe(product =>{
    //   this.product = product;
    // })

    this.imageUrls$ = this.product$.pipe(
      map((product: Product) => this.extractImageUrls(product.gallery))
    );
    
  }

    private extractImageUrls(htmlString: string): string[] {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const imageNodes = doc.querySelectorAll('p > img');
    const imageUrls = Array.from(imageNodes).map(img => img.getAttribute('src') || '');
    return imageUrls;
  }


  
}
