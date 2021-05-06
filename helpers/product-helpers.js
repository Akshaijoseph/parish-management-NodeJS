
var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    
    addProduct:(product ,callback)=>{
      // console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
            
        })
       
    },

    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.UPDATE_INFO).removeOne({_id:objectId(prodId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
            return new Promise((resolve,reject)=>{
                db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                    resolve(product)
                })
            })
       
    },

    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
                $set:{
                    name:proDetails.name,
                    Discription:proDetails.Discription,
                    price:proDetails.price,
                    category:proDetails.category


                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    getProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
            
        })
       
    },
    getAllOrders:()=>{
        return new Promise(async(resolve,reject)=>{
           
            let orders = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
            resolve(orders)
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },
    getAllappointment:()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection(collection.TAKE_APPOINMENT).find().toArray()
            resolve(users)
        })
    },
    updateInfo:(info,callback)=>{
   
        db.get().collection('info').insertOne(info).then((data)=>{
            callback(true)
        })
    },
    
    deleteUserOrder:(delId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.UPDATE_INFO).removeOne({_id:objectId(delId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    
    },
    getAllinfo:()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection(collection.UPDATE_INFO).find().toArray()
            resolve(users)
        })
    }

}