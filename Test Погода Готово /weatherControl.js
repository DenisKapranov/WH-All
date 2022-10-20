class WeatherControl {
    /**
     * Базовый метод который запускается при иницилизации обьекта this - это ссылка на отот обьект или класс
     */
    constructor() { // это свойство которому присвоен контейнер
        this.app = document.getElementById("app");
        this.countries = {
            kiev: "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f",
            london: "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f", //свойство класса к которому присвоен обьет API
            ny: "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f"
        }
        this.celcium = true; //свойство класса флаг (изначально тображается в градусах цельсия)
        this.init(); //иниц, нашего контейнера виджита
        this.getApi(); //отоброжаем список по умолчанию
    }

    init() { //запускаем приложение
        this.setWidget();
        this.attachEvent();
    }

    /**
     * тут вставляется виджит на экран, и тут же берем блок, для того, что бы вставить данные
     */
    setWidget() {
        const WidgetTemplate = document.getElementById("weatherTemplate"); //получение шаблона скрип тега
        const Tpl = WidgetTemplate.innerHTML; //получаем сам html контейнера
        this.app.innerHTML = Tpl; // заполняем основной контейнер полученный
        this.list = document.querySelector('.mainList'); //идет присвоение переменной элемента (выбираем элемент и присваиваем переменную)
    }

    getApi() {
        const self = this; //там где зона видимости элемента заканчивается используется ссылка на обьект те зис селф
        let total = Object.keys(self.countries).length; //длина (количество) элементов в обьекте
        let i = 0; //инкримент которой присвоили значение 0
        let buttons = document.querySelectorAll('button'); //все эелменты баттон и присваиваем переменной баттонС. это массив кнопок
        let totalbtn = buttons.length;
        //длина массива кнопок
        for (let city in self.countries) { //цикл, Цикл for...in проходит через перечисляемые свойства объекта. Он пройдёт по каждому отдельному элементу.
            self._callAjax(self.countries[city], function(date) { //скрытый метод. Отправляет запрос и получает ответ запишет его в колл бек
                self.setList.call(self, JSON.parse(date)); //вызываем метод нашего класса. Колл вызывает этот метод в зоне вилимости нашего класса. 2е свойство самого метода приоьразованного в обьект (JSON.parse(date)).
                i++; // инкриментация +1
                if (i == total) { //
                    while (totalbtn--) {
                        let button = buttons[totalbtn]; //выбираем элемент с массив
                        button.removeAttribute('disabled');

                    }
                }
            });
        }
    }
    setList(date) {
        let outputStr = ""; // принудительно присваиваем переменно пустую строингу  (тип переменной стринг)
        let degree = ((date.main['temp'] - 273.15) * 9 / 5 + 32).toFixed();
        if (this.celcium) {
            degree = ((degree - 32) * 5 / 9).toFixed();
        }
        outputStr += '<li>';
        outputStr += '<div class="city">' + date.name + '</div>';
        outputStr += '<div class="temp"> ' + degree + '</div>';
        let src = `http://openweathermap.org/img/wn/${date.weather[0].icon}.png`;
        outputStr += '<div class="visual" ><img src="' + src + ' " width="100" height="100"></div>';
        outputStr += '</li>';



        this.list.insertAdjacentHTML('beforeEnd', outputStr); //https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML вставляет полученные узлы со свойством
    }
    attachEvent() {
        const celsius = document.getElementById('celsius'); //выбирает элемент по ID
        const fahrenheits = document.getElementById('fahrenheits'); //присваиваем переменной выбранный элемент
        celsius.addEventListener('click', () => this.setCelsium()); //обработка события клик. Без стрелочной функции область видимости
        fahrenheits.addEventListener('click', () => this.setFahrenheits());
    }
    setCelsium() {
        this.celcium = true; //текущее состояние отображение в грудусах
        this.list = document.querySelector('.mainList'); //выбираем юл список (контейнер)
        this.list.innerHTML = ""; //очищаем список
        this.getApi(); // получить данные: отдать запрос напостроение списка и разблокировать кнопки
    }
    setFahrenheits() { //мтод отображает список в кельвинах
        this.celcium = false;
        this.list = document.querySelector('.mainList');
        this.list.innerHTML = "";
        this.getApi();
    }

    _callAjax(url, callback) { //это отправка запроса и получение данные. колбек срабаатывает только когда запрос отправлен и доставлен.
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

new WeatherControl; // инициализация класса