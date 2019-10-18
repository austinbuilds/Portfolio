$(document).ready(function () {

  // Fade In : Body
  $('body').hide().fadeIn(1000);
  $('.herodisplay h2').hide().fadeIn(2000);
  $('.herodisplay a').hide().fadeIn(4000);

  // Parallax Scroll : Hero
  $(window).scroll(function () {
    var wScroll = $(this).scrollTop();
    $('.herodisplay').css({
      'transform': 'translate(0px, ' + wScroll / 15 + '%)'
    });
  });

  // Toggle Fade Out : Nav
  $(window).scroll(function () {
    var Tscroll = $(this).scrollTop(),
      elementOffset = $('#about').offset().top,
      distance = (elementOffset - Tscroll);
    if (distance < 850) {
      $('nav').fadeOut(200);
    } else {
      $('nav').fadeIn(200);
    }
  });

  // Smooth Scroll : Body
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            };
          });
        }
      }
    });
});
