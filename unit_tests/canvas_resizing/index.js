var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

console.log(canvas);
console.log(canvas.width);
console.log(canvas.height);
console.log(ctx);


ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 50, 50);

canvas.style.width = "50px";
canvas.style.height = "50px";