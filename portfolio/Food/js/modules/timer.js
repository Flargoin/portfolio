function timer(id, deadline) {
    /*
     Создаём функцию которая будет высчитывать разницу между нынешней датой и датой окончания акции :
        1) Создаём переменные для помещение числовых значений.
        2) Создаём техническую переменную в которую получаем разницу в милисекундах
        3) Создаём проверку на отрицательное значение
        4) Если t = 0 и меньше - показывать нули, если > нуля - преобразовывать милисекунды в нужные данные
        5) Вернуть объект с получившимся значениями.
     */
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    /* 
        Создаём функцию подстановки нуля однозначным числам.
    */
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    /* 
        Функция которая будет показывать время на странице:
        1) Получаем элементы на странице
        2) Вызываем обновление таймера (UpdataeClock) каждую секунду.
        3) Создаём внутри функцию обновления таймера:
            - помещаем в техническую переменную (t) возвращенный объект функцией getRemaining(), endtime придёт от setClock.
            - помещаем в каждый полученный элемент соответствующее значение объекта с вызовом функции getZero().
            - если общее число милисекунд меньше нуля, таймер не обновляется.
    */
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

export default timer;