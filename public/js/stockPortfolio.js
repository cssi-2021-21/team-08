import {StockData} from '/js/StockData.js';
let googleUserId;

document.querySelector("#testBuy").addEventListener("click", (e) => {
    saveBuy();
});

document.querySelector("#watch").addEventListener("click", (e) => {
    const queryField = document.querySelector("#search");
    let sym = encodeURIComponent(queryField.value);

    addToPortfolio(sym);
});

document.querySelector("#quote").addEventListener("click", (e) => {
    const queryField = document.querySelector("#search");
    let sym = encodeURIComponent(queryField.value);

    getQuote(sym);
});

const getQuote = (sym) => {
    let stock = new StockData(sym);
    console.log("display quote: ", sym);
    //update modal to temporarily display data for the single stock
        //button to  close modal when done viewing, does not add to portfolio or update database
}

const addToPortfolio = (sym) => {
    setTransaction("testID", "watch", sym, 0);
}

const saveBuy = () => {
    setTransaction("testID", "buy", "googl", 100);
    setTransaction("testID", "sell", "googl", 50);
}

const setTransaction = (user, type, sym, volume) => {
    let stock = new StockData(sym);

    firebase.database().ref(`/users/${user}/portfolio/${sym}/`).push({
        "type": type,
        "shares": volume,
        "cost": stock.latestPrice,
        "date": firebase.database.ServerValue.TIMESTAMP
    });

    if(type === "watch") {
        firebase.database().ref(`/stocks/${sym}/`).push({
            "company": stock.company,
            "logo": stock.logo,
            "news": stock.news,
        })
    }
}
