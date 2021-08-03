class StockData {
    constructor(sym) {
        this.symbol = sym;
        
        this.company = null;
        this.latestPrice = null;
        this.changePct = null;
        this.change = null;
        this.logo = null;

        this.news = [];

        //let j = this.getRequest2("quote");
        //console.log("J=", j);

        //this.company = j["company"];
        this.getRequest("quote");
        this.getRequest("logo");
        this.getRequest("news/last/10");

        console.log("in stockData: ", this);
        console.log("in stockData: ", this.company);
    }

    getRequest(request) {
        //const urlToFetch = `https://ticker-2e1ica8b9.now.sh//keyword/${sym}`;
        //const urlToFetch = `https://cloud.iexapis.com/stable/${sym}/chart/1m?token=pk_${apiKey}&includeToday=true`; //production
        //const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/chart/1m?token=${apiKey}&includeToday=true`; //sandbox --> chart endpoint = historical data 
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/${request}/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
       
        fetch(urlToFetch)
            .then((response) => response.json())
            .then((myJson) => {
                this.filterData(request, myJson);
            })
            .catch((error) => {
                console.log("error: ", error)
            });
    }

    async getRequest2(request) {
        //const urlToFetch = `https://ticker-2e1ica8b9.now.sh//keyword/${sym}`;
        //const urlToFetch = `https://cloud.iexapis.com/stable/${sym}/chart/1m?token=pk_${apiKey}&includeToday=true`; //production
        //const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/chart/1m?token=${apiKey}&includeToday=true`; //sandbox --> chart endpoint = historical data 
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/${request}/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
       
        await fetch(urlToFetch)
            .then((response) => response.json())
            
            .catch((error) => {
                console.log("error: ", error)
            });
    }

    filterData(type, data) {
        if(type === "logo") {
            this.logo = data["url"];
        }
        else if (type === "quote"){
            this.company = data["companyName"];
            console.log(this.company);
            this.latestPrice = data["latestPrice"];
            this.changePct = data["changePercent"];
            this.change = data["change"];


        }
        else if(type === "news/last/10"){
            for(let i = 0; i < data.length; i++) {
                this.news.push({
                    headline: data[i]["headline"],
                    url: data[i]["url"],
                    img: data[i]["image"]
                });
            }
        }
    }

}
export{StockData};

