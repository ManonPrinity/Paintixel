var background_canvas = document.getElementById("background_canvas");
var context = background_canvas.getContext("2d");

var background_opacity = document.getElementById("background_opacity");

var width_number = document.getElementById("width_number");
var height_number = document.getElementById("height_number");

var width_range = document.getElementById("width_range");
var height_range = document.getElementById("height_range");

var join_room_section = document.getElementById("join_room_section");
var create_room_section = document.getElementById("create_room_section");

function init()
{
	localStorage.setItem("import_image", 0);
	width_number.value = 32;
	width_range.value = 32;
	height_number.value = 32;
	height_range.value = 32;
	update_ui();
}

function update_ui()
{
	set_canvas_size();
	center_element(join_room_section);
}

function set_canvas_size()
{
	background_canvas.width = window.innerWidth;
	background_canvas.height = window.innerHeight;
	draw_canvas_grid(parseInt(width_number.value), parseInt(height_number.value));
}

function draw_canvas_grid(step_x, step_y)
{
	if (step_x < 1 || step_y < 1)
		return ;
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
	localStorage.setItem("width", width_number.value);
	localStorage.setItem("height", height_number.value);
}

function join_room()
{
	fade_in(background_opacity, 0.9, 4);
	fade_in(join_room_section, 1, 5);
}

function create_room()
{
	fade_in(background_opacity, 0.9, 4);
}

function hide_popups()
{
	fade_out(join_room_section, 0, -1);
	fade_out(background_opacity, 0, -1);
}

function center_element(element)
{
	element.style.left = (window.innerWidth - element.offsetWidth) / 2 + "px"; 
	element.style.top = (window.innerHeight - element.offsetHeight) / 2 + "px";
}

function fade_in(element, opacity, z)
{
	element.style.opacity = opacity;
	element.style.zIndex = z;
}

function fade_out(element, opacity, z)
{
	element.style.opacity = opacity;
	setTimeout(function()
	{
		element.style.zIndex = z;
	}, 300);
}

function import_image(file)
{
	document.getElementById("filename_p").innerHTML = file.name;
	document.getElementById("cancel_import_button").style.opacity = 0.8;
	document.getElementById("import_button").style.width = "280px";

	var img = new Image();
	var image_url = URL.createObjectURL(file);
	img.src = image_url;
	img.onload = function()
	{
		width_number.value = img.width;
		width_range.value = img.width;
		height_number.value = img.height;
		height_range.value = img.height;
		draw_canvas_grid(parseInt(width_number.value), parseInt(height_number.value));
		localStorage.setItem("import_image", 1);
		localStorage.setItem("image_url", URL.createObjectURL(file));
	}
}

function cancel_import()
{
	document.getElementById("filename_p").innerHTML = "Import image";
	document.getElementById("cancel_import_button").style.opacity = 0;
	document.getElementById("import_button").style.width = "320px";
	localStorage.setItem("import_image", 0);
}