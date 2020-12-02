import $ from "jquery";
import App from "./main.js";
import "./modals";
import Swiper from "swiper";

$(document).ready(function() {
  let app = new App();
  headerScroll();
  slider();
  mySwiper();
});

let headerScroll = function() {
  $(window).on('scroll', function(){
    $('header').addClass('header--scroll');
    $('.header__logo').addClass('header__logo--scroll');
    $('.header__phone').addClass('header__phone--scroll');
    $('.header__button').addClass('header__button--scroll');
    if( $(window).scrollTop() == 0 ){
      $('header').removeClass('header--scroll');
      $('.header__logo').removeClass('header__logo--scroll');
      $('.header__phone').removeClass('header__phone--scroll');
      $('.header__button').removeClass('header__button--scroll');
    }
  });
}

function slider() {

  $(".slider-block").each(function () {

      const

          slider = $(this).find(".swiper-container"),
          
          buttons = {
              left: $(this).find(".button--left"),
              right: $(this).find(".button--right"),
          },

          swiper = new Swiper(slider[0], {
            slidesPerGroup: 1,
            slidesPerView: 'auto',
            spaceBetween: 20,
              navigation: {
                  nextEl: buttons.right[0],
                  prevEl: buttons.left[0],
              },
          });
      
  });
}
