var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

let shapes=[{x:10,y:10,width:100,height:100,isMoving:false},{x:100,y:200,width:100,height:100,isMoving:false}]

function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i in shapes){
        console.log(shapes[i])
        ctx.strokeRect (shapes[i].x,shapes[i].y,shapes[i].width,shapes[i].height)
    }
    
    ctx.beginPath();
    ctx.moveTo(shapes[0].x+50, shapes[0].y+50); 
    ctx.lineTo(shapes[1].x+50, shapes[1].y+50);
    ctx.stroke();
}


drawRect();

let mousedown=false

canvas.addEventListener('mousemove', function(event) {
   
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        for (let j in shapes){
            if(shapes[j].isMoving===true){
                shapes[j].x=x
                shapes[j].y=y
                drawRect()
            }
            

            
        }

        
    
    
});

canvas.addEventListener('mousedown',(event) => {

    mousedown=true
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    for (let j in shapes){
        if(x >= shapes[j].x && x <= shapes[j].x + shapes[j].width && y >= shapes[j].y && y <= shapes[j].y + shapes[j].height){
            console.log('inside')
            shapes[j].isMoving=true;
        }
        
    }
})
canvas.addEventListener('mouseup',() => {
    mousedown=false
    for(let k in shapes){
        shapes[k].isMoving=false
    }
})
