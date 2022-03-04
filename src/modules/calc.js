// Блок. Расчитать стоимость

"use strict";

const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block');
    // поля ввода
    const calcType = calcBlock.querySelector('.calc-type');
    const calcSquare = calcBlock.querySelector('.calc-square');
    const calcCount = calcBlock.querySelector('.calc-count');
    const calcDay = calcBlock.querySelector('.calc-day');
    // итог
    const total = document.getElementById('total');


    // анимация отображения итога за 2сек
    const animationTotal = (currentValue) => {

        // начальное значение отображаемого числа
        let value = 0;
        // шаг увеличения отображаемого числа
        const step = Math.round(currentValue / 16.7 / 2);

        (function animation() {
            value += step;
            if ((value < currentValue) ||
                (value - currentValue < step)) {
                requestAnimationFrame(animation);
                // отображение анимации итога
                total.textContent = Math.min(value, currentValue);
            }
        })();
    };

    // функцию отложенного вывода 
    calcBlock.debounce = function (f, t) {
        return (args) => {
            if ('lastCallTimer' in this) {
                clearTimeout(this.lastCallTimer);
            }
            // id последнего вызванного timeout
            this.lastCallTimer = setTimeout(() => f(args), t);
        };
    };

    // расчет    
    const countCalc = () => {
        const calcTypeValue = +calcType.options[calcType.selectedIndex].value;
        const calcSquareValue = +calcSquare.value;

        let totalValue = 0;
        let calcCountValue = 1;
        let calcDayValue = 1;


        if (+calcCount.value > 1) {
            calcCountValue += +calcCount.value / 10;
        }
        if (+calcDay.value === 0) { }
        else if (+calcDay.value < 5) {
            calcDayValue = 2;
        } else if (+calcDay.value < 10) {
            calcDayValue = 1.5;
        }

        totalValue = Math.round(price * calcTypeValue * calcSquareValue * calcCountValue * calcDayValue);

        total.textContent = totalValue;

        if (totalValue) {
            // анимация вывода результата с задержкой 500мс  
            (calcBlock.debounce(animationTotal, 500))(totalValue);
        }
    };

    // ввод
    calcBlock.addEventListener('input', (e) => {

        if (e.target === calcType || e.target === calcSquare ||
            e.target === calcCount || e.target === calcDay) {

            // валидация ввода: общая площадь, количество помещений, срок исполнения (в днях)
            // для ввоода только цифры и не 0
            if (e.target !== calcType) {
                e.target.value = e.target.value.replace(/\D+/g, "");
                e.target.value = e.target.value.replace(/^0+/g, "");
            }
            // расчет и вывод результата с задержкой 300мс  
            countCalc();
        }
    });

}; // END calc()
export default calc;