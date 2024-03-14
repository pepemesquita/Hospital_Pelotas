var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");
var randomToken = require("random-token");
const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get("/", function (req, res) {
  res.render("resetpassword.ejs");
});

router.post("/", function (req, res) {
  var email = req.body.email;

  // Verificar se o email foi fornecido
  if (!email) {
    return res.status(400).send("Email é obrigatório.");
  }


  var resetToken = randomToken(8);

  
  db.updateResetToken(email, resetToken, function (err, result) {
    if (err) {
      console.error("Erro ao atualizar token de redefinição de senha:", err);
      return res.status(500).send("Erro ao enviar email de redefinição de senha.");
    }

    if (result.affectedRows > 0) {
      sendPasswordResetEmail(email, resetToken, function (err) {
        if (err) {
          console.error("Erro ao enviar o email de redefinição de senha:", err);
          return res.status(500).send("Erro ao enviar email de redefinição de senha.");
        }
        console.log("Email de redefinição de senha enviado com sucesso.");
        return res.status(200).send("Um email de redefinição de senha foi enviado. Por favor, verifique sua caixa de entrada.");
      });
    } else {
      return res.status(404).send("Email não encontrado.");
    }
  });
});


function sendPasswordResetEmail(email, resetToken, callback) {
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
                              Caro usuário,
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                            Seu link de redefinição de senha e token estão logo abaixo: <ul>
                    <li>Token: ` + resetToken +`</li>
                </ul>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 700; color: #000000; letter-spacing: 0.01em;">
                              Clique no botão abaixo para redefinir sua senha
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 24px 0;">
                              <a class="button" href="http://localhost:3000/setpassword" title="Redefinir" style="width: 100%; background: #22D172; text-decoration: none; display: inline-block; padding: 10px 0; color: #fff; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px;">Verificar</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                              O link de redefinição é válido por 24 horas a partir do recebimento
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 60px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                              Se você não solicitou a redefinição de senha por favor, ignore esse email ou contate o suporte. 
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
              user: "api",
              pass: ""
            }
    });

    var mailOptions = {
        from: "hospitalpelotas@demomailtrap.com",
        to: email,
        subject: "Redefinição de Senha",
        html: output
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
        console.error("Erro ao enviar o email de redefinição de senha:", err);
        return callback(err);
        }
        console.log("Email de redefinição de senha enviado:", info.response);
        callback(null);
    });
}

module.exports = router;
