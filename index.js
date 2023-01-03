const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const PORT=process.env.PORT||8080;
app.use(cors())
app.use(bodyParser.json())


var admin = require("firebase-admin");

var serviceAccount = require("./autodice-4c6ce-firebase-adminsdk-t45s2-1873f857e6.json");
const { initializeApp } = require('firebase-admin');
def=require("./config")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://autodice-4c6ce-default-rtdb.firebaseio.com"
});
const db = getFirestore();

app.get('/secret', function(req, res, next) {
  admin.auth().listUsers(950)
    .then(function(result){
      res.status(200).json(result);
      console.log(result)
      res.send()
      res.end()  
    })
    .catch(function(error){
      console.log(error); 
    });
});
app.post('/auth', function(req, res, next) {

  void async function() {
    const hoe = await( db.collection("authuser").doc(req.body.uid.toString()).set({email:req.body.uid.toString()}));
    console.log(hoe)
    admin.auth().updateUser(req.body.em.toString(), {
      emailVerified:true
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      res.send(userRecord)
      console.log('Successfully updated user', userRecord.toJSON());
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
  }();
  

  
  
})   
app.post('/disable',function(req,res,next){
  // console.log( req.body.em.toString())
  admin.auth().updateUser(req.body.uid.toString(), {
    disabled: true,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    res.send(userRecord)
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
})
app.post('/enable',function(req,res,next){
  // console.log( req.body.em.toString())
  admin.auth().updateUser(req.body.uid.toString(), {
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    res.send(userRecord)
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
})
app.post('/del',function(req,res,next){
  void async function() {
    const joe = await(db.collection("authuser").doc(req.body.em.toString()).delete())
    console.log(joe)
    admin.auth().deleteUser(req.body.uid.toString())
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      res.send(userRecord)
      console.log('Successfully updated user', userRecord);
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
  }();
  
})

app.listen(PORT, () => {
    console.log('BE started at port'+PORT);
})
