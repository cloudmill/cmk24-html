(function(w, d, s, o){
    if (!window.__marquiz) window.__marquiz=[];
    window.marquiz = function(){window.Marquiz ? Marquiz.add(arguments) : window.__marquiz.push(arguments)}
    var j = d.createElement(s); j.async = true; j.src = '//script.marquiz.ru/v2.js';j.onload = function() {
      if (document.readyState !== 'loading') Marquiz.init(o);
      else document.addEventListener("DOMContentLoaded", function() {
        Marquiz.init(o);
      });
    };
    d.head.insertBefore(j, d.head.firstElementChild);
  })(window, document, 'script', {
      host: '//quiz.marquiz.ru',
      id: '5fd78c071c7c3a0044d42961',
      autoOpen: false,
      autoOpenFreq: 'once',
      openOnExit: false,
      disableOnMobile: false
    }
  );