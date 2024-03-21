import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'AdministradoresController.index');
    Route.post('/', 'AdministradoresController.store')
    Route.get('/:id', 'AdministradoresController.show');
    Route.put('/:id', 'AdministradoresController.update');
    Route.delete('/:id', 'AdministradoresController.destroy');

}).prefix('/api/administradores')