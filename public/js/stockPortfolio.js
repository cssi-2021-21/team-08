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

window.onload = event => {
    console.log("loaded")
    replace();

}

const replace = () => {
    console.log("in replace")
    
    let data = getPositions();
/*
    for(let item in data) {
        cards += cardCreation(item)
        console.log(item)
    }
    
    document.querySelector("#replace").innerHTML = cards*/
}

const cardCreation = (stockItem) => {
    return `
        <div class="column is-one-third">
            <div class="card large">
                <div class="columns">
                    <div class="column is-3 is-offset-1"> 
                        <p class="subtitle is-5"> ${stockItem.sym.toUpperCase()}</p>
                    </div>
                    <div class="column"> 
                        <p class="title is-5"> ${stockItem.company}</p>
                    </div>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">$${stockItem.latestPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p>Your average buy price: $${stockItem.avgBuy.toFixed(2)}</p>
                        <p>Your average sell price: $${stockItem.avgSell.toFixed(2)}</p>
                        <p>Volume: ${stockItem.remShares} shares</p>
                    </div>
                </div>
            </div>
        </div>
    `

    /*return `
        <div class="column is-one-third">
            <div class="card large">
                    <p class="title is-3"> ${stockItem.company}</p>
                    <p class="subtitle is-4"> ${stockItem.sym.toUpperCase()}</p>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">$${stockItem.latestPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p>Your average buy price: $${stockItem.avgBuy.toFixed(2)}</p>
                        <p>Your average sell price: $${stockItem.avgSell.toFixed(2)}</p>
                        <p>Volume: ${stockItem.remShares} shares</p>
                    </div>
                </div>
            </div>
        </div>
          `*/
}


document.querySelector("#testBuy").addEventListener("click", (e) => {
    saveBuy();
});

document.querySelector("#watch").addEventListener("click", (e) => {
    const queryField = document.querySelector("#search");
    let sym = encodeURIComponent(queryField.value);

    addToPortfolio(sym);
    queryField.value = "";
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
    console.log("getting positions");
    const ref = firebase.database().ref(`users/${userId}/portfolio`);
    let positions = [];

    ref.on('value', (snapshot) => {
        positions = [];        
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
            
            let stockObj = new StockData(stock);
            positions.push({
                "sym": stock,
                "company": stockObj.company,
                "latestPrice": stockObj.latestPrice,
                "avgBuy": sumBuyPrice,
                "avgSell": sumSellPrice,
                "remShares": sumBuyShares - sumSellShares,
                "totalCost": sumBuyCost
            });
        };
        renderPositionsHTML(positions);
    }); 
    //return positions;   
}

const renderPositionsHTML = (data) => {
    //update the card data to display the positions data for each stock in the portfolio
    let cards = ``;

    for(let i = 0; i < data.length; i++) {
        cards += cardCreation(data[i])
    }
    
    document.querySelector("#replace").innerHTML = cards
}

const setBalance = (user, money) => {
    firebase.database().ref(`/users/${user}/profile`).update({balance: money});
}

const getBalance = (user) => {
    const userRef = firebase.database().ref(`users/${user}/profile`);
    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        return data.balance;
    });
}

