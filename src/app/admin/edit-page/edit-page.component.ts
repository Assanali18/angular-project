import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/product.service';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'] 
})
export class EditPageComponent implements OnInit {

  form!: FormGroup; 
  product!: Product; 
  submitted = false; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private router: Router,
  ) {}

  ngOnInit(){
    this.route.params.pipe(
      switchMap(params => this.productService.getById(params['id']))
    ).subscribe(product => {
      this.product = product;
        this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        gallery: new FormControl(this.product.gallery, Validators.required),
        description: new FormControl(this.product.description, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
        link: new FormControl(this.product.link, Validators.required),
      });
    });
  }

  submit(){
    if(this.form.invalid){
      return;
    }

    this.submitted = true;

    this.productService.updateItem({
      ...this.product,
      ...this.form.value,
      date: new Date(), 
    }).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
  }

}
