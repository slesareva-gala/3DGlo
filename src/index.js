// точка входа
import timer from './modules/timer';
import menu from './modules/menu';
import modal from './modules/modal';
import calc from './modules/calc';
import feedback from './modules/feedback';
import tabs from './modules/tabs';
import slider from './modules/slider';

timer("31 february 2022 01:15");
menu();
modal();
calc();
feedback();
tabs();

/*
 вызов: slider(init [, timeInterval]) возвращает null или строку, содержащую описание ошибки
 просмотр ошибок: console.log( slider(init [, timeInterval]) );
 где: 
 init: объект с указанием названий CSS классов, идентифицирующих элементы слайдера 
    {
      // ОБЯЗАТЕЛЬНЫЙ КЛАСС СЛАЙДЕРА
      // 
      // - слайдер, в верстке тег <ul></ul>
      slider: String,    

      // СЛАЙДЫ в верстке слайдера все теги <li></li>
      // описание класса в CSS должно стилизировать отображение слайда 
      // и содержать opacity: 0 и position отличный от static,
      // значение по умолчанию, 'slide-default' 
      slide: String,
      // маркирует активный слайд класс. Описание класса в CSS должно содержать: opacity: 1;
      // значение по умолчанию, 'slide-active-default' 
      slideActive: String,, 

      // НАВИГАЦИОННЫЕ КНОПКИ. Их классы должны иметь уникальные имена
      // не указание их в init, отсутствие тегов с таким классом приведут к ошибкам навигации 
      // - обе кнопки навигации должны содержать общий класс 
      button: String,
      // - класс кнопки прокрутки на предыдущий слайд тег <a>
      buttonPrev: String,
      // - класс кнопки прокрутки на следующий слайд тег <a>
      buttonNext: String,

      // НАВИГАЦИОННЫЕ ПЕРЕКЛЮЧАТЕЛИ
      // класс отвечает за позиционирование и размеры контейнера переключателей
      // если класс не указан в init  или не описан в CSS навигационные переключатели 
      // не отображаются      
      switchList: String,
      // класс стиля переключателей, по умолчанию  switch: 'switch-defult'
      switch: String,
      // класс стиля активного переключателя, по умолчанию  switch: 'switch-active-default'
      switchActive: String
    } 

 timeInterval: время просмотра слайда при автоматической смене слайдов в мс
                меньше 0 - приравниваютеся к 0
                       0 - без автоматической смены
  больше 0 и меньше 1000 - приравниваютеся к 1000
                    1500  - по умолчанию
*/
slider({
    slider: 'portfolio-content',
    slide: 'portfolio-item',
    slideActive: 'portfolio-item-active',
    button: 'portfolio-btn',
    buttonPrev: 'prev',
    buttonNext: 'next',
    switchList: 'portfolio-dots',
    switch: 'dot',
    switchActive: 'dot-active',
}, 2000);