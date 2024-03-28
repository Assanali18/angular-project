import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode  } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill'
import { AuthInterseptor } from './shared/auth.interseptor';
import { ProductComponent } from './product/product.component';
import { SortingPipe } from './shared/sorting.pipe';
import { GalleryComponent } from './gallery/gallery.component';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from './swiper.directive';
register();


@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		MainPageComponent,
		ProductPageComponent,
		CartPageComponent,
		ProductComponent,
		SortingPipe,
  		GalleryComponent,
    SwiperDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		QuillModule.forRoot(),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
  	providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterseptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
