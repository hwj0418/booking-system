let request = require("request");

let base_url = "http://localhost:3000/membership";
let Member = {
    phone: 6475259618,
    firstname:"Wanjing",
    lastname:"Huang",
    store_credit:500,
    insurance_credit:100
}

describe("GET /membership", () => {

    let data = {};
    beforeAll((done)=> {
        request.get(base_url, (err, res, body)=>{
            data.status = res.statusCode;
            data.body = res.body;
            done();
        });
    });
    it("Status 200", () => {
        expect(data.status).toBe(200);
    });

});