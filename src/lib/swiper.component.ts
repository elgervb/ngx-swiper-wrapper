import { Component, Optional, DoCheck, Input, Output, EventEmitter,
  HostBinding, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { SwiperDirective } from './swiper.directive';

import { SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';

@Component({
  selector: 'swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements DoCheck {
  private childrenDiff: number;

  private paginationBulletRender: Function;

  @Input() index: number = null;

  @Input() fxShow: boolean = true;
  @Input() fxHide: boolean = false;

  @HostBinding('hidden')
  @Input() hidden: boolean = false;

  @Input() disabled: boolean = false;

  @Input() config: SwiperConfigInterface;

  @Input() useSwiperClass: boolean = true;

  @HostBinding('class.s-wrapper')
  @Input() useSwiperWrapperClass: boolean = true;

  @Output() indexChange = new EventEmitter<number>();

  @ViewChild('swiperSlides') swiperSlides: ElementRef;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  get isAtLast(): boolean {
    return (!this.directiveRef || !this.directiveRef.swiper) ?
      false : this.directiveRef.swiper.isEnd;
  }

  get isAtFirst(): boolean {
    return (!this.directiveRef || !this.directiveRef.swiper) ?
      false : this.directiveRef.swiper.isBeginning;
  }

  @Output('init'                   ) S_INIT                = new EventEmitter<any>();
  @Output('destroy'                ) S_DESTROY             = new EventEmitter<any>();

  @Output('scroll'                 ) S_SCROLL              = new EventEmitter<any>();
  @Output('progress'               ) S_PROGRESS            = new EventEmitter<any>();

  @Output('setTranslate'           ) S_SETTRANSLATE        = new EventEmitter<any>();
  @Output('setTransition'          ) S_SETTRANSITION       = new EventEmitter<any>();

  @Output('autoplay'               ) S_AUTOPLAY            = new EventEmitter<any>();
  @Output('autoplayStart'          ) S_AUTOPLAYSTART       = new EventEmitter<any>();
  @Output('autoplayStop'           ) S_AUTOPLAYSTOP        = new EventEmitter<any>();

  @Output('reachBeginning'         ) S_REACHBEGINNING      = new EventEmitter<any>();
  @Output('reachEnd'               ) S_REACHEND            = new EventEmitter<any>();

  @Output('slideChangeStart'       ) S_SLIDECHANGESTART    = new EventEmitter<any>();
  @Output('slideChangeEnd'         ) S_SLIDECHANGEEND      = new EventEmitter<any>();
  @Output('slideNextStart'         ) S_SLIDENEXTSTART      = new EventEmitter<any>();
  @Output('slideNextEnd'           ) S_SLIDENEXTEND        = new EventEmitter<any>();
  @Output('slidePrevStart'         ) S_SLIDEPREVSTART      = new EventEmitter<any>();
  @Output('slidePrevEnd'           ) S_SLIDEPREVEND        = new EventEmitter<any>();

  @Output('sliderMove'             ) S_SLIDERMOVE          = new EventEmitter<any>();

  @Output('swiperClick'            ) S_CLICK               = new EventEmitter<any>();
  @Output('swiperTap'              ) S_TAP                 = new EventEmitter<any>();
  @Output('swiperDoubleTap'        ) S_DOUBLETAP           = new EventEmitter<any>();
  @Output('swiperTouchStart'       ) S_TOUCHSTART          = new EventEmitter<any>();
  @Output('swiperTouchMove'        ) S_TOUCHMOVE           = new EventEmitter<any>();
  @Output('swiperTouchMoveOpposite') S_TOUCHMOVEOPPOSITE   = new EventEmitter<any>();
  @Output('swiperTouchEnd'         ) S_TOUCHEND            = new EventEmitter<any>();
  @Output('swiperTransitionStart'  ) S_TRANSITIONSTART     = new EventEmitter<any>();
  @Output('swiperTransitionEnd'    ) S_TRANSITIONEND       = new EventEmitter<any>();

  @Output('imagesReady'            ) S_IMAGESREADY         = new EventEmitter<any>();

  @Output('lazyImageLoad'          ) S_LAZYIMAGELOAD       = new EventEmitter<any>();
  @Output('lazyImageReady'         ) S_LAZYIMAGEREADY      = new EventEmitter<any>();

  @Output('paginationRendered'     ) S_PAGINATIONRENDERED  = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, @Optional() private defaults: SwiperConfig) {}

  ngDoCheck() {
    if (this.swiperSlides) {
      const children = this.swiperSlides.nativeElement.children.length;

      if (children !== this.childrenDiff) {
        this.childrenDiff = children;

        for (let i = 0; i < this.swiperSlides.nativeElement.children.length; i++) {
          this.swiperSlides.nativeElement.children[i].classList.add('swiper-slide');
        }

        this.directiveRef.update();
      }
    }
  }

  getConfig() {
    this.config = this.config || {};

    const options = new SwiperConfig(this.defaults);

    options.assign(this.config); // Custom config

    if (options.scrollbar === true) {
      options.scrollbar = '.swiper-scrollbar';
    }

    if (options.pagination === true) {
      options.pagination = '.swiper-pagination';
    }

    if (options.prevButton === true) {
      options.prevButton = '.swiper-button-prev';
    }

    if (options.nextButton === true) {
      options.nextButton = '.swiper-button-next';
    }

    if (options.pagination === '.swiper-pagination' && !options.paginationBulletRender) {
      if (!this.paginationBulletRender) {
        this.paginationBulletRender = (swiper, index, className) => {
          if (index === 0) {
            return '<span class="swiper-pagination-handle" index=' + index + '>' +
              '<span class="' + className + ' ' + className + '-first"></span></span>';
          } else if (index === (swiper.slides.length - 1)) {
            return '<span class="swiper-pagination-handle" index=' + index + '>' +
              '<span class="' + className + ' ' + className + '-last"></span></span>';
          } else {
            return '<span class="swiper-pagination-handle" index=' + index + '>' +
              '<span class="' + className + ' ' + className + '-middle"></span></span>';
          }
        };
      }

      options.paginationBulletRender = this.paginationBulletRender;
    }

    return options;
  }
}
