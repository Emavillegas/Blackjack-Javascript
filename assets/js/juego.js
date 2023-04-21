/// 2c es dos de treboles (clubs)
// las imagenes vienen con el nombre en ingles 
// d diamonds - h hearts - s spades 

  let deck = [];
  const tipos = ['C', 'D','H','S' ];
  const especiales = ['A', 'J','Q','K' ];

  puntosJugador = 0;
  puntosComputadora = 0;

  /// referencias del html

  let btnPedir = document.querySelector('#btnPedir');
  let btnDetener = document.querySelector('#btnDetener');
  let btnNuevo = document.querySelector('#btnNuevo');

  const puntosHtml = document.querySelectorAll('small');

  const divJugadorCarta = document.querySelector('#jugador-cartas');
  const divComputadoraCartas = document.querySelector('#computadora-cartas');
 
    /// esta funcion crea una nueva baraja o deck 
  const crearDeck = () =>{
    for(let i=2; i<=10; i++) {
        for(let tipo of tipos) {
            deck.push(i + tipo);
    }
    }
    for (let tipo of tipos){
        for (let esp of especiales) {
            deck.push(esp + tipo);
    }
    }
    
    deck = _.shuffle(deck); /// esto es un cdn que nos permite desordenar las cartas 
    console.log(deck);
  
  }


  crearDeck();

  // esta funcion me permite pedir una carta 

const pedirCarta = () => {
    
    let carta = deck.shift(); // eliminar de la baraja la primera carta
      
        
      return carta;
    
 }




// pedir carta 

const valorCarta = (carta) => {
    const valor = carta.substring (0, carta.length - 1); // para que vaya de 0 a uno menos del total 
    return (isNaN (valor))  ?
            (valor==='A') ? 11 : 10
            : valor *1
//     let puntos = 0;

//     // if (isNaN (valor)){ // isNaN significa is not a number

//     //     puntos = (valor === 'A') ? 11 : 10;
//     // } else{
//     //     puntos = valor * 1;
//     // }

//     // otra forma de mostrarlo seria 
//     puntos = (isNaN (valor)) 
//     ? (valor === 'A') ? 11 : 10  // ocurre esto si la condicion es verdadera 
//     : puntos = valor * 1; // ocurre esto si la condicion es falsa

//     console.log(puntos);

 }

// turno de la computadora 

/// popup

const popup = document.querySelector('.pop-up');
const imgPopup = document.querySelector('.img-up');


const turnoComputadora = (puntosMinimos) => {

  do{
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
  
  
    puntosHtml[1].innerHTML = puntosComputadora; /// se pone uno por que corresponde  a un pounto de la computadora
  
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
  
    divComputadoraCartas.append (imgCarta);

    if(puntosMinimos >21){
      break;
      
    }

  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
    
    if(puntosComputadora === puntosMinimos){
      // alert('Nadie ha ganado');
      imgPopup.src = "https://media.tenor.com/Hbm5ksVowZsAAAAC/referee-%E5%B9%B3%E6%89%8B.gif";
      popup.classList.add('active');
      setTimeout(() => {
        popup.classList.remove('active');
      }, 2000);

    }else if(puntosMinimos > 21){
      // alert('La computadora ha ganado');
      
      imgPopup.src = "https://media.giphy.com/media/kEiw9sE1P4iP0YBWFb/giphy.gif";
      popup.classList.add('active');
      setTimeout(() => {
        popup.classList.remove('active');
      }, 2000);
      


    }
    else if(puntosComputadora > 21){
      // alert('Has ganado');
      imgPopup.src = "https://media.giphy.com/media/kxbp8frbjtxN48A7bj/giphy.gif";
      popup.classList.add('active');
      setTimeout(() => {
        popup.classList.remove('active');
      }, 2000);

    }
    else { 
      imgPopup.src = "https://media.giphy.com/media/kEiw9sE1P4iP0YBWFb/giphy.gif";
      popup.classList.add('active');
      setTimeout(() => {
        popup.classList.remove('active');
      }, 2000);
    }
  
 

},400)};






// eventos 


btnPedir.addEventListener('click', () => {
  
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);


    puntosHtml[0].innerHTML = puntosJugador; /// se pone cero por que corresponde a un punto de jugador

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divJugadorCarta.append (imgCarta);

    if(puntosJugador >21){
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
      
      
      
    }else if (puntosJugador === 21){
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
    
})

/// Detener el juego
btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    

})

btnNuevo.addEventListener('click', () => {
  window.location.reload();
})