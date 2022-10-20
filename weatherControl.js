class WeatherControl {

    constructor() {
        this.app = document.getElementById("app");
        this.countries = {
            kiev: "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f",
            london: "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f", //свойство класса к которому присвоен обьет API
            ny: "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f"
        }
        this.celcium = true;
        this.init();
        this.getApi();
    }

    init() {
        this.setWidget();
        this.attachEvent();
    }


    setWidget() {
        const WidgetTemplate = document.getElementById("weatherTemplate");
        const Tpl = WidgetTemplate.innerHTML;
        this.app.innerHTML = Tpl;
        this.list = document.querySelector('.mainList');
    }

    getApi() {
        const self = this;
        let total = Object.keys(self.countries).length;
        let i = 0;
        let buttons = document.querySelectorAll('button');
        let totalbtn = buttons.length;

        for (let city in self.countries) {
            self._callAjax(self.countries[city], function(date) {
                self.setList.call(self, JSON.parse(date));
                i++;
                if (i == total) {
                    while (totalbtn--) {
                        let button = buttons[totalbtn];
                        button.removeAttribute('disabled');

                    }
                }
            });
        }
    }
    setList(date) {
        let outputStr = "";
        let degree = ((date.main['temp'] - 273.15) * 9 / 5 + 32).toFixed();
        if (this.celcium) {
            degree = ((degree - 32) * 5 / 9).toFixed();
        }
        outputStr += '<li>';
        outputStr += '<div class="city">' + date.name + '</div>';
        let src = `http://openweathermap.org/img/wn/${date.weather[0].icon}.png`;
        outputStr += '<div class="visual" ><img src="' + src + ' " width="100" height="100"></div>';
        outputStr += '<div class="temp"> ' + degree + '</div>';

        outputStr += '</li>';



        this.list.insertAdjacentHTML('beforeEnd', outputStr);
    }
    attachEvent() {
        const celsius = document.getElementById('celsius');
        const fahrenheits = document.getElementById('fahrenheits');
        celsius.addEventListener('click', () => this.setCelsium());
        fahrenheits.addEventListener('click', () => this.setFahrenheits());
    }
    setCelsium() {
        this.celcium = true;
        this.list = document.querySelector('.mainList');
        this.list.innerHTML = "";
        this.getApi();
    }
    setFahrenheits() {
        this.celcium = false;
        this.list = document.querySelector('.mainList');
        this.list.innerHTML = "";
        this.getApi();
    }

    _callAjax(url, callback) {
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

new WeatherControl;