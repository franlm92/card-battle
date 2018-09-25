function Juego(){
    this.cartas=[];
    this.usuarios=[];
    this.agregarCarta=function(carta){
        this.cartas.push(carta);
    }
    this.agregarUsuario=function(usuario){
        usuario.mazo=this.cartas;
        this.usuarios.push(usuario);
    }
    this.crearColeccion=function(){
        //10 atk 5 cost 3 hp 5
        //10 atk 3 cost 5 hp 10
        //10 atk 2 cost 1 hp 2
        
        for(var i=0;i<10;i++){
            this.cartas.push(new Carta("dragon"+i,5,5,3));
            this.cartas.push(new Carta("guerrero"+i,10,3,5));
            this.cartas.push(new Carta("esbirro"+i,2,2,1));
        }

    }
    this.crearColeccion();
}

function Usuario(nombre){
    this.nombre=nombre;
    this.juego=undefined;
    this.mazo=[];
    this.obtenerMazo=function(){
        //this.mazo=this.juego.obtenerColeccionInicial();
    }
}

function Carta(nombre,vidas,ataque,coste){
    this.nombre=nombre;
    this.vidas=vidas;
    this.ataque=ataque;
    this.coste=coste;
    
}

module.exports.Juego = Juego;

