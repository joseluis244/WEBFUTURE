var fecha;
var carnet;
class ItemLista {
    constructor() {
    }
    agregaritem(cli){
        console.log(cli)
        let item = `<li class="ItemLista">
        <div style="display: flex;align-items: center; font-size: 22px;">
            <span>${moment(cli.FECHA,"YYYYMMDD").format('DD/MM/YYYY')}</span>
        </div>
        <INPUT class="login100-form-btn button-custom order-lg-last mb-0 btn btn-secondary py-2 px-3 align-items-center" TYPE="button" NAME="button" Value="Ver Imagenes" onClick="VerImagen(${cli.IntID})">
    </li>`
        let ID = document.getElementById("ListaDeEstudiosPaciente")
        let prev = ID.innerHTML
        ID.innerHTML = prev + item
    }
    EscribirNombre(array){
        let str = ""
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element === "^"){
                str=str+" "
            }else{
                str=str+element
            }
        }
        return str
    }
}
async function VerImagen(id) {
    let Clinetereq = await fetch(`https://future.medicaltecsrl.com:4443/FutureWEB/${id}`)
    let Cliente = await Clinetereq.json()
    window.open(`https://future.medicaltecsrl.com/externo/${Cliente.token}`,"_blank")
}
function VerInforme(id) {
    let dialog = `<div class="dialogError" id="dialogError">
    <div class="dialogErrorDial" onclick="CerrarDialog()">
        <div class="dialogErrorCerrar" onclick="CerrarDialog()">X</div>
        <div class="dialogErrorTexto">
            El informe todavia no esta listo.
            Este puede demorar hasta 24 horas para estar listo.
            En casode alguna duda porfavor puede comunicarse con nosotros.
        </div>
    </div>
</div>`
    //let DOM = document.getElementById("ListaDeEstudiosPaciente").innerHTML
    //document.getElementById("ListaDeEstudiosPaciente").innerHTML = DOM + dialog
    window.location = 'http://telerad.medspazio.com.bo/future/_layouts/15/start.aspx#/Lists/ResultadosExamenes/Informes.aspx?FilterField1=CI&FilterValue1='+carnet+'&FilterField2=FechaNacimiento&FilterValue2='+fecha;
}
function CerrarDialog(){
    document.getElementById("ListaDeEstudiosPaciente").removeChild(document.getElementById("dialogError"))
}
async function Init(){
    
    if(window.sessionStorage.getItem("LoginData")==null){
        alert("Para tener acceso a los datos debe iniciar secion")
        window.location = `/login.html`
    }
    
    let CliId=JSON.parse(window.sessionStorage.getItem("LoginData")).ID
    fecha=JSON.parse(window.sessionStorage.getItem("LoginData")).FECHA
    carnet=JSON.parse(window.sessionStorage.getItem("LoginData")).CARNET
    //
    let Clinetereq = await fetch(`https://future.medicaltecsrl.com:4443/Future/${CliId}`)
    let Cliente = await Clinetereq.json()
    if(Cliente.length>0){
        let Cli = new ItemLista()
        document.getElementById("NombrePaciente").innerHTML = Cli.EscribirNombre(Cliente[0].NOMBRE)
        for (let index = 0; index < Cliente.length; index++) {
            const element = Cliente[index];
            Cli.agregaritem(element)
        }
    }
    else{
        document.getElementById("NombrePaciente").innerHTML = "Registro Inexistente"
    }
}
Init()