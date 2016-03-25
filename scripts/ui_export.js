var Ui_Export =
{
	size_multiplier: 1,

	update_size_multiplier: function(val)
	{
		if (val == -1 && this.size_multiplier > 1)
			document.getElementById("span_size_multiplier").innerHTML = --this.size_multiplier;
		else if (val == 1 && this.size_multiplier < 10)
			document.getElementById("span_size_multiplier").innerHTML = ++this.size_multiplier;
	},

	export_png: function()
	{
		var export_canvas = document.createElement("canvas");
		export_canvas.width = Ui_Canvas.canvas_width * this.size_multiplier;
		export_canvas.height = Ui_Canvas.canvas_height * this.size_multiplier;

		var export_ctx = export_canvas.getContext("2d");
		var export_data = export_ctx.getImageData(0, 0, export_canvas.width, export_canvas.height);

		for (var x = 0; x < Canvas.layer.length; ++x)
			for (var y = 0; y < Canvas.layer[x].length; ++y)
				this.add_pixel(x, y, export_data, Canvas.layer[x][y]);

		export_ctx.putImageData(export_data, 0, 0);

		window.open(export_canvas.toDataURL('image/png'));
	},

	add_pixel: function(x, y, data, color)
	{
		x *= this.size_multiplier;
		y *= this.size_multiplier;

		for (var a = 0; a < this.size_multiplier; ++a)
		{
			for (var b = 0; b < this.size_multiplier; ++b)
			{
				var i = ((x + a) + ((y + b) * Ui_Canvas.canvas_width * this.size_multiplier)) * 4;
				data.data[i] = color.r;
				data.data[i + 1] = color.g;
				data.data[i + 2] = color.b;
				data.data[i + 3] = color.a;
			}
		}
	},
}