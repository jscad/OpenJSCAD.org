const Vector3 = require('./Vector3')
const Vector4 = require('./Vector4')
const Quaternion = require('./Quaternion')


function interval (value, low, high)
{       
        if (value >= high)
                return ((value - low) % (high - low)) + low;

        if (value < low)
                return ((value - high) % (high - low)) + high;

        return value;
}


	function Rotation4 (x, y, z, angle)
	{
		this .x_     = 0;
		this .y_     = 0;
		this .z_     = 1;
		this .angle_ = 0;

		switch (arguments .length)
		{
			case 0:
			{
				this .value = new Quaternion (0, 0, 0, 1);
				return;
			}
			case 1:
			{
				this .value = arguments [0];
				this .update ();
				return;
			}
			case 2:
			{
				var
					arg0 = arguments [0],
					arg1 = arguments [1];

				this .value = new Quaternion (0, 0, 0, 1);

				if (arg1 instanceof Vector3)
				   return this .setFromToVec (arg0, arg1);

				this .set (arg0 .x,
				           arg0 .y,
				           arg0 .z,
				           arg1);

			   return;
			}
			case 4:
			{
				this .value = new Quaternion (0, 0, 0, 1);
				this .set (x, y, z, angle);
				return;
			}
		}
	}

	Rotation4 .prototype =
	{
		constructor: Rotation4,
		length: 4,
		update: function ()
		{
			var rotation = this .get ();

			this .x_     = rotation .x;
			this .y_     = rotation .y;
			this .z_     = rotation .z;
			this .angle_ = rotation .w;

			return this;
		},
		copy: function ()
		{
			var copy = Object .create (Rotation4 .prototype);

			copy .x_     = this .x_;
			copy .y_     = this .y_;
			copy .z_     = this .z_;
			copy .angle_ = this .angle_;

			copy .value  = this .value .copy ();

			return copy;
		},
		assign: function (rotation)
		{
			this .x_     = rotation .x_;
			this .y_     = rotation .y_;
			this .z_     = rotation .z_;
			this .angle_ = rotation .angle_;

			this .value .assign (rotation .value);

			return this;
		},
		set: function (x, y, z, angle)
		{
			this .x_     = x;
			this .y_     = y;
			this .z_     = z;
			this .angle_ = angle;

			var scale = Math .sqrt (x * x + y * y + z * z);

			if (scale === 0)
			{
				this .value .set (0, 0, 0, 1);
				return this;
			}

			// Calculate quaternion

			var
				halfTheta = interval (angle / 2, 0, Math .PI),
				scale     = Math .sin (halfTheta) / scale;

			this .value .set (x * scale,
			                  y * scale,
			                  z * scale,
			                  Math .cos (halfTheta));
			return this;
		},
		get: (function ()
		{
			var result = new Vector4 (0, 0, 0, 0);

			return function ()
			{
				var value = this .value;

				if (Math .abs (value .w) > 1)
				{
					return Vector4 .zAxis;
				}
				else
				{
					var
						angle = Math .acos (value .w) * 2,
						scale = Math .sin (angle / 2);

					if (scale === 0)
					{
						return Vector4 .zAxis;
					}
					else
					{
						var axis = value .imag .divide (scale);

						return result .set (axis .x,
						                    axis .y,
						                    axis .z,
						                    angle);
					}
				}
			};
		})(),
		setAxisAngle: function (axis, angle)
		{
			return this .set (axis .x, axis .y, axis .z, angle);
		},
		setFromToVec: (function ()
		{
			var
				from = new Vector3 (0, 0, 0),
				to   = new Vector3 (0, 0, 0),
				cv   = new Vector3 (0, 0, 0),
				t    = new Vector3 (0, 0, 0);

			return function (fromVec, toVec)
			{
				// https://bitbucket.org/Coin3D/coin/src/abc9f50968c9/src/base/SbRotation.cpp

				from .assign (fromVec) .normalize ();
				to   .assign (toVec)   .normalize ();

				var
					cos_angle = Algorithm .clamp (from .dot (to), -1, 1),
					crossvec  = cv .assign (from) .cross (to) .normalize (),
					crosslen  = crossvec .abs ();

				if (crosslen === 0)
				{
					// Parallel vectors
					// Check if they are pointing in the same direction.
					if (cos_angle > 0)
						this .value .set (0, 0, 0, 1); // standard rotation

					// Ok, so they are parallel and pointing in the opposite direction
					// of each other.
					else
					{
						// Try crossing with x axis.
						t .assign (from) .cross (Vector3 .xAxis);

						// If not ok, cross with y axis.
						if (t .norm () === 0)
							t .assign (from) .cross (Vector3 .yAxis);

						t .normalize ();

						this .value .set (t .x, t .y, t .z, 0);
					}
				}
				else
				{
					// Vectors are not parallel
					// The abs () wrapping is to avoid problems when `dot' "overflows" a tiny wee bit,
					// which can lead to sqrt () returning NaN.
					crossvec .multiply (Math .sqrt (Math .abs (1 - cos_angle) / 2));

					this .value .set (crossvec .x,
					                  crossvec .y,
					                  crossvec .z,
					                  Math .sqrt (Math .abs (1 + cos_angle) / 2));
				}

				this .update ();

				return this;
			};
		})(),
		setAxis: function (vector)
		{
			this .set (vector .x, vector .y, vector .z, this .angle_);
		},
		getAxis: (function ()
		{
			var axis = new Vector3 (0, 0, 0);

			return function ()
			{
				return axis .set (this .x_, this .y_, this .z_);
			};
		})(),
		setMatrix: function (matrix)
		{
			this .value .setMatrix (matrix) .normalize ();
			this .update ();
			return this;
		},
		getMatrix: function (matrix)
		{
			return this .value .getMatrix (matrix);
		},
		equals: function (rot)
		{
			return this .value .equals (rot .value);
		},
		inverse: function ()
		{
			this .value .inverse ();
			this .update ();
			return this;
		},
		multLeft: function (rotation)
		{
			this .value .multLeft (rotation .value) .normalize ();
			this .update ();
			return this;
		},
		multRight: function (rotation)
		{
			this .value .multRight (rotation .value) .normalize ();
			this .update ();
			return this;
		},
		multVecRot: function (vector)
		{
			return this .value .multVecQuat (vector);
		},
		multRotVec: function (vector)
		{
			return this .value .multQuatVec (vector);
		},
		normalize: function ()
		{
			this .value .normalize ();
			this .update ();
			return this;
		},
		pow: function (exponent)
		{
			this .value .pow (exponent);
			this .update ();
			return this;
		},
		slerp: function (dest, t)
		{
			this .value .slerp (dest .value, t);
			this .update ();
			return this;
		},
		squad: function (a ,b, dest, t)
		{
			this .value .squad (a .value, b .value, dest .value, t);
			this .update ();
			return this;
		},
		toString: function ()
		{
			return this .x_ + " " +
			       this .y_ + " " +
			       this .z_ + " " +
			       this .angle_;
		}
	};

Object .assign (Rotation4,
  {
    Identity: new Rotation4 (),
  }
)

module.exports = Rotation4

/*
	var x = {
		get: function ()
		{
			return this .x_;
		},
		set: function (value)
		{
			this .x_ = value;
			this .set (value, this .y_, this .z_, this .angle_);
		},
		enumerable: true,
		configurable: false
	};

	var y = {
		get: function ()
		{
			return this .y_;
		},
		set: function (value)
		{
			this .y_ = value;
			this .set (this .x_, value, this .z_, this .angle_);
		},
		enumerable: true,
		configurable: false
	};

	var z = {
		get: function ()
		{
			return this .z_;
		},
		set: function (value)
		{
			this .z_ = value;
			this .set (this .x_, this .y_, value, this .angle_);
		},
		enumerable: true,
		configurable: false
	};

	var angle = {
		get: function ()
		{
			return this .angle_;
		},
		set: function (value)
		{
			this .angle_ = value;
			this .set (this .x_, this .y_, this .z_, value);
		},
		enumerable: true,
		configurable: false
	};

	Object .defineProperty (Rotation4 .prototype, "x", x);
	Object .defineProperty (Rotation4 .prototype, "y", y);
	Object .defineProperty (Rotation4 .prototype, "z", z);
	Object .defineProperty (Rotation4 .prototype, "angle", angle);

	x     .enumerable = false;
	y     .enumerable = false;
	z     .enumerable = false;
	angle .enumerable = false;

	Object .defineProperty (Rotation4 .prototype, "0", x);
	Object .defineProperty (Rotation4 .prototype, "1", y);
	Object .defineProperty (Rotation4 .prototype, "2", z);
	Object .defineProperty (Rotation4 .prototype, "3", angle);

	Object .assign (Rotation4,
	{
		Identity: new Rotation4 (),
		inverse: function (rotation)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .inverse (rotation .value);
			copy .update ();
			return copy;
		},
		multRight: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .multRight (lhs .value, rhs .value);
			copy .update ();
			return copy;
		},
		normalize: function ()
		{
			var copy = Object .create (this .prototype);
			copy .value = rotation .value .copy ();
			copy .update ();
			return copy;
		},
		slerp: function (source, destination, t)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .slerp (source .value, destination .value, t);
			copy .update ();
			return copy;
		},
		squad: function (source, a, b, destination, t)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .squad (source .value, a, b, destination .value, t);
			copy .update ();
			return copy;
		},
		bezier: function (source, a, b, destination, t)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .bezier (source .value, a, b, destination .value, t);
			copy .update ();
			return copy;
		},
		spline: function (q0, q1, q2)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .spline (q0 .value, q1 .value, q2 .value);
			copy .update ();
			return copy;
		},
	});

	return Rotation4;
});
*/
