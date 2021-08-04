import { StockData } from '/js/StockData.js';

const queryField = document.querySelector("#search");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", (e) => {
    console.log("raw query: ", queryField.value);
    let sym = encodeURIComponent(queryField.value);
    console.log("encoded: ", sym);

    let stock = new StockData(sym);
});
window.onload = event => {
    replace();
    document.getElementById('hidden').id = 'done';
}
const displayStockCard = (stock) => {
    return `
        //updating html of cards using general stock data
    `;
}
const replace = () => {
    let cards = ``;
    cardsData.forEach((item, index) => {
        cards += cardCreation(item)
        console.log(item)
    });

    document.querySelector("#replace").innerHTML = cards
}


const cardCreation = (card) => {
    console.log("Cards", card)
    console.log("Test", card.avatar)
    return `
     <div class="column is-one-third">
            <div class="card large">
              <div class="card-image">
                <figure>
                  <img src="${card.image}" alt="Image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src="${card.avatar}" alt="Image">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4 no-padding">${card.user.title}</p>
                  </div>
                </div>
                <div class="content">
                  ${card.content}
                </div>
              </div>
            </div>
          </div>
          `
}


let cardsData = [{
    id: 1,
    image: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    avatar: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    user: {
        name: 'StockName',
        handle: 'ID',
        title: 'Company Name'
    },
    content: 'Description of Company'
},
{
    id: 1,
    image: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    avatar: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    user: {
        name: 'StockName',
        handle: 'ID',
        title: 'Company Name'
    },
    content: 'Description of Company'
},
{
    id: 1,
    image: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    avatar: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    user: {
        name: 'StockName',
        handle: 'ID',
        title: 'Company Name'
    },
    content: 'Description of Company'
},
{
    id: 1,
    image: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    avatar: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    user: {
        name: 'StockName',
        handle: 'ID',
        title: 'Company Name'
    },
    content: 'Description of Company'
},
{
    id: 1,
    image: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    avatar: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    user: {
        name: 'StockName',
        handle: 'ID',
        title: 'Company Name'
    },
    content: 'Description of Company'
},
{
    id: 1,
    image: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    avatar: 'http://sevensreport.com/wp-content/uploads/2016/07/stock-market-3.jpg',
    user: {
        name: 'StockName',
        handle: 'ID',
        title: 'Company Name'
    },
    content: 'Description of Company'
},

]
