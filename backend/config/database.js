const {MongoClient}=require('mongodb')
const url="mongodb://localhost:27017"
const client=new MongoClient(url)

client.connect().then(console.log("database connected"))
const db=client.db('project2')
const user=db.collection('user')

module.exports={
    user:user,
}