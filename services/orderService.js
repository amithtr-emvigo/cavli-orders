const Orders          = require("../models/orderModel").Order;

module.exports.saveOrders = async (json) => {
    try {
        console.log("Inside saveOrders :");

        let res = await Orders.insertMany(json);

        return ;

    } catch (err) {
        console.log("saveOrders Unexpected errors:", err);
        throw err;
    }


}

module.exports.getOrdersUsingComapany = async (company) => {
    try {
        console.log("Inside getOrdersUsingComapany :",company);

        let res = await Orders.find({"companyname":company});

        return res;

    } catch (err) {
        console.log("getOrdersUsingComapany Unexpected errors:", err);
        throw err;
    }


}

module.exports.getOrdersUsingAddress = async (address) => {
    try {
        console.log("Inside getOrdersUsingAddress :",address);

        let res = await Orders.find({"customeraddress":address});

        return res;

    } catch (err) {
        console.log("getOrdersUsingAddress Unexpected errors:", err);
        throw err;
    }


}

module.exports.deleteOrderById = async (orderId) => {
    try {
        console.log("Inside deleteOrderById :",orderId);

        let res = await Orders.remove({"orderid":orderId});

        return res;

    } catch (err) {
        console.log("deleteOrderById Unexpected errors:", err);
        throw err;
    }


}


module.exports.getOrdersCount = async () => {
    try {
        console.log("Inside getOrdersCount :");

        let res = await Orders.aggregate([
            {"$group" : {_id:{ordereditem:"$ordereditem"}, count:{$sum:1}}},
            {$sort:{"count":-1}}
        ])


        return res;

    } catch (err) {
        console.log("getOrdersCount Unexpected errors:", err);
        throw err;
    }


}