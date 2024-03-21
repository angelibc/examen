/**
 * @swagger
 * components:
 *   schemas:
 *     Viajes:
 *       type: object
 *       required:
 *         - id
 *         - nombre_viaje
 *         - precio
 *         - cp
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: number
 *           description: id
 *         nombre_viaje:
 *           type: string
 *           description: nombre
 *         precio:
 *           type: string
 *           description: precio
 *         cp:
 *  	       type: number
 *           description: cp
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
import Viaje from 'App/Models/Viaje';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';



export default class ViajesDestinosController {
  /**
  * @swagger
  * /api/viajes:
  *   get:
  *     summary: Get all the viajes
  *     description: Get all the viajes with their attributes.
  *     tags:
  *       - Viajes
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: Successful viajes response
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
  *                   description: Array of viajes data
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: number
  *                         example: 1
  *                         description: The viajes's ID
  *                       nombre_viaje:
  *                         type: string
  *                         example: B 
  *                         description: The viajes's name
  *                       precio:
  *                         type: string
  *                         example: 300
  *                         description: The viajes's precio
  *                       cp:
  *                         type: number
  *                         example: 27290
  *                         description: The viajes's cp
  *                       created_at:
  *                         type: string
  *                         format: date-time
  *                         description: The viaje has been created_at
  *                       updated_at:
  *                         type: string
  *                         format: date-time
  *                         description: The viaje has been updated_at
  *                       deleted_at:
  *                         type: string
  *                         format: null
  *                         description: The viaje has been deleted_at
  */
  public async index({ response }: HttpContextContract) {
    try {
      const viaje = await Viaje.query();

      return response.status(200).json({
        type: "success",
        title: "resources found",
        message: "The resources list was found successfully",
        data: viaje
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
 * /api/viajes:
 *   post:
 *     summary: Create a viaje
 *     description: Create a viaje with their attributes.
 *     tags:
 *       - Viajes
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_viaje:
 *                 type: string
 *                 example: B 
 *                 description: The viajes's name
 *               precio:
 *                 type: string
 *                 example: 300
 *                 description: The viajes's precio
 *               categoria:
 *                 type: string
 *                 example: 1
 *                 description: The viajes's category
 *               cp:
 *                 type: number
 *                 example: 27290
 *                 description: The viajes's cp
 *     responses:
 *       201:
 *         description: Successful creation of a new viaje
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
 *                   description: The created viaje object
 *                   properties:
 *                     nombre_viaje:
 *                       type: string
 *                       example: B 
 *                       description: The viajes's name
 *                     precio:
 *                       type: string
 *                       example: 300
 *                       description: The viajes's precio
 *                     cp:
 *                       type: number
 *                       example: 27290
 *                       description: The viajes's cp
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The viaje has been created_at
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The viaje has been updated_at
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
 *        description: Conflicts
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                type:
 *                  type: string
 *                  example: error
 *                  description: Indicates the type of response
 *                title:
 *                  type: string
 *                  example: The nombre_viaje already exists
 *                  description: The title of the response
 *                message:
 *                  type: string
 *                  example: The nombre_viaje already exists
 *                  description: The message of the response
 *       500:
 *         description: Failed to create a new viaje due to an error
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

  public async store({ request,response }: HttpContextContract) {

    try {
      const viaje = request.only(['nombre_viaje','precio','cp']);

      const nombreExist = await Viaje.query().where('nombre_viaje', viaje.nombre_viaje).whereNull('deleted_at').first();


      if (nombreExist) {
        return response.status(409).json({
            type: "error",
            title: "The email already exists",
            message: "The email already exists " + nombreExist.nombre_viaje,
        });
    }

      const viaaj = await Viaje.create(viaje);


      return response.status(201).json({
        type: "created",
        title: "resource has been created",
        message: "the resource was created successfuly",
        data: viaaj
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
 * /api/viajes/{id}:
 *   get:
 *     summary: Get viaje by ID
 *     tags:
 *       - Viajes
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
 *                         description: The viaje's ID
 *                       nombre_viaje:
 *                         type: string
 *                         example: B 
 *                         description: The viajes's name
 *                       precio:
 *                         type: string
 *                         example: 300
 *                         description: The viajes's precio
 *                       cp:
 *                         type: number
 *                         example: 27290
 *                         description: The viajes's cp
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
  public async show({response, params}: HttpContextContract) {
    const viaje_id = params.id;

    const viaje: any = await Viaje.query().where('id', viaje_id).first();

    if (viaje) {
      return response.json({
        type: "show",
        title: "resource show",
        messsage: "the resource was found successfully",
        data: viaje
      });
    } else {
      return response.status(404).json({
        type: "error",
        title: "client error",
        message: "The id was not found " + viaje_id,
        data: viaje
      })
    }

  }

    /**
 * @swagger
 * /api/viajes/{id}:
 *   put:
 *     summary: Update a viaje's information
 *     description: Update the information of a viaje identified by their ID.
 *     tags:
 *       - Viajes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the viaje to update.
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
 *                description: The viaje's ID
 *              nombre_viaje:
 *                type: string
 *                example: B 
 *                description: The viaje's name
 *              precio:
 *                type: string
 *                example: 300
 *                description: The viaje's precio
 *              cp:
 *                type: number 
 *                example: 27290
 *                description: The viaje's cp
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
 *         description: Viaje not found
 */
  public async update({ response, request, params }: HttpContextContract) {

    const body = request.all();

    const updateViaje = await Viaje.query().whereNotNull('id').whereNull('deleted_at').where('id', params.id).
      first();

    if (updateViaje) {
      updateViaje.nombre_viaje = body['nombre_viaje'];
      updateViaje.precio = body['precio'];
      updateViaje.cp = body['cp'];


      await updateViaje.save();

      response.status(200).json({
        type: "success",
        title: "Updated successfully",
        message: "the resource was updated",
        data: updateViaje
      });
    } else {
      response.status(404).send({ error: 'Client not found' });
    }

  }

  /**
 * @swagger
 * /api/viajes/{id}:
 *   delete:
 *     summary: Delete a viaje
 *     description: Delete a viaje identified by their ID.
 *     tags:
 *       - Viajes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the viaje to delete.
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
 *         description: viaje not found
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

    const viajeDelete = await Viaje.query().whereNotNull('id').where('id', params.id).first();

    if (viajeDelete) {
      viajeDelete.delete();
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
    /**
 * @swagger
 * /api/viajes/cp/{cp}:
 *   get:
 *     summary: Connect to API to retrieve information by postal code
 *     description: Retrieve information by postal code from an external API
 *     tags:
 *       - Viajes
 *     parameters:
 *       - in: path
 *         name: cp
 *         required: true
 *         description: The postal code to query
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: success
 *                 title:
 *                   type: string
 *                   example: resource show
 *                 message:
 *                   type: string
 *                   example: the cp was found successfully
 *                 data:
 *                   type: object
 *                   example: {}
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: error
 *                 title:
 *                   type: string
 *                   example: client error
 *                 message:
 *                   type: string
 *                   example: The cp was not found {cp}
 */
  public async connectToAPIMXCP({ response, params }: HttpContextContract) {
 
    try {
      const cp = params.cp;
      
      const peticion = await axios.get(` https://api.copomex.com/query/info_cp/${cp}?type=simplified&token=${Env.get("TOKEN_COPOMEX")}`);

      return response.status(200).send({
        type: "success",
        title: "resource show",
        message: "the cp was found successfully",
        data: peticion.data
      });
    } catch (error) {
      return response.status(500).send({
        type: "error",
        title: "client error",
        message: "The cp was not found " + params.cp
      });
    }
  }
}
