var modelo = require('../src/modelo.js');

describe("El juego de las cartas...", function() {
  var juego;
  var usr;

  beforeEach(function() {
    juego = new modelo.Juego();
    usr = new modelo.Usuario("pepe");
  });

  it("Debería tener una colección de cartas", function() {
    
    expect(juego.cartas).toBeDefined();
    expect(juego.cartas.length).toEqual(30);
    expect(juego.usuarios).toBeDefined();
    expect(juego.usuarios.length).toEqual(0);
  });

  it("El usuario debe tener un mazo", function(){
    expect(usr.mazo).toBeDefined();
    expect(usr.mazo.length).toEqual(0);
  });

  it("El usuario debe tener una mano inicialmente sin cartas", function(){
    expect(usr.mano).toBeDefined();
    expect(usr.mano.length).toEqual(0);
  });

  it("Agrego al usuario al juego",function(){
    juego.agregarUsuario(usr);
    expect(juego.usuarios.length).toEqual(1);
    expect(juego.usuarios[0].nombre).toEqual("pepe");
    expect(usr.mazo.length).toEqual(30);
  })
});
