import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Administrador';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

import Env from '@ioc:Adonis/Core/Env';

export default class PasswordRecoveryController {
    /**
 * @swagger
 * /api/password-recovery/request:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     description: Enviar un correo electrónico al usuario con un código de recuperación para restablecer su contraseña.
 *     tags:
 *       - Password Recovery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *     responses:
 *       200:
 *         description: Correo electrónico enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Correo electrónico enviado
 *                 message:
 *                   type: string
 *                   example: Se ha enviado un correo electrónico con instrucciones para recuperar la contraseña
 *                 type:
 *                   type: string
 *                   example: success
 *       400:
 *         description: El correo electrónico no está asociado a ninguna cuenta de usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Usuario no encontrado
 *                 message:
 *                   type: string
 *                   example: No se encontró ningún usuario asociado con este correo electrónico
 *                 type:
 *                   type: string
 *                   example: warning
 *       500:
 *         description: Error al procesar la solicitud de recuperación de contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al procesar la solicitud
 *                 type:
 *                   type: string
 *                   example: error
 */

    public async requestRecovery({ request, response }: HttpContextContract) {
        try {
            const email = request.input('email');
            const admin = await Admin.findBy('email', email);
            if (!admin) {
                return response.status(404).send({
                    title: 'Usuario no encontrado',
                    message: 'No se encontró ningún usuario asociado con este correo electrónico',
                    type: 'warning',
                });
            }
    
            const recoveryCode = generateRecoveryCode(); 
            admin.recoverycode = recoveryCode; 
            await admin.save();
    
            await sendRecoveryEmail(email, recoveryCode); 
    
            return response.status(200).send({
                title: 'Correo electrónico enviado',
                message: 'Se ha enviado un correo electrónico con instrucciones para recuperar la contraseña',
                type: 'success',
            });
        } catch (error) {
            console.log(error);
            return response.status(500).send({
                title: 'Error',
                message: 'Ocurrió un error al procesar la solicitud',
                type: 'error',
                data: {
                    error: error
                }
            });
        }
    }
/**
 * @swagger
 * /api/password-recovery/verify:
 *   post:
 *     summary: Verificar código de recuperación de contraseña
 *     description: Verificar si el código de recuperación proporcionado es válido y actualizar la contraseña del usuario.
 *     tags:
 *       - Password Recovery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               recoveryCode:
 *                 type: string
 *                 description: Código de recuperación enviado al usuario por correo electrónico
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Contraseña actualizada
 *                 message:
 *                   type: string
 *                   example: Tu contraseña ha sido actualizada exitosamente
 *                 type:
 *                   type: string
 *                   example: success
 *       400:
 *         description: Código de recuperación inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Código de recuperación inválido
 *                 message:
 *                   type: string
 *                   example: El código de recuperación proporcionado no es válido
 *                 type:
 *                   type: string
 *                   example: warning
 *       500:
 *         description: Error al procesar la solicitud de verificación de contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al procesar la solicitud
 *                 type:
 *                   type: string
 *                   example: error
 */
    public async verifyRecoveryCode({ request, response }: HttpContextContract) {
        try {
            const email = request.input('email');
            const recoveryCode = request.input('recoveryCode');
            const newPassword = request.input('newPassword');
    
            const admin = await Admin.findBy('email', email);
            if (!admin || admin.recoverycode !== recoveryCode) {
                return response.status(400).send({
                    title: 'Código de recuperación inválido',
                    message: 'El código de recuperación proporcionado no es válido',
                    type: 'warning',
                });
            }
    
            // Actualizar la contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            admin.password = hashedPassword;
            admin.recoverycode = '';
            await admin.save();
    
            return response.status(200).send({
                title: 'Contraseña actualizada',
                message: 'Tu contraseña ha sido actualizada exitosamente',
                type: 'success',
            });
        } catch (error) {
            console.log(error)
            return response.status(500).send({
                title: 'Error',
                message: 'Ocurrió un error al procesar la solicitud',
                type: 'error',
                data: {
                    error: error
                }
            });
        }
    }
}

// Función para generar un código de recuperación único
function generateRecoveryCode(): string {
    const recoveryCode = uuidv4();
    return recoveryCode;
}

// Función para enviar el correo electrónico de recuperación
async function sendRecoveryEmail(email: string, recoveryCode: string) {
    const transporter = nodemailer.createTransport({
        host: Env.get('SMTP_HOST'),
        port: Env.get('SMTP_PORT'),
        secure: false,  
        auth: {
            user: Env.get('SMTP_USERNAME'),
            pass: Env.get('SMTP_PASSWORD'),
        },
    });
    

    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Tu código de recuperación es: ${recoveryCode}. Úsalo para recuperar tu contraseña.`
    };

    await transporter.sendMail(mailOptions);
}
