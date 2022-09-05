export const declareEvents = (doApi, createCountryList) => {
    let search_btn = document.querySelector("#search_btn");
    let id_input = document.querySelector("#id_input");


    id_input.addEventListener("keydown", (e) => {
        // e.key => מכיל על איזה מקש לחצנו במקלדת ובדקנו שזה אנטר
        if (e.key == "Enter") {
            doApi(id_input.value);
        }
    })

    search_btn.addEventListener("click", () => {
        doApi(id_input.value);

    })
}