$(function(){
$('#youtubeVideoIframe').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });

$(window).resize(function(){
$('#youtubeVideoIframe').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
  });
});