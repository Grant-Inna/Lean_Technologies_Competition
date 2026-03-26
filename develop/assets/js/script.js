$(document).ready(function () {
   
   /* читать дальше */
   
   if ($('.hidden_text').length > 0) {
      let $parent = $('.hidden_text');
      
      $parent.on('click', (event) => {openAnswer($(event.target).closest($parent))});
   }
   
   if ($('.qa__block').length > 0) {
      let $parent = $('.qa__block'),
          $btn = $('.qa__block_headline');
      
      $btn.on('click', (event) => {openAnswer($(event.target).closest($parent))});
   }
   
   function openAnswer(target) {
      let hidden = $(target).find('.hidden');
      
      if ($(target).hasClass('open')) {
         $(target).find(hidden).slideUp(300); // ради чего всё затевалось - показать скрытое
         $(target).removeClass('open');
      } else {
         $(target).find(hidden).slideDown(200);
         $(target).addClass('open');
      }
   }
   
    /*  плоавный скролл в рамках страницы  */
   
   if ($('#totop').length > 0) {
      
      let scroll = $('body').prop('scrollHeight'),
          height = $(window).height(),
          $totop = $('#totop');
      
      if ( scroll > height - 100 ) {
         $totop.show();
         $totop.on( 'click', (event) => goTo(event))
      } else {
         $totop.hide();
      }
   }
   function goTo(event) {
      event.preventDefault();
      let id = $('.cover_block'),
            speed = 150;
      
      $('body, html').animate({ scrollTop: $(id).offset().top }, speed);
   }
   
   
});
