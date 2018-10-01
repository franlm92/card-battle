var modelo = require('./modelo.js');

describe("El juego de las cartas...", function() {
  var juego;
  var usr1, usr2;

  beforeEach(function() {
    juego = new modelo.Juego();
    usr1 = new modelo.Usuario("pepe");
    usr2 = new modelo.Usuario("juan");
  });

  it("Debería tener una colección de cartas", function() {
    
    expect(juego.cartas).toBeDefined();
    expect(juego.cartas.length).toEqual(30);
    expect(juego.usuarios).toBeDefined();
    expect(juego.usuarios.length).toEqual(0);
  });

  it("Los usuarios deben tener un mazo", function(){
    expect(usr1.mazo).toBeDefined();
    expect(usr1.mazo.length).toEqual(0);
    expect(usr2.mazo).toBeDefined();
    expect(usr2.mazo.length).toEqual(0);
  });

  it("Los usuarios deben tener una mano inicialmente sin cartas", function(){
    expect(usr1.mano).toBeDefined();
    expect(usr1.mano.length).toEqual(0);
    expect(usr2.mano).toBeDefined();
    expect(usr2.mano.length).toEqual(0);
  });

  it("Agrego a los usuarios al juego",function(){
    juego.agregarUsuario(usr1);
    juego.agregarUsuario(usr2);
    expect(juego.usuarios.length).toEqual(2);
    expect(juego.usuarios[0].nombre).toEqual("pepe");
    expect(juego.usuarios[1].nombre).toEqual("juan");
    expect(usr1.mazo.length).toEqual(30);
    expect(usr2.mazo.length).toEqual(30);
  })
});