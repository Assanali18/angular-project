import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss'
})
export class AddPageComponent {

  constructor(
    private productServe: ProductService,
    private router: Router
  ){}
  form: FormGroup = new FormGroup({
    type:new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    photo: new FormControl(null, Validators.required),
    gallery: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    link: new FormControl(null, Validators.required),
  });
  submited = false;
  submit(){
    if(this.form.invalid){
      return;
    }

    this.submited = true;
    const product = {
      type: this.form.value.type,
      title:this.form.value.title,
      photo: this.form.value.photo,
      gallery: this.form.value.gallery,
      description: this.form.value.description,
      price: this.form.value.price,
      date: new Date(),
      link: this.form.value.link, 
      like: 0,
    }

    this.productServe.create(product).subscribe(res => {
      this.form.reset();
      this.submited = false;
      this.router.navigate(['/'])
    })
  }


}
