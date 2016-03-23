var Canvas =
{
	main_canvas: document.getElementById("main_canvas"),
	main_ctx: undefined,
	main_data: undefined,

	preview_canvas: document.getElementById("preview_canvas"),
	preview_ctx: undefined,
	preview_data: undefined,

	layer: undefined,

	left_click: false,
	right_click: false,

	init: function()
	{
		this.main_ctx = this.main_canvas.getContext("2d");
		this.main_data = this.main_ctx.getImageData(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);

		this.preview_ctx = this.preview_canvas.getContext("2d");
		this.preview_data = this.preview_ctx.getImageData(0, 0, Ui_Preview.canvas_width, Ui_Preview.canvas_height);

		this.layer = [];
		for (var x = 0; x < Ui_Canvas.canvas_width; ++x)
		{
			this.layer[x] = [];
			for (var y = 0; y < Ui_Canvas.canvas_height; ++y)
				this.layer[x][y] = {r: 0, g: 0, b: 0, a: 0};
		}

		this.handle_events();
	},

	add_pixel_to_layer: function(x, y, color)
	{
		this.layer[x][y].r = color.r;
		this.layer[x][y].g = color.g;
		this.layer[x][y].b = color.b;
		this.layer[x][y].a = color.a;
	},

	add_pixel_to_canvas: function(x, y, color)
	{
		x *= Ui_Project_View.zoom_value;
		y *= Ui_Project_View.zoom_value;

		if (Ui_Canvas.gap_left > 0)
			x -= Ui_Canvas.gap_left;
		if (Ui_Canvas.gap_top > 0)
			y -= Ui_Canvas.gap_top;

		for (var a = 0; a < Ui_Project_View.zoom_value; ++a)
		{
			for (var b = 0; b < Ui_Project_View.zoom_value; ++b)
			{
				var i = ((x + a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
				this.main_data.data[i] = color.r;
				this.main_data.data[i + 1] = color.g;
				this.main_data.data[i + 2] = color.b;
				this.main_data.data[i + 3] = color.a;
			}
		}
	},

	render_pixel_to_canvas: function(x, y, color)
	{
		x *= Ui_Project_View.zoom_value;
		y *= Ui_Project_View.zoom_value;

		if (Ui_Canvas.gap_left > 0)
			x -= Ui_Canvas.gap_left;
		if (Ui_Canvas.gap_top > 0)
			y -= Ui_Canvas.gap_top;

		for (var a = 0; a < Ui_Project_View.zoom_value; ++a)
		{
			for (var b = 0; b < Ui_Project_View.zoom_value; ++b)
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

	add_layer_to_canvas: function()
	{
		this.clear_canvas();
		for (var x = 0; x < this.layer.length; ++x)
		{
			for (var y = 0; y < this.layer[x].length; ++y)
			{
				this.add_pixel_to_canvas(x, y, this.layer[x][y]);
			}
		}
		this.main_ctx.putImageData(this.main_data, 0, 0);
	},

	render_canvas: function()
	{
		this.main_ctx.putImageData(this.main_data, 0, 0);
	},

	clear_canvas: function()
	{
		this.main_ctx.clearRect(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
		this.main_data = this.main_ctx.getImageData(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
	},

	bucket_recursive: function(x, y, color, selected_color)
	{
		if (this.layer[x][y].r == color.r && this.layer[x][y].g == color.g && this.layer[x][y].b == color.b && this.layer[x][y].a == color.a)
		{
			Canvas.add_pixel_to_layer(x, y, selected_color);
			Canvas.render_pixel_to_canvas(x, y, selected_color);
			if (x < Ui_Canvas.canvas_width - 1)
				Canvas.bucket_recursive(x + 1, y, color, selected_color);
			if (x > 0)
				Canvas.bucket_recursive(x - 1, y, color, selected_color);
			if (y < Ui_Canvas.canvas_height - 1)
				Canvas.bucket_recursive(x, y + 1, color, selected_color);
			if (y > 0)
			Canvas.bucket_recursive(x, y - 1, color, selected_color);
		}
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
			Canvas.layer_left_action(cursor_x, cursor_y);
		else if (this.right_click)
			Canvas.layer_right_action(cursor_x, cursor_y);
	},

	event_mousedown: function(e)
	{
		var cursor_x = Math.floor((e.clientX + Ui_Canvas.gap_left - 256) / Ui_Project_View.zoom_value);
		var cursor_y = Math.floor((e.clientY + Ui_Canvas.gap_top) / Ui_Project_View.zoom_value);

		if (e.which == 1)
		{
			Canvas.layer_left_action(cursor_x, cursor_y);
			this.left_click = true;
		}
		else if (e.which == 3)
		{
			if (this.right_click == false)
			{
				Canvas.layer_right_action(cursor_x, cursor_y);
				this.right_click = true;
			}
		}
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
	},

	layer_left_action: function(x, y)
	{
		var color = {r: Ui_Palette.selected_colors_rgb[0], g: Ui_Palette.selected_colors_rgb[1], b: Ui_Palette.selected_colors_rgb[2], a: 255};

		if (Ui_Tools.active_tool == "pen")
		{
			for (var a = 0; a < Ui_Tools.pen_size; ++a)
			{
				for (var b = 0; b < Ui_Tools.pen_size; ++b)
				{
					Canvas.add_pixel_to_layer(x + a, y + b, color);
					Canvas.add_pixel_to_canvas(x + a, y + b, color);
				}
			}
			Canvas.render_canvas();
		}
		else if (Ui_Tools.active_tool == "pipette")
		{
			Ui_Palette.select_left_color(this.layer[x][y].r, this.layer[x][y].g, this.layer[x][y].b);
		}
		else if (Ui_Tools.active_tool == "eraser")
		{
			for (var a = 0; a < Ui_Tools.eraser_size; ++a)
			{
				for (var b = 0; b < Ui_Tools.eraser_size; ++b)
				{
					Canvas.add_pixel_to_layer(x + a, y + b, {r: 0, g: 0, b: 0, a: 0});
					Canvas.add_pixel_to_canvas(x + a, y + b, {r: 0, g: 0, b: 0, a: 0});
				}
			}
			Canvas.render_canvas();
		}
		else if (Ui_Tools.active_tool == "bucket")
		{
			Canvas.bucket_recursive(x, y, {r: Canvas.layer[x][y].r, g: Canvas.layer[x][y].g, b: Canvas.layer[x][y].b, a: Canvas.layer[x][y].a}, color);
			Canvas.render_canvas();
		}
		else if (Ui_Tools.active_tool == "swaper")
		{
			var clicked_color = {r: Canvas.layer[x][y].r, g: Canvas.layer[x][y].g, b: Canvas.layer[x][y].b, a: Canvas.layer[x][y].a};
			for (var a = 0; a < Canvas.layer.length; ++a)
			{
				for (var b = 0; b < Canvas.layer[a].length; ++b)
				{
					if (Canvas.layer[a][b].r == clicked_color.r && Canvas.layer[a][b].g == clicked_color.g && Canvas.layer[a][b].b == clicked_color.b && Canvas.layer[a][b].a == clicked_color.a)
					{
						Canvas.add_pixel_to_layer(a, b, color);
						Canvas.add_pixel_to_canvas(a, b, color);
					}
				}
			}
			Canvas.render_canvas();
		}
	},

	layer_right_action: function(x, y)
	{
		var color = {r: Ui_Palette.selected_colors_rgb[3], g: Ui_Palette.selected_colors_rgb[4], b: Ui_Palette.selected_colors_rgb[5], a: 255};

		if (Ui_Tools.active_tool == "pen")
		{
			for (var a = 0; a < Ui_Tools.pen_size; ++a)
			{
				for (var b = 0; b < Ui_Tools.pen_size; ++b)
				{
					Canvas.add_pixel_to_layer(x + a, y + b, color);
					Canvas.add_pixel_to_canvas(x + a, y + b, color);
				}
			}
			Canvas.render_canvas();
		}
		else if (Ui_Tools.active_tool == "pipette")
		{
			Ui_Palette.select_right_color(this.layer[x][y].r, this.layer[x][y].g, this.layer[x][y].b);
		}
		else if (Ui_Tools.active_tool == "eraser")
		{
			for (var a = 0; a < Ui_Tools.eraser_size; ++a)
			{
				for (var b = 0; b < Ui_Tools.eraser_size; ++b)
				{
					Canvas.add_pixel_to_layer(x + a, y + b, {r: 0, g: 0, b: 0, a: 0});
					Canvas.add_pixel_to_canvas(x + a, y + b, {r: 0, g: 0, b: 0, a: 0});
				}
			}
			Canvas.render_canvas();
		}
		else if (Ui_Tools.active_tool == "bucket")
		{

		}
		else if (Ui_Tools.active_tool == "swaper")
		{
			var clicked_color = {r: Canvas.layer[x][y].r, g: Canvas.layer[x][y].g, b: Canvas.layer[x][y].b, a: Canvas.layer[x][y].a}
			for (var a = 0; a < Canvas.layer.length; ++a)
			{
				for (var b = 0; b < Canvas.layer[a].length; ++b)
				{
					if (Canvas.layer[a][b].r == clicked_color.r && Canvas.layer[a][b].g == clicked_color.g && Canvas.layer[a][b].b == clicked_color.b && Canvas.layer[a][b].a == clicked_color.a)
					{
						Canvas.add_pixel_to_layer(a, b, color);
						Canvas.add_pixel_to_canvas(a, b, color);
					}
				}
			}
			Canvas.render_canvas();
		}
	}
}