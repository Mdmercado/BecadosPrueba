

const urlNombre = 'http://localhost:3000/api/becados';
const boton = document.getElementById('btnBuscar');
const documento = document.getElementById('dni');
const bienve = document.getElementById('bienvenida');
const bienvContenedor = document.getElementById('contenedor')
const bienvSec = document.getElementById('bienvenida_cartel');

const btninscripcion = document.getElementById('btnInscribir');
const modalIns = new bootstrap.Modal(document.getElementById('modalBecas'));
const form = document.querySelector('form');
//datos del form
const apelnom = document.getElementById('Apelnom');
const fechaNac = document.getElementById('fechaNac');
const dniEntrada = document.getElementById('numDnipre');
const tel = document.getElementById('numTel');
const sexo = document.getElementById('inputSexo');

const correo = document.getElementById('email');
const año = new Date().getFullYear();




boton.addEventListener('click', (e) => {
  e.preventDefault();
  if (documento.value == '') {
    alert("Ingrese un DNI para continuar")
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
    .catch(e => alert("El DNI ingresado no se encuentra"))
}

// Funcion que retorna el nombre de la persona a traves del dni
const mostrarNombre = (dni) => {
  if (bienvSec.hasChildNodes()) {
    bienvSec.removeChild(bienvSec.firstChild)
    var seccion = document.createElement('H2');
    const { NombreApellido } = dni[0];

    seccion.textContent = "Te damos la bienvenida " + NombreApellido;
    bienvSec.appendChild(seccion);
    bienvContenedor.style.display = "block";
    documento.value = "";
  } else {
    var seccion = document.createElement('H2');
    const { NombreApellido } = dni[0];

    seccion.textContent = "Te damos la bienvenida " + NombreApellido;
    bienvSec.appendChild(seccion);
    bienvContenedor.style.display = "block";
    documento.value = "";
  }
  alertify.success('OK');

}

// modal
btninscripcion.addEventListener('click', () => {
  alertify.confirm("Desea reinscribirse?",
    function () {
      apelnom.value = '';
      fechaNac.value = '';
      dniEntrada.value = '';
      tel.value = '';
      sexo.value = '';
      correo.value = '';

      modalIns.show();
      alertify.success('Ok');
    },
    function () {
      alertify.error('Cancelado');
    });
});

// crear una pre inscripcion
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (correo.value == '') {
    correo.value = null;
  }
  fetch(urlNombre, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
    , body: JSON.stringify({
      // Apelnom: req.body.Apelnom, fechaNac: req.body.fechaNac, DNI: req.body.DNI, Telefono: req.body.Telefono, sexo: req.body.sexo, anio: req.body.anio, email: req.body.email
      Apelnom: apelnom.value,
      fechaNac: fechaNac.value,
      DNI: dniEntrada.value,
      Telefono: tel.value,
      sexo: sexo.value,
      anio: año,
      email: correo.value
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))

  modalIns.hide();
  alertify.success('Registrado');
});










