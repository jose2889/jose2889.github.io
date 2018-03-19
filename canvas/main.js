var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

console.log(teclas);

document.addEventListener("keydown", dibujarTeclado);
var cuadro = document.getElementById('area');
var papel = cuadro.getContext("2d"),
    x = 100;
    y = 100;

dibujarLinea("red", x-1,y-1,x+1,y+1, papel )

function dibujarLinea(color, xi, yi, xf, yf, lienzo){
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 3;
  lienzo.moveTo(xi,yi);
  lienzo.lineTo(xf,yf);
  lienzo.stroke();
  lienzo.closePath();  
}

function dibujarTeclado(evento){
    var color = "red",
        m = 1;
    switch(evento.keyCode){
        case teclas.UP:
        dibujarLinea(color, x,y,x,y-m, papel )
        y = y-m;
        break;

        case teclas.DOWN:
        dibujarLinea(color, x,y,x,y+m, papel )
        y = y+m;

        break;

        case teclas.LEFT:
        dibujarLinea(color, x,y,x-m,y, papel )
        x = x-m;
        break;

        case teclas.RIGHT:
        dibujarLinea(color, x,y,x+m,y, papel )
        x = x+m;
        break;

        default: 
        console.log("otra tecla")
        break;
    }
}

