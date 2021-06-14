const { MongoClient } = require('mongodb');

//Atlas URL - 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
//password encoding ----> change # to %23

const url = 'mongodb+srv://mongoatlasUser:%232EB9bOTu1@worgcluster.m7m8f.mongodb.net/issuetracker?retryWrites=true&w=majority';

function testWithCallbacks(callback){
    console.log('\n--- testWithCallback ---');
    const client = new MongoClient(url , {useNewUrlParser:true,useUnifiedTopology: true});
    client.connect(function(err,client){
        if(err){                         //error handling to call callback and return to stop connection.
            callback(err);
            return;
        }
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('employees');

        //insertOne
        const employee = {id:1,name:'A.Callback',age:23};
        collection.insertOne(employee,function(err,result){
            if(err){                    //error handling to stop client req (insertOne), callback and return to stop connection.
                client.close();
                callback(err);
                return;
            }

            console.log('Result of insert \n',result.insertedId);
            collection.find({_id:result.insertedId}).toArray(function(err,docs){
                if(err){
                    client.close();
                    callback(err);
                    return;
                }
                console.log('Result of find:\n',docs)
                client.close();
                callback(err);
            })
        })
    })

}

//async await example
async function testWithAsync(){
    console.log('\n--- testWithAsync ---');

    const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})
    try{
        await client.connect();
        console.log('Connected to MongoDB')
        const db = client.db();
        const collection = db.collection('employees');

        const employee = {id:2, name:'B',age:16};
        const result = await collection.insertOne(employee);
        console.log('Result of insert\n:',result.insertedId);
        const docs = await collection.find({_id:result.insertedId}).toArray();
        console.log('Result of find\n',docs);

    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
}

//call the function
testWithCallbacks(function(err){
    if(err){
        console.log(err);
    }
    testWithAsync();
})
