import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/', 'LoginController.authLogin')


}).prefix('/api/login')