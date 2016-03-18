var Ui_Canvas =
{
	canvas: document.getElementById("main_canvas"),
	canvas_handler: document.getElementById("canvas_handler"),

	init: function()
	{
		this.init_size();
		this.init_canvas_position();
	},

	init_size: function()
	{
		var w = parseInt(Ui_Project_View.informations_div_w.innerHTML);
		var h = parseInt(Ui_Project_View.informations_div_h.innerHTML);
		var max_w = parseInt(this.canvas_handler.offsetWidth);
		var max_h = parseInt(this.canvas_handler.offsetHeight);
		var z = parseInt(Ui_Project_View.zoom_value);

		if (w * z < max_w)
		{
			this.canvas.width = w * z;
			this.canvas.style.width = w * z + "px";
		}
		else
		{
			this.canvas.width = max_w;
			this.canvas.style.width = max_w + "px";
		}

		if (h * z < max_h)
		{
			this.canvas.height = h * z;
			this.canvas.style.height = h * z + "px";
		}
		else
		{
			this.canvas.height = max_h;
			this.canvas.style.height = max_h + "px";
		}
	},

	init_canvas_position: function()
	{
		this.canvas.style.left = (this.canvas_handler.offsetWidth - this.canvas.offsetWidth) / 2 + "px";
		this.canvas.style.top = (this.canvas_handler.offsetHeight - this.canvas.offsetHeight) / 2 + "px";
	},

	update_size: function()
	{
		var w = parseInt(Ui_Project_View.informations_div_w.innerHTML);
		var h = parseInt(Ui_Project_View.informations_div_h.innerHTML);
		var max_w = parseInt(this.canvas_handler.offsetWidth);
		var max_h = parseInt(this.canvas_handler.offsetHeight);
		var z = parseInt(Ui_Project_View.zoom_value);

		if (w * z < max_w)
		{
			this.canvas.width = w * z;
			this.canvas.style.width = w * z + "px";
		}
		else
		{
			this.canvas.width = max_w;
			this.canvas.style.width = max_w + "px";
		}

		if (h * z < max_h)
		{
			this.canvas.height = h * z;
			this.canvas.style.height = h * z + "px";
		}
		else
		{
			this.canvas.height = max_h;
			this.canvas.style.height = max_h + "px";
		}
	}
}
