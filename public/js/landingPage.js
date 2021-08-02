const queryField = document.querySelector("#search");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", (e) => {
    
    let myKey = 'UBT7AODFWQYQD0KN';
    console.log("raw query: ", queryField.value);
    let sym = encodeURIComponent(queryField.value.toUpperCase());
    console.log("encoded: ", sym);
    const urlToFetch = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=5min&apikey=${myKey}`;

    console.log(urlToFetch);

    fetch(urlToFetch)
        .then(response => response.json())
        .then(myJson => {
            //console.log(myJson.data[0].images.original.url);
            //const imgUrl = myJson.data[getRandom(25)].images.original.url;
            //imageHolderDiv.innerHTML = `<img src="${imgUrl}"  />`;
        })
        .catch(error => {
            console.log("error: ", error)
        })
})
