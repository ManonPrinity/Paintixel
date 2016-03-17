var Ui_Canvas =
{
	canvas: document.getElementById("main_canvas"),
	canvas_handler: document.getElementById("canvas_handler"),

	init: function()
	{
		this.center_main_canvas();
	},

	center_main_canvas: function()
	{
		this.canvas.style.left = (this.canvas_handler.offsetWidth - this.canvas.offsetWidth) / 2 + "px";
		this.canvas.style.top = (this.canvas_handler.offsetHeight - this.canvas.offsetHeight) / 2 + "px";
	}
}
