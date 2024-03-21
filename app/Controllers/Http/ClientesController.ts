/**
 * @swagger
 * components:
 *   schemas:
 *     Clientes:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - ap_paterno
 *         - ap_materno
 *         - genero
 *         - telefono
 *         - fecha_nacimiento
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

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Cliente from 'App/Models/Cliente';


export default class ClientesController {
  /**
  * @swagger
  * /api/clientes:
  *   get:
  *     summary: Get all the clientes
  *     description: Get all the clientes with their attributes.
  *     tags:
  *       - Clientes
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
  *                   description: Array of people data
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: number
  *                         example: 1
  *                         description: The client's ID
  *                       nombre:
  *                         type: string
  *                         example: Angel 
  *                         description: The client's name
  *                       ap_paterno:
  *                         type: string
  *                         example: Ibañez
  *                         description: The client's ap_paterno
  *                       ap_materno:
  *                         type: string
  *                         example: Chavez
  *                         description: The client's ap_materno
  *                       genero:
  *                         type: string
  *                         example: M
  *                         description: The client's genero
  *                       telefono:
  *                         type: number
  *                         example: 8711008525
  *                         description: The client's number
  *                       fecha_nacimiento:
  *                         type: string
  *                         example: date
  *                         description: The client's fecha_nacimiento
  *                       created_at:
  *                         type: string
  *                         format: date-time
  *                         description: The client has been created_at
  *                       updated_at:
  *                         type: string
  *                         format: date-time
  *                         description: The client has been updated_at
  *                       deleted_at:
  *                         type: string
  *                         format: null
  *                         description: The client has been deleted_at
  */
  public async index({ response }: HttpContextContract) {
    try {
      const cliente = await Cliente.query();

      return response.status(200).json({
        type: "success",
        title: "resources found",
        message: "The resources list was found successfully",
        data: cliente
      });
    } catch (error) {
      return response.status(500).json({
        success: "error",
        title: 'Failed to create cliente',
        message: "the resource was not created successfuly",
        error: error.message
      })
    }
  }

  /**
   * @swagger
   * /api/clientes:
   *   post:
   *     summary: Create a cliente
   *     description: Create a cliente with their attributes.
   *     tags:
   *       - Clientes
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
   *                 description: The client's nombre
   *               ap_paterno:
   *                 type: string
   *                 example: date
   *                 description: The client's ap_paterno
   *               ap_materno:
   *                 type: string
   *                 example: date
   *                 description: The client's ap_materno
   *               genero:
   *                 type: string
   *                 example: M
   *                 description: The client's genero
   *               telefono:
   *                 type: number
   *                 example: 8711008525
   *                 description: The client's telefono
   *               fecha_nacimiento:
   *                 type: string
   *                 example: date
   *                 description: The client's fecha_nacimiento
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
   *                   description: The created cliente object
   *                   properties:
   *                     nombre:
   *                       type: string
   *                       example: Andrea
   *                       description: The cliente's nombre
   *                     ap_paterno:
   *                       type: string
   *                       example: Ibañez
   *                       description: The cliente's ap_paterno
   *                     ap_materno:
   *                       type: string
   *                       example: Chavez
   *                       description: The cliente's ap_materno
   *                     genero:
   *                       type: string
   *                       example: M
   *                       description: The cliente's genero
   *                     telefono:
   *                       type: number
   *                       example: 25
   *                       description: The cliente's telefono
   *                     fecha_nacimiento:
   *                       type: string
   *                       format: date
   *                       description: The cliente's fecha_nacimiento
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       description: The client has been created_at
   *                     updated_at:
   *                       type: string
   *                       format: date-time
   *                       description: The client has been updated_at
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
   *         description: Failed to create a new client due to an error
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
      const cliente = request.only(['nombre','ap_paterno','ap_materno','genero','telefono','fecha_nacimiento']);



      if (cliente.genero != "M" && cliente.genero != "F") {
        return response.status(409).json({
          type: "error",
          title: "The gender is invalid",
          message: "The gender must be M or F"
        });
      }

      const client = await Cliente.create(cliente);


      return response.status(201).json({
        type: "created",
        title: "resource has been created",
        message: "the resource was created successfuly",
        data: client
      });
    } catch (error) {

      return response.status(500).json({
        success: "error",
        title: 'Failed to create person',
        message: "the resource was not created successfuly",
        error: error.message
      })
    }
  }
  /**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags:
 *       - Clientes
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
 *                   description: Array of people data
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                         description: The client's ID
 *                       nombre:
 *                         type: string
 *                         example: Angel 
 *                         description: The client's name
 *                       ap_paterno:
 *                         type: string
 *                         example: Ibañez
 *                         description: The client's ap_paterno
 *                       ap_materno:
 *                         type: string
 *                         example: Chavez
 *                         description: The client's ap_materno
 *                       genero:
 *                         type: string
 *                         example: M
 *                         description: The client's genero
 *                       telefono:
 *                         type: number
 *                         example: 8711008525
 *                         description: The client's number
 *                       fecha_nacimiento:
 *                         type: string
 *                         example: date
 *                         description: The client's fecha_nacimiento
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The client has been created_at
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The client has been updated_at
 *                       deleted_at:
 *                         type: string
 *                         format: date-time
 *                         description: The client has been deleted_at
 */
  public async show({ response, params }: HttpContextContract) {

    const cliente_id = params.id;

    const cliente: any = await Cliente.query().where('id', cliente_id).first();

    if (cliente) {
      return response.json({
        type: "show",
        title: "resource show",
        messsage: "the resource was found successfully",
        data: cliente
      });
    } else {
      return response.status(404).json({
        type: "error",
        title: "client error",
        message: "The id was not found " + cliente_id,
        data: cliente
      })
    }
  }

  /**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Update a client's information
 *     description: Update the information of a cliente identified by their ID.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cliente to update.
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
 *                description: The client's ID
 *              nombre:
 *                type: string
 *                example: Angel 
 *                description: The client's name
 *              ap_paterno:
 *                type: string
 *                example: Ibañez
 *                description: The client's ap_paterno
 *              ap_materno:
 *                type: string
 *                example: Chavez
 *                description: The client's ap_materno
 *              genero:
 *                type: string
 *                example: M
 *                description: The client's genero
 *              telefono:
 *                type: number
 *                example: 8711008525
 *                description: The client's number
 *              fecha_nacimiento:
 *                type: string
 *                example: date
 *                description: The client's fecha_nacimiento
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
 *         description: Cliente not found
 */
  public async update({ response, request, params }: HttpContextContract) {
    const body = request.all();

    const updateClient = await Cliente.query().whereNotNull('id').whereNull('deleted_at').where('id', params.id).
      first();

    if (updateClient) {
      updateClient.nombre = body['nombre'];
      updateClient.ap_paterno = body['ap_paterno'];
      updateClient.ap_materno = body['ap_materno'];
      updateClient.genero = body['genero'];
      updateClient.telefono = body['telefono'];
      updateClient.fecha_nacimiento = body['fecha_nacimiento'];


      await updateClient.save();

      response.status(200).json({
        type: "success",
        title: "Updated successfully",
        message: "the resource was updated",
        data: updateClient
      });
    } else {
      response.status(404).send({ error: 'Client not found' });
    }
  }





  /**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Delete a cliente
 *     description: Delete a cliente identified by their ID.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cliente to delete.
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
 *         description: cliente not found
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
  public async destroy({ params, response }: HttpContextContract) {
    const clientDelete = await Cliente.query().whereNotNull('id').where('id', params.id).first();

    if (clientDelete) {
      clientDelete.delete();
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