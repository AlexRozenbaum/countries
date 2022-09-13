import CountryClass from "./countryClass.js";
import { declareEvents } from "./viewEvents.js"
let country_ar = [];
let url;
const init = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let codeCountry = urlParams.get("code");
    if (!codeCountry) doApi("Israel");
    else doApi();
    showLoading();
    declareEvents(doApi, createCountryList);
}

const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}
const print = (printa, printb) => {
    console.log(printa + "Hello");
    console.log(printb);
}
const doApi = async(_searchQuery) => {
    showLoading();
    const urlParams = new URLSearchParams(window.location.search);
    let codeCountry = urlParams.get("code");
    if (!_searchQuery) {
        url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    } else {
        url = `https://restcountries.com/v3.1/name/${_searchQuery}`;
    }
    let resp = await fetch(url);
    if (resp.status >= 200 && resp.status <= 299) {
        let data = await resp.json();
        createCountryList(data);
    } else {
        document.querySelector("#id_loading").innerHTML = "404 error country doesnt exist PLEASE retry";
        document.querySelector("#id_loading").className = "display-6 text-center";
    }
    print("", "second");
}
const createCountryList = (_ar = country_ar) => {

    hideLoading();
    document.querySelector("#id_row").innerHTML = "";
    _ar.forEach(item => {
        let country = new CountryClass("#id_row", item, doApi);
        country.render();
    })
}



init();