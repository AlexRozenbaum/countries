export default class CountryClass {
    constructor(_parent, _item, doApi) {
        this.parent = _parent;
        this.flag = (_item.flags.png != "N/A") ? _item.flags.png : "/images/qm.jpg";
        this.name = _item.name.official;
        this.population = _item.population.toLocaleString('en-US');
        this.region = _item.region;
        this.languages = Object.values(_item.languages);
        this.coin = (Object.keys(_item.currencies)) + " , " + Object.values(Object.values(_item.currencies)[0])[0];
        this.capital = _item.capital;
        this.borders = _item.borders;
        this.latlng = _item.latlng;

    }

    async render() {
        let links = [];
        let div = document.createElement("div");
        div.className = "col-md-6 p-2";
        document.querySelector(this.parent).append(div);
        const fetchAll = async() => {
            await Promise.all(this.borders.map(async item => {
                let resp = await fetch(`https://restcountries.com/v3.1/alpha/${item}`);
                let data = await resp.json();
                links.push(`<a href="country.html?code=${item}" class="p-1 ">${data[0].name.common} </a > `);

            }))
        };

        await fetchAll();
        div.innerHTML = `
            <article class="p-2 shadow overflow-hidden h-100">
            <img src="${this.flag}" alt="${this.name}"  class="w-50 float-start m-2">
            <h2>${this.name}</h2>
            <div>Pop:${this.population}</div>
            <div>Region:${this.region}</div>
            <div>Languages:${this.languages}</div>
            <div>Coin:${this.coin }</div>
            <div>Capital:${this.capital }</div>
            <div> <iframe src="http://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&z=7&output=embed" height="300" width="200"  class="w-50 float-start m-2"></iframe>
            </div>
        <h3>States with borders : </h3>
        ${links}</article>`

    }
}