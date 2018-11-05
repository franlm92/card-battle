function ComSrv() {
    this.enviarRemitente = function (socket, mens, datos) {
        socket.emit(mens, datos);
    }
    this.enviarATodos = function (io, nombre, mens, datos) {
        io.sockets.in(nombre).emit(mens, datos);
    }
    this.enviarATodosMenosRemitente = function (socket, nombre, mens, datos) {
        socket.broadcast.to(nombre).emit(mens, datos)
    };
    this.lanzarSocketSrv = function (io, juego) {
        var cli = this;
        io.on('connection', function (socket) {
            socket.on('crearPartida', function (usrid, nombrePartida) {
                console.log('nueva partida: ', usrid, nombrePartida);
                var usr = juego.usuarios[usrid];
                var partidaId;
                if (usr) {
                    console.log("usuario " + usrid + " crea partida " + nombrePartida);
                    partidaId = usr.crearPartida(nombrePartida);
                    socket.join(nombrePartida);
                    cli.enviarATodos(io, nombrePartida, "partidaCreada", partidaId);
                }
            });
            socket.on('elegirPartida', function (usrid, nombrePartida) {
                var usr = juego.usuarios[usrid];
                var partidaId;
                if (usr) {
                    partidaId = usr.eligePartida(nombrePartida);
                    if (partidaId < 0) {
                        console.log("usuario " + usrid + " NO se pudo unir a la partida " + nombrePartida);
                        cli.enviarRemitente(socket, "noUnido", partidaId);
                    }
                    else {
                        console.log("usuario " + usrid + " se une a la partida " + nombrePartida);
                        socket.join(nombrePartida);
                        var mano = usr.obtenerCartasMano();
                        var json = { "partidaId": partidaId, "mano": mano };
                        cli.enviarATodos(io, nombrePartida, "unidoAPartida", json);
                    }
                }
            });
            socket.on('obtenerCartasMano', function (usrid, nombrePartida) {
                var usr = juego.usuarios[usrid];
                if (usr) {
                    cli.enviarRemitente(socket, "mano", usr.obtenerCartasMano());
                }
                else {
                    console.log("usuario " + usrid + "no existe");
                }
            });
            socket.on('jugarCarta', function (usrid, nombrePartida, nombreCarta) {
                var usr = juego.usuarios[usrid];
                var carta;
                if (usr) {
                    carta = usr.obtenerCartaMano(nombreCarta);
                    usr.jugarCarta(carta);
                    if (carta.posicion == "ataque") {
                        console.log("usuario " + usrid + " juega la carta con coste: " + carta.coste);
                        var json = { "usrid": usrid, "carta": carta, "elixir": usr.elixir };
                        cli.enviarATodos(io, nombrePartida, "juegaCarta", json);
                    }
                    else {
                        console.log("usuario " + usrid + " NO pudo jugar la carta con coste: " + carta.coste);
                        cli.enviarRemitente(socket, "noJugada", carta);
                    }
                }
            });
            socket.on('pasarTurno', function (usrid, nombrePartida) {
                var usr = juego.usuarios[usrid];
                if (usr) {
                    usr.pasarTurno();
                    console.log(usr.nombre + " ha pasado el turno");
                    cli.enviarRemitente(socket, "pasaTurno", usr.meToca());
                    cli.enviarATodosMenosRemitente(socket, nombrePartida, "recibeTurno", usrid);
                }
            });
            socket.on('obtenerDatosRival', function (usrid, nombrePartida) {
                var usr = juego.usuarios[usrid];
                if(usr) cli.enviarRemitente(socket, "datosRival", usr.obtenerDatosRival());
            });
        });
    };
}
module.exports.ComSrv = ComSrv;