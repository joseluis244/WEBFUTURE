function GetPassID(carnet){
    return new Promise((Pres,Prej)=>{
        fetch(`/PHP/GetId.php?CI=${carnet}`)
        .then(response => response.json())
        .then( (json) =>{
            if(json.existe){
                Pres(json)
            }
            else{
                alert("El paciente no existe")
            }
        }
        )
    })
}