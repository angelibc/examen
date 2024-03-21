import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'ViajesDestinosController.index');
    Route.post('/', 'ViajesDestinosController.store')
    Route.get('/:id', 'ViajesDestinosController.show');
    Route.put('/:id', 'ViajesDestinosController.update');
    Route.delete('/:id', 'ViajesDestinosController.destroy');
    Route.get('cp/:cp', 'ViajesDestinosController.connectToAPIMXCP');

}).prefix('/api/viajes')