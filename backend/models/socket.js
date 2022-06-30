const { userConected, userDesconected } = require("../controllers/socket.controller");
const { comprobarJWT } = require("../security/generarJWT");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );

            console.log(valido , uid);
            if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await userConected( uid );
            console.log("cliente conectado");


            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios conectados

            // TODO: Socket join, uid

            // TODO: Escuchar cuando el cliente manda un mensaje
            // mensaje-personal

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                await userDesconected( uid );
                console.log("cliente desconectado");
            })
            
        
        });
    }


}


module.exports = Sockets;