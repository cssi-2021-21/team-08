const queryField = document.querySelector("#search");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

let myKey = '';
  //console.log("raw query: ", queryField.value);
  let sym = encodeURIComponent(queryField.value);
  //console.log("encoded: ", topic);
  const urlToFetch = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${myKey}`;
  
  //console.log(topic);
  //console.log(urlToFetch);
  
  fetch(urlToFetch)
    .then(response => response.json())
    .then(myJson => {
    //console.log(myJson.data[0].images.original.url);
    const imgUrl = myJson.data[getRandom(25)].images.original.url;
    imageHolderDiv.innerHTML = `<img src="${imgUrl}"  />`;
  })
  .catch(error => {
    console.log("error: ", error)
  })
