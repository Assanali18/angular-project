import { Component, Input } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product:any;

  liked: boolean = false;

	
  constructor(
    private productServ: ProductService
  ){}


	shareViaTelegram(product: any) {
		const url = encodeURIComponent(product.link);
		const telegramUrl = `https://telegram.me/share/url?url=${url}&text=${product.title}`;
		window.open(telegramUrl, '_blank');
	}

	addProduct(product:any){
		this.productServ.addProduct(product);
	}

	async toggleHeart() {
		if (this.liked) {
			this.product.like = this.product.like > 0 ? this.product.like - 1 : 0;
		  } else {
			this.product.like = this.product.like + 1; 
		  }
		  this.liked = !this.liked;
		try {
			await this.productServ.updateItem(this.product).toPromise();
		  } catch (error) {
			this.product.like = this.product.like - 1;
			this.liked = !this.liked;
		  }
	}
  
  
}
