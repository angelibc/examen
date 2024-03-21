import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CopomexResources from 'App/Resources/CopomexResources'

export default class AddressesController {
  public async getAddressByZipCode({ params, response }: HttpContextContract) {
    const zipcode = params.zipcode;
    try {
        const data = await CopomexResources.getCP(zipcode);
        return response.status(200).json(data);
    } catch (error) {
        return response.status(500).json({ message: 'Error al obtener la información', error: error.message, zipcode: zipcode });
    }
}
  
}
