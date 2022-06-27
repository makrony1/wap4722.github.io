console.log('helllo');
var a=[10,20,3,0];
var result = a.reduce((pre, cur, index, array)=>{
    console.log("p"+pre);
    console.log("c"+cur);
    return pre+cur;
},0);
console.log(result);