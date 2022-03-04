"use strict";

// универсальный аниматор
const animate = ({ draw, duration = 1000, timingplane = 'linear' }) => {


    //return 1 - Math.pow(1 - timeFraction, 5);
    // функции линейности отображения
    const timing = {
        // Линейные функции 

        // линейная, по умолчанию
        linear: (x) => x,   // cubic-bezier(0.0, 0.0, 1.0, 1.0) Постоянная/Постоянная/Постоянная

        // Кубические функции Безье (в т.ч. ease, ease-in, ease-out и ease-in-out)
        easeOutCubic: (x) => 1 - Math.pow(1 - x, 3),        // для вертикального скролла
        easeInOutCubic: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
        easeOutQuart: (x) => 1 - Math.pow(1 - x, 5),
        aseOutExpo: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),  // для выезжающих модальных окон
        //ease:  // cubic- bezier(0.25, 0.1, 0.25, 1.0)  Быстрое ускорение/Быстрое ускорение/Медленное ускорение
        //easeIn:  // cubic - bezier(0.42, 0, 1.0, 1.0) Медленное ускорение/Быстрое ускорение/Предельная скорость
        //easeOut: // cubic - bezier(0, 0, 0.58, 1.0)  Предельная скорость/Медленное ускорение/Медленное ускорение
        //easeInOut // cubic - bezier(0.42, 0, 0.58, 1.0) Медленное ускорение/Предельная скорость/Быстрое ускорение

        // Ступенчатые функции (steps)
    };
    if (!(timingplane in timing)) { timingplane = 'linear'; }

    let start = performance.now(); // возвращает текущую точку времени старта анимации

    requestAnimationFrame(function animate(time) {  // принимают текущий time stamp от requestAnimationFrame()
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration; // теущий промежуток делим на продолжительность анимации
        if (timeFraction > 1) { timeFraction = 1; }

        // вычисление текущего состояния анимации
        // число от 0 до 1 с учетом указанной линейности, заданной в настроку timing 
        // для линейно анимации -  возвращает то, что передали
        let progress = timing[timingplane](timeFraction);


        draw(progress); // отрисовать её

        if (timeFraction < 1) {    // повторит анимации
            requestAnimationFrame(animate);
        }

    });
};

export { animate };