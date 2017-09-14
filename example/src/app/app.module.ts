import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 2,
  centeredSlides: true,
  keyboardControl: true,
  zoom: true,
  zoomMax: 3
};

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    SwiperModule.forRoot(SWIPER_CONFIG)
  ]
})
export class AppModule {}
