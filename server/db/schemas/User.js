const mongoose = require("mongoose");
const AddressSchema = require("./Address");
const ImageSchema = require("./Image");
const NameSchema = require("./Name")
const { SRM2,NRM1,PassVALID } = require("./Template");
const { bool } = require("joi");

const UserSchema = mongoose.Schema({
    // user_id:mongoose.Types.ObjectId,
    Name:NameSchema,
    username:{
        type: String,
        trim: true,
        required: true,
        unique: [true,"User Name Exist"]
    },
    tel:{
        type:String,
        trim: true,
        match: RegExp(/^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/g),
        required: [false, "Please provide a Mobile!"],
        unique: true
    },
    email:{
        type: String,
        trim: true,
        match: RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
        required: [true, "Please provide a Email!"],
        unique: true
    },
    // image: ImageSchema,
    password:PassVALID,
    permission:{
        type: Array,
        default: []
    },
    active:{
        type: Boolean,
        default: true
    },
    isDogManager:{
        type:Boolean,
        default: false
    },
    isDogWalker:{
        type:Boolean,
        default: false
    },
    SignWith:{
        type:Boolean,
        default: false
    },
    
    // address: AddressSchema,
    // isAdmin:{
    //     type:Boolean,
    //     default: false
    // },
    // isBusiness:{
    //     type:Boolean,
    //     default: false
    // },
    created_at:{
        type:Date,
        default: new Date()
    },
    updated_at:{
        type:Date,
        default: new Date()
    }


})

module.exports = mongoose.model("user", UserSchema);