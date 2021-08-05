class StockData {
    constructor(sym) {
        this.symbol = sym;

        this.company = null;
        this.latestPrice = 0;
        this.changePct = 0;
        this.change = 0;
        this.logo = null;
        this.chart = null;
        
        this.getInfo();
        this.getLogo();
    }

    getRequest(request) {
        //const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/${request}?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
        const urlToFetch = `https://cloud.iexapis.com/stable/stock/${this.symbol}/${request}?token=${apiKey}`; //legit token

        var http = new XMLHttpRequest();

        http.open("GET", urlToFetch, false);
        http.send(null);

        if (http.status == 200) {
            return JSON.parse(http.responseText);
        }

        console.log("Http Error Status: ", http.statusText);
        console.log("Http Error Response: ", http.ResponseText);
        return null;
    }

    getInfo() {
        let data = this.getRequest("quote");
        if (data != null) {
            this.company = data["companyName"];
            this.latestPrice = data["latestPrice"];
            this.changePct = data["changePercent"];
            this.change = data["change"];
        }
    }

    getLogo() {
        let data = this.getRequest("logo");
        if (data != null) {
            this.logo = data["url"];
        }
    }

    getNews(entries) {
        let data = this.getRequest(`news/last/${entries}`);
        let news = [];
        for (let i = 0; i < data.length; i++) {
            news.push({
                headline: data[i]["headline"],
                url: data[i]["url"],
                img: data[i]["image"]
            });
        }
        return news;
    }
}

export { StockData };

