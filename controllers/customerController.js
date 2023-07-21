const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");
//@desc get all contacts
//@route GET /api/customer
//@access private
const getCustomers = asyncHandler(async(req,res)=>{
    const customer = await Customer.find({user_id: req.user.id});
    res.status(200).json(customer);
});
//@desc create new contacts
//@route POST /api/customer
//@access private
const createCustomer = asyncHandler(async(req,res)=>{
    console.log("The request body is: ",req.body)
    const{name,email,phone}= req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    const customer = await Customer.create({
        name,
        email,
        phone,
        user_id:req.user.id
      });
    res.status(201).json(customer);
});
//@desc get individual contacts
//@route GET /api/customer/:id
//@access private
const getCustomer = asyncHandler(async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404);
    throw new Error("Customer not found");
  }
    res.status(200).json(customer);
});
//@desc Update contacts
//@route PUT /api/customer/:id
//@access private
const updateCustomer = asyncHandler(async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404);
    throw new Error("Customer not found");
  }
  if (customer.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
    res.status(200).json(updatedCustomer);
});
//@desc Delete contacts
//@route DELETE /api/customer/:id
//@access private
const deleteCustomer = asyncHandler(async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404);
    throw new Error("Customer not found");
  }
  if (customer.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Customer.deleteOne({_id: req.params.id});
    res.status(200).json(customer);
});
module.exports= {getCustomers,createCustomer,getCustomer,updateCustomer,deleteCustomer};