module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.service || (req.body && req.body.service)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "You have requested our " + (req.query.service || req.body.service) + " service. \n\nWe hope you have a wonderful experience at Microsoft today"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};