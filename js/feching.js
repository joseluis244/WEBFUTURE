function GetPassID(carnet,FN){
    return new Promise((Pres,Prej)=>{
        console.log(`PHP/GetID.php?CI=${carnet}&FN=${FN}`)
        fetch(`PHP/GetID.php?CI=${carnet}&FN=${FN}`)
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