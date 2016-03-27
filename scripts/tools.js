var Tools =
{
	shape: false,
	start_x: undefined,
	start_y: undefined,

	stop_shape: function()
	{
		if (this.shape == true)
		{
			this.shape = false;
			Canvas.copy_temp_layer();
		}
	},

	pen: function(x, y, color)
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
	},

	pipette: function(x, y)
	{
		Ui_Palette.select_left_color(Canvas.layer[x][y].r, Canvas.layer[x][y].g, Canvas.layer[x][y].b);
	},

	eraser: function(x, y)
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
	},

	bucket: function(x, y, target_color, selected_color)
	{
		if (Canvas.layer[x][y].r == target_color.r && Canvas.layer[x][y].g == target_color.g && Canvas.layer[x][y].b == target_color.b && Canvas.layer[x][y].a == target_color.a)
		{
			Canvas.add_pixel_to_layer(x, y, selected_color);
			Canvas.render_pixel_to_canvas(x, y, selected_color);
			if (x < Ui_Canvas.canvas_width - 1)
				this.bucket(x + 1, y, target_color, selected_color);
			if (x > 0)
				this.bucket(x - 1, y, target_color, selected_color);
			if (y < Ui_Canvas.canvas_height - 1)
				this.bucket(x, y + 1, target_color, selected_color);
			if (y > 0)
				this.bucket(x, y - 1, target_color, selected_color);
		}
	},

	swaper: function(x, y, target_color, selected_color)
	{
		for (var a = 0; a < Canvas.layer.length; ++a)
		{
			for (var b = 0; b < Canvas.layer[a].length; ++b)
			{
				if (Canvas.layer[a][b].r == target_color.r && Canvas.layer[a][b].g == target_color.g && Canvas.layer[a][b].b == target_color.b && Canvas.layer[a][b].a == target_color.a)
				{
					Canvas.add_pixel_to_layer(a, b, selected_color);
					Canvas.add_pixel_to_canvas(a, b, selected_color);
				}
			}
		}
		Canvas.render_canvas();
	},

	lighten: function(x, y)
	{
		for (var a = 0; a < Ui_Tools.lighten_size && x + a < Ui_Canvas.canvas_width; ++a)
		{
			for (var b = 0; b < Ui_Tools.lighten_size && y + b < Ui_Canvas.canvas_height; ++b)
			{
				var posx = x + a;
				var posy = y + b;
				var target_color = {r: Canvas.layer[posx][posy].r, g: Canvas.layer[posx][posy].g, b: Canvas.layer[posx][posy].b, a: Canvas.layer[posx][posy].a};
				if (target_color.r == 0 && target_color.g == 0 && target_color.b == 0)
				{
					target_color.r = parseInt(2.55 * Ui_Tools.lighten_power);
					target_color.g = parseInt(2.55 * Ui_Tools.lighten_power);
					target_color.b = parseInt(2.55 * Ui_Tools.lighten_power);
				}
				else
				{
					target_color.r = parseInt(target_color.r * (100 + Ui_Tools.lighten_power) / 100);
					target_color.g = parseInt(target_color.g * (100 + Ui_Tools.lighten_power) / 100);
					target_color.b = parseInt(target_color.b * (100 + Ui_Tools.lighten_power) / 100);
				}
				if (target_color.r > 255) target_color.r = 255;
				if (target_color.g > 255) target_color.g = 255;
				if (target_color.b > 255) target_color.b = 255;
				Canvas.add_pixel_to_layer(posx, posy, target_color);
				Canvas.add_pixel_to_canvas(posx, posy, target_color);
			}
		}
		Canvas.render_canvas();
	},

	darken: function(x, y)
	{
		for (var a = 0; a < Ui_Tools.darken_size && x + a < Ui_Canvas.canvas_width; ++a)
		{
			for (var b = 0; b < Ui_Tools.darken_size && y + b < Ui_Canvas.canvas_height; ++b)
			{
				var posx = x + a;
				var posy = y + b;
				var target_color = {r: Canvas.layer[posx][posy].r, g: Canvas.layer[posx][posy].g, b: Canvas.layer[posx][posy].b, a: Canvas.layer[posx][posy].a};
				if (target_color.r == 255 && target_color.g == 255 && target_color.b == 255)
				{
					target_color.r = parseInt(255 - (2.55 * Ui_Tools.darken_power));
					target_color.g = parseInt(255 - (2.55 * Ui_Tools.darken_power));
					target_color.b = parseInt(255 - (2.55 * Ui_Tools.darken_power));
				}
				else
				{
					target_color.r = parseInt(target_color.r * (100 - Ui_Tools.darken_power) / 100);
					target_color.g = parseInt(target_color.g * (100 - Ui_Tools.darken_power) / 100);
					target_color.b = parseInt(target_color.b * (100 - Ui_Tools.darken_power) / 100);
				}
				if (target_color.r < 0) target_color.r = 0;
				if (target_color.g < 0) target_color.g = 0;
				if (target_color.b < 0) target_color.b = 0;
				Canvas.add_pixel_to_layer(posx, posy, target_color);
				Canvas.add_pixel_to_canvas(posx, posy, target_color);
			}
		}
		Canvas.render_canvas();
	},

	stroke: function(x, y, color)
	{
		if (this.shape == false)
		{
			this.start_x = x;
			this.start_y = y;
			this.shape = true;
		}
		else
		{
			Canvas.clear_temp_layer();
			var x1, x2, y1, y2;
			x1 = this.start_x;
			x2 = x;
			y1 = this.start_y;
			y2 = y;
		}

		var a = (y2 - y1) / (x2 - x1);
		var b = y1 - a * x1;
		while (x1 < x2)
		{
			var posy = parseInt(a * x1 + b);
			if (x1 >= 0 && x1 < Canvas.temp_layer.length && posy >= 0 && posy < Canvas.temp_layer.length)
			Canvas.add_pixel_to_temp_layer(x1, posy, color);
			++x1;
		}

		Canvas.add_layer_to_canvas();
		Canvas.render_canvas();
	},

	square: function()
	{

	},

	circle: function()
	{

	},
}