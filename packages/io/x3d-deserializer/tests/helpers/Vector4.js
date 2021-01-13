	function Vector4 (x, y, z, w)
	{
		this .x = x;
		this .y = y;
		this .z = z;
		this .w = w;
	}

	Vector4 .prototype =
	{
		constructor: Vector4,
		length: 4,
		copy: function ()
		{
			var copy = Object .create (Vector4 .prototype);
			copy .x = this .x;
			copy .y = this .y;
			copy .z = this .z;
			copy .w = this .w;
			return copy;
		},
		assign: function (vector)
		{
			this .x = vector .x;
			this .y = vector .y;
			this .z = vector .z;
			this .w = vector .w;
			return this;
		},
		set: function (x, y, z, w)
		{
			this .x = x;
			this .y = y;
			this .z = z;
			this .w = w;
			return this;
		},
		equals: function (vector)
		{
			return this .x === vector .x &&
			       this .y === vector .y &&
			       this .z === vector .z &&
			       this .w === vector .w;
		},
		getReal: function (vector)
		{
			vector .x = this .x / this .w;
			vector .y = this .y / this .w;
			vector .z = this .z / this .w;
		},
		negate: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			this .z = -this .z;
			this .w = -this .w;
			return this;
		},
		add: function (vector)
		{
			this .x += vector .x;
			this .y += vector .y;
			this .z += vector .z;
			this .w += vector .w;
			return this;
		},
		subtract: function (vector)
		{
			this .x -= vector .x;
			this .y -= vector .y;
			this .z -= vector .z;
			this .w -= vector .w;
			return this;
		},
		multiply: function (value)
		{
			this .x *= value;
			this .y *= value;
			this .z *= value;
			this .w *= value;
			return this;
		},
		multVec: function (vector)
		{
			this .x *= vector .x;
			this .y *= vector .y;
			this .z *= vector .z;
			this .w *= vector .w;
			return this;
		},
		divide: function (value)
		{
			this .x /= value;
			this .y /= value;
			this .z /= value;
			this .w /= value;
			return this;
		},
		divVec: function (vector)
		{
			this .x /= vector .x;
			this .y /= vector .y;
			this .z /= vector .z;
			this .w /= vector .w;
			return this;
		},
		normalize: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			var length = Math .sqrt (x * x +
			                         y * y +
			                         z * z +
			                         w * w);

			if (length)
			{
				this .x = x / length;
				this .y = y / length;
				this .z = z / length;
				this .w = w / length;
			}

			return this;
		},
		dot: function (vector)
		{
			return this .x * vector .x +
			       this .y * vector .y +
			       this .z * vector .z +
			       this .w * vector .w;
		},
		norm: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			return x * x +
			       y * y +
			       z * z +
			       w * w;
		},
		abs: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			return Math .sqrt (x * x +
			                   y * y +
			                   z * z +
			                   w * w);
		},
		distance: function (vector)
		{
			var
				x = this .x - vector .x,
				y = this .y - vector .y,
				z = this .z - vector .z,
				w = this .w - vector .w;

			return Math .sqrt (x * x +
			                   y * y +
			                   z * z +
			                   w * w);
		},
		lerp: function (dest, t)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			this .x = x + t * (dest .x - x);
			this .y = y + t * (dest .y - y);
			this .z = z + t * (dest .z - z);
			this .w = w + t * (dest .w - w);
			return this;
		},
		min: function (vector)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
				z = Math .min (z, vector .z);
				w = Math .min (w, vector .w);
			}

			this .x = x;
			this .y = y;
			this .z = z;
			this .w = w;
			return this;
		},
		max: function (vector)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
				z = Math .max (z, vector .z);
				w = Math .max (w, vector .w);
			}

			this .x = x;
			this .y = y;
			this .z = z;
			this .w = w;
			return this;
		},
		toString: function ()
		{
			return this .x + " " +
			       this .y + " " +
			       this .z + " " +
			       this .w;
		},
	};

module.exports = Vector4

/*
	Object .defineProperty (Vector4 .prototype, "0",
	{
		get: function () { return this .x; },
		set: function (value) { this .x = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector4 .prototype, "1",
	{
		get: function () { return this .y; },
		set: function (value) { this .y = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector4 .prototype, "2",
	{
		get: function () { return this .z; },
		set: function (value) { this .z = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector4 .prototype, "3",
	{
		get: function () { return this .w; },
		set: function (value) { this .w = value; },
		enumerable: false,
		configurable: false
	});

	Object .assign (Vector4,
	{
		Zero: new Vector4 (0, 0, 0, 0),
		One: new Vector4 (1, 1, 1, 1),
		xAxis: new Vector4 (1, 0, 0, 0),
		yAxis: new Vector4 (0, 1, 0, 0),
		zAxis: new Vector4 (0, 0, 1, 0),
		wAxis: new Vector4 (0, 0, 0, 1),
		negate: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -vector .x;
			copy .y = -vector .y;
			copy .z = -vector .z;
			copy .w = -vector .w;
			return copy;
		},
		add: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x + rhs .x;
			copy .y = lhs .y + rhs .y;
			copy .z = lhs .z + rhs .z;
			copy .w = lhs .w + rhs .w;
			return copy;
		},
		subtract: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x - rhs .x;
			copy .y = lhs .y - rhs .y;
			copy .z = lhs .z - rhs .z;
			copy .w = lhs .w - rhs .w;
			return copy;
		},
		multiply: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs;
			copy .y = lhs .y * rhs;
			copy .z = lhs .z * rhs;
			copy .w = lhs .w * rhs;
			return copy;
		},
		multVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs .x;
			copy .y = lhs .y * rhs .y;
			copy .z = lhs .z * rhs .z;
			copy .w = lhs .w * rhs .w;
			return copy;
		},
		divide: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs;
			copy .y = lhs .y / rhs;
			copy .z = lhs .z / rhs;
			copy .w = lhs .w / rhs;
			return copy;
		},
		divVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs .x;
			copy .y = lhs .y / rhs .y;
			copy .z = lhs .z / rhs .z;
			copy .w = lhs .w / rhs .w;
			return copy;
		},
		normalize: function (vector)
		{
			var
				copy   = Object .create (this .prototype),
				x      = vector .x,
				y      = vector .y,
				z      = vector .z,
				w      = vector .w,
				length = Math .sqrt (x * x + y * y + z * z + w * w);

			if (length)
			{
				copy .x = x / length;
				copy .y = y / length;
				copy .z = z / length;
				copy .w = w / length;
			}
			else
			{
				copy .x = 0;
				copy .y = 0;
				copy .z = 0;
				copy .w = 0;
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
				y = source .y,
				z = source .z,
				w = source .w;

			return new Vector4 (x + t * (dest .x - x),
			                    y + t * (dest .y - y),
			                    z + t * (dest .z - z),
			                    w + t * (dest .w - w));
		},
		min: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z,
				w = lhs .w;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
				z = Math .min (z, vector .z);
				w = Math .min (w, vector .w);
			}

			return new Vector4 (x, y, z, w);
		},
		max: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z,
				w = lhs .w;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
				z = Math .max (z, vector .z);
				w = Math .max (w, vector .w);
			}

			return new Vector4 (x, y, z, w);
		},
	});

	return Vector4;
});
*/
