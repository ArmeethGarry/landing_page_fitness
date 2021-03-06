document.addEventListener( 'DOMContentLoaded', () => {

    // --||--||--||--||--||--||--//
    // --  -- Tabs -- Табы -- ---//
    // --||--||--||--||--||--||--//

    let tabs = document.querySelectorAll( '.tabheader__item' ),
        tabsContent = document.querySelectorAll( '.tabcontent' ),
        tabsParent = document.querySelector( '.tabheader__items' );

    function hideTabContent() {
        tabsContent.forEach( item => {
            item.classList.add( 'hide' );
            item.classList.remove( 'show', 'fade' );
        });

        tabs.forEach( item => {
            item.classList.remove( 'tabheader__item_active' );
        });

    }

    function showTabContent( i = 0 ) {
        tabsContent[i].classList.add( 'show', 'fade' );
        tabsContent[i].classList.remove( 'hide' );
        tabs[i].classList.add( 'tabheader__item_active' );
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener( 'click', (event) => {
        const target = event.target;

        if ( target && target.classList.contains( 'tabheader__item' )) {
            tabs.forEach( (item, i) => {
                if ( item == target ) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // --||--||--||--||--||--||---//
    // -- -- Timer -- Таймер -- --//
    // --||--||--||--||--||--||---//

    const deadLine = '2021-03-09';

    function getTimeRemaining( endtime ) {
        const t = Date.parse( endtime ) - Date.parse( new Date() ),
              days = Math.floor( t / (1000 * 60 * 60 * 24) ),
              hours = Math.floor( (t / (1000 * 60 * 60)) % 24 ),
              minutes = Math.floor( (t / (1000 * 60)) % 60 ),
              seconds = Math.floor( (t / 1000) % 60 );

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero( num ) {
        if ( num >= 0 && num < 10 ) return '0' + num;
        else return num;
    }

    function setClock( selector, endtime ) {
        const clock = document.querySelector( selector ),
              days = clock.querySelector( '#days' ),
              hours = clock.querySelector( '#hours' ),
              minutes = clock.querySelector( '#minutes' ),
              seconds = clock.querySelector( '#seconds' ),
              timeInterval = setInterval( updateTime, 1000 );

        updateTime();

        function updateTime() {
            const time = getTimeRemaining( endtime );

            days.innerHTML = getZero( time.days );
            hours.innerHTML = getZero( time.hours );
            minutes.innerHTML = getZero( time.minutes );
            seconds.innerHTML = getZero( time.seconds );

            if ( time.total <= 0 ) clearInterval( timeInterval );
        }
    }

    setClock( '.timer', deadLine );

    // --||--||--||--||--|--||--||--||--||--//
    // -- Modal Window -- Модальное Окно ---//
    // --||--||--||--||--|--||--||--||--||--//

    const modalWindowOpen = document.querySelectorAll( '[data-modal]' ),
          modalCloseBtn = document.querySelector( '[data-close]' ),
          modal = document.querySelector( '.modal' );

    // Вызов модального окна при нажатии кнопки "Связаться с нами"
    modalWindowOpen.forEach( btn => {
        btn.addEventListener( 'click', () => {
            openModal();
        });
    });

    // Вызов модального окна с помощью метода setTimeout,
    //через 10 сек после открытия сайта
    const modalOpenTimer = setTimeout( openModal, 15000);

    // Вызов модального окна при прокрутки до конца страницы
    window.addEventListener( 'scroll', showModalByScroll );

    // Закрытие модального окна при нажатии на крестик
    modalCloseBtn.addEventListener( 'click', () => {
        closeModal();
    });

    // Закрытие модального окна при клике вне модального окна 
    modal.addEventListener( 'click', (e) => {
        if (e.target === modal ) closeModal();
    });

    // Закрытие модального окна с помощью клавиши 'Escape'
    document.addEventListener( 'keydown', (e) => {
        if ( e.code = 'Escape') closeModal();
    });

    //Функция открытия модального окна
    function openModal() {
        modal.classList.add( 'show' );
        modal.classList.remove( 'hide' );
        document.body.style.overflow = 'hidden';
        clearTimeout( modalOpenTimer );
    }

    // Функция закрития модального окна
    function closeModal() {
        modal.classList.add( 'hide' );
        modal.classList.remove( 'show' );
        document.body.style.overflow = '';
    }

    // Функция показа модального окна при прокрутки
    // до конца странцы
    function showModalByScroll() {
        if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener( 'scroll', showModalByScroll );
        }
    }

    // Создаем class который создает карточки Меню
    class createMenuCard {
        constructor( src, alt, title, descr, price, parentSelector, ...classesCSS) {
            this.src = src,
            this.alt = alt,
            this.title = title,
            this.descr = descr,
            this.price = price,
            this.classesCSS = classesCSS,
            this.parent = document.querySelector( parentSelector )
        }

        create() {
            const element = document.createElement( 'div' );
            if ( this.classesCSS.length === 0 ) {
                this.element = 'menu__item';
                element.classList.add( this.element );
            } else {
                this.classesCSS.forEach( className => element.classList.add( className ) );
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
            `;

            this.parent.append( element );
        }
    }

    // Создаем катрочки Меню с помощью class createMenuCard
    //
    // Карточка Меню - Фитнесс
    new createMenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        600,
        '.menu .container',
        'menu__item'
    ).create();
    
    // Карточка Меню - Премиум
    new createMenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        1500,
        '.menu .container',
        'menu__item'
    ).create();

    // Карточка Меню - Постное
    new createMenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        1100,
        '.menu .container',
        'menu__item'
    ).create();
 });

 //--||-- --||-- --||-- --||--//
 // Создание функции отправли //
 // данных из FORM.           //
 //--||-- --||-- --||-- --||--//

 const forms = document.querySelectorAll( 'form' );
 const message = {
     loading: 'Загрузка...',
     success: 'Спасибо! Скоро мы свяжемся с Вами!',
     failure: 'Что-то пошло не так...',
 };

 forms.forEach( item => {
     postData( item );
 });

 function postData( form ) {
     form.addEventListener( 'submit', (e) => {
        e.preventDefault(); // отмена перезагрузки при отправки формы

        let statusMessage = document.createElement( 'div' );
        statusMessage.classList.add( 'status' );
        statusMessage.textContent = message.loading;
        form.appendChild( statusMessage );

        const req = new XMLHttpRequest();
        req.open( 'POST', 'server.php' );
        req.setRequestHeader( 'Content-type', 'application/json; charset=utf-8' );

        const formData = new FormData( form );

        const obj = {};
        formData.forEach( (v, k) => {
            obj[k] = v;
        });

        const json = JSON.stringify( obj );

        req.send( json );

        req.addEventListener( 'load', () => {
            if ( req.status === 200 ) {
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout( () => {
                    statusMessage.remove();
                }, 2500);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
     });
 }