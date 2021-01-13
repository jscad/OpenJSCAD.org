
	function Matrix2 ()
	{
		if (arguments .length)
		{
			this [0] = arguments [0];
			this [1] = arguments [1];
			this [2] = arguments [2];
			this [3] = arguments [3];
		}
		else
		{
			this .identity ();
		}
	}

	Matrix2 .prototype =
	{
		constructor: Matrix2,
		order: 2,
		length: 4,
		copy: function ()
		{
			var copy = Object .create (Matrix2 .prototype);
			copy [0] = this [0];
			copy [1] = this [1];
			copy [2] = this [2];
			copy [3] = this [3];
			return copy;
		},
		assign: function (matrix)
		{
			this [0] = matrix [0];
			this [1] = matrix [1];
			this [2] = matrix [2];
			this [3] = matrix [3];
			return this;
		},
		equals: function (matrix)
		{
			return this [0] === matrix [0] &&
			       this [1] === matrix [1] &&
			       this [2] === matrix [2] &&
			       this [3] === matrix [3];
		},
		set1: function (r, c, value)
		{
			this [r * this .order + c] = value;
		},
		get1: function (r, c)
		{
			return this [r * this .order + c];
		},
		set: function ()
		{
			switch (arguments .length)
			{
				case 0:
				{
					this .identity ();
					break;
				}
				case 4:
				{
					this [0] = arguments [0];
					this [1] = arguments [1];
					this [2] = arguments [2];
					this [3] = arguments [3];	
					break;
				}
			}
		},
		determinant1: function ()
		{
			return this [0];
		},
		determinant: function ()
		{
			return this [0] * this [3] -
			       this [1] * this [2];
		},
		transpose: function ()
		{
			var tmp = this [1];

			this [1] = this [2];
			this [2] = tmp;

			return this;
		},
		inverse: function ()
		{
			var d = this .determinant ();
		
			if (d === 0)
				throw new Error ("Matrix2 .inverse: determinant is 0.");

			this [0] =  array [0] / d;
			this [1] = -array [1] / d;
			this [2] = -array [2] / d;
			this [3] =  array [3] / d;

			return this;
		},
		multLeft: function (matrix)
		{
			var
				a0 = this [0], a1 = this [1],
				a2 = this [2], a3 = this [3],
				b0 = matrix [0], b1 = matrix [1],
				b2 = matrix [2], b3 = matrix [3];

	      this [0] = a0 * b0 + a2 * b1;
	      this [1] = a1 * b0 + a3 * b1;
	      this [2] = a0 * b2 + a2 * b3;
	      this [3] = a1 * b2 + a3 * b3;

			return this;
		},
		multRight: function (matrix)
		{
			var
				a0 = this [0], a1 = this [1],
				a2 = this [2], a3 = this [3],
				b0 = matrix [0], b1 = matrix [1],
				b2 = matrix [2], b3 = matrix [3];

	      this [0] = b0 * a0 + b2 * a1;
	      this [1] = b1 * a0 + b3 * a1;
	      this [2] = b0 * a2 + b2 * a3;
	      this [3] = b1 * a2 + b3 * a3;

			return this;
		},
		identity: function ()
		{
			this [0] = 1;
			this [1] = 0;
			this [2] = 0;
			this [3] = 1;	
		},
		toString: function ()
		{
			return this [0] + " " + this [1] + " " +
			       this [2] + " " + this [3]
		},
	};

module.exports = Matrix2

/*
	Object .defineProperty (Matrix2 .prototype, "x",
	{
		get: (function ()
		{
			var vector = new Vector2 (0, 0);

			return function () { return vector .set (this [0], this [1]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix2 .prototype, "xAxis",
	{
		get: function () { return this [0]; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix2 .prototype, "origin",
	{
		get: function () { return this [2]; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix2 .prototype, "submatrix",
	{
		get: function () { return this [0]; },
		enumerable: false,
		configurable: false
	});

	Object .assign (Matrix2,
	{
		Identity: new Matrix2 (),
	});

	return Matrix2;
});
*/
