import $ from "jquery";
import App from "./main";
import Swiper from "swiper";

$(document).ready(function() {

  // HEADER
  headerScroll();


  // SLIDERS
  slider();


  // MODALS
  modal();

});

let headerScroll = function() {
  $(window).on('scroll', function(){
    $('header').addClass('header--scroll');
    $('.header__logo').css('display', 'none');
    $('.header__logo--scroll').css('display', 'block');
    $('.header__phone').addClass('header__phone--scroll');
    $('.header__button').addClass('header__button--scroll');

    if( $(window).scrollTop() == 0 ){
      $('header').removeClass('header--scroll');
      $('.header__logo').css('display', 'block');
      $('.header__logo--scroll').css('display', 'none');
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

function modal() {

  $(".js--modal").on("click", function () {

    const modal = $(this).attr("href");

    $(".modal").addClass("modal--active");
    $(modal).addClass("modal__item--active");


    $(".modal").on("click", event => {
      if (!event.target.classList.contains("modal__content")) {

        $(".modal").removeClass("modal--active");
        $(".modal__item--active").removeClass("modal__item--active");

      }
    })

  });

}
