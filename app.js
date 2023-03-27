const express=require('express')
const path=require("path");
const app=express();
const fs=require('fs')
const port=80;
//EXPRESS SPECIFIC STUFF
//for serving static files
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.engine('pug', require('pug').__express)

//set the template engine as pug
app.set('view engine', 'pug')

//set the views directory
app.set('views',path.join(__dirname,'views'));

//ENDPOINTS
app.get('/',(req,res)=>{
    const con='this is saswat'
    const params={'title':'pug is best',"content":con}
    res.status(200).render('index.pug',params)
})
app.post('/',(req,res)=>{
    name=req.body.name
    emailID=req.body.emailID
    phonenumber=req.body.phonenumber
    gender=req.body.gender
    more=req.body.more

    let outputwrite=`the name of the person is ${name} and emailid is ${emailID} the persons phone number is ${phonenumber} and gender is${gender}
    more about the person is ${more}`

    fs.writeFileSync('output.txt',outputwrite)
    const params={'message':'your form has been subbmited.'}
    res.status(200).render('index.pug',params)
})

app.listen(port,()=>{
    console.log(`the port is running at port ${port}`);
})

