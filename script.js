var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'yellow';

function drawRect(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, 150, 100);
}

drawRect(20, 20);

canvas.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    drawRect(x, y);
});
