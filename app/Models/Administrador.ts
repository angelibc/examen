import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'


export default class Administrador extends compose(BaseModel, SoftDeletes) {
  public static table = 'administradores'


  @column({ isPrimary: true })
  public id: number

  @column()
  public  nombre: string

  @column()
  public ap_paterno: string

  @column()
  public ap_materno: string

  @column()
  public genero: string

  @column()
  public telefono: number

  @column()
  public fecha_nacimiento: Date

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public recoverycode: string;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
