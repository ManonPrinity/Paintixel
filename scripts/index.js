var background_canvas = document.getElementById("background_canvas");
var context = background_canvas.getContext("2d");

var width_number = document.getElementById("width_number");
var height_number = document.getElementById("height_number");

var width_range = document.getElementById("width_range");
var height_range = document.getElementById("height_range");

function set_canvas_size()
{
	background_canvas.width = window.innerWidth;
	background_canvas.height = window.innerHeight;
	draw_canvas_grid(parseInt(width_number.value), parseInt(height_number.value));
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

function update_size(n)
{
	var size;

	if (n == 1)
		size = width_number.value;
	else
		size = width_range.value;
	width_number.value = size;
	width_range.value = size;
	height_number.value = size;
	height_range.value = size;
	draw_canvas_grid(parseInt(width_number.value), parseInt(height_number.value));
}

function update_height(n)
{
	var size;
	
	if (n == 1)
		size = height_number.value;
	else
		size = height_range.value;
	height_number.value = size;
	height_range.value = size;
	draw_canvas_grid(parseInt(width_number.value), parseInt(height_number.value));
}

function save_size()
{
	localStorage.setItem("tile_width", width_number.value);
	localStorage.setItem("tile_height", height_number.value);
}