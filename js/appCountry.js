import CountryClass from "./countryClass.js";
import { declareEvents } from "./viewEvents.js"

// מערך שיכיל את המערך האחרון של החיפוש שביצענו
let country_ar = [];
let url;
const init = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let codeCountry = urlParams.get("code");
    if (!codeCountry) doApi("Israel");
    doApi();
    showLoading();
    declareEvents(doApi, createCountryList);
}

// יציג את הטעינה ויסתיר את הרשימה
const showLoading = () => {
        document.querySelector("#id_loading").style.display = "block";
        document.querySelector("#id_row").style.display = "none";
    }
    // יסתיר את הטעינה ויציג את הרשימה אחרי שהבקשה התקבלה
const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}

const doApi = async(_searchQuery) => {
    showLoading();
    const urlParams = new URLSearchParams(window.location.search);
    let codeCountry = urlParams.get("code");
    console.log(_searchQuery);
    if (!_searchQuery) {
        url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    } else {
        url = `https://restcountries.com/v3.1/name/${_searchQuery}`;

    }

    let resp = await fetch(url);
    if (resp.status >= 200 && response.status <= 299) {
        let data = await resp.json();
        createCountryList(data);
        console.log(data);
    } else {
        // Handle errors
        console.log(resp.status, resp.statusText);
    }



    // let data=await=resp.json();
    // creatCountryList(data);
    //     // בפרומיס הראשון מחזיר את ההידר שיש בו סטטוס ופונצקיה שמחזירה
    //     // גם היא פרומיס ומפרסרת לג'ייסון את המידע שהגיע מהשרת
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log(data);
    //         creatCountryList(data);
    //     })

}

// _ar = country_ar -> אומר שאם מזמנים את הפונקציה בלי להעביר פרמטר האיי אר יהיה שווה למוביס איי אר
// ששווה תמיד למערך הקודם שהפעלנו את הפונקציה
// בפעם הראשונה יהיה שווה ללגו במקרה שלנו
// ובכל חיפוש לחיפוש שהפעלנו
const createCountryList = (_ar = country_ar) => {

    hideLoading();
    // country_ar - שומר בזכרון את המערך שנתנו לו
    document.querySelector("#id_row").innerHTML = "";
    _ar.forEach(item => {
        let country = new CountryClass("#id_row", item);
        country.render();
    })
}



init();