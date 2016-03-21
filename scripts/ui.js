var Ui = 
{
	init: function()
	{
		Ui_Project_View.init();
		Ui_Tools.init();
		Ui_Palette.init();
		Ui_Preview.init();
		Ui_Canvas.init();
	},
	resize: function()
	{
		Ui_Canvas.update_size();
		Ui_Canvas.update_position();
	},
	toggle_section: function(elem)
	{
		if (elem.innerHTML == "-")
		{
			elem.innerHTML = "+";
			elem.parentNode.parentNode.style.height = "25px";
		}
		else if (elem.innerHTML == "+")
		{
			elem.innerHTML = "-";
			elem.parentNode.parentNode.style.height = "auto";
		}
	}
}
