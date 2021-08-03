const apiKey = "Tpk_2348d90c37bb48988f8548de47bd8737";

class StockData {
    constructor(sym) {
        this.symbol = sym;
        this.company = null;
        this.latestPrice = null;
        this.changePct = null;
        this.change = null;
        this.logo = null;

        //const urlToFetch = `https://ticker-2e1ica8b9.now.sh//keyword/${sym}`;
        //const urlToFetch = `https://cloud.iexapis.com/stable/${sym}/chart/1m?token=pk_${apiKey}&includeToday=true`; //production
        //    const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/chart/1m?token=${apiKey}&includeToday=true`; //sandbox --> chart endpoint = historical data 
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/quote/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
        console.log(urlToFetch);
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

        /*const urlToFetchLogo = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/logo/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
        console.log(urlToFetchLogo);
        fetch(urlToFetchLogo)
            .then(response => response.json())
            .then(myJson => {
                this.logo = myJson["url"];
                })
            .catch(error => {
                console.log("error: ", error)
            });*/
        let logo = this.getRequest("logo");
        console.log("logo:", logo);
    }

    getRequest(request) {
        //const urlToFetch = `https://ticker-2e1ica8b9.now.sh//keyword/${sym}`;
        //const urlToFetch = `https://cloud.iexapis.com/stable/${sym}/chart/1m?token=pk_${apiKey}&includeToday=true`; //production
        //    const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/chart/1m?token=${apiKey}&includeToday=true`; //sandbox --> chart endpoint = historical data 
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/${request}/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
        
        console.log(urlToFetch);
       
        fetch(urlToFetch)
            .then((response) => response.json())
            .then((myJson) => {
                console.log(myJson);
                return myJson;
            })
            .catch((error) => {
                console.log("error: ", error)
            });
        
        console.log("exiting getRequest()")
    }

    headlines() {
        let articles = [];
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/news/last/10/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
        console.log(urlToFetch);
        fetch(urlToFetch)
            .then(response => response.json())
            .then(myJson => {
                for(let i = 0; i < myJson.length; i++) {
                    articles.push({
                        headline: myJson[i]["headline"],
                        url: myJson[i]["url"],
                        img: myJson[i]["image"]
                    });
                }
            })
            .catch(error => {
                console.log("error: ", error)
            });
        return articles;
    }
}
export{StockData};

