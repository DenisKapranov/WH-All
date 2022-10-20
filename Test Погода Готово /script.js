onload = function Start(){

    let url_Kyiv = "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f";
    let url_London = "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f";
    let url_NewYork = "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f";

    fetch(url_Kyiv)
        .then(response => response.json())
        .then(json => {
            let m = document.getElementById("Kyiv");
            m.innerHTML = json.name;
            let t = document.getElementById("temp");
            t.innerHTML = (json.main.temp_min - 273).toFixed();
            let d = document.getElementById("desc");
            d.innerHTML = json.weather[0].description;
            let i = document.getElementById("img");
            i.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
            
            
        })

    fetch(url_London)
        .then(response => response.json())
        .then(json => {
            let m = document.getElementById("London");
            m.innerHTML = json.name;
            let t = document.getElementById("temp2");
            t.innerHTML = (json.main.temp_min - 273).toFixed();
            let d = document.getElementById("desc2");
            d.innerHTML = json.weather[0].description;
            let i = document.getElementById("img2");
            i.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
        })

    fetch(url_NewYork)
        .then(response => response.json())
        .then(json => {
            let m = document.getElementById("NewYork");
            m.innerHTML = json.name;
            let t = document.getElementById("temp3");
            t.innerHTML = (json.main.temp_min - 273).toFixed();
            let d = document.getElementById("desc3");
            d.innerHTML = json.weather[0].description;
            let i = document.getElementById("img3");
            i.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
        })
    
}

function onClick(){
    let ck = document.getElementById("CorF");
    let t = document.getElementById("temp");
    let t2 = document.getElementById("temp2");
    let t3 = document.getElementById("temp3");
    if(ck.checked == true){
        t.innerText =  Number(t.innerText) + 273;
        t2.innerText =  Number(t2.innerText) + 273;
        t3.innerText =  Number(t3.innerText) + 273;
    }
    else {
        t.innerText = Number(t.innerText) - 273;
        t2.innerText = Number(t2.innerText) - 273;
        t3.innerText = Number(t3.innerText) - 273;
    }
}

