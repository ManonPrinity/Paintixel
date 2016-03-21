var Ui_Canvas =
{
	handler: document.getElementById("canvas_handler"),
	handler_width: undefined,
	handler_height: undefined,
	canvas: document.getElementById("main_canvas"),
	canvas_width: 10,
	canvas_height: 10,
	canvas_current_width: undefined,
	canvas_current_height: undefined,
	canvas_zoomed_width: undefined,
	canvas_zoomed_height: undefined,
	gap_left: undefined,
	gap_top: undefined,

	init: function()
	{
		this.init_size();
		this.init_position();
		this.init_events();
		this.log_sizes();
	},

	init_size: function()
	{
		// Handler size
		this.handler_width = this.handler.offsetWidth;
		this.handler_height = this.handler.offsetHeight;

		// Canvas size
		this.canvas_width = Storage.canvas_width;
		this.canvas_height = Storage.canvas_height;

		// Canvas zoomed size
		this.canvas_zoomed_width = this.canvas_width * Ui_Project_View.zoom_value;
		this.canvas_zoomed_height = this.canvas_height * Ui_Project_View.zoom_value;

		if (this.canvas_zoomed_width < this.handler_width)
			this.canvas_current_width = this.canvas_zoomed_width;
		else
			this.canvas_current_width = this.handler_width;

		if (this.canvas_zoomed_height < this.handler_height)
			this.canvas_current_height = this.canvas_zoomed_height;
		else
			this.canvas_current_height = this.handler_height;

		this.gap_left = (this.canvas_zoomed_width - this.handler_width) / 2;
		this.gap_top = (this.canvas_zoomed_height - this.handler_height) / 2;

		this.canvas.width = this.canvas_current_width;
		this.canvas.height = this.canvas_current_height;

		this.canvas.style.width = this.canvas_current_width + "px";
		this.canvas.style.height = this.canvas_current_height + "px";
	},

	init_position: function()
	{
		this.canvas.style.left = (this.handler_width - this.canvas_current_width) / 2 + "px";
		this.canvas.style.top = (this.handler_height - this.canvas_current_height) / 2 + "px";
	},

	init_events: function()
	{
		if (document.addEventListener)
		{
			this.handler.addEventListener('DOMMouseScroll', this.canvas_scroll, false);
			this.handler.addEventListener('mousewheel', this.canvas_scroll, false);
		}
		else if (document.attachEvent)
		{
			this.handler.attachEvent('onmousewheel', this.canvas_scroll);
		}
		else
		{
			this.handler.onDOMMouseScroll = this.canvas_scroll;
			this.handler.onmousewheel = this.canvas_scroll;
		}
	},

	update_size: function()
	{
		// Handler size
		this.handler_width = this.handler.offsetWidth;
		this.handler_height = this.handler.offsetHeight;

		// Canvas zoomed size
		this.canvas_zoomed_width = this.canvas_width * Ui_Project_View.zoom_value;
		this.canvas_zoomed_height = this.canvas_height * Ui_Project_View.zoom_value;

		if (this.canvas_zoomed_width < this.handler_width)
			this.canvas_current_width = this.canvas_zoomed_width;
		else
			this.canvas_current_width = this.handler_width;

		if (this.canvas_zoomed_height < this.handler_height)
			this.canvas_current_height = this.canvas_zoomed_height;
		else
			this.canvas_current_height = this.handler_height;

		this.gap_left = (this.canvas_zoomed_width - this.handler_width) / 2;
		this.gap_top = (this.canvas_zoomed_height - this.handler_height) / 2;

		this.canvas.width = this.canvas_current_width;
		this.canvas.height = this.canvas_current_height;

		this.canvas.style.width = this.canvas_current_width + "px";
		this.canvas.style.height = this.canvas_current_height + "px";
	},

	update_position: function()
	{
		this.canvas.style.left = (this.handler_width - this.canvas_current_width) / 2 + "px";
		this.canvas.style.top = (this.handler_height - this.canvas_current_height) / 2 + "px";
	},

	canvas_scroll: function(event)
	{
		var e = event || window.event;
		var delta = (- e.detail / 3) || (e.wheelDelta / 120);

		Ui_Project_View.update_zoom_value(delta);
		Ui_Canvas.update_size();
		Ui_Canvas.update_position();
		Ui_Canvas.log_sizes();

		if (e.preventDefault)
			e.preventDefault();
		else
			e.returnValue = false;
	},

	log_sizes: function()
	{
		console.log("--------------------");
		console.log("handler_width: " + this.handler_width);
		console.log("handler_height: " + this.handler_height);
		console.log("canvas_width: " + this.canvas_width);
		console.log("canvas_height: " + this.canvas_height);
		console.log("canvas_current_width: " + this.canvas_current_width);
		console.log("canvas_current_height: " + this.canvas_current_height);
		console.log("canvas_zoomed_width: " + this.canvas_zoomed_width);
		console.log("canvas_zoomed_height: " + this.canvas_zoomed_height);
		console.log("gap_left: " + this.gap_left);
		console.log("gap_top: " + this.gap_top);
	}
}
