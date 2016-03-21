var Canvas =
{
	main_canvas: document.getElementById("main_canvas"),
	main_ctx: undefined,
	main_data: undefined,

	preview_canvas: document.getElementById("preview_canvas"),
	preview_ctx: undefined,
	preview_data: undefined,

	image: undefined,

	left_click: false,
	right_click: false,

	init: function()
	{
		this.main_ctx = this.main_canvas.getContext("2d");
		this.main_data = this.main_ctx.getImageData(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);

		this.preview_ctx = this.preview_canvas.getContext("2d");
		this.preview_data = this.preview_ctx.getImageData(0, 0, Ui_Preview.canvas_width, Ui_Preview.canvas_height);

		this.image = [];
		for (var x = 0; x < Ui_Preview.canvas_width; ++x)
		{
			this.image[x] = [];
			for (var y = 0; y < Ui_Preview.canvas_height; ++y)
				this.image[x][y] = {r: 0, g: 0, b: 0, a: 0};
		}

		this.handle_events();
	},

	add_pixel_to_image: function(x, y, color)
	{
		this.image.r = color.r;
		this.image.g = color.g;
		this.image.b = color.b;
		this.image.a = color.a;

		this.draw_pixel(x, y, color);

		this.main_ctx.putImageData(this.main_data, 0, 0);
	},

	draw_pixel: function(x, y, color)
	{
		for (var a = 0; a < Ui_Tools.pen_size; ++a)
		{
			for (var b = 0; b < Ui_Tools.pen_size; ++b)
			{
				var i = ((x + a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
				this.main_data.data[i] = color.r;
				this.main_data.data[i + 1] = color.g;
				this.main_data.data[i + 2] = color.b;
				this.main_data.data[i + 3] = color.a;
			}
		}

		this.main_ctx.putImageData(this.main_data, 0, 0);
	},

	handle_events: function()
	{
		this.main_canvas.addEventListener('mousemove', this.event_mousemove);
		this.main_canvas.addEventListener('mousedown', this.event_mousedown);
		this.main_canvas.addEventListener('mouseup', this.event_mouseup);
		this.main_canvas.addEventListener('mouseout', this.event_mouseout);
	},

	event_mousemove: function(e)
	{
		var cursor_x = Math.floor((e.clientX + Ui_Canvas.gap_left - 256) / Ui_Project_View.zoom_value);
		var cursor_y = Math.floor((e.clientY + Ui_Canvas.gap_top) / Ui_Project_View.zoom_value);

		Ui_Project_View.update_x(cursor_x);
		Ui_Project_View.update_y(cursor_y);

		if (this.left_click)
			Canvas.add_pixel_to_image(cursor_x, cursor_y,
				{
		 			r: Ui_Palette.selected_colors_rgb[0],
		 			g: Ui_Palette.selected_colors_rgb[1],
		 			b: Ui_Palette.selected_colors_rgb[2],
					a: 255
				});
		// else if (this.right_click)
		// 	this.add_pixel_to_image(cursor_x, cursor_y,
		// 		{
		// 			r: Ui_Palette.selected_colors_rgb[3],
		// 			g: Ui_Palette.selected_colors_rgb[4],
		// 			b: Ui_Palette.selected_colors_rgb[5],
		// 			a: 255
		// 		});
	},

	event_mousedown: function(e)
	{
		if (e.which == 1)
			this.left_click = true;
		else if (e.which == 3)
			this.right_click = true;
	},

	event_mouseup: function(e)
	{
		if (e.which == 1)
			this.left_click = false;
		else if (e.which == 3)
			this.right_click = false;
	},

	event_mouseout: function(e)
	{
		this.left_click = false;
		this.right_click = false;
	}
}