import $ from "jquery";
import App from "./main.js";

$(document).ready(function() {
  let app = new App();
  headerScroll();
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