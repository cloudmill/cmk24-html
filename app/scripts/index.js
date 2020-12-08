import $ from "jquery";
import App from "./main";
import Swiper from "swiper";
import { createPopper } from '@popperjs/core';

$(document).ready(function() {

  // HEADER
  headerScroll();


  burger();


  cllick ();

  tooltip ()


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
    if (($('.burger').hasClass('noneScroll') !== true) && ($(window).scrollTop() !== 0)){

      $('.burger').addClass('burger--scroll');

    }

    if( $(window).scrollTop() == 0 ){
      $('header').removeClass('header--scroll');
      $('.header__logo').css('display', 'block');
      $('.header__logo--scroll').css('display', 'none');
      $('.header__phone').removeClass('header__phone--scroll');
      $('.header__button').removeClass('header__button--scroll');
      $('.burger').removeClass('burger--scroll');
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

function burger() {
  var counter = 0; 
  $('.burger').on('click', function(){
    counter =counter +1;
    let height = $('.start').innerHeight()
    $('.burger').toggleClass('burger--active');
    $('.burger-menu').toggleClass('burger-menu--active').css('height', height);
    $('header').toggleClass('header--burger');
    console.log(counter);
    if ( ((counter % 2) == 1) && (($('.burger').hasClass('burger--scroll') || ($(window).scrollTop() == 0)))){
      $('.burger').removeClass('burger--scroll');
      $('.burger').addClass('noneScroll');
    }else{
      $('.burger').removeClass('noneScroll');
      if ( $(window).scrollTop() !== 0 ){
        console.log('dijfi')
        $('.burger').addClass('burger--scroll');
      }
      
    }
  });
}

function modal() {

  $(".js--modal").on("click", function () {

    const modal = $(this).attr("href");

    $(".modal").addClass("modal--active");
    $(modal).addClass("modal__item--active");


    $(".modal").on("click", event => {
      if ($(event.target).hasClass("modal") || $(event.target).hasClass("modal__close")) {

        $(".modal").removeClass("modal--active");
        $(".modal__item--active").removeClass("modal__item--active");
        console.log('vfg')

      }
    })

  });

}




function cllick () {
  $('.button').on('click', function(e){
    $(this).append('<div class = circle></div>')

      var position = $(this).offset();
      var topX = (e.pageX - (position.left+65));
      var leftY = (e.pageY - (position.top+65));
      $('.circle').css({
        'top': leftY + 'px',
        'left': topX + 'px',
      });
  });

  $('.button').on('mouseup', function(){
    $('.circle').remove()
  });
  
}




function tooltip () {
  var name;
  $('.link').on('click', function(){
    if (name !== ('#tool-' + $(this).attr('id'))){
      $(name).removeClass('tool-active');
      $(name).removeClass('tool-activel');
      $('.arrow').removeClass('arrow-block');
      $('.arrowl').removeClass('arrow-block');
    }
    name = ('#tool-' + $(this).attr('id'));
    $(this).children('.arrow').toggleClass('arrow-block');
    $(this).children('.arrowl').toggleClass('arrow-block');
    if ($(this).hasClass('left')){
      $(name).toggleClass('tool-activel');
    }else{
      $(name).toggleClass('tool-active');
    }
    
  });
}
