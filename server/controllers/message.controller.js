const { message_model } = require("../models/message");

exports.add_message = async(req, res, next)=>{
    try {
        // const user = message_model
        res.status(200).send("add message");
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}