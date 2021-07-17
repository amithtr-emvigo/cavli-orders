const util          = require('util');
let   xlstojson      = require("xls-to-json-lc");
      xlstojson      = util.promisify(xlstojson);
let   xlsxtojson      = require("xlsx-to-json-lc");
      xlsxtojson      = util.promisify(xlsxtojson);
const orderService = require("../services/orderService");


module.exports.uploadOrders = async (req, res) => {
  console.log("Inside uploadOrders")
  try {

      if(req.files.order_file){
     
        let file= req.files.order_file;
        let uploadPath = __dirname + '/uploads/' + req.files.order_file.name

        
          await file.mv(uploadPath)

          if(uploadPath.split('.')[uploadPath.split('.').length-1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
        
          let json_data  = await exceltojson({input: uploadPath, output: null, lowerCaseHeaders:true})

           let data = await orderService.saveOrders(json_data);

           msg = "Orders Uploaded Successfully";
           return res.status(201).json({ success: true, message: msg, data: data });
      
        
        
      }else{
        msg = "File required";
        return res.status(400).json({ success: true, message: msg, data: {} });
      }    
   
  } catch (err) {
    console.log(err)
    msg = "Sorry ! uploadOrders Failed!";
    return res.status(500).json({ success: false, message: msg, data: err });
  }
};


module.exports.getOrdersByCompany = async (req, res) => {
  console.log("Inside getOrdersByCompany:")
  try {

      if(req.body.company_name){
     
           let data = await orderService.getOrdersUsingComapany(req.body.company_name);

           msg = "Data fetch Success";
           return res.status(201).json({ success: true, message: msg, data: data });
      
        
        
      }else{
        msg = "company_name required";
        return res.status(400).json({ success: true, message: msg, data: {} });
      }    
   
  } catch (err) {
    console.log("Sorry ! getOrdersByCompany Failed!", err)
    msg = "Sorry ! getOrdersByCompany Failed!";
    return res.status(500).json({ success: false, message: msg, data: err });
  }
};

module.exports.getOrdersByAddress = async (req, res) => {
  console.log("Inside getOrdersByAddress:")
  try {

      if(req.body.address){
     
           let data = await orderService.getOrdersUsingAddress(req.body.address);

           msg = "Data fetch Success";
           return res.status(201).json({ success: true, message: msg, data: data });
      
        
        
      }else{
        msg = "address required";
        return res.status(400).json({ success: true, message: msg, data: {} });
      }    
   
  } catch (err) {
    console.log("Sorry ! getOrdersByAddress Failed!", err)
    msg = "Sorry ! getOrdersByAddress Failed!";
    return res.status(500).json({ success: false, message: msg, data: err });
  }
};


module.exports.deleteOrder = async (req, res) => {
  console.log("Inside deleteOrder:",req.body.orderId)
  try {

      if(req.body.orderId){
     
           let data = await orderService.deleteOrderById(req.body.orderId);

           msg = "Delete Success";
           return res.status(201).json({ success: true, message: msg, data: data });
      
        
        
      }else{
        msg = "orderId required";
        return res.status(400).json({ success: true, message: msg, data: {} });
      }    
   
  } catch (err) {
    console.log("Sorry ! deleteOrder Failed!", err)
    msg = "Sorry ! deleteOrder Failed!";
    return res.status(500).json({ success: false, message: msg, data: err });
  }
};

module.exports.getOrdersCountOfItems = async (req, res) => {
  console.log("Inside getOrdersCountOfItems:")
  try {
     
           let data = await orderService.getOrdersCount();

           msg = "Data fetch Success";
           return res.status(201).json({ success: true, message: msg, data: data });
   
   
  } catch (err) {
    console.log("Sorry ! getOrdersCountOfItems Failed!", err)
    msg = "Sorry ! getOrdersCountOfItems Failed!";
    return res.status(500).json({ success: false, message: msg, data: err });
  }
};