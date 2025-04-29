import mongoose  from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
   username:{
    type : String,
    required: true,
    unique:true,
    trim:true,
    lowercase:true,
    index:true
   },
   email:{
    type : String,
    required: true,
    unique:true,
    trim:true,
    lowercase:true,
   },
   fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
   },
   avatar:{
  type:String, //clouldinary url
  required:true
   },
   coverImage:{
    type:String, //clouldinary url
     },
     warchHistory:[
      {
        type:Schema.Type.ObjectId,
        ref:"video"
      }
     ],
     password:{
      type:String,
      required:[true,"password is required"]
     },
     refresToken:{
      type:String
     }
},{timestamps:true})

userSchema.pre("save", async function(next){
  if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
  next()
})
userSchema.methods.ispasswordCorrect = async function(password) {
 return await bcrypt.compare(password,this.password)
}

userSchema.mathods.generateAccessToken= function(){
  jwt.sign({
    id:this.id,
    password:this.password,
    username:this.username,
    fullname:this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expriresIn: process.env.REFRESS_TOKEN_EXPIRY
  }
)
}
userSchema.mathods.generateRefreshToken= function(){ 
  jwt.sign({
    id:this.id,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expriresIn: process.env.REFRESS_TOKEN_EXPIRY
  }
)

}



export const User = mongoose.model("User", userSchema)
