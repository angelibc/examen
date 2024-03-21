/**
 * @swagger
 * components:
 *   schemas:
 *     Administradores:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - ap_paterno
 *         - ap_materno
 *         - genero
 *         - telefono
 *         - fecha_nacimiento
 *         - email
 *         - password
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: number
 *           description: id
 *         nombre:
 *           type: string
 *           description: nombre
 *         ap_paterno:
 *           type: string
 *           description: ap_paterno
 *         ap_materno:
 *           type: string
 *           description: ap_materno
 *         genero:
 *           type: string
 *           description: genero
 *         telefono:
 *           type: number
 *           description: telefono
 *         fecha_nacimiento:
 *           type: date
 *           description: fecha_nacimiento
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: created at
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: updated at
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: updated at
 */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Administrador';
import bcrypt from 'bcrypt';


export default class AdministradoresController {
   /**
  * @swagger
  * /api/administradores:
  *   get:
  *     summary: Get all the administradores
  *     description: Get all the administradores with their attributes.
  *     tags:
  *       - Administradores
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: Successful response
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 type:
  *                   type: string
  *                   example: success
  *                   description: The type of response
  *                 title:
  *                   type: string
  *                   example: resources found
  *                   description: The title of the response
  *                 message:
  *                   type: string
  *                   example: The resources list was found successfully
  *                   description: A message describing the response
  *                 data:
  *                   type: array
  *                   description: Array of administradores data
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: number
  *                         example: 1
  *                         description: The admin's ID
  *                       nombre:
  *                         type: string
  *                         example: Angel 
  *                         description: The admin's name
  *                       ap_paterno:
  *                         type: string
  *                         example: Ibañez
  *                         description: The admin's ap_paterno
  *                       ap_materno:
  *                         type: string
  *                         example: Chavez
  *                         description: The admin's ap_materno
  *                       genero:
  *                         type: string
  *                         example: M
  *                         description: The admin's genero
  *                       telefono:
  *                         type: number
  *                         example: 8711008525
  *                         description: The admin's number
  *                       fecha_nacimiento:
  *                         type: string
  *                         example: date
  *                         description: The admin's fecha_nacimiento
  *                       email:
  *                         type: string
  *                         example: angel@gmail.com
  *                         description: The admin's email
  *                       password:
  *                         type: string
  *                         description: The admin's password
  *                       created_at:
  *                         type: string
  *                         format: date-time
  *                         description: The admin has been created_at
  *                       updated_at:
  *                         type: string
  *                         format: date-time
  *                         description: The admin has been updated_at
  *                       deleted_at:
  *                         type: string
  *                         format: null
  *                         description: The admin has been deleted_at
  */
  public async index({response}: HttpContextContract) {
    try {
      const admin = await Admin.query();

      return response.status(200).json({
        type: "success",
        title: "resources found",
        message: "The resources list was found successfully",
        data: admin
      });
    } catch (error) {
      return response.status(500).json({
        success: "error",
        title: 'Failed to create admin',
        message: "the resource was not created successfuly",
        error: error.message
      })
    }
  }
  /**
   * @swagger
   * /api/administradores:
   *   post:
   *     summary: Create a admin
   *     description: Create a admin with their attributes.
   *     tags:
   *       - Administradores
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *                 example: Angel
   *                 description: The admin's nombre
   *               ap_paterno:
   *                 type: string
   *                 example: date
   *                 description: The admin's ap_paterno
   *               ap_materno:
   *                 type: string
   *                 example: date
   *                 description: The admin's ap_materno
   *               genero:
   *                 type: string
   *                 example: M
   *                 description: The admin's genero
   *               telefono:
   *                 type: number
   *                 example: 8711008525
   *                 description: The admin's telefono
   *               fecha_nacimiento:
   *                 type: string
   *                 example: date
   *                 description: The admin's fecha_nacimiento
   *               email:
   *                 type: string
   *                 example: angel@gmail.com
   *                 description: The admin's email
   *               password:
   *                 type: string
   *                 description: The admin's password
   *     responses:
   *       201:
   *         description: Successful creation of a new person
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: created
   *                   description: Indicates the type of response
   *                 title:
   *                   type: string
   *                   example: resource has been created
   *                   description: The title of the response
   *                 message:
   *                   type: string
   *                   example: the resource was created successfully
   *                   description: The message of the response
   *                 data:
   *                   type: object
   *                   description: The created admin object
   *                   properties:
   *                     nombre:
   *                       type: string
   *                       example: Andrea
   *                       description: The admin's nombre
   *                     ap_paterno:
   *                       type: string
   *                       example: Ibañez
   *                       description: The admin's ap_paterno
   *                     ap_materno:
   *                       type: string
   *                       example: Chavez
   *                       description: The admin's ap_materno
   *                     genero:
   *                       type: string
   *                       example: M
   *                       description: The admin's genero
   *                     telefono:
   *                       type: number
   *                       example: 25
   *                       description: The admin's telefono
   *                     fecha_nacimiento:
   *                       type: string
   *                       format: date
   *                       description: The admin's fecha_nacimiento
   *                     email:
   *                       type: string
   *                       example: angel@gmail.com
   *                       description: The admin's email
   *                     password:
   *                       type: string
   *                       description: The admin's password
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       description: The admin has been created_at
   *                     updated_at:
   *                       type: string
   *                       format: date-time
   *                       description: The admin has been updated_at
   *       400:
   *         description: Bad request. The request parameters are not valid.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates whether the operation was successful
   *                 message:
   *                   type: string
   *                   description: Error message
   *       409:
   *         description: Conflicts
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: error
   *                   description: Indicates the type of response
   *                 title:
   *                   type: string
   *                   example: The phone number already exists
   *                   description: The title of the response
   *                 message:
   *                   type: string
   *                   example: The phone number already exists
   *                   description: The message of the response
   *       500:
   *         description: Failed to create a new admin due to an error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates whether the operation was successful
   *                 title:
   *                   type: string
   *                   description: The title of the response
   *                 message:
   *                   type: string
   *                   description: Error message
   *                 error:
   *                   type: string
   *                   description: Details of the error
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const newAdmin = request.only(['nombre','ap_paterno','ap_materno','genero','telefono','fecha_nacimiento',
      'email', 'password', 'admin']);

      // Verificar si ya existe un usuario con el mismo correo electrónico
      const emailExist = await Admin.query().where('email', newAdmin.email).whereNull('deleted_at').first();

      if (emailExist) {
          return response.status(409).json({
              type: "error",
              title: "The email already exists",
              message: "The email already exists " + emailExist.email,
          });
      }

     

      const hashedPassword = await bcrypt.hash(newAdmin.password, 10);

      const user = await Admin.create({
          email: newAdmin.email,
          password: hashedPassword,
          nombre: newAdmin.nombre,
          ap_paterno: newAdmin.ap_paterno,
          ap_materno: newAdmin.ap_materno,
          genero: newAdmin.genero,
          telefono: newAdmin.telefono,
          fecha_nacimiento: newAdmin.fecha_nacimiento,
      });

      return response.status(201).json({
          type: "success",
          title: "The user has been created successfully",
          message: "The user has been created successfully",
          user: user
      });
  } catch (error) {
      return response.status(500).json({
          success: "error",
          message: 'Failed to create user',
          error: error.message
      });
  }
  }
  /**
 * @swagger
 * /api/administradores/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags:
 *       - Administradores
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Array of admin data
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                         description: The admin's ID
 *                       nombre:
 *                         type: string
 *                         example: Angel 
 *                         description: The admin's name
 *                       ap_paterno:
 *                         type: string
 *                         example: Ibañez
 *                         description: The admin's ap_paterno
 *                       ap_materno:
 *                         type: string
 *                         example: Chavez
 *                         description: The admin's ap_materno
 *                       genero:
 *                         type: string
 *                         example: M
 *                         description: The admin's genero
 *                       telefono:
 *                         type: number
 *                         example: 8711008525
 *                         description: The admin's number
 *                       fecha_nacimiento:
 *                         type: string
 *                         example: date
 *                         description: The admin's fecha_nacimiento
 *                       email:
 *                        type: string
 *                        example: angel@gmail.com
 *                        description: The admin's email
 *                       password:
 *                        type: string
 *                        description: The admin's password
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The admin has been created_at
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The admin has been updated_at
 *                       deleted_at:
 *                         type: string
 *                         format: date-time
 *                         description: The admin has been deleted_at
 */
  public async show({ response, params }: HttpContextContract) {
    const admin_id = params.id;

    const adm: any = await Admin.query().where('id', admin_id).first();

    if (adm) {
      return response.json({
        type: "show",
        title: "resource show",
        messsage: "the resource was found successfully",
        data: adm
      });
    } else {
      return response.status(404).json({
        type: "error",
        title: "client error",
        message: "The id was not found " + admin_id,
        data: adm
      })
    }
  }
  /**
 * @swagger
 * /api/administradores/{id}:
 *   put:
 *     summary: Update a admin's information
 *     description: Update the information of a admin identified by their ID.
 *     tags:
 *       - Administradores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admin to update.
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *                type: number
 *                example: 1
 *                description: The admin's ID
 *              nombre:
 *                type: string
 *                example: Angel 
 *                description: The admin's name
 *              ap_paterno:
 *                type: string
 *                example: Ibañez
 *                description: The admin's ap_paterno
 *              ap_materno:
 *                type: string
 *                example: Chavez
 *                description: The admin's ap_materno
 *              genero:
 *                type: string
 *                example: M
 *                description: The admin's genero
 *              telefono:
 *                type: number
 *                example: 8711008525
 *                description: The admin's number
 *              fecha_nacimiento:
 *                type: string
 *                example: date
 *                description: The client's fecha_nacimiento
 *              email:
 *                type: string
 *                example: angel@gmail.com
 *                description: The admin's email
 *              password:
 *                type: string
 *                description: The admin's password
 *     responses:
 *       '200':
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 type:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *       '404':
 *         description: Admin not found
 */
  public async update({ response, request, params }: HttpContextContract) {
    const body = request.all();

    const updateAdmin = await Admin.query().whereNotNull('id').whereNull('deleted_at').where('id', params.id).
      first();

    if (updateAdmin) {
      updateAdmin.nombre = body['nombre'];
      updateAdmin.ap_paterno = body['ap_paterno'];
      updateAdmin.ap_materno = body['ap_materno'];
      updateAdmin.genero = body['genero'];
      updateAdmin.telefono = body['telefono'];
      updateAdmin.fecha_nacimiento = body['fecha_nacimiento'];


      await updateAdmin.save();

      response.status(200).json({
        type: "success",
        title: "Updated successfully",
        message: "the resource was updated",
        data: updateAdmin
      });
    } else {
      response.status(404).send({ error: 'Admin not found' });
    }
  }
/**
 * @swagger
 * /api/administradores/{id}:
 *   delete:
 *     summary: Delete a admin
 *     description: Delete a admin identified by their ID.
 *     tags:
 *       - Administradores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admin to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Resource deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 title:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       '404':
 *         description: admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 title:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
  public async destroy({  params, response }: HttpContextContract) {
    const adminDelete = await Admin.query().whereNotNull('id').where('id', params.id).first();

    if (adminDelete) {
      adminDelete.delete();
      response.status(200).json({
        type: "success",
        title: "resource deteled",
        message: "the resource was deteled",
        data: null
      });
    } else {
      response.status(404).json({
        type: "error",
        title: "resource not found",
        message: "The resource was not found",
        data: null
      });
    }
  }
  }
