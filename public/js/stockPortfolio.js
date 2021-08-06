import {StockData} from '/js/StockData.js';
let userId = null;
let userName = null;

const cardCreation = (stockItem) => {
    return `
        <div class="column is-one-third">
            <div class="card large">
                <div class="columns">
                    <div class="column is-3 is-offset-1"> 
                        <p class="is-5"> ${stockItem.sym.toUpperCase()}</p>
                    </div>
                    <div class="column"> 
                        <p class="is-5"> ${stockItem.company}</p>
                    </div>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="is-4">$${stockItem.latestPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p>Your average buy price: $${stockItem.avgBuy.toFixed(2)}</p>
                        <p>Your average sell price: $${stockItem.avgSell.toFixed(2)}</p>
                        <p>Shares:  <span id="${stockItem.sym}_Shares">${stockItem.remShares}</span></p>
                    </div>
                </div>
                <footer class="card-footer">
                    <button class="card-footer-item button buy is-success" id="${stockItem.sym}">Buy</button>
                    <button class="card-footer-item button sell is-danger" id="${stockItem.sym}">Sell</button>      
               </footer>
            </div>  
        </div>
    `
}

const startBuyModal = (sym) => {
    const modal = document.querySelector("#buyModal");
    modal.classList.toggle("is-active");

    const stock = new StockData(sym);
    const price = stock.latestPrice;
    
    document.querySelector("#titleBuy").innerHTML = "Buy: " + sym.toUpperCase();
    document.querySelector("#price").innerHTML = `Price per share: $${price}`;
    document.querySelector("#priceVal").value = price;
    document.querySelector("#stockID").value = sym;
}

const startSellModal = (sym, e) => {
    const stock = new StockData(sym);
    const price = stock.latestPrice;
    const shares = document.querySelector("#" + sym + "_Shares").innerHTML;
    
    document.querySelector("#titleSell").innerHTML = "Sell: " + sym.toUpperCase();
    document.querySelector("#sellPrice").innerHTML = `Price per share: $${price}`;

    document.querySelector("#sellPriceVal").value = price;
    document.querySelector("#sellStockID").value = sym;
    document.querySelector("#remShares").value = shares;
    
    const modal = document.querySelector("#sellModal");
    modal.classList.toggle("is-active");
}

/*
const getQuote = (sym) => {
    let stock = new StockData(sym);
    console.log("display quote: ", sym);
    //update modal to temporarily display data for the single stock
        //button to  close modal when done viewing, does not add to portfolio or update database
}*/

const addToPortfolio = (sym) => {
    setTransaction("watch", sym, 0);
}

document.querySelector("#closeBuyModal").addEventListener("click", () => {
    const modal = document.querySelector("#buyModal");
    modal.classList.toggle("is-active");
})

document.querySelector("#saveBuy").addEventListener("click", () => {

    const sharesInput = document.querySelector("#shares");
    const shares = parseInt(sharesInput.value);
    const sym = document.querySelector("#stockID").value;
    const price = document.querySelector("#priceVal").value;
    const balance = document.querySelector("#balance").innerHTML;

    if (shares * price <= balance) {
        setTransaction("buy", sym, shares);

        document.querySelector("#buyModal").classList.remove("is-active");
    } else {  
        alert(`Not enough money to buy ${shares} shares at $${price} per share.`);
        sharesInput.value = "";
    }
})

document.querySelector("#closeSellModal").addEventListener("click", () => {
    const modal = document.querySelector("#sellModal");
    modal.classList.toggle("is-active");
})

document.querySelector("#saveSell").addEventListener("click", () => {

    const sharesInput = document.querySelector("#sellShares");
    const shares = parseInt(sharesInput.value);
    const sym = document.querySelector("#sellStockID").value;
    const price = document.querySelector("#sellPriceVal").value;
    const heldShares = document.querySelector("#remShares").value;

    console.log("In sellBuy()...");

    if (shares <= heldShares) {
        setTransaction("sell", sym, shares);
        document.querySelector("#sellModal").classList.remove("is-active");
    } else {  
        alert(`You don't own that many shares to sell.`);
        sharesInput.value = "";
    }

    console.log("Exit handleSell()...");
})

const setTransaction = (type, sym, volume) => {
    let stock = new StockData(sym);

    firebase.database().ref(`/users/${userId}/portfolio/${sym}/`).push({
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
    } else {
        let bal = grabBalance();
        const total = volume * stock.latestPrice;

        if (type === "buy") {
            bal = bal - total;
        } else {
            bal = bal + total;
        }

        setBalance(bal);
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
}

const renderPositionsHTML = (data) => {
    //update the card data to display the positions data for each stock in the portfolio
    let cards = ``;

    for(let i = 0; i < data.length; i++) {
        cards += cardCreation(data[i])
    }
    
    document.querySelector("#replace").innerHTML = cards

    const bButtons = document.querySelectorAll(".buy")
    for(let i = 0; i < bButtons.length; i++) {
        let item = bButtons[i];
        item.addEventListener("click", (e) => {
                console.log("click buy");
                startBuyModal(e.target.id);
            });
    }

    const sButtons = document.querySelectorAll(".sell")
    for(let i = 0; i < sButtons.length; i++) {
        let item = sButtons[i];
        item.addEventListener("click", (e) => {
                console.log("click sell");
                startSellModal(e.target.id, e);
                //startSellModal2(e);
            });
    }

    document.querySelector("#watch").addEventListener("click", (e) => {
        const queryField = document.querySelector("#search");
        let sym = encodeURIComponent(queryField.value);

        addToPortfolio(sym);
        console.log("done")
        queryField.value = "";
    });
}

const replace = () => {
    console.log("in replace")
    
    let data = getPositions();
}

window.onload = (event) => {
  // Use this to retain user state between html pages.
  console.log("loaded")
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('Logged in as: ' + user.displayName + " uid: ", user.uid);
        userName = user.displayName;        
        userId = user.uid;
        document.querySelector("#user").innerHTML = userName;

        setSeedMoney(100000);
        
        watchBalance();
        replace();

    } else {
      window.location = 'signIn.html';
      console.log("not logged in");
    };
  });
};

const setSeedMoney = (money) => {
    const seed = document.querySelector("#seed");
    seed.innerHTML = money.toFixed(2);

    firebase.database().ref(`/users/${userId}/`).update({"seed": money});
}

const getSeedMoney = () => {
    const seed = parseInt(document.querySelector("#seed").innerHTML);
    return seed;
}

const setBalance =  (money) => {
    const balance = document.querySelector("#balance");
    balance.innerHTML = money.toFixed(2);

    firebase.database().ref(`/users/${userId}/`).update({"balance": money});
}

const grabBalance = () => {
    const balance = parseInt(document.querySelector("#balance").innerHTML);
    return balance;
}

const watchBalance = () => {
    const userRef = firebase.database().ref(`users/${userId}/`);

    console.log("In watchBalance()...");

    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log("snap bal: ", data.balance);

        const balance = document.querySelector("#balance");
        balance.innerHTML = data.balance.toFixed(2);   
        
        const seed = getSeedMoney();
        const bal = balance.innerHTML;
        const change = bal - seed;
        document.querySelector("#earnings").innerHTML = change.toFixed(2);

        const percent = (change / seed) * 100;
        document.querySelector("#change").innerHTML = percent.toFixed(2) + "%";

        if(bal < 0) {
            displayNegative(balance);
        } else {
            displayPositive(balance);
        }

        if(change < 0) {
            displayNegative(document.querySelector("#earnings"));
        } else {
            displayPositive(document.querySelector("#earnings"));
        }

        if(percent < 0) {
            displayNegative(document.querySelector("#change"));
        } else {
            displayPositive(document.querySelector("#change"));
        }

    })
}
const displayNegative = (div) => {
    div.classList.remove("positive");
    div.classList.add("negative");
}

const displayPositive = (div) => {
    div.classList.remove("negative");
    div.classList.add("positive");
}

const updateEarnings = () => {
    const earn = grabBalance() - getSeedMoney();
    document.querySelector("#balance").innerHTML = earn.toFixed(2);

    firebase.database().ref(`/users/${userId}/`).update({"earnings": earn});
}