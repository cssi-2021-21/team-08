const 
const queryField = document.querySelector("#search");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", (e) => {
    const apiKey = "Tpk_2348d90c37bb48988f8548de47bd8737";
    console.log("raw query: ", queryField.value);
    let sym = encodeURIComponent(queryField.value);
    console.log("encoded: ", sym);
    //const urlToFetch = `https://ticker-2e1ica8b9.now.sh//keyword/${sym}`;
    //const urlToFetch = `https://cloud.iexapis.com/stable/${sym}/chart/1m?token=pk_${apiKey}&includeToday=true`; //production
//    const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/chart/1m?token=${apiKey}&includeToday=true`; //sandbox --> chart endpoint = historical data 
    const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/quote/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
    console.log(urlToFetch);

    fetch(urlToFetch)
        .then(response => response.json())
        .then(myJson => {
            
        })
        .catch(error => {
            console.log("error: ", error)
        })

        
})
