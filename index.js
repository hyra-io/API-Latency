const axios = require("axios").default;

const pageId = "l4rcgbz2qstw";
const metricId = "rf18wdqckhc9";

const path = "https://api.hyra.io";

const checkApi = () => {
    const start = new Date().getTime();
    axios.get(path).then(response => {
        const latency = new Date().getTime() - start;

        axios.post(`https://api.statuspage.io/v1/pages/${pageId}/metrics/${metricId}/data.json`,
            {
                data: {
                    timestamp: Math.floor(new Date() / 1000),
                    value: latency
                }
            },
            {
                headers: {
                    Authorization: "OAuth " + process.env.API_KEY
                }
            }).then(result => {
                console.log('All went well');
                setTimeout(() => {
                    checkApi();
                }, 30 * 1000)
            }).catch(err => {
                console.log(err);
            })
    }).catch(err => {
        console.log(err);
    })
}

checkApi();