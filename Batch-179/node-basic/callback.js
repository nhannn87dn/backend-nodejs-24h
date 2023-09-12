// function first(){
//     console.log("Một");
// }


function first(){
    // Mô phỏng delay code
    setTimeout( function(){
        console.log("Một");
    }, 5000 );
}

function second(){
    console.log("Hai");
}
// first();
// second();

function doHomework(subject, cb) {
    console.log(`Bắt đầu làm bài tập ${subject}.`);
    cb();
}

doHomework('Toan', function(){
    console.log('Làm bài tập xong!');
})

function sumCal(a,b){
    if(isNaN(a)){
        throw new Error('Tham so a khong phai la so')
    }
    
    return a+b;
}
//sumCal(3,5) = 8

sumCal('3','5'); //35