function ComSrv() {
    this.lanzarSocketSrv = function (io, juego) {
        io.on('connection', function (socket) {
            socket.on('crearPartida', function (usrid, nombrePartida) {
                console.log('nueva partida: ', usrid, nombrePartida);
                var usr = juego.usuarios[usrid];
                var partidaId;
                if (usr) {
                    console.log("usuario " + usrid + " crea partida " + nombrePartida);
                    partidaId = usr.crearPartida(nombrePartida);
                    socket.join(nombrePartida);
                    io.sockets.in(nombrePartida).emit("partidaCreada", partidaId);
                }
            });
            socket.on('elegirPartida', function (usrid, nombrePartida) {
                var usr = juego.usuarios[usrid];
                var partidaId;
                if (usr) {
                    partidaId = usr.eligePartida(nombrePartida);
                    if (partidaId < 0) {
                        console.log("usuario " + usrid + " NO se pudo unir a la partida " + nombrePartida);
                        socket.emit("noUnido", partidaId);
                    }
                    else {
                        console.log("usuario " + usrid + " se une a la partida " + nombrePartida);
                        socket.join(nombrePartida);
                        io.sockets.in(nombrePartida).emit("unidoAPartida", partidaId);
                    }
                }
            });
            socket.on('obtenerCartasMano', function (usrid, nombrePartida) {
                var usr = juego.usuarios[usrid];
                if (usr) {
                    socket.emit("mano", usr.obtenerCartasMano());
                }
            });
            socket.on('jugarCarta', function (usrid, nombrePartida, nombreCarta) {
                var usr = juego.usuarios[usrid];
                var carta;
                if (usr) {
                    carta = usr.obtenerCartaMano(nombreCarta);
                    /*if (cartaId.coste == undefined) {
                        console.log("usuario " + usrid + " NO pudo jugar esta carta porque no estaba en su mano");
                        //sirve para enviar mensajes al cliente
                        socket.emit("noJugadaNoMano", cartaId);
                    }
                    else { */
                    usr.jugarCarta(carta);
                    if (carta.posicion == "ataque") {
                        console.log("usuario " + usrid + " juega la carta con coste: " + carta.coste);
                        io.sockets.in(nombrePartida).emit("juegaCarta", usrid, carta);
                    }
                    else {
                        console.log("usuario " + usrid + " NO pudo jugar la carta con coste: " + carta.coste);
                        //sirve para enviar mensajes al cliente
                        socket.emit("noJugada", carta);
                    }
                    //}
                }
            });
            socket.on('pasarTurno', function (usrid, nombrePartida) {
                var usr = juego.usuarios[usrid];
                if (usr) {
                    usr.pasarTurno();
                    console.log(usr.nombre + " ha pasado el turno");
                    //io.sockets.in(nombrePartida).emit("pasaTurno", usrid);
                    socket.emit("pasaTurno", usr.meToca());
                    socket.broadcast.to(nombrePartida).emit("recibeTurno");
                } /* else {
                    console.log("usuario " + usrid + "NO puede pasar turno porque no existe");
                    socket.emit("noExiste", usrid);
                } */
            });
        });
    };
}
module.exports.ComSrv = ComSrv;