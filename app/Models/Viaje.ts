import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class Viaje extends compose(BaseModel, SoftDeletes) {
  public static table = 'viajes'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre_viaje: string

  @column()
  public precio: number

  @column()  
  public cp: number

  @column()
  public distancia_km: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
