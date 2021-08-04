import {StockData} from '/js/StockData.js';
let userId = "testID";



/*
window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      userId = user.uid;
      console.log(getPositions("testID"));

    } else {
      // If not logged in, navigate back to login page.
      //window.location = 'index.html';
      console.log("not logged in");
    };
  });
};*/



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
    setTransaction(userId, "watch", sym, 0);
}

const saveBuy = () => {
    setTransaction(userId, "buy", "googl", 100);
    setTransaction(userId, "sell", "googl", 50);
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

const getPositions = () => {
    const ref = firebase.database().ref(`users/${userId}/portfolio`);
    let positions = [];

    ref.on('value', (snapshot) => {
        const syms = snapshot.val();
        
        console.log("start iterating...");

        for (let stock in syms) {

            const  transactions = syms[stock];
            
            let buys = 0;
            let sumBuyPrice = 0;
            let sumBuyShares = 0;
            let sumBuyCost = 0;

            let sells = 0;
            let sumSellPrice = 0;
            let sumSellShares = 0;
            let sumSellCost = 0;
            for(const transaction in transactions) {
                let trans = transactions[transaction];

                if(trans.type === "buy") {
                    buys++;
                    sumBuyPrice += trans.cost;
                    sumBuyShares += trans.shares;
                    sumBuyCost += (trans.cost * trans.shares);
                }
                else if (trans.type === "sell") {
                    sells++;
                    sumSellPrice += trans.cost;
                    sumSellShares += trans.shares;
                    sumSellCost += (trans.cost * trans.shares);
                }
            };

            sumBuyPrice = (buys > 0) ? sumBuyPrice = sumBuyPrice / buys : 0.0;
            sumSellPrice = (sells > 0) ? sumSellPrice = sumSellPrice / sells : 0.0;

            positions.push({
                "sym": stock,
                "avgBuy": sumBuyPrice,
                "avgSell": sumSellPrice,
                "remShares": sumBuyShares - sumSellShares,
                "totalCost": sumBuyCost
            });
        };

        console.log("end iterating.");
        console.log(positions);
        
        renderPositionsHTML(positions);
    });    
}

const renderPositionsHTML = (data) => {
    //update the card data to display the positions data for each stock in the portfolio
    console.log(data);

    let tsla = new StockData("tsla");
    console.log(tsla.getNews(10));
}

getPositions(userId);