/**
 * @swagger
 * components:
 *   schemas:
 *     Cotizaciones:
 *       type: object
 *       required:
 *         - id
 *         - cliente
 *         - viaje
 *         - precio_total
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: number
 *           description: id
 *         cliente:
 *           type: string
 *           description: cliente
 *         viaje:
 *           type: string
 *           description: viaje
 *         precio_total:
 *           type: string
 *           description: precio_total
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
import Cotizacion from 'App/Models/Cotizacion';
import Viaje from 'App/Models/Viaje';



export default class CotizacionesController {
     /**
  * @swagger
  * /api/cotizaciones:
  *   get:
  *     summary: Get all the cotizaciones
  *     description: Get all the cotizaciones with their attributes.
  *     tags:
  *       - Cotizaciones
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
  *                   description: Array of Cotizacion data
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: number
  *                         example: 1
  *                         description: The cotizacion's ID
  *                       cliente:
  *                         type: number
  *                         example: 1 
  *                         description: The cotizacion's cliente
  *                       viaje:
  *                         type: number
  *                         example: 1
  *                         description: The cotizacion's viaje
  *                       precio_total:
  *                         type: number
  *                         example: 300
  *                         description: The cotizacion's precio_total
  *                       created_at:
  *                         type: string
  *                         format: date-time
  *                         description: The cotizacion has been created_at
  *                       updated_at:
  *                         type: string
  *                         format: date-time
  *                         description: The cotizacion has been updated_at
  *                       deleted_at:
  *                         type: string
  *                         format: null
  *                         description: The cotizacion has been deleted_at
  */

  public async index({response}: HttpContextContract) {
    try {
      const cotizacion = await Cotizacion.query();

      return response.status(200).json({
        type: "success",
        title: "resources found",
        message: "The resources list was found successfully",
        data: cotizacion
      });
    } catch (error) {
      return response.status(500).json({
        success: "error",
        title: 'Failed to create cotizacion',
        message: "the resource was not created successfuly",
        error: error.message
      })
    }
  }

   /**
   * @swagger
   * /api/cotizaciones:
   *   post:
   *     summary: Create a cotizacion
   *     description: Create a cotizacion with their attributes.
   *     tags:
   *       - Cotizaciones
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               cliente:
   *                 type: number
   *                 example: 1
   *                 description: The admin's cliente
   *               viaje:
   *                 type: number
   *                 example: 1
   *                 description: The admin's viaje
   *     responses:
   *       201:
   *         description: Successful creation of a new cotizacion
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
   *                   description: The created cotizacion object
   *                   properties:
   *                     cliente:
   *                       type: number
   *                       example: 1
   *                       description: The admin's cliente
   *                     viaje:
   *                       type: number
   *                       example: 1
   *                       description: The admin's viaje
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
   *       500:
   *         description: Failed to create a new cotizacion due to an error
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
      // Obtener datos de la solicitud
      const { cliente, viaje } = request.only(['cliente', 'viaje'])

      // Buscar el viaje por su ID
      const v = await Viaje.findOrFail(viaje)

      // Calcular el precio total basado en el precio del viaje
      const precioTotal = v.precio

      // Crear una nueva cotización
      const cotizacion = new Cotizacion()
      cotizacion.cliente = cliente
      cotizacion.viaje = viaje
      cotizacion.precio_total = precioTotal
      cotizacion.estatus = 'pending' // Establecer el estado adecuado aquí

      // Guardar la cotización en la base de datos
      await cotizacion.save()

      // Responder con un mensaje de éxito y los detalles de la cotización creada
      return response.status(201).json({
        type: 'success',
        title: 'Cotización creada exitosamente',
        message: 'La cotización se ha creado exitosamente',
        cotizacion,
      })
    } catch (error) {
      // Manejar cualquier error que ocurra durante el proceso
      return response.status(500).json({
        type: 'error',
        title: 'Error al crear la cotización',
        message: 'Ha ocurrido un error al intentar crear la cotización',
        error: error.message,
      })
    }
  }
 /**
 * @swagger
 * /api/cotizaciones/{id}:
 *   get:
 *     summary: Get cotizacion by ID
 *     tags:
 *       - Cotizaciones
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
 *                   description: Array of cotizacion data
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                         description: The cotizacion's ID
 *                       cliente:
 *                         type: number
 *                         example: 1 
 *                         description: The cotizacion's name
 *                       viaje:
 *                         type: number
 *                         example: 1
 *                         description: The cotizacion's viaje
 *                       precio_total:
 *                         type: number
 *                         example: 300
 *                         description: The cotizacion's precio_total
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

    const cotizacion_id = params.id;

    const cotizacion: any = await Cotizacion.query().where('id', cotizacion_id).first();

    if (cotizacion) {
      return response.json({
        type: "show",
        title: "resource show",
        messsage: "the resource was found successfully",
        data: cotizacion
      });
    } else {
      return response.status(404).json({
        type: "error",
        title: "client error",
        message: "The id was not found " + cotizacion_id,
        data: cotizacion
      })
    }
  }
  /**
 * @swagger
 * /api/cotizaciones/{id}:
 *   put:
 *     summary: Update a cotizacion's information
 *     description: Update the information of a cotizacion identified by their ID.
 *     tags:
 *       - Cotizaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cotizacion to update.
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
 *                description: The cotizacion's ID
 *              cliente:
 *                type: number
 *                example: 1 
 *                description: The cotizacion's cliente
 *              viaje:
 *                type: number
 *                example: 1
 *                description: The cotizacion's viaje
 *              precio_total:
 *                type: number
 *                example: 300
 *                description: The cotizacion's precio_total
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
 *         description: Cotizacion not found
 */
  public async update({ response, request, params }: HttpContextContract) {
    const body = request.all();
  
    // Obtener la cotización a actualizar
    const updateCot = await Cotizacion.query()
      .whereNotNull('id')
      .whereNull('deleted_at')
      .where('id', params.id)
      .first();
  
    if (updateCot) {
      // Obtener la información del viaje asociado a la cotización
      const viajeInfo = await Viaje.find(body['viaje']);
  
      if (viajeInfo) {
        let incremento = 0;
        if (viajeInfo.categoria === 2) {
          incremento = 0.10;
        } else if (viajeInfo.categoria === 3) {
          incremento = 0.20;
        }
  
        const precioBase = viajeInfo.precio;
        const precioTotal = precioBase + (precioBase * incremento);
  
        updateCot.cliente = body['cliente'];
        updateCot.viaje = body['viaje'];
        updateCot.precio_total = precioTotal;
        await updateCot.save();
  
        response.status(200).json({
          type: "success",
          title: "Updated successfully",
          message: "the resource was updated",
          data: updateCot
        });
      } else {
        response.status(404).json({ error: 'Viaje not found' });
      }
    } else {
      response.status(404).json({ error: 'Cotización not found' });
    }
  }
  /**
 * @swagger
 * /api/cotizacionez/{id}:
 *   delete:
 *     summary: Delete a cotizacion
 *     description: Delete a cotizacion identified by their ID.
 *     tags:
 *       - Cotizaciones 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cotizacion to delete.
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
  public async destroy({ params, response }: HttpContextContract) {
    const cotizacionDelete = await Cotizacion.query().whereNotNull('id').where('id', params.id).first();

    if (cotizacionDelete) {
      cotizacionDelete.delete();
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
