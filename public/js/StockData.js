
class StockData {
    constructor(sym) {
        this.symbol = sym;
        
        this.company = null;
        this.latestPrice = null;
        this.changePct = null;
        this.change = null;
        this.logo = null;
        this.news = [];

        this.getInfo();
        this.getLogo();
        this.getNews();
    }

    getRequest(request)
    {
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/${request}/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data

        var http = new XMLHttpRequest();

        http.open("GET", urlToFetch, false);
        http.send(null);

        if (http.status == 200) {
            return JSON.parse(http.responseText);
        }

        console.log("Http Error: ", http.statusText);
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

    getNews() {
        let data = this.getRequest("news/last/10");
        for(let i = 0; i < data.length; i++) {
            this.news.push({
                headline: data[i]["headline"],
                url: data[i]["url"],
                img: data[i]["image"]
            });
        }
    }

   /* getRequest(request) {
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

    getRequest3 = async (request) => {
        const myJson = await this.getRequest2(request);
        console.log("req3:", myJson);
        //return myJson;
    }

    async getRequest2(request) {
        //const urlToFetch = `https://ticker-2e1ica8b9.now.sh//keyword/${sym}`;
        //const urlToFetch = `https://cloud.iexapis.com/stable/${sym}/chart/1m?token=pk_${apiKey}&includeToday=true`; //production
        //const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${sym}/chart/1m?token=${apiKey}&includeToday=true`; //sandbox --> chart endpoint = historical data 
        const urlToFetch = `https://sandbox.iexapis.com/stable/stock/${this.symbol}/${request}/?token=${apiKey}`; //sandbox --> quote endpoint = real-time data
       
        let resp = fetch(urlToFetch)
        .then((response) => response.json())
        .then((myJson) => {
            return myJson;
        })
        .catch((error) => {
            console.log("error: ", error)
        });


        if (! resp.ok) {
            console.log('error: ', resp.status)

            return;
        }

        let myJson = await resp.json();

        return myJson;

            
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
    }*/
}

export{StockData};

