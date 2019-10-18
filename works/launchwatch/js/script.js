$(document).ready(() => {

  // Fade In : Body
  $('body').hide().fadeIn(1000);
  $('#herotext2').hide().fadeIn(1200);
  $('.tog').hide();

  // Parallax Scroll : Hero
  $(window).scroll(() => {
    let wScroll = $(this).scrollTop();
    $('#planet').css({
      'transform': 'translate(0px, ' + wScroll / 120 + '%)'
    });
    $('#herotext').css({
      'transform': 'translate(0px, ' + wScroll / 70 + '%)',
    });
    $('#herotext2').css({
      'transform': 'translate(0px, ' + wScroll / 70 + '%)',
    });
    $('#ship').css({
      'transform': 'translate(0px, -' + wScroll / 90 + '%)'
    });
  });

  // Parallax CSS Transform : Hero
  $(window).mousemove((event) => {
    $("#planet").css({
      "margin-left": -(event.pageX * 0.003),
      "margin-top": -(event.pageY * 0.003)
    });
    $("#herotext").css({
      "margin-left": -(event.pageX * 0.03),
      "margin-top": -(event.pageY * 0.03)
    });
    $("#herotext2").css({
      "margin-left": -(event.pageX * 0.03),
      "margin-top": -(event.pageY * 0.03)
    });
    $("#ship").css({
      "margin-left": -(event.pageX * 0.015),
      "margin-top": -(event.pageY * 0.015)
    });
  });

  // Updater
  callme = () => {
    let height = $('#heroimg').css('height');
    $('#herodiv').css({
      'height': height
    });
    setTimeout(callme, 50);
  }
  callme();
});
