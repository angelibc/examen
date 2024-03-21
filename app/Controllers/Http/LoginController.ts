 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Env from '@ioc:Adonis/Core/Env';
 import Admin from 'App/Models/Administrador';
 import bcrypt from 'bcrypt';

export default class LoginController {

    /**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Administradores
 *     description: Inicia sesión con el correo electrónico y la contraseña proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del admin.
 *               password:
 *                 type: string
 *                 description: Contraseña del admin.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Autenticación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Título del mensaje.
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo.
 *                 type:
 *                   type: string
 *                   description: Tipo de mensaje.
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token de sesión generado.
 *       '401':
 *         description: Datos de autenticación inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Título del mensaje.
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo.
 *                 type:
 *                   type: string
 *                   description: Tipo de mensaje.
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Correo electrónico proporcionado.
 *                     password:
 *                       type: string
 *                       description: Contraseña proporcionada.
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Título del mensaje de error.
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo del error.
 *                 type:
 *                   type: string
 *                   description: Tipo de error.
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       description: Mensaje de error detallado.
 */
    public async authLogin({ request, response, auth }: HttpContextContract) {
        try {
            const email = request.input('email');
            const plainPass = request.input('password');
    
            const reqAdmin = await Admin.query().where('email', email).whereNull('deleted_at').first();
    
            const accountSID = Env.get('TWILIO_ACCOUNT_SID');
            const authToken = Env.get('TWILIO_AUTH_TOKEN');
            const client = require('twilio')(accountSID, authToken);
    
            if (!reqAdmin) {
                return response.status(401).send({
                    title: 'Datos inválidos',
                    message: 'El usuario y/o contraseña son inválidos',
                    type: 'warning',
                    data: {
                        email: email,
                        password: plainPass
                    },
                });
            }
    
            const hashedPass = reqAdmin.password;
    
            if (!(await bcrypt.compare(plainPass, hashedPass))) {
                return response.status(401).send({
                    title: 'Datos inválidos',
                    message: 'El usuario y/o contraseña son inválidos',
                    type: 'warning',
                    data: {
                        email: email,
                        password: plainPass
                    },
                });
            }
    
            const token = await auth.use('api').generate(reqAdmin, {
                expiresIn: '1mins',
            });
    
            await client.messages.create({
                body: 'Se ha iniciado sesión',
                from: Env.get('TWILIO_FROM_NUMBER'),
                to: `+52${reqAdmin.telefono}`
            });
    
            return response.status(200).send({
                title: 'Autenticación exitosa',
                message: 'El token de sesión se ha generado de manera exitosa',
                type: 'success',
                data: {
                    token
                },
            });
        } catch (error) {
            return response.status(500).send({
                title: 'Error',
                message: 'Ocurrió un error',
                type: 'Error',
                data: {
                    error: error.message
                }
            });
        }
    }
}
