const modal = require("./modal");

function timer() {
 //Timer
    const time = '2021-06-05';

    function getDateRemainding(endtime) {
        const remaindDate = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(remaindDate / (1000 * 60 * 60 * 24)),
            hours = Math.floor(remaindDate / (1000 * 60 * 60)% 24),
            minutes = Math.floor(remaindDate / (1000 / 60 )% 60),
            seconds = Math.floor((remaindDate / 1000)% 60);
        
        return {
            'total': remaindDate,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    function getElrmrnts(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days'), 
            hours = timer.querySelector('#hours'), 
            minutes = timer.querySelector('#minutes'), 
            seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(setDate, 1000);

        setDate();
        function setDate() {
            const t = getDateRemainding(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //console.log(t.total);
            
            if (t.total <= 0) {
            clearInterval(timeInterval);
            }
        }
    }
    getElrmrnts('.timer', time);

    function getZero(num) {
        if (num >= 0 && num <10) {
            return `0${num}`;
        } else if(num < 0){
            return `00`;
        } else {
            return `0${num}`;
        }
    }
}
module.exports = timer;