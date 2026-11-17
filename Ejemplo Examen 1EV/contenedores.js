class Contenedor {
    constructor(referencia, peso, volumen) {
        this._referencia = referencia;
        this._peso = peso;
        this._volumen = volumen;
    }

    get referencia() {
        return this._referencia;
    }
    set referencia(nuevaReferencia) {
        this._referencia = nuevaReferencia;
    }
    
    get peso() {
        return this._peso;
    }
    set peso(nuevoPeso) {
        this._peso = nuevoPeso;
    }
    
    get volumen() {
        return this._volumen;
    }
    set volumen(nuevoVolumen) {
        this._volumen = nuevoVolumen;
    }

    calcularDensidad() {
        return this._peso/this._volumen;
    }
}

class ContenedorAltaDensidad {
    constructor(referencia, densidad) {
        this._referencia = referencia;
        this._densidad = densidad;
    }

    get referencia() {
        return this._referencia;
    }
    set referencia(nuevaReferencia) {
        this._referencia = nuevaReferencia;
    }

    get densidad() {
        return this._densidad;
    }
    set densidad(nuevaDensidad) {
        this._densidad = nuevaDensidad;
    }
}

let contenedores = [];
let contenedoresAltaDensidad = [];

function iniciar() {
    document.getElementById('btnAnadir').addEventListener('click', anadir);
    document.getElementById('btnModificar').addEventListener('click', modificar);
    document.getElementById('btnCalcular').addEventListener('click', calcular);
    document.getElementById('btnAltaDensidad').addEventListener('click', mostrarAltaDensidad);
}

function anadir(){
    let referencia = document.getElementById("referencia").value.trim();
    let pesoT = document.getElementById("peso").value;
    let volumenT = document.getElementById("volumen").value
    const divMensajes = document.getElementById("mensajes");
    if (referencia.trim() === "" || pesoT.trim() ==="" || volumenT.trim() ==="") {
        divMensajes.textContent = "Faltan datos";
        return;
    }
    let peso = Number(pesoT);
    let volumen = Number(volumenT);
    
    //Comprobaciones
    for(let c of contenedores){
        if (c.referencia === referencia) {
            divMensajes.textContent = "Ya existe un contenedor con esa referencia"
            return;
        }
    }
    if(isNaN(peso)||isNaN(volumen)) {
        divMensajes.textContent = "Uno de los valores no es valido";
        return;
    } else if (!Number.isInteger(peso)) {
        divMensajes.textContent = "El peso debe ser un numero entero"
        return;
    } else if (peso <10 || volumen < 10) {
        divMensajes.textContent = "Uno de los valores es menor de 10";
        return;
    }

    //Añadir contenedor al Array
    let nuevoContenedor = new Contenedor(referencia, peso, volumen);
    contenedores.push(nuevoContenedor);

    //Comprobar si esde alta densidad
    let densidad = nuevoContenedor.calcularDensidad();
    if (densidad > 2.5) {
        let nuevoAltaDensidad = new ContenedorAltaDensidad(referencia, densidad);
        contenedoresAltaDensidad.push(nuevoAltaDensidad);
    }
    divMensajes.textContent = "Contenedor añadido correctamente";
}

function modificar(){
    let referencia = document.getElementById("referencia").value.trim();
    let pesoT = document.getElementById("peso").value;
    let volumenT = document.getElementById("volumen").value
    const divMensajes = document.getElementById("mensajes");
    if (referencia.trim() === "" || pesoT.trim() ==="" || volumenT.trim() ==="") {
        divMensajes.textContent = "Faltan datos";
        return;
    }
    let peso = Number(pesoT);
    let volumen = Number(volumenT);
    
    //Comprobaciones
    let contenedorEncontrado = null;
    for (let c of contenedores) {
        if (c.referencia === referencia) {
            contenedorEncontrado = c;
            break;
        }
    }
    if (contenedorEncontrado === null) {
        divMensajes.textContent = "No existe un contenedor con esa referencia";
        return;
    }
    if(isNaN(peso)||isNaN(volumen)) {
        divMensajes.textContent = "Uno de los valores no es valido";
        return;
    } else if (!Number.isInteger(peso)) {
        divMensajes.textContent = "El peso debe ser un numero entero"
        return;
    } else if (peso <10 || volumen < 10) {
        divMensajes.textContent = "Uno de los valores es menor de 10";
        return;
    }
}

function calcular(){
    let pesoT = document.getElementById("peso").value;
    let volumenT = document.getElementById("volumen").value
    const divMensajes = document.getElementById("mensajes");
    if (pesoT.trim() ==="" || volumenT.trim() ==="") {
        divMensajes.textContent = "Faltan datos de peso o volumen";
        return;
    }
    let peso = Number(pesoT);
    let volumen = Number(volumenT);
    
    //Comprobaciones
    if(isNaN(peso)||isNaN(volumen)) {
        divMensajes.textContent = "Uno de los valores no es valido";
        return;
    } else if (!Number.isInteger(peso)) {
        divMensajes.textContent = "El peso debe ser un numero entero"
        return;
    } else if (peso <10 || volumen < 10) {
        divMensajes.textContent = "Uno de los valores es menor de 10";
        return;
    }

    //Division
    let resultado = (peso / volumen);
    let densidad ="";
    if (resultado <1) densidad = "baja";
    else if(resultado >=1 && resultado <=2.5) densidad ="normal";
    else if (resultado >2.5) densidad ="alta";
    divMensajes.textContent = resultado.toFixed(2) + ", " + densidad;
}

function mostrarAltaDensidad(){

}