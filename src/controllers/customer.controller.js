const { uploadSingleFile } = require('../services/file.service')
const { createCustomerService, createArrayCustomerService, getAllCustomersService, updateCustomerService } = require("../services/customer.service")


//  {key : value}
module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;
        let imageUrl = "";
        if (!req.files || Object.keys(req.files).length === 0) {
            // return res.status(400).send('No files were uploaded.');
            // do nothing
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }

        let customerData = {
            name,
            address,
            phone,
            email,
            description,
            imageUrl,
        }

        let customer = await createCustomerService(customerData)

        return res.status(200).json({
            EC: 0,
            data: customer,
        })
    },

    postCreateArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers);

        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers,
            })
        } else {
            return res.status(500).json({
                EC: -1,
                data: customers,
            })
        }
    },

    getAllCustomers: async (req, res) => {
        let customers = await getAllCustomersService();

        return res.status(200).json({
            EC: 0,
            data: customers,
        })
    },

    putUpdateCustomer: async (req, res) => {
        let { id, name, address, phone, email, description } = req.body;

        let customerData = {
            name,
            address,
            phone,
            email,
            description,
        }

        let customer = await updateCustomerService(id, customerData);

        return res.status(200).json({
            EC: 0,
            data: customer,
        })
    },

}