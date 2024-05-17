var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = 'yellow';

function drawRect2(x, y) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillRect(x, y, 150, 100);
    ctx2.beginPath();
    ctx2.moveTo(0,250);
    ctx2.lineTo(x, y);
    ctx2.stroke();    
}


drawRect2(200, 200);

let mousedown2=false

canvas2.addEventListener('mousemove', function(event) {
    if(mousedown2){
        var rect = canvas2.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        
        drawRect2(x, y);
    }
    console.log(mousedown2)
});

canvas2.addEventListener('mousedown',(event) => {
    console.log('2nd')
    mousedown2=true
})
canvas2.addEventListener('mouseup',() => {
    mousedown2=false
})
