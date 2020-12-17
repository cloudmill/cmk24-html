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

  formId();

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
    $('.button--header').addClass('button--blue button--blue--header-size');
    if (($('.burger').hasClass('noneScroll') !== true) && ($(window).scrollTop() !== 0)){

      $('.burger').addClass('burger--scroll');

    }

    if ( $(window).scrollTop() == 0 ){
      $('header').removeClass('header--scroll');
      $('.header__logo').css('display', 'block');
      $('.header__logo--scroll').css('display', 'none');
      $('.header__phone').removeClass('header__phone--scroll');
      $('.button--header').removeClass('button--blue button--blue--header-size');
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
    if ( ((counter % 2) == 1) && (($('.burger').hasClass('burger--scroll') || ($(window).scrollTop() == 0)))){
      $('.burger').removeClass('burger--scroll');
      $('.burger').addClass('noneScroll');
    }else{
      $('.burger').removeClass('noneScroll');
      if ( $(window).scrollTop() !== 0 ){
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
      if ($(event.target).hasClass("modal") || $(event.target).hasClass("svg-cross") || $(event.target).hasClass("modal__close")) {

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
 });

}

function mask (){

  Inputmask({ 
    mask: "+7(999)[ 999-99-99]",
    greedy: false,
    autoUnmask: true,
    clearIncomplete: true,
    showMaskOnHover: false,
    autoUnmask: true,
    
  
  
  }).mask("#callphone");
  
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
    $('.circle').remove();

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

  $(window).on('click', function(event){

    if (!$(name).is(event.target) && !$('.link').is(event.target) ){

      $(name).removeClass('tool-active');
      $('.arrow').removeClass('arrow-block');
      $('.arrowl').removeClass('arrow-block');
      $(name).removeClass('tool-activel');

    }

  });
}


function formWarn () {

  $('.button--modal').on('click', function(){
      let mod = $(this).parent();
      mod.find('.form__input').each(function(){
        if ($(this).val() < 2) {
          $(this).addClass('form__input--warn');
          $(this).siblings('.text-warn').css('display', 'block');
        }else{
          $(this).removeClass('form__input--warn');
          $(this).siblings('.text-warn').css('display', 'none');
        }
      });
      
      
  });

  $(window).on('click', function(event){

    if ( !$('.button--modal').is(event.target) ){
          $('.form__input').removeClass('form__input--warn');
          $('.form__input').siblings('.text-warn').css('display', 'none');
    }
  });

}


function anchor () {

  $(window).on('scroll', function(){

    var $sections = $('.section');
    $sections.each(function(i,el){
          var top  = $(el).offset().top - 600;
          var bottom = $(el).offset().top + $(el).height();
          var scroll = $(window).scrollTop();
          var id = $(el).attr('id');
        if( scroll > top && scroll < bottom){
              $('a.nav-active').removeClass('nav-active');
              $('a[href = "#' + id + '"]').addClass('nav-active');
  
        }
        if ($(window).scrollTop() == 0){
          $('a.nav-active').removeClass('nav-active');
        }
    })
  });


  $("nav").on("click","a", function (event) {
    
    event.preventDefault();

    
    let id  = $(this).attr('href'),

    
    top = $(id).offset().top - 100;
     
    
    $('body,html').animate({scrollTop: top}, 400);
  });

  $('.logo').on('click', function(event){
    event.preventDefault();

    let id  = $(this).attr('href'),

    
    top = $(id).offset().top - 100;

    $('body,html').animate({scrollTop: top}, 400);
  });
}


function formId() {

  var data;
  var modal;
  $('.button').on('click', function(){
    if ( $(this).is('[data-form-id]') ){
      data = $(this).attr('data-form-id');
      modal = $(this).attr('href')
    }

    $(modal).find('[name="form-id"]').val(data);
    console.log(modal);
  });

}