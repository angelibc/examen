import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Viaje from './Viaje'
import Categoria from './Categoria'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class Cotizacion extends compose(BaseModel, SoftDeletes) {
  public static table = 'cotizaciones'

  @column({ isPrimary: true })
  public id: number

  @column()
  public cliente: number

  @column()
  public viaje: number

  @column()
  public precio_total: number

  @column()
  public estatus: string

  @column()
  public categoria: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente',
  })
  public Cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => Viaje, {
    foreignKey: 'viaje',
  })
  public Viaje: BelongsTo<typeof Viaje>

  @belongsTo(() => Categoria, {
    foreignKey: 'categoria',
  })
  public Categoria: BelongsTo<typeof Categoria>
}
