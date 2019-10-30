//require express
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const apikey = process.env.SENDGRID_API_KEY;

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// create for our router object
var router = express.Router();

//export our router
module.exports = router;


router.get('/home', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

router.post('/email',urlencodedParser, function(req, res){
    // console.log(req.body.Email);
    // console.log(req.body.Message);
    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
        const sgMail = require('@sendgrid/mail');
        
        sgMail.setApiKey(apikey);
        console.log('Your port is ${SENDGRID_API_KEY}');
        const msgName = "Send by "+req.body.Name + "\n\n" + "----------------------------------------------------" + "\n\n";
        console.log(msgName);
        const msg = {
            to: 'geral@jest.pt',
            from: req.body.Email,
            subject: 'Mensagem de jest.pt',
            text: msgName.concat(req.body.Message),
        };
        // console.log(msg.text);
        sgMail.send(msg);
       //res.sendFile(path.join(__dirname, '../index.html'));
       //res.send('root');
       res.redirect('home');

    
});

//route for our homepage
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

