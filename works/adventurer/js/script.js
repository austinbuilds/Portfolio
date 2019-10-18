$(document).ready(() => {

  // Fade In : Body
  $('body').hide().fadeIn(1000);

  // Parallax : Hero
  $(window).scroll(() => {
    let wScroll = $(this).scrollTop();
    $('.parallax').css({
      'transform': 'translate(0px, ' + wScroll / -110 + '%)'
    });
    $('.grid__hero').css({
      'transform': 'translate(0px, ' + wScroll / 40 + '%)'
    });
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
