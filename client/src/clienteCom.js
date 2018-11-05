function ClienteCom() {
    this.socket = undefined;
    this.nombrePartida = undefined;
    this.usrId = undefined;
    this.ini = function (usrid) {
        this.socket = io.connect();
        this.usrId = usrid;
        this.lanzarSocketSrv();
    }
    this.crearPartida = function (nombre) {
        this.nombrePartida = nombre;
        this.socket.emit('crearPartida', this.usrId, nombre);
        console.log("crear partida");
    }
    this.elegirPartida = function (nombre) {
        this.nombrePartida = nombre;
        this.socket.emit('elegirPartida', this.usrId, nombre);
    };
    this.obtenerCartasMano = function () {
        this.socket.emit("obtenerCartasMano", this.usrId, this.nombrePartida);
    };
    this.jugarCarta = function (nombreCarta) {
        /* this.carta = carta;
        this.nombrePartida = nombre; */
        this.socket.emit('jugarCarta', this.usrId, this.nombrePartida, nombreCarta);
    };
    this.pasarTurno = function () {
        this.socket.emit('pasarTurno', this.usrId, this.nombrePartida);
    };


    this.lanzarSocketSrv = function () {
        var cli = this;
        this.socket.on('connect', function () {
            console.log("Usuario conectado al servidor de WebSockets");
        });
        this.socket.on('partidaCreada', function (partidaId) {
            console.log("Usuario crea partida con id: " + partidaId);
        });
        this.socket.on('unidoAPartida', function (partidaId) {
            console.log("Usuario unido a partida id: " + partidaId);
        });
        this.socket.on('noUnido', function (partidaId) {
            console.log("El usuario no pudo unirse a la partida id: " + partidaId);
        });
        this.socket.on('mano', function (mano) {
            console.log(mano);
        });
        this.socket.on('noJugada', function (carta) {
            console.log("El usuario no pudo jugar la carta con coste: " + carta.coste);
        });
        this.socket.on('juegaCarta', function (usrid, carta) {
            console.log("Usuario " + usrid + " juega la carta correctamente con coste: " + carta.coste);
        });
        this.socket.on('noExiste', function (id) {
            console.log("El usuario con id " + id + " no existe");
        });
        this.socket.on('pasaTurno', function (resultado) {
            console.log("El usuario tiene turno: " + resultado);
        });
        this.socket.on('recibeTurno', function () {
            console.log("Tienes el turno");
        });
        this.socket.on('datosRival', function (datos) {
            console.log(datos);
            usr.datosRival = datos;
        });

    }

}