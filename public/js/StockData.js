const apiKey = "Tpk_2348d90c37bb48988f8548de47bd8737";

class StockData {
    constructor(sym) {
        console.log("in constructor");
        this.symbol = sym;
        this.company = null;
        this.latestPrice = null;
        this.changePct = null;
        this.change = null;

        //const urlToFetch = `https://ticker-2e1ica8b9.now.sh//keyword/${sym}`;
        //const urlToFetch = `https://cloud.iexapis.com/stable/${sym}/chart/1m?token=pk_${apiKey}&includeToday=true`; //production
        //    const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/chart/1m?token=${apiKey}&includeToday=true`; //sandbox --> chart endpoint = historical data 
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/quote/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
   
        fetch(urlToFetch)
            .then(response => response.json())
            .then(myJson => {
                this.symbol = myJson["symbol"];
                this.company = myJson["companyName"];
                this.latestPrice = myJson["latestPrice"];
                this.changePct = myJson["changePercent"];
                this.change = myJson["change"];
                })
            .catch(error => {
                console.log("error: ", error)
            });

        console.log("exiting constructor", this);
    }
}

export{StockData};

