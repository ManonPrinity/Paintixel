var Ui_Canvas =
{
	canvas: document.getElementById("main_canvas"),
	canvas_handler: document.getElementById("canvas_handler"),

	init: function()
	{
		this.init_size();
		this.center_main_canvas();
	},

	init_size: function()
	{
		var w = parseInt(Ui_Project_View.informations_div_w.innerHTML);
		var h = parseInt(Ui_Project_View.informations_div_h.innerHTML);
		var z = parseInt(Ui_Project_View.zoom_value);

		this.canvas.width = w * z;
		this.canvas.height = h * z;

		this.canvas.style.width = w * z + "px";
		this.canvas.style.height = h * z + "px";
	},

	center_main_canvas: function()
	{
		this.canvas.style.left = (this.canvas_handler.offsetWidth - this.canvas.offsetWidth) / 2 + "px";
		this.canvas.style.top = (this.canvas_handler.offsetHeight - this.canvas.offsetHeight) / 2 + "px";
	}
}
