// формы обратной связи
"use strict";

const feedback = () => {

    const userNames = document.querySelectorAll('input[name="user_name"]');
    const userMessage = document.querySelector('input[name="user_message"]');
    const userPhone = document.querySelectorAll('input[name="user_phone"]');
    const userEmail = document.querySelectorAll('input[name="user_email"]');
    const userAll = document.querySelectorAll('form input');

    // валидация ввода: имя, номер телефона, email, сообщение
    // - type=text и placeholder="Ваше сообщение": кириллица в любом регистре, дефис и пробел
    // - type=email: латиница в любом регистре, цифры и спецсимволы:  [@-_.!~*']
    // - type=tel: цифры, круглые скобки и дефис    
    const invalid = {
        text: /[^а-я-\s]+/gi,
        email: /[^\w\-@.!~*']+/gi,
        phone: /[^\d\-()']+/gi,
        // пробелы или дефисы в начале и конце 
        trimSH: /(^[\s\-]+|^)(.*?)(?:([\s\-]+$)|$)/i,
        // повторяющиеся подряд пробелы
        multyS: /\s{2,}/g,
        // повторяющиеся подряд дефисы
        multyH: /\-{2,}/g,
        // первая буква слова       
        firstLower: /(^|\s\-|\s|\-)\S/g,
    };
    userNames.forEach((field) => {
        field.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(invalid.text, "");
        });
        // дополнительный контроль при потере фокуса 
        field.addEventListener('blur', (e) => {
            let value = e.target.value;
            // замена всех букв на маленькие
            value = value.replace(/.*/g, (str) => str.toLowerCase());
            // замена первой буквы на большую 
            value = value.replace(invalid.firstLower,
                (firstLetter) => firstLetter.toUpperCase());
            e.target.value = value;
        });
    });
    userMessage.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(invalid.text, "");
    });
    userPhone.forEach((field) => {
        field.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(invalid.phone, "");
        });
    });
    userEmail.forEach((field) => {
        field.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(invalid.email, "");
        });
    });

    // контроль при потере фокуса для всех полей форм обратной связи
    userAll.forEach((field) => {
        field.addEventListener('blur', (e) => {
            let value = e.target.value;
            // удаление ведущих и завершающих пробелов и дефисов
            value = value.replace(invalid.trimSH, (str, begin, sense) => `${sense}`);
            // замена нескольких идущих подряд пробелов на один 
            value = value.replace(invalid.multyS, (spaces) => ' ');
            // замена нескольких идущих подряд дефисов на один
            value = value.replace(invalid.multyH, (hyphens) => '-');

            e.target.value = value;
        });
    });


}; // END calc()
export default feedback;