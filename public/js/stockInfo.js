import {StockData} from '/js/StockData.js';

const queryField = document.querySelector("#search");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", (e) => {
    console.log("raw query: ", queryField.value);
    let sym = encodeURIComponent(queryField.value);
    console.log("encoded: ", sym);
    
    let stock = new StockData(sym);
    console.log(stock.headlines());
    console.log("stock company name:", stock.company)
    document.querySelector("#replaceInfo").innerHTML = displayStockData(stock);
});

const displayStockCard = (stock) => {
    return `
        //updating html of cards using general stock data
    `;
};
const displayStockData = (stock) => {
    return `
        <div class="hugeMargin">
            <div class="card borderR">
                <div class="card-content">
                    <p>
                        Stock Name: ${stock.company} (${stock.symbol})
                    </p>
                    <p>
                        Price: $${stock.latestPrice}
                    </p>
                    <p>
                        Recent Fluctuation Trends: ${stock.changePct}% +${stock.change} Today
                    </p>
                </div>
            </div>
            <div class="card margins borderR" $card-radius=0.20rem>
                <div class="card-content">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freepngimg.com%2Fthumb%2Fgraphic_design%2F40023-6-graph-image-free-png-hq.png&f=1&nofb=1">
                    </img>
                </div>
            </div>
        </div>
    `;
}
const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div id="random"class="card" style="background-color:${getRandomColor()};">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>             
    `
}