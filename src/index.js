'use strict';

$(document).ready(function() {
  let currentPosition = 0;
  let slideWidth = 430;
  let slides = $('.slide');
  let numberOfSlides = slides.length;
  $('#slidesContainer').css('overflow', 'hidden');
  
  slides
  .wrapAll('<div id="slideInner"></div>')
  .css({
    'float' : 'left',
    'width' : slideWidth
  });
  
  $('#slideInner').css('width', slideWidth * numberOfSlides);
  
  $('#slider')
    .prepend('<span class="control" id="leftArrow">Move left</span>')
    .append('<span class="control" id="rightArrow">Move right</span>');
  
  directControls(currentPosition);

  slides.append('<div class="navigation"></div>');
  slides.each(function() {
  slides.find('.navigation').append("<span class ='dot' rel='"+$(this).index()+"'></span>"); 
    $(this).addClass('#slidesContainer'+$(this).index());
    $(this).find('span').first().addClass('on'); 
  });

  $('.dot')
  .bind('click', function() {
    $('span').removeClass('on');
    $(this).addClass('on');
    
    let currentNumber = $('#slidesContainer').index();
    let newPosition = $(this).attr('rel');
    let movesNumber = currentNumber - newPosition;
  
      $('#slideInner').animate({
        'marginLeft' : slideWidth*(movesNumber-1)
      });
  });

  $('.control')
    .bind('click', function() {
      currentPosition = ($(this).attr('id') === 'rightArrow')
      ? currentPosition+1 : currentPosition-1;
      
      $('.dot').each(function() {
      $('span').removeClass('on');
      if ($('[rel^="'+currentPosition+'"]')) {
        let filledDot = $('[rel^="'+currentPosition+'"]') 
        filledDot.addClass('on');
      }
    }) 
    
    directControls(currentPosition);
    $('#slideInner').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  function directControls(position) {
    if (position === 0) {
      $('#leftArrow').hide()
    } else {
      $('#leftArrow').show() 
      }
    if (position === numberOfSlides - 1) {
      $('#rightArrow').hide() 
    } else { 
      $('#rightArrow').show()
      }
    }
});
 