	function Vector3 (x, y, z)
	{		
		this .x = x;
		this .y = y;
		this .z = z;
	}

	Vector3 .prototype =
	{
		constructor: Vector3,
		length: 3,
		copy: function ()
		{
			var copy = Object .create (Vector3 .prototype);
			copy .x = this .x;
			copy .y = this .y;
			copy .z = this .z;
			return copy;
		},
		assign: function (vector)
		{
			this .x = vector .x;
			this .y = vector .y;
			this .z = vector .z;
			return this;
		},
		set: function (x, y, z)
		{
			this .x = x;
			this .y = y;
			this .z = z;
			return this;
		},
		equals: function (vector)
		{
			return this .x === vector .x &&
			       this .y === vector .y &&
			       this .z === vector .z;
		},
		negate: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			this .z = -this .z;
			return this;
		},
		add: function (vector)
		{
			this .x += vector .x;
			this .y += vector .y;
			this .z += vector .z;
			return this;
		},
		subtract: function (vector)
		{
			this .x -= vector .x;
			this .y -= vector .y;
			this .z -= vector .z;
			return this;
		},
		multiply: function (value)
		{
			this .x *= value;
			this .y *= value;
			this .z *= value;
			return this;
		},
		multVec: function (vector)
		{
			this .x *= vector .x;
			this .y *= vector .y;
			this .z *= vector .z;
			return this;
		},
		divide: function (value)
		{
			this .x /= value;
			this .y /= value;
			this .z /= value;
			return this;
		},
		divVec: function (vector)
		{
			this .x /= vector .x;
			this .y /= vector .y;
			this .z /= vector .z;
			return this;
		},
		cross: function (vector)
		{
			var x = this .x, y = this .y, z = this .z;

			this .x = y * vector .z - z * vector .y;
			this .y = z * vector .x - x * vector .z;
			this .z = x * vector .y - y * vector .x;

			return this;
		},
		normalize: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z;

			var length = Math .sqrt (x * x +
			                         y * y +
			                         z * z);

			if (length)
			{
				this .x = x / length;
				this .y = y / length;
				this .z = z / length;
			}

			return this;
		},
		dot: function (vector)
		{
			return this .x * vector .x +
			       this .y * vector .y +
			       this .z * vector .z;
		},
		norm: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z;

			return x * x +
			       y * y +
			       z * z;
		},
		abs: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z;

			return Math .sqrt (x * x +
			                   y * y +
			                   z * z);
		},
		distance: function (vector)
		{
			var
				x = this .x - vector .x,
				y = this .y - vector .y,
				z = this .z - vector .z;

			return Math .sqrt (x * x +
			                   y * y +
			                   z * z);
		},
		lerp: function (dest, t)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z;

			this .x = x + t * (dest .x - x);
			this .y = y + t * (dest .y - y);
			this .z = z + t * (dest .z - z);
			return this;
		},
		slerp: function (destination, t)
		{
			return Algorithm .simpleSlerp (this, tmp .assign (destination), t);
		},
		min: function (vector)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
				z = Math .min (z, vector .z);
			}

			this .x = x;
			this .y = y;
			this .z = z;
			return this;
		},
		max: function (vector)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
				z = Math .max (z, vector .z);
			}

			this .x = x;
			this .y = y;
			this .z = z;
			return this;
		},
		toString: function ()
		{
			return this .x + " " +
			       this .y + " " +
			       this .z;
		}
	};

Object .assign (Vector3,
  {
    Zero: new Vector3 (0, 0, 0),
    One: new Vector3 (1, 1, 1),
    negate: function (vector) {
      var copy = Object .create (this .prototype);
      copy .x = -vector .x;
      copy .y = -vector .y;
      copy .z = -vector .z;
      return copy;
    },
  }
)

module.exports = Vector3

/*
	Object .defineProperty (Vector3 .prototype, "0",
	{
		get: function () { return this .x; },
		set: function (value) { this .x = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector3 .prototype, "1",
	{
		get: function () { return this .y; },
		set: function (value) { this .y = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector3 .prototype, "2",
	{
		get: function () { return this .z; },
		set: function (value) { this .z = value; },
		enumerable: false,
		configurable: false
	});

	Object .assign (Vector3,
	{
		Zero: new Vector3 (0, 0, 0),
		One: new Vector3 (1, 1, 1),
		xAxis: new Vector3 (1, 0, 0),
		yAxis: new Vector3 (0, 1, 0),
		zAxis: new Vector3 (0, 0, 1),
		negate: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -vector .x;
			copy .y = -vector .y;
			copy .z = -vector .z;
			return copy;
		},
		add: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x + rhs .x;
			copy .y = lhs .y + rhs .y;
			copy .z = lhs .z + rhs .z;
			return copy;
		},
		subtract: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x - rhs .x;
			copy .y = lhs .y - rhs .y;
			copy .z = lhs .z - rhs .z;
			return copy;
		},
		multiply: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs;
			copy .y = lhs .y * rhs;
			copy .z = lhs .z * rhs;
			return copy;
		},
		multVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs .x;
			copy .y = lhs .y * rhs .y;
			copy .z = lhs .z * rhs .z;
			return copy;
		},
		divide: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs;
			copy .y = lhs .y / rhs;
			copy .z = lhs .z / rhs;
			return copy;
		},
		divVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs .x;
			copy .y = lhs .y / rhs .y;
			copy .z = lhs .z / rhs .z;
			return copy;
		},
		cross: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .y * rhs .z - lhs .z * rhs .y;
			copy .y = lhs .z * rhs .x - lhs .x * rhs .z;
			copy .z = lhs .x * rhs .y - lhs .y * rhs .x;
			return copy;
		},
		normalize: function (vector)
		{
			var
				copy   = Object .create (this .prototype),
				x      = vector .x,
				y      = vector .y,
				z      = vector .z,
				length = Math .sqrt (x * x + y * y + z * z);

			if (length)
			{
				copy .x = x / length;
				copy .y = y / length;
				copy .z = z / length;
			}
			else
			{
				copy .x = 0;
				copy .y = 0;
				copy .z = 0;
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
				z = source .z;

			return new Vector3 (x + t * (dest .x - x),
			                    y + t * (dest .y - y),
			                    z + t * (dest .z - z));
		},
		slerp: function (source, destination, t)
		{
			return Algorithm .simpleSlerp (source .copy (), tmp .assign (destination), t);
		},
		min: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
				z = Math .min (z, vector .z);
			}

			return new Vector3 (x, y, z);
		},
		max: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
				z = Math .max (z, vector .z);
			}

			return new Vector3 (x, y, z);
		},
	});

	var tmp = new Vector3 (0, 0, 0);

	return Vector3;
});
*/
