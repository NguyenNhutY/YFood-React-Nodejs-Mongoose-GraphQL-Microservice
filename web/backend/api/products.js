const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const UserAuth = require ("../middleware/auth")

module.exports = (app) => {
    const service = new ProductService();
    const customerService = new CustomerService();

    app.post ("/product/create", async(req,res,next)=>{
        try{
            const {name, desc, type, unit, prie, available, suplier,}
        }
    })