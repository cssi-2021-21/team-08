import { StockData } from '/js/StockData.js';

const queryField = document.querySelector("#search");
const submitButton = document.querySelector("#submit");
const info = document.querySelector("#replaceInfo")
const comp = document.querySelector("#nameRep")
let hidden = true;

submitButton.addEventListener("click", (e) => {
    console.log("raw query: ", queryField.value);
    let sym = encodeURIComponent(queryField.value);
    console.log("encoded: ", sym);

    let stock = new StockData(sym);
    //console.log(stock.headlines());
    console.log("stock company name:", stock.company)
    console.log(stock)
    if(stock.company != null) {    
        if(!hidden) {
            document.getElementById('show').id = 'hidden'
        }
        if(stock.change === null) {
            stock.changePct = "None"
            stock.change = "No Change"
        }
        info.innerHTML = displayStockData(stock);
        comp.innerHTML = compName(stock);
    }
    else {
        if(hidden) {
            document.getElementById('hidden').id = 'show'
        }
    }
});

const fill = (stock) => {

}

const displayStockCard = (stock) => {
    return `
        //updating html of cards using general stock data
    `;
};
const displayStockData = (stock) => {
    return `
    <div id=replaceInfo>
        <div class="card borderR" style="margin-top: 70px; margin-right: 80px;">
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
        <div class="card margins borderR" $card-radius=0.20rem style="margin-right: 80px;">
            <div class="card-content">
                <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freepngimg.com%2Fthumb%2Fgraphic_design%2F40023-6-graph-image-free-png-hq.png&f=1&nofb=1"
                    width="500"; height="500"
>
                </img>
            </div>
        </div>
    </div>
    `;
}
const compName = (stock) => {
    return `
        <div id="nameRep">
                <div>
                    <h4 class="title is-4 column is-half" style="margin-left: 20px;">
                        <strong> Company Name: ${stock.company}</strong>
                    </h4>
                </div>
                <div>
                        <img src="${stock.logo}"
                        alt="Company Building Photo" width="600" height="600" style="margin-left: 20px" />
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