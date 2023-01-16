$(document).ready(function(){
    /* Слайдер */
    $('.slider__inner').slick({
        prevArrow: `<button type="button" class="slick-prev"><img src='img/icons/left.svg' alt='arrow-left'></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src='img/icons/right.svg' alt='arrow-right'></button>`,
        speed: 1200,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              dots: true
            }
          }
        ]
    });

    /* Табы */
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });


      /* Ссылка подробнее в карточках */
      function  toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          });
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      /* Модальные окна */
      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });

      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
      });

      $('.button_mini').each(function(i){
        $(this).on('click', function() {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
      });

      /* Валидация формы */
      $('#consultation-form').validate({
        rules: {
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Введите своё имя",
          phone: "Введите свой номер телефона",
          email: {
            required: "Введите свою почту",
            email: "Введите корректный почтовый адрес"
          }
        }
      });
      $('#consultation form').validate({
        rules: {
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Введите своё имя",
          phone: "Введите свой номер телефона",
          email: {
            required: "Введите свою почту",
            email: "Введите корректный почтовый адрес"
          }
        }
      });
      $('#order form').validate({
        rules: {
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Введите своё имя",
          phone: "Введите свой номер телефона",
          email: {
            required: "Введите свою почту",
            email: "Введите корректный почтовый адрес"
          }
        }
      });

      /* Маска номера телефона */
      $('input[name="phone"]').mask("+7 (999) 999-9999");

      /* Отправка письма с сайта */
      $('form').submit(function(e){
        e.preventDefault();

        /* Если форма не прошла валидацию мы ничего не отправляем */
        if(!$(this).valid()) {
          return;
        }

        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function(){
          $(this).find('input').val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
        });
        return false;
      })

      /* Плавный скролл вверх */
      $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }

        $("a[href=#up]").click(function() {
          const _href = $(this).attr("href");
          $(html, body).animate({scrollTop: $(_href).offset().top+"px"});
          return false;
        });
      });

      /* Библиотеки анимаций animate.css и wow.js */
      new WOW().init();
  });