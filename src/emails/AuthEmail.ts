import { transport } from '../config/nodemailer'

type EmailType = {
    name: string
    email: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'Cashtracker <admin@cashtracker.com>',
            to: user.email,
            subject: 'Cashtracker - Confirma tu cuenta',
            html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Confirma tu cuenta - Cashtracker</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background: linear-gradient(135deg, #00c6ff, #0072ff);
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        color: #333;
                    }
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 40px 20px;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }
                    .card {
                        background: #ffffff;
                        max-width: 500px;
                        width: 100%;
                        padding: 30px;
                        border-radius: 12px;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                    }
                    h1 {
                        font-size: 24px;
                        color: #0072ff;
                        margin-bottom: 16px;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.6;
                        margin: 12px 0;
                    }
                    .btn {
                        margin-top: 20px;
                        padding: 12px 24px;
                        background-color: #0072ff;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                        display: block;
                        width: 50%;
                        margin-left: auto;
                        margin-right: auto;
                        box-sizing: border-box;
                        text-align: center;
                    }
                    .code-box {
                        background-color: #f4f4f4;
                        padding: 10px;
                        border-radius: 6px;
                        font-weight: bold;
                        font-size: 18px;
                        text-align: center;
                        letter-spacing: 1px;
                        margin-top: 10px;
                    }
                    @media (max-width: 600px) {
                        .card {
                            padding: 20px;
                        }
                        h1 {
                            font-size: 20px;
                        }
                        p {
                            font-size: 15px;
                        }
                        .btn {
                            padding: 10px 20px;
                        }
                    }
                </style>
            </head>
            <body>
                <main class="container">
                    <section class="card">
                        <h1>Hola, ${user.name} 👋</h1>
                        <p>Gracias por registrarte en <strong>Cashtracker</strong>. Tu cuenta está casi lista.</p>
                        <p>Para activarla, por favor haz clic en el siguiente botón:</p>
                        <a href="https://cashtracker.com/confirmar?token=${user.token}" class="btn">Confirmar cuenta</a>
                        <p>O si lo prefieres, puedes usar el siguiente código de confirmación:</p>
                        <div class="code-box">${user.token}</div>
                        <p>Si no has solicitado esta cuenta, puedes ignorar este correo.</p>
                        <p>¡Gracias por confiar en nosotros!<br/>— El equipo de Cashtracker</p>
                    </section>
                </main>
            </body>
            </html>
            `,
        })

        console.log('Mensaje enviado: ', email.messageId)
    }
}
