var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");
var mysql = require("mysql");
var randomToken = require("random-token");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function (req, res) {
  res.render("signup.ejs");
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Usuário é obrigatório"),
    check("password").notEmpty().withMessage("Senha é obrigatória"),
    check("email").notEmpty().isEmail().withMessage("Email válido é obrigatório"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var email_status = "not_verified";
    var email = req.body.email;
    var username = req.body.username;

    db.signup(
      req.body.username,
      req.body.email,
      req.body.password,
      email_status
    );
    var token = randomToken(8);
    
    db.verify(req.body.username, email, token);

    db.getuserid(email, function (err, result) {
      
      var output =
        `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        
        <head>
          <title></title>
          <!--[if !mso]><!-- -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
        
            .ReadMsgBody {
              width: 100%;
            }
        
            .ExternalClass {
              width: 100%;
            }
        
            .ExternalClass * {
              line-height: 100%;
            }
        
            body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
        
            table,
            td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
        
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
            @media only screen and (max-width:480px) {
              @-ms-viewport {
                width: 320px;
              }
              @viewport {
                width: 320px;
              }
            }
          </style>
          <!--<![endif]-->
          <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
          <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
          <!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
          </style>
          <!--<![endif]-->
          <style type="text/css">
            @media only screen and (max-width:595px) {
              .container {
                width: 100% !important;
              }
              .button {
                display: block !important;
                width: auto !important;
              }
            }
          </style>
        </head>
        
        <body style="font-family: 'Inter', sans-serif; background: #E5E5E5;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
            <tbody>
              <tr>
                <td valign="top" align="center">
                  <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding:48px 0 30px 0; text-align: center; font-size: 14px; color: #4C83EE;">
                          Hospital Pelotas
                        </td>
                      </tr>
                      <tr>
                        <td class="main-content" style="padding: 48px 30px 40px; color: #000000;" bgcolor="#ffffff">
                          <table width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="padding: 0 0 24px 0; font-size: 18px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;">
                                  Caro  ` + username + `, </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Obrigado por se cadastrar! Seu link de verificação e token estão logo abaixo: <ul>
                        <li>Token: ` + token +`</li>
                    </ul>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 700; color: #000000; letter-spacing: 0.01em;">
                                  Clique no botão abaixo para verificar sua conta
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 24px 0;">
                                  <a class="button" href="http://localhost:3000/verify" title="Verificar" style="width: 100%; background: #22D172; text-decoration: none; display: inline-block; padding: 10px 0; color: #fff; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px;">Verificar</a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  O link de verificação é válido por 24 horas a partir do recebimento
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 60px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Se você não se cadastrou por favor, ignore esse email ou contate o suporte. 
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 16px;">
                                  <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 14px; line-height: 170%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Atenciosamente, <br><strong>Hospital Pelotas</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 24px 0 48px; font-size: 0px;">
                          <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:300px;">      <![endif]-->
                          <div class="outlook-group-fix" style="padding: 0 0 20px 0; vertical-align: top; display: inline-block; text-align: center; width:100%;">
                            <span style="padding: 0; font-size: 11px; line-height: 15px; font-weight: normal; color: #8B949F;">Hospital e Pronto Socorro de Pelotas - RS<br/> Av. Bento Gonçalves 1372, Centro
                            </div>
                          </div>
                          <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
        </html>        
        `;
        
        var transporter = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "",
              pass: ""
            }
        });
        var mailOptions = {
            from: "hospitalpelotas@demomailtrap.com",
            to: email,
            subject: "Verificação de email", // Subject line
            html: output, // plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
            return console.log(err);
            }
            console.log(info);
        });

      res.send("Cheque seu email para verificação.");
    });

    // response.redirect("/login");
  }
);

module.exports = router;