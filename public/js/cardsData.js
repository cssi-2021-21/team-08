let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getStocks(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};

const getStocks = (userId) => {
  const stocksRef = firebase.database().ref(`users/${userId}`);
  stocksRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

const renderDataAsHtml = (data) => {
  let cards = ``;
  for (const stockData in data) {
    const stock = data[stockData];
    // For each note create an HTML card
    cards += createCard(stock, stockData)
  };
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const buyStock = (stock, stockData) => {

}

const buyStock = (stock, stockData) => {

}

const createCard = (stock, stockData) => {
  return `
    <div class="column is-one-quarter">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">${stock.title}</p>
        </header>
        <div class="card-content">
          <div class="content">${stock.text}</div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item" onclick="buyStock('${stockData}')">
            Buy
          </a>
          <a href="#" class="card-footer-item" onclick="sellStock('${stockData}')">
            Sell
          </a>
        </footer>
      </div>
    </div>
  `;
}
