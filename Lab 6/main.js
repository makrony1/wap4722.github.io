function printNumbers(from, to){
    let current = from;
    var id = setInterval(function(){
        
       
        if(current===to){
            console.log(current);
            clearInterval(id);
        }
        console.log(current);
        current++;
        
    },1000)
}

printNumbers(0,3);