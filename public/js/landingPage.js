import {StockData} from '/js/StockData.js';
//import {cardsData} from '/js/cardsData.js';

const queryField = document.querySelector("#search");
const submitButton = document.querySelector("#submit");

/*
const baseStocks = ["googl", "aapl", "amzn", "baba", "msft", "tsla"];
for(let i = 0; i < baseStocks.length; i++) {
    let base = baseStocks[i];
    let stock = new StockData(base);

    cardsData[i]["avatar"] = stock.logo;
    cardsData[i]["user"] = {
        name: stock.company,
        handle: stock.sym,
    }

}*/

submitButton.addEventListener("click", (e) => {
    console.log("raw query: ", queryField.value);
    let sym = encodeURIComponent(queryField.value);
    console.log("encoded: ", sym);
    
    let stock = new StockData(sym);
    console.log("in ui", stock);
});


/*
id: 1,
  image: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
  avatar: 'https://avatars..com/api/initials/john%20doe.svg',
  user: {
    name: 'StockName',
    handle: 'ID',
    title: 'Company Name'
  },
  content: 'Description of Company'
  */