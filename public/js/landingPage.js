import {StockData} from '/js/StockData.js';

const queryField = document.querySelector("#search");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", (e) => {
    console.log("raw query: ", queryField.value);
    let sym = encodeURIComponent(queryField.value);
    console.log("encoded: ", sym);
    
    let stock = new StockData(sym);
    console.log(stock.headlines());
});

const displayStockCard = (stock) => {
    return `
        //updating html of cards using general stock data
    `;
}