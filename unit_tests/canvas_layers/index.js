var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var layer_1 = ctx.createImageData(canvas.width, canvas.height);
var layer_2 = ctx.createImageData(canvas.width, canvas.height);

draw_pixel(10, 10, 255, 0, 0, layer_1.data);
draw_pixel(20, 20, 255, 0, 0, layer_2.data);

render_canvas();

function draw_pixel(x, y, r, g, b, d)
{
	var i = (x + (y * canvas.width)) * 4;

	d[i] = r;
	d[i + 1] = g;
	d[i + 2] = b;
	d[i + 3] = 255;
}

function render_canvas()
{
	ctx.putImageData(layer_1, 0, 0);
	ctx.putImageData(layer_2, 0, 0);
}