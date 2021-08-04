/*
    where we push/pull data to/from the database
    functions called globally from other files
*/

export const setSeedMoney = (user, seed) => {
    firebase.database().ref(`/users/${user}/profile`).update({seed: seed});
}

export const getSeedMoney = (user) => {
    const userRef = firebase.database().ref(`users/${user}/profile`);
    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        return data.seed;
    });
}

export const setBalance = (user, money) => {
    firebase.database().ref(`/users/${user}/profile`).update({balance: money});
}

export const getBalance = (user) => {
    const userRef = firebase.database().ref(`users/${user}/profile`);
    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        return data.balance;
    });
}

export const buyStock = (user, stockVals) => {
    firebase.database().ref(`/users/${user}/portfolio`).update(stockVals);
}

