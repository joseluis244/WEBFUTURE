function GetPassID(carnet){
    return new Promise((Pres,Prej)=>{
<<<<<<< HEAD
        fetch(`PHP/GetID.php?CI=${carnet}`)
=======
        fetch(`/PHP/GetId.php?CI=${carnet}&FN=${FN}`)
>>>>>>> parent of d4b4e40... Id->ID
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