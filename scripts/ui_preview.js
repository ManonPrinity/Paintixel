var Ui_Preview =
{
	canvas: document.getElementById("preview_canvas"),
	canvas_width: undefined,
	canvas_height: undefined,
	handler_width: 256,
	handler_height: 256,

	init: function()
	{
		// size of the canvas
		if (Storage.canvas_width < this.handler_width)
			this.canvas_width = this.handler_width;
		else
			this.canvas_width = Storage.canvas_width;

		if (Storage.canvas_height < this.handler_height)
			this.canvas_height = this.handler_height;
		else
			this.canvas_height = Storage.canvas_height;

		this.canvas.width = this.canvas_width;
		this.canvas.height = this.canvas_height;

		// size of the preview
		this.canvas.style.width = "256px";
		this.canvas.style.height = "256px";
	},
	draw_section: function()
	{

	}
}