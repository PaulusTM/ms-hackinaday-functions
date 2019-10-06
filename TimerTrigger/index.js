module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    var url = process.env["API_URL"]+"/api/Assets/5656"
    var api_key = process.env["API_KEY"]
    console.log("URL:", url)
    
    const x_target = '-36'
    const y_target = '-8'

    const request = require('request');
    const options = {
        url: url,
        headers: {
            'Ocp-Apim-Subscription-Key': api_key
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            console.log(info.floor);
            console.log(info.x);
            console.log(info.y);

            var x = info.x
            var y = info.y

            var dist = Math.sqrt(Math.pow(x-x_target,2)+Math.pow(y-y_target,2))
            console.log(dist);

            if (dist <= 2){ // Distance within two meters
                console.log("inside circle")
                request.post('http://localhost:7071/api/HttpTrigger/?service=wheelchair')
            }
            
        } else {
            console.log('error getting data')
        }
    }
    request(options, callback);

    context.log('JavaScript timer trigger function ran!', timeStamp);   
};