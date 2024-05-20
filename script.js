var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
let centerCircleRadius=10
let shapes=[
]
const AddRectangle=()=>{
    shapes.push({x:10,y:10,width:100,height:100,isMoving:false,isResizing:false,isDrawingNode:false,shape:"rectangle",nodeStartX:10,nodeStartY:10,nodeEndX:0,nodeEndY:0,nodeExists:false})
    drawRect();
}

const AddCircle=()=>{
    shapes.push({x:100,y:200,radius:50,isMoving:false,isResizing:false,isDrawingNode:false,shape:"circle",nodeExists:false,nodeStartX:10,nodeStartY:10,nodeEndX:0,nodeEndY:0})
    drawRect();
}
const AddTriangle=()=>{
    shapes.push({x1: 100, y1: 300, x2: 150, y2: 350, x3: 50, y3: 350,isMoving:false,isResizing:false,shape:"triangle"})
    drawRect();
}


function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i in shapes){
        if(shapes[i].shape === 'rectangle') 
            {
                ctx.strokeRect (shapes[i].x,shapes[i].y,shapes[i].width,shapes[i].height)
                drawCenterCircle(shapes[i].x+shapes[i].width/2,shapes[i].y+shapes[i].height/2)

                if(shapes[i].nodeExists){
                    ctx.beginPath();
                    ctx.moveTo(shapes[i].nodeStartX, shapes[i].nodeStartY);
                    ctx.lineTo(shapes[i].nodeEndX, shapes[i].nodeEndY);
                    ctx.stroke();
                }
                
            }
        else if(shapes[i].shape==='circle')
            {
            ctx.beginPath();
            ctx.arc(shapes[i].x, shapes[i].y, shapes[i].radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            drawCenterCircle(shapes[i].x,shapes[i].y)
                if(shapes[i].nodeExists){
                    ctx.beginPath();
                    ctx.moveTo(shapes[i].nodeStartX, shapes[i].nodeStartY);
                    ctx.lineTo(shapes[i].nodeEndX, shapes[i].nodeEndY);
                    ctx.stroke();
                }

        }
        
        
    }
    
    //ctx.beginPath();
    //ctx.moveTo(shapes[0].x+50, shapes[0].y+50); 
    //ctx.lineTo(shapes[1].x+50, shapes[1].y+50);
    //ctx.stroke();
}
function drawCenterCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}



let mousedown=false

canvas.addEventListener('mousemove', function(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        for (let j in shapes){
            if(shapes[j].isMoving===true && shapes[j].shape==='rectangle'){
                shapes[j].nodeStartX=shapes[j].x+50
                shapes[j].nodeStartY=shapes[j].y+50
                shapes[j].x=x
                shapes[j].y=y
                drawRect()
            }
            if(shapes[j].isResizing===true && shapes[j].shape==='rectangle'){
                
                shapes[j].width=shapes[j].width+2
                shapes[j].height=shapes[j].height+2
                drawRect()
            }
            if(shapes[j].isDrawingNode===true && shapes[j].shape==='rectangle'){
                shapes[j].nodeStartX=shapes[j].x+50
                shapes[j].nodeStartY=shapes[j].y+50
                shapes[j].nodeEndX=x
                shapes[j].nodeEndY=y
                drawRect()
            }

            if(shapes[j].isMoving===true && shapes[j].shape==='circle'){
                shapes[j].x=x
                shapes[j].y=y
                shapes[j].nodeStartX=shapes[j].x+5
                shapes[j].nodeStartY=shapes[j].y+5
                drawRect()
            }
             if(shapes[j].isResizing===true && shapes[j].shape==='circle'){
                shapes[j].radius=shapes[j].radius+1
                
                drawRect()
            }
            if(shapes[j].isDrawingNode===true && shapes[j].shape==='circle'){
                shapes[j].nodeStartX=shapes[j].x+5
                shapes[j].nodeStartY=shapes[j].y+5
                shapes[j].nodeEndX=x
                shapes[j].nodeEndY=y
                drawRect()
                
                
            }
            
        }

        
    
    
});

canvas.addEventListener('mousedown',(event) => {

    mousedown=true
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    const cornerSize = 20;

    for (let j in shapes){
        if(shapes[j].shape==='rectangle'){
            const rectCenterX = shapes[j].x + shapes[j].width / 2;
            const rectCenterY = shapes[j].y + shapes[j].height / 2;
            const distanceFromRectCenter = Math.hypot(mouseX - rectCenterX, mouseY - rectCenterY);
            const isInRectCenterCircle = distanceFromRectCenter <= centerCircleRadius;
            const isNearRectBorder = (
                (mouseX >= shapes[j].x - 10 && mouseX <= shapes[j].x + 10) && (mouseY >= shapes[j].y && mouseY <= shapes[j].y + shapes[j].height) ||
                (mouseX >= shapes[j].x && mouseX <= shapes[j].x + shapes[j].width) && (mouseY >= shapes[j].y - 10 && mouseY <= shapes[j].y + 10) ||
                (mouseX >= shapes[j].x + shapes[j].width - 10 && mouseX <= shapes[j].x + shapes[j].width + 10) && (mouseY >= shapes[j].y && mouseY <= shapes[j].y + shapes[j].height) ||
                (mouseX >= shapes[j].x && mouseX <= shapes[j].x + shapes[j].width) && (mouseY >= shapes[j].y + shapes[j].height - 10 && mouseY <= shapes[j].y + shapes[j].height + 10)
            );

            const isInRectButOutsideCenterCircle = (
                !isInRectCenterCircle && 
                mouseX > shapes[j].x && mouseX < shapes[j].x + shapes[j].width && 
                mouseY > shapes[j].y && mouseY < shapes[j].y + shapes[j].height
            );
            if (isInRectCenterCircle) {
                document.body.style.cursor = 'grab';
                shapes[j].isDrawingNode=true
                shapes[j].nodeExists=true
            } else if (isNearRectBorder) {
                document.body.style.cursor = 'col-resize';
                shapes[j].isResizing = true
            } else if (isInRectButOutsideCenterCircle) {
                shapes[j].isMoving = true
                document.body.style.cursor = 'move';
            }
        }


        if(shapes[j].shape==='circle'){
            const distanceFromCircleCenter = Math.hypot(mouseX - shapes[j].x, mouseY - shapes[j].y);
            const isInCircleCenterCircle = distanceFromCircleCenter <= 10;
            const isNearCircleBorder = Math.abs(distanceFromCircleCenter - shapes[j].radius) <= 10;
            const isInCircleButOutsideCenterCircle = (
                !isInCircleCenterCircle && 
                distanceFromCircleCenter < shapes[j].radius
            );
            
            if (isInCircleCenterCircle) {
                
                document.body.style.cursor = 'grab';
                shapes[j].isDrawingNode=true
                shapes[j].nodeExists=true
            } else if (isNearCircleBorder) {
                document.body.style.cursor = 'col-resize';
                shapes[j].isResizing = true
            } else if (isInCircleButOutsideCenterCircle) {
                shapes[j].isMoving = true
                document.body.style.cursor = 'move';
            }
        }

        
    }
        
    
})
canvas.addEventListener('mouseup',() => {
    mousedown=false
    document.body.style.cursor = 'default';
    for(let k in shapes){
        shapes[k].isMoving=false
        shapes[k].isResizing=false
        shapes[k].isDrawingNode=false
    }
})
