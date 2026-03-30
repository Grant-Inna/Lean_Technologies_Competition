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
   $(window).on('resize', () => {
      if (window.innerWidth >= 770 ) {
         $('.block_main__flex').fadeIn(200);
         $('.header__content').removeClass('show');
         $('.block_menu').show();
      } else {
      
      }
   });
   
   
   if ($('.menu_icon__holder').length > 0) {
      $('.block_main__flex').fadeIn(200);
         $('.header__content').removeClass('show');
      $('.menu_icon__holder').on( 'click', () => openMenu())
   }
   function openMenu() {
      
      let $icon = $('.menu_icon__holder'),
          $header = $('.header__content'),
          $content = $('.block_main__flex'),
          $menu = $('.block_menu');
      
      if ($header.hasClass('show')) { // есть класс - убираем
         $($header).removeClass('show');
         $($menu).fadeOut(200);
         $($content).fadeIn(200)
         
      } else { // показываем
         $($header).addClass('show');
         $($menu).fadeIn(200);
         $($content).fadeOut(200);
      }
   }
});
