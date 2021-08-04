/*
    Where we handle the UI for the stockPortfolio page (event listeners, changing text, etc) 
*/

            
//on "sell" click
    //open modal displaying stock card, option to input # of shares, confirm/cancel
    //confirm # of shares <= volume bought pulled from database
        //pull most recent buy price from database, calculate earnings or ask for new input shares
        //update database w new volume, user balance 
import * as helpers from '/js/database.js';        

let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      //window.location = 'index.html';
    };
  });
};

//on "buy" click
    //open modal displaying stock card, option to input # of shares, confirm/cancel
    //check with user balance to confirm they have enough $ to buy x shares at y price
        //confirm and close modal or ask for new input shares
            //push stock symbol, timestamp, buy price, volume to database

const buyStock = (stockID) => {
    const buyModal = document.querySelector('#buyModal');
    const stockRef = firebase.database().ref(`users/${googleUserId}/portfolio`);
    stockRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const stock = data[stockID];

        //document.querySelector("#editTitleInput").value = note.title; --> update HTML of modal w stock data, use StockData/database getters
        //document.querySelector("#editTextInput").value = note.text;
        document.querySelector("#buyStockID").value = stockID
    });
    buyModal.classList.toggle("is-active");
}

const closeBuyModal = () => {
    const buyModal = document.querySelector('#buyModal');
    buyModal.classList.toggle("is-active");
}

const saveBuy = () => {
    /*const noteTitle = document.querySelector("#editTitleInput").value;
    const noteText = document.querySelector("#editTextInput").value;
    const noteID = document.querySelector("#editNoteID").value;

    const stockVals = {
        title: noteTitle,
        text: noteText
    };*/
    //buyStock(googleUserId, stockVals);
    closeBuyModal();
}