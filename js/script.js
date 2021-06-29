'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
    timer = require('./modules/timer'),
    calc = require('./modules/calc'),
    forms = require('./modules/forms'),
    modal = require('./modules/modal'),
    slider = require('./modules/slider'),
    cards = require('./modules/cards');

    tabs();
    timer();
    calc();
    forms();
    modal();
    slider();
    cards();
});
