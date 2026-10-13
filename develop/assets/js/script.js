$(document).ready(function () {
   
   /* читать дальше */
   
   if ($('.hidden_text').length > 0) {
      let $show = $('.more');
      let $hide = $('.hide');
      
      $show.on('click', (event) => {showText($(event.target))});
      $hide.on('click', (event) => {hideText($(event.target))});
   }
   
   function showText(target) {
      let $parent = $('.text-20-gray'),
          $text = $('.hidden_text');
      // console.log($(target).closest('.more'));
      $(target).closest($parent).find($text).slideDown(300);
      $(target).closest('.more').hide();
   }
   function hideText(target) {
      let $parent = $('.text-20-gray'),
          $text = $('.hidden_text');
      // console.log($(target).closest('.more'));
      $(target).closest($parent).find($text).slideUp(300);
      $(target).closest($parent).find('.more').show();
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
   
   
   function twistDesk() {
      $('.block_menu').show();
      $('.block_mobile-menu').hide();
   }
   function twistMobile() {
      $('.block_menu').hide();
      $('.block_mobile-menu').show();
   }
   
   $(window).on('resize', () => {
      if (window.innerWidth > 1030 ) {
         $('.block_main__flex').fadeIn(200);
         $('.header__content').removeClass('show');
         twistDesk();
      }
      if (window.innerWidth <= 1030 ) {
         twistMobile();
         $('.header__content').removeClass('show');
         $('.block_mobile-menu').hide();
         $('.header__content.show .block_main__flex').fadeOut(200);
      }
   });
   
   
   if ($('.menu_icon__holder').length > 0) {
      $('.block_main__flex').fadeIn(200);
      $('.header__content').removeClass('show');
      if (window.innerWidth <= 1030 ) {
         $('.block_menu').hide();
      }
      $('.menu_icon__holder').on( 'click', () => openMenu())
   }
   function openMenu() {
      
      let $mobile = $('.block_mobile-menu'),
          $header = $('.header__content'),
          $content = $('.block_main__flex'),
          $menu = $('.block_menu');
      
      if ($header.hasClass('show')) { // есть класс - убираем
         $($header).removeClass('show');
         $($mobile).fadeOut(200);
         $($content).fadeIn(200)
         
      } else { // показываем
         $($header).addClass('show');
         $($mobile).fadeIn(200);
         $($content).fadeOut(200);
      }
   }
   
   var myicon = $('#trigger');
   var mypopup = $('#mypopup');

   myicon.on('mouseover', showPopup);
   myicon.on('mouseout', hidePopup);

   function showPopup() {
     $(mypopup).fadeIn();
   }
   function hidePopup() {
     $(mypopup).fadeOut();
   }

   
   // $('#trigger').on('click', showForm);
   // $('#popup_close').on('click', hideForm);
   function showForm() {
      $('#popup').fadeIn(200);
      $('#bg').fadeIn(200);
      $(mypopup).hide();
   }
   
   function hideForm() {
      $('#popup').fadeOut(200);
      $('#bg').fadeOut(200);
   }

});
