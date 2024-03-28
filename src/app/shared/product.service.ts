import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from './interfaces';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  type = 'Phone';
  cartProducts: Product[] = [];
  private cartSizeSubject = new BehaviorSubject<number>(0);
  cartSize$ = this.cartSizeSubject.asObservable();

  setType(type:any){
    this.type = type;
  }


  addProduct(product:any){
    this.cartProducts.push(product);
    this.updateCartSize();
  }

  removeProduct(productId: string) {
    const index = this.cartProducts.findIndex(p => p.id === productId);
    if (index > -1) {
      this.cartProducts.splice(index, 1);
      this.updateCartSize();
    }
  }

  public updateCartSize() {
    this.cartSizeSubject.next(this.cartProducts.length);
  }



  create(product: any){
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
    .pipe(map( (responseData : any) => {
      return {
        ...product,
        id: responseData.title,
        date: new Date(product.date)
      }
    }))
  }

  getAll(){
    return this.http.get<{[key: string]: any}>(`${environment.fbDbUrl}/products.json`)
    .pipe(
      map(responseData => {
        const productsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            productsArray.push({ ...responseData[key], id: key });
          }
        }
        return productsArray;
      })
    );
  }


  removeItem(id: string){
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  updateItem(product: Product){
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }


  getById(id: string): Observable<Product>{
    return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
    .pipe(
      map(responseData => {
        return { ...responseData, id };
      })
    );
  }
}

