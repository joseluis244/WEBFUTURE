function GetPassID(){
    return new Promise((Pres,Prej)=>{
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(json => Pres(json))
    })
}