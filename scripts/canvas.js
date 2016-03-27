var Canvas =
{
	main_canvas: document.getElementById("main_canvas"),
	main_ctx: undefined,
	main_data: undefined,

	preview_canvas: document.getElementById("preview_canvas"),
	preview_ctx: undefined,
	preview_data: undefined,

	layer: undefined,
	temp_layer: undefined,

	left_click: false,
	right_click: false,

	init: function()
	{
		this.main_ctx = this.main_canvas.getContext("2d");
		this.preview_ctx = this.preview_canvas.getContext("2d");

		if (Storage.import_image)
		{
			var img = new Image();
			img.src = Storage.image_url;
			img.onload = function()
			{
				console.log("Importing image...");
				var posx = 0;
				var posy = 0;

				if (img.width < Ui_Canvas.canvas_width)
					posx = parseInt((Ui_Canvas.canvas_width - img.width) / 2);
				if (img.height < Ui_Canvas.canvas_height)
					posy = parseInt((Ui_Canvas.canvas_height - img.height) / 2);

				Canvas.main_ctx.drawImage(img, posx, posy);

				Canvas.main_data = Canvas.main_ctx.getImageData(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
				Canvas.preview_data = Canvas.preview_ctx.getImageData(0, 0, Ui_Preview.canvas_width, Ui_Preview.canvas_height);

				Canvas.layer = [];
				Canvas.temp_layer = [];
				for (var x = 0; x < Ui_Canvas.canvas_width; ++x)
				{
					Canvas.layer[x] = [];
					Canvas.temp_layer[x] = [];
					for (var y = 0; y < Ui_Canvas.canvas_height; ++y)
					{
						var i = (x + (y * Ui_Canvas.canvas_width)) * 4;
						Canvas.layer[x][y] = Canvas.temp_layer[x][y] =
						{
							r: Canvas.main_data.data[i],
							g: Canvas.main_data.data[i + 1],
							b: Canvas.main_data.data[i + 2],
							a: Canvas.main_data.data[i + 3]
						};
					}
				}
			}
		}
		else
		{
			this.main_data = this.main_ctx.createImageData(Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
			this.preview_data = this.preview_ctx.createImageData(Ui_Preview.canvas_width, Ui_Preview.canvas_height);

			for (var i = 0; i < this.main_data.data.length; i += 4)
			{
				this.main_data.data[i + 0] = 0;
				this.main_data.data[i + 1] = 0;
				this.main_data.data[i + 2] = 0;
				this.main_data.data[i + 3] = 0;
			}
			this.main_ctx.putImageData(this.main_data, 0, 0);

			Canvas.layer = [];
			Canvas.temp_layer = [];
			for (var x = 0; x < Ui_Canvas.canvas_width; ++x)
			{
				Canvas.layer[x] = [];
				Canvas.temp_layer[x] = [];
				for (var y = 0; y < Ui_Canvas.canvas_height; ++y)
				{
					var i = (x + (y * Ui_Canvas.canvas_width)) * 4;
					Canvas.layer[x][y] = Canvas.temp_layer[x][y] =
					{
						r: Canvas.main_data.data[i],
						g: Canvas.main_data.data[i + 1],
						b: Canvas.main_data.data[i + 2],
						a: Canvas.main_data.data[i + 3]
					};
				}
			}
		}

		this.handle_events();
	},

	add_pixel_to_layer: function(x, y, color)
	{
		this.layer[x][y].r = color.r;
		this.layer[x][y].g = color.g;
		this.layer[x][y].b = color.b;
		this.layer[x][y].a = color.a;

		if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
		{
			this.layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;
		}
		else if (!Ui_Tools.horizontal_symetry && Ui_Tools.vertical_symetry)
		{
			this.layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
		else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
		{
			this.layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;

			this.layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
			
			this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
	},

	add_pixel_to_temp_layer: function(x, y, color)
	{
		if (x < 0 || x > Ui_Canvas.canvas_width - 1 || y < 0 || y > Ui_Canvas.canvas_height - 1)
			return ;
		this.temp_layer[x][y].r = color.r;
		this.temp_layer[x][y].g = color.g;
		this.temp_layer[x][y].b = color.b;
		this.temp_layer[x][y].a = color.a;

		if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
		{
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;
		}
		else if (!Ui_Tools.horizontal_symetry && Ui_Tools.vertical_symetry)
		{
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
		else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
		{
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;

			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
			
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
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

				if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (!Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;

					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
					
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((Ui_Canvas.canvas_current_height - y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
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

				if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (!Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;

					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
					
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((Ui_Canvas.canvas_current_height - y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
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
				if (this.temp_layer[x][y].a > 0)
					this.add_pixel_to_canvas(x, y, this.temp_layer[x][y]);
				else
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

	clear_temp_layer: function()
	{
		for (var x = 0; x < this.temp_layer.length; ++x)
			for (var y = 0; y < this.temp_layer[x].length; ++y)
				this.temp_layer[x][y] = {r: 0, g: 0, b: 0, a: 0};
	},

	copy_temp_layer: function()
	{
		for (var x = 0; x < this.layer.length; ++x)
			for (var y = 0; y < this.layer[x].length; ++y)
				if (this.temp_layer[x][y].a > 0)
					this.layer[x][y] = this.temp_layer[x][y];
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
			Canvas.layer_action(cursor_x, cursor_y, 1);
		else if (this.right_click)
			Canvas.layer_action(cursor_x, cursor_y, 2);
	},

	event_mousedown: function(e)
	{
		var cursor_x = Math.floor((e.clientX + Ui_Canvas.gap_left - 256) / Ui_Project_View.zoom_value);
		var cursor_y = Math.floor((e.clientY + Ui_Canvas.gap_top) / Ui_Project_View.zoom_value);

		if (e.which == 1)
		{
			Canvas.layer_action(cursor_x, cursor_y, 1);
			this.left_click = true;
		}
		else if (e.which == 3)
		{
			Canvas.layer_action(cursor_x, cursor_y, 2);
			this.right_click = true;
		}
	},

	event_mouseup: function(e)
	{
		if (e.which == 1)
			this.left_click = false;
		else if (e.which == 3)
			this.right_click = false;
		Tools.stop_shape();
	},

	event_mouseout: function(e)
	{
		this.left_click = false;
		this.right_click = false;
		Tools.stop_shape();
	},

	layer_action: function(x, y, click)
	{
		var primary_color;
		var secondary_color;

		if (click == 1)
		{
			primary_color = {r: Ui_Palette.selected_colors_rgb[0], g: Ui_Palette.selected_colors_rgb[1], b: Ui_Palette.selected_colors_rgb[2], a: 255};
			secondary_color = {r: Ui_Palette.selected_colors_rgb[3], g: Ui_Palette.selected_colors_rgb[4], b: Ui_Palette.selected_colors_rgb[5], a: 255};
		}
		else if (click == 2)
		{
			primary_color = {r: Ui_Palette.selected_colors_rgb[3], g: Ui_Palette.selected_colors_rgb[4], b: Ui_Palette.selected_colors_rgb[5], a: 255};
			secondary_color = {r: Ui_Palette.selected_colors_rgb[0], g: Ui_Palette.selected_colors_rgb[1], b: Ui_Palette.selected_colors_rgb[2], a: 255};
		}

		if (Ui_Tools.active_tool == "pen")
		{
			Tools.pen(x, y, primary_color);
		}
		else if (Ui_Tools.active_tool == "pipette")
		{
			Tools.pipette(x, y);
		}
		else if (Ui_Tools.active_tool == "eraser")
		{
			Tools.eraser(x, y);
		}
		else if (Ui_Tools.active_tool == "bucket")
		{
			var target_color = {r: Canvas.layer[x][y].r, g: Canvas.layer[x][y].g, b: Canvas.layer[x][y].b, a: Canvas.layer[x][y].a};
			Tools.bucket(x, y, target_color, primary_color);
			Canvas.render_canvas();
		}
		else if (Ui_Tools.active_tool == "swaper")
		{
			var target_color = {r: Canvas.layer[x][y].r, g: Canvas.layer[x][y].g, b: Canvas.layer[x][y].b, a: Canvas.layer[x][y].a};
			Tools.swaper(x, y, target_color, primary_color);
		}
		else if (Ui_Tools.active_tool == "lighten")
		{
			Tools.lighten(x, y);
		}
		else if (Ui_Tools.active_tool == "darken")
		{
			Tools.darken(x, y);
		}
		else if (Ui_Tools.active_tool == "stroke")
		{
			Tools.stroke(x, y, primary_color);
		}
		else if (Ui_Tools.active_tool == "square")
		{
			if (Tools.shape == false)
			{
				Tools.start_x = x;
				Tools.start_y = y;
				Tools.shape = true;
			}
			else
			{
				Canvas.clear_temp_layer();
				var x1, x2, y1, y2;
				if (Tools.start_x < x) {x1 = Tools.start_x; x2 = x;}
				else {x1 = x; x2 = Tools.start_x;}

				if (Tools.start_y < y) {y1 = Tools.start_y; y2 = y;}
				else {y1 = y; y2 = Tools.start_y;}

				if (Ui_Tools.square_filling == 0)
				{
					var tx1 = x1;
					while (tx1 <= x2)
					{
						Canvas.add_pixel_to_temp_layer(tx1, y1, primary_color);
						Canvas.add_pixel_to_temp_layer(tx1, y2, primary_color);
						++tx1;
					}
					while (y1 <= y2)
					{
						Canvas.add_pixel_to_temp_layer(x1, y1, primary_color);
						Canvas.add_pixel_to_temp_layer(x2, y1, primary_color);
						++y1;
					}
				}
				else if (Ui_Tools.square_filling == 1)
				{
					var ty1 = y1;
					while (x1 < x2)
					{
						while (y1 < y2)
						{
							Canvas.add_pixel_to_temp_layer(x1, y1, primary_color);
							++y1;
						}
						y1 = ty1;
						++x1
					}
				}
				else if (Ui_Tools.square_filling == 2)
				{
					var tx1 = x1;
					var ty1 = y1;
					while (tx1 <= x2)
					{
						Canvas.add_pixel_to_temp_layer(tx1, y1, primary_color);
						Canvas.add_pixel_to_temp_layer(tx1, y2, primary_color);
						++tx1;
					}
					while (ty1 <= y2)
					{
						Canvas.add_pixel_to_temp_layer(x1, ty1, primary_color);
						Canvas.add_pixel_to_temp_layer(x2, ty1, primary_color);
						++ty1;
					}
					++x1;
					++y1;
					ty1 = y1;
					while (x1 < x2)
					{
						while (y1 < y2)
						{
							Canvas.add_pixel_to_temp_layer(x1, y1, secondary_color);
							++y1;
						}
						y1 = ty1;
						++x1
					}
				}

				Canvas.add_layer_to_canvas();
				Canvas.render_canvas();
			}
		}
		else if (Ui_Tools.active_tool == "circle")
		{
			if (Tools.shape == false)
			{
				Tools.start_x = x;
				Tools.start_y = y;
				Tools.shape = true;
			}
			else
			{
				Canvas.clear_temp_layer();

				var x1, x2, y1, y2;
				if (Tools.start_x < x) {x1 = Tools.start_x; x2 = x;}
				else {x1 = x; x2 = Tools.start_x;}
				if (Tools.start_y < y) {y1 = Tools.start_y; y2 = y;}
				else {y1 = y; y2 = Tools.start_y;}
				var dx = x2 - x1;
				var dy = y2 - y1;
				var r = Math.floor(Math.sqrt((dx * dx) + (dy * dy)));
				var posx = 0;
				var posy = r;
				var d = r - 1;
				while (posy >= posx)
				{
					Canvas.add_pixel_to_temp_layer(x + posx, y + posy, primary_color);
					Canvas.add_pixel_to_temp_layer(x + posy, y + posx, primary_color);
					Canvas.add_pixel_to_temp_layer(x - posx, y + posy, primary_color);
					Canvas.add_pixel_to_temp_layer(x - posy, y + posx, primary_color);
					Canvas.add_pixel_to_temp_layer(x + posx, y - posy, primary_color);
					Canvas.add_pixel_to_temp_layer(x + posy, y - posx, primary_color);
					Canvas.add_pixel_to_temp_layer(x - posx, y - posy, primary_color);
					Canvas.add_pixel_to_temp_layer(x - posy, y - posx, primary_color);

					if (d >= posx * 2) {d -= posx * 2 + 1; ++posx;}
					else if (d < 2 * (r - posy)) {d += posy * 2 - 1; --posy;}
					else {d += 2 * (posy - posx - 1); --posy; ++posx;}
				}
				Canvas.add_layer_to_canvas();
				Canvas.render_canvas();
			}
		}
	}
}
