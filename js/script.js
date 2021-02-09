document.addEventListener( 'DOMContentLoaded', () => {

    // --  -- Tabs -- Табы -- --

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

    // -- -- Timer -- Таймер -- --

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
 });