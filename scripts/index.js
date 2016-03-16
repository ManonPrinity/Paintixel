var background_canvas = document.getElementById("background_canvas");
var context = background_canvas.getContext('2d');

var width_span = document.getElementById("width_span");
var height_span = document.getElementById("height_span");

var width_input = document.getElementById("width_input");
var height_input = document.getElementById("height_input");

function set_canvas_size()
{
	background_canvas.width = window.innerWidth;
	background_canvas.height = window.innerHeight;
	draw_canvas_grid(parseInt(width_span.innerHTML), parseInt(height_span.innerHTML));
}

function draw_canvas_grid(step_x, step_y)
{
	var x = step_x;
	var y = step_y;
	var w = background_canvas.width;
	var h = background_canvas.height;
	context.clearRect(0, 0, w, h);
	context.strokeStyle = "#dddddd";
	context.lineWidth = 1;
	while (x < w)
	{
		context.beginPath();
		context.moveTo(x, 0);
		context.lineTo(x, h);
		context.stroke();
		x += step_x;
	}
	while (y < h)
	{
		context.beginPath();
		context.moveTo(0, y);
		context.lineTo(w, y);
		context.stroke();
		y += step_y;
	}
}

function update_size()
{
	var size = width_input.value;
	height_input.value = size;
	width_span.innerHTML = size;
	height_span.innerHTML = size;
	draw_canvas_grid(parseInt(width_span.innerHTML), parseInt(height_span.innerHTML));
}

function update_height()
{
	var size = height_input.value;
	height_span.innerHTML = size;
	draw_canvas_grid(parseInt(width_span.innerHTML), parseInt(height_span.innerHTML));
}

function save_size()
{
	localStorage.setItem("tile_width", width_span.innerHTML);
	localStorage.setItem("tile_height", height_span.innerHTML);
}