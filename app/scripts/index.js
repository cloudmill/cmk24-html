import $ from "jquery";
import App from "./main";
import Swiper from "swiper";
import Inputmask from "inputmask";

$(document).ready(function() {

  // HEADER
  headerScroll();

  anchor ();

  burger();


  cllick ();

  tooltip ()


  // SLIDERS
  slider();


  // MODALS
  modal();

  mask ();

  formWarn ();

});

let headerScroll = function() {

  if ( $(window).scrollTop() > 0 ){
    $('header').addClass('header--scroll');
    $('.header__logo').css('display', 'none');
    $('.header__logo--scroll').css('display', 'block');
    $('.header__phone').addClass('header__phone--scroll');
    $('.button--header').addClass('button--header--scroll');
  }
  $(window).on('scroll', function(){
    $('header').addClass('header--scroll');
    $('.header__logo').css('display', 'none');
    $('.header__logo--scroll').css('display', 'block');
    $('.header__phone').addClass('header__phone--scroll');
    $('.button--header').addClass('button--header--scroll');
    if (($('.burger').hasClass('noneScroll') !== true) && ($(window).scrollTop() !== 0)){

      $('.burger').addClass('burger--scroll');

    }

    if ( $(window).scrollTop() == 0 ){
      $('header').removeClass('header--scroll');
      $('.header__logo').css('display', 'block');
      $('.header__logo--scroll').css('display', 'none');
      $('.header__phone').removeClass('header__phone--scroll');
      $('.button--header').removeClass('button--header--scroll');
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

  $('.burger-menu').on('click','a', function(){
    $('.burger-menu').removeClass('burger-menu--active');
    $('.burger').removeClass('burger--active');
    $('header').removeClass('header--burger');
    $('.burger').removeClass('noneScroll');
  });
}

function modal() {

  $(".js--modal").on("click", function () {

    const modal = $(this).attr("href");

    $(".modal").addClass("modal--active");
    $(modal).addClass("modal__item--active");


    $(".modal").on("click", event => {
      if ($(event.target).hasClass("modal") || $(event.target).hasClass("svg-cross")) {

        $(".modal").removeClass("modal--active");
        $(".modal__item--active").removeClass("modal__item--active");
        $('.modal__thanks').css('display', 'none');

      }
    });

  });

  $('.button--modal').on('click', function(){
    if (($('#chec').prop('checked') && (( $('#callphone').val().length > 1) || ($('#email').val().length > 5) )) || ($('#callcheck').prop('checked') && (( $('#callphone').val().length > 1) || ($('#email').val().length > 5) ))){
      $('.modal__thanks').css('display', 'flex');
      $('.modal-form__consent').removeClass('modal-form__consent--red');
      $('.consent-checkbox').removeClass('consent-checkbox--red');
    }else{
      $('.modal-form__consent').addClass('modal-form__consent--red');
      $('.consent-checkbox').addClass('consent-checkbox--red');
    }
    console.log($('#callphone').val().length);
 });

}

function mask (){
  
  Inputmask("+7(9999999999").mask("#callphone");
}




function cllick () {
  $('.button').on('click', function(e){
    if ($(this).hasClass('button--header')){
      $(this).append('<div class = "circle circle--header"></div>')
    }else{
      $(this).append('<div class = circle></div>')
    }
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
    $('.circle--header').remove()
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


function formWarn () {

  $('input, textarea').on('blur', function(){
    console.log('dfd');
    if ($(this).val().length < 2){

      $(this).addClass('form__input--warn');
      $(this).siblings('.text-warn').css('display', 'block');

    }else{

      $(this).removeClass('form__input--warn');
      $(this).siblings('.text-warn').css('display', 'none');

    }
    
  });
}


function anchor () {

  $(window).on('scroll', function(){

    var $sections = $('.section');
    $sections.each(function(i,el){
          var top  = $(el).offset().top - 400;
          var bottom = top + $(el).height();
          var scroll = $(window).scrollTop();
          var id = $(el).attr('id');
        if( scroll > top && scroll < bottom){
              $('a.nav-active').removeClass('nav-active');
              $('a[href = "#' + id + '"]').addClass('nav-active');
  
        }
    })
  });


  $("nav").on("click","a", function (event) {
    
    event.preventDefault();

    
    var id  = $(this).attr('href'),

    
    top = $(id).offset().top - 100;
     
    
    $('body,html').animate({scrollTop: top}, 400);
});


}