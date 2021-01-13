	function Vector2 (x, y)
	{		
		this .x = x;
		this .y = y;
	}

	Vector2 .prototype =
	{
		constructor: Vector2,
		length: 2,
		copy: function ()
		{
			var copy = Object .create (Vector2 .prototype);
			copy .x = this .x;
			copy .y = this .y;
			return copy;
		},
		assign: function (vector)
		{
			this .x = vector .x;
			this .y = vector .y;
			return this;
		},
		set: function (x, y)
		{
			this .x = x;
			this .y = y;
			return this;
		},
		equals: function (vector)
		{
			return this .x === vector .x &&
			       this .y === vector .y;
		},
		negate: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			return this;
		},
		add: function (vector)
		{
			this .x += vector .x;
			this .y += vector .y;
			return this;
		},
		subtract: function (vector)
		{
			this .x -= vector .x;
			this .y -= vector .y;
			return this;
		},
		multiply: function (value)
		{
			this .x *= value;
			this .y *= value;
			return this;
		},
		multVec: function (vector)
		{
			this .x *= vector .x;
			this .y *= vector .y;
			return this;
		},
		divide: function (value)
		{
			this .x /= value;
			this .y /= value;
			return this;
		},
		divVec: function (vector)
		{
			this .x /= vector .x;
			this .y /= vector .y;
			return this;
		},
		normalize: function ()
		{
			var
				x = this .x,
				y = this .y;

			var length = Math .sqrt (x * x +
			                         y * y);

			if (length)
			{
				this .x = x / length;
				this .y = y / length;
			}

			return this;
		},
		dot: function (vector)
		{
			return this .x * vector .x +
			       this .y * vector .y;
		},
		norm: function ()
		{
			var
				x = this .x,
				y = this .y;

			return x * x +
			       y * y;
		},
		abs: function ()
		{
			var
				x = this .x,
				y = this .y;

			return Math .sqrt (x * x +
			                   y * y);
		},
		distance: function (vector)
		{
			var
				x = this .x - vector .x,
				y = this .y - vector .y;

			return Math .sqrt (x * x +
			                   y * y);
		},
		lerp: function (dest, t)
		{
			var
				x = this .x,
				y = this .y;

			this .x = x + t * (dest .x - x);
			this .y = y + t * (dest .y - y);
			return this;
		},
		min: function (vector)
		{
			var
				x = this .x,
				y = this .y;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
			}

			this .x = x;
			this .y = y;
			return this;
		},
		max: function (vector)
		{
			var
				x = this .x,
				y = this .y;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
			}

			this .x = x;
			this .y = y;
			return this;
		},
		toString: function ()
		{
			return this .x + " " +
			       this .y;
		}
	};

module.exports = Vector2

/*
	Object .defineProperty (Vector2 .prototype, "0",
	{
		get: function () { return this .x; },
		set: function (value) { this .x = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector2 .prototype, "1",
	{
		get: function () { return this .y; },
		set: function (value) { this .y = value; },
		enumerable: false,
		configurable: false
	});

	Object .assign (Vector2,
	{
		Zero: new Vector2 (0, 0),
		One: new Vector2 (1, 1),
		negate: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -vector .x;
			copy .y = -vector .y;
			return copy;
		},
		add: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x + rhs .x;
			copy .y = lhs .y + rhs .y;
			return copy;
		},
		subtract: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x - rhs .x;
			copy .y = lhs .y - rhs .y;
			return copy;
		},
		multiply: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs;
			copy .y = lhs .y * rhs;
			return copy;
		},
		multVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs .x;
			copy .y = lhs .y * rhs .y;
			return copy;
		},
		divide: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs;
			copy .y = lhs .y / rhs;
			return copy;
		},
		divVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs .x;
			copy .y = lhs .y / rhs .y;
			return copy;
		},
		normalize: function (vector)
		{
			var
				copy   = Object .create (this .prototype),
				x      = vector .x,
				y      = vector .y,
				length = Math .sqrt (x * x + y * y);

			if (length)
			{
				copy .x = x / length;
				copy .y = y / length;
			}
			else
			{
				copy .x = 0;
				copy .y = 0;
			}

			return copy;
		},
		dot: function (lhs, rhs)
		{
			return lhs .dot (rhs);
		},
		lerp: function (source, dest, t)
		{
			var
				x = source .x,
				y = source .y;

			return new Vector2 (x + t * (dest .x - x),
			                    y + t * (dest .y - y));
		},
		min: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
			}

			return new Vector2 (x, y);
		},
		max: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
			}

			return new Vector2 (x, y);
		},
	});

	return Vector2;
});
*/
