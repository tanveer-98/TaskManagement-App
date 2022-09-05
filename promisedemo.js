var promise = new Promise((resolve,reject)=>{
    resolve(2);
})

promise.then(x=>console.log(x))


const first = (value) => {
    return value+2;
}


const second = (value) => {
    return value+2;
}

const third = (value) => {
    return value+2;
}

const result = async ()=>{
    const res  = await promise
    .then(value=>value+2)
    .then(value=>value+2)
    .then(value=>value+2)
    console.log(res);
}
result();



//callback hell
const first1 = (value,callback)=>{
    callback(value+2);
}

const second1 = (value,callback)=>{
    callback(value+2);
}

const third1 = (value,callback)=>{
    callback(value+2);
}


first1(2,(res)=>{
    second1(res,(res)=>{
        third1(res,(res)=>{
            console.log(res);
        })
    })  
})

