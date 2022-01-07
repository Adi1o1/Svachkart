/**
 * @file For sending mail to client using nodemailer.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

//imports
var nodemailer = require('nodemailer');

var sendMailMethods = {
	forgotPassword: function(email, _token_) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Svachcart',
            html: '<h1>Forgot your password</h1>' +
                        '<p>we got your backs..</p>' +
                        '<br/>' +
                        '<p>To change your password click on the below link</p>' +
                        '<br/>' +
                        '<a href="http://localhost:3000/reset_password?reset='+ _token_ +'">http://localhost:3000/reset_password?reset='+_token_+'</a>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
	},
	
    orderShipped: function(firstName, lastName, email) {
		var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Svachcart',
            html: require('./templates/index.js').orderConfirmation(),
            attachments: [{
                filename: 'image-1.png',
                path: './utils/templates/images/image-1.png',
                cid: 'fb@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-2.png',
                path: './utils/templates/images/image-2.png',
                cid: 'twitter@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-3.png',
                path: './utils/templates/images/image-3.png',
                cid: 'linkedin@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-4.png',
                path: './utils/templates/images/image-4.png',
                cid: 'logo@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-6.png',
                path: './utils/templates/images/image-6.png',
                cid: 'delivery@nodemailer.com' //same cid value as in the html img src
            },]
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
	}
};

module.exports = sendMailMethods;