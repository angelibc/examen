import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/request', 'RecuperarContrasController.requestRecovery');
    Route.post('/verify', 'RecuperarContrasController.verifyRecoveryCode');
    

}).prefix('/api/password-recovery')