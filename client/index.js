


const urlNombre = 'http://localhost:3000/api/becados';
const titulo = document.getElementById('titulo')
const boton = document.getElementById('btnBuscar');
const documento = document.getElementById('dni');
const bienve = document.getElementById('bienvenida');
const bienvContenedor = document.getElementById('contenedor')
const bienvSec = document.getElementById('bienvenida_cartel');

const btninscripcion = document.getElementById('btnInscribir');
const año = new Date().getFullYear();


//datos preInscripcion
titulo.textContent=`¡Bienvenido al sistema de preinscripción de becas ${(año+1)}!`;
var personaId;
var personaNombre;
btninscripcion.textContent = 'Preinscripcion beca ' + (año + 1);



boton.addEventListener('click', (e) => {
  e.preventDefault();
  if (documento.value == '') {
    alertify.set('notifier', 'position', 'top-center');
    alertify.warning('Ingrese un DNI para continuar').delay(1.5);
  } else {
    consumirNombre();

  };

});
documento.addEventListener('input', (e) => {
  bienvContenedor.style.display = "none";
})
// consumir dato Nombre
function consumirNombre() {
  fetch(urlNombre + "/" + documento.value, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => mostrarNombre(data))
    .catch(e => {
      alertify.set('notifier', 'position', 'top-center');
      alertify.warning('El DNI ingresado no se encuentra').delay(1.5);
    })
}

// Funcion que retorna el nombre de la persona a traves del dni
const mostrarNombre = (persona) => {
  if (bienvSec.hasChildNodes()) {
    bienvSec.removeChild(bienvSec.firstChild)
    var seccion = document.createElement('H2');
    //Destructuring de datos
    const { id, NombreApellido } = persona[0];
    personaId = id
    personaNombre = NombreApellido;
    seccion.textContent = `¡Te damos la bienvenida ${NombreApellido}!`;
    bienvSec.appendChild(seccion);
    bienvContenedor.style.display = "block";
    documento.value = "";
  } else {
    var seccion = document.createElement('H2');
    const { id, NombreApellido } = persona[0];
    personaId = id
    personaNombre = NombreApellido;
    seccion.textContent = `¡Te damos la bienvenida ${NombreApellido}!`;
    bienvSec.appendChild(seccion);
    bienvContenedor.style.display = "block";
    documento.value = "";
  }
  alertify.set('notifier', 'position', 'bottom-right');
  alertify.success('Recuperado').delay(1.5);

}
function recargaPag() {
  location.reload();
}
// Pre Inscripcion
btninscripcion.addEventListener('click', (e) => {
  alertify.confirm(`¿Desea preinscribir a ${personaNombre}?`,
    function () {

      fetch(urlNombre, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        }
        , body: JSON.stringify({

          idAspirante: personaId,
          anio: año + 1,

        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
      e.preventDefault();
      alertify.success('Registrado con exito').delay(2);
      setTimeout(recargaPag, 4000);
    },
    function () {
      alertify.error('Cancelado').delay(2);
    }).setting({
      'labels': { ok: 'Sí, confirmar', cancel: 'Cancelar' },
      'pinnable': false
    }).setHeader("Confirmación preinscripción " + (año + 1));
});











