	function Quaternion (x, y, z, w)
	{
		this .x = x;
		this .y = y;
		this .z = z;
		this .w = w;
	}

	Quaternion .prototype =
	{
		constructor: Quaternion,
		length: 4,
		copy: function ()
		{
			var copy = Object .create (Quaternion .prototype);
			copy .x = this .x;
			copy .y = this .y;
			copy .z = this .z;
			copy .w = this .w;
			return copy;
		},
		assign: function (quat)
		{
			this .x = quat .x;
			this .y = quat .y;
			this .z = quat .z;
			this .w = quat .w;
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
		setMatrix: function (matrix)
		{
			var i;

			// First, find largest diagonal in matrix:
			if (matrix [0] > matrix [4])
			{
				i = matrix [0] > matrix [8] ? 0 : 2;
			}
			else
			{
				i = matrix [4] > matrix [8] ? 1 : 2;
			}

			var scalerow = matrix [0] + matrix [4] + matrix [8];

			if (scalerow > matrix [i * 3 + i])
			{
				// Compute w first:
				this [3] = Math .sqrt (scalerow + 1) / 2;

				// And compute other values:
				var d = 4 * this [3];
				this [0] = (matrix [5] - matrix [7]) / d;
				this [1] = (matrix [6] - matrix [2]) / d;
				this [2] = (matrix [1] - matrix [3]) / d;
			}
			else
			{
				// Compute x, y, or z first:
				var j = (i + 1) % 3;
				var k = (i + 2) % 3;

				// Compute first value:
				this [i] = Math .sqrt (matrix [i * 3 + i] - matrix [j * 3 + j] - matrix [k * 3 + k] + 1) / 2;

				// And the others:
				var d = 4 * this [i];
				this [j] = (matrix [i * 3 + j] + matrix [j * 3 + i]) / d;
				this [k] = (matrix [i * 3 + k] + matrix [k * 3 + i]) / d;
				this [3] = (matrix [j * 3 + k] - matrix [k * 3 + j]) / d;
			}

			return this;
		},
		getMatrix: function (matrix)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			var
				a = x * x,
				b = x * y,
				c = y * y,
				d = y * z,
				e = z * x,
				f = z * z,
				g = w * x,
				h = w * y,
				i = w * z;
		
			matrix [0] = 1 - 2 * (c + f);
			matrix [1] =     2 * (b + i);
			matrix [2] =     2 * (e - h);

			matrix [3] =     2 * (b - i);
			matrix [4] = 1 - 2 * (f + a);
			matrix [5] =     2 * (d + g);

			matrix [6] =     2 * (e + h);
			matrix [7] =     2 * (d - g);
			matrix [8] = 1 - 2 * (c + a);

			return matrix;
		},
		isReal: function ()
		{
			return ! (this .x || this .y || this .z);
		},
		isImag: function ()
		{
			return ! this .w;
		},
		equals: function (quat)
		{
			return this .x === quat .x &&
			       this .y === quat .y &&
			       this .z === quat .z &&
			       this .w === quat .w;
		},
		negate: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			this .z = -this .z;
			this .w = -this .w;
			return this;
		},
		inverse: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			this .z = -this .z;
			return this;
		},
		add: function (quat)
		{
			this .x += quat .x;
			this .y += quat .y;
			this .z += quat .z;
			this .w += quat .w;
			return this;
		},
		subtract: function (quat)
		{
			this .x -= quat .x;
			this .y -= quat .y;
			this .z -= quat .z;
			this .w -= quat .w;
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
		multLeft: function (quat)
		{
			var
				ax = this .x, ay = this .y, az = this .z, aw = this .w,
				bx = quat .x, by = quat .y, bz = quat .z, bw = quat .w;

			this .x = aw * bx + ax * bw + ay * bz - az * by;
			this .y = aw * by + ay * bw + az * bx - ax * bz;
			this .z = aw * bz + az * bw + ax * by - ay * bx;
			this .w = aw * bw - ax * bx - ay * by - az * bz;

			return this;
		},
		multRight: function (quat)
		{
			var
				ax = this .x, ay = this .y, az = this .z, aw = this .w,
				bx = quat .x, by = quat .y, bz = quat .z, bw = quat .w;

			this .x = bw * ax + bx * aw + by * az - bz * ay;
			this .y = bw * ay + by * aw + bz * ax - bx * az;
			this .z = bw * az + bz * aw + bx * ay - by * ax;
			this .w = bw * aw - bx * ax - by * ay - bz * az;

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
		multVecQuat: function (vector)
		{
			var
				qx = this .x, qy = this .y, qz = this .z, qw = this .w,
				vx = vector .x, vy = vector .y, vz = vector .z,
				a  = qw * qw - qx * qx - qy * qy - qz * qz,                   
				b  = 2 * (vx * qx + vy * qy + vz * qz), 
				c  = 2 * qw;                                       

			vector .x = a * vx + b * qx + c * (qy * vz - qz * vy);
			vector .y = a * vy + b * qy + c * (qz * vx - qx * vz);
			vector .z = a * vz + b * qz + c * (qx * vy - qy * vx);
			
			return vector;
		},
		multQuatVec: function (vector)
		{
			var
				qx = this .x, qy = this .y, qz = this .z, qw = this .w,
				vx = vector .x, vy = vector .y, vz = vector .z,
				a  = qw * qw - qx * qx - qy * qy - qz * qz,                    
				b  = 2 * (vx * qx + vy * qy + vz * qz), 
				c  = 2 * qw;                                       

			vector .x = a * vx + b * qx - c * (qy * vz - qz * vy);
			vector .y = a * vy + b * qy - c * (qz * vx - qx * vz);
			vector .z = a * vz + b * qz - c * (qx * vy - qy * vx);

			return vector;
		},
		normalize: function ()
		{
			var length = Math .sqrt (this .x * this .x +
			                         this .y * this .y +
			                         this .z * this .z +
			                         this .w * this .w);
			
			if (length)
			{
				length = 1 / length;

				this .x *= length;
				this .y *= length;
				this .z *= length;
				this .w *= length;
			}

			return this;
		},
		dot: function (quat)
		{
			return this .x * quat .x +
			       this .y * quat .y +
			       this .z * quat .z +
			       this .w * quat .w;
		},
		norm: function ()
		{
			return this .x * this .x +
			       this .y * this .y +
			       this .z * this .z +
			       this .w * this .w;
		},
		abs: function ()
		{
			return Math .sqrt (this .x * this .x +
			                   this .y * this .y +
			                   this .z * this .z +
			                   this .w * this .w);
		},
		pow: function (exponent)
		{
			if (exponent instanceof Quaternion)
				return this .assign (e .assign (exponent) .multRight (this .log ()) .exp ());

			if (this .isReal ())
				return this .set (0, 0, 0, Math .pow (this .w, exponent));

			var
				l     = this .abs (),
				theta = Math .acos (this .w / l),
				li    = this .imag .abs (),
				ltoe  = Math .pow (l, exponent),
				et    = exponent * theta,
				scale = ltoe / li * Math .sin (et);

			this .x *= scale;
			this .y *= scale;
			this .z *= scale;
			this .w  = ltoe * Math .cos (et);
			return this;
		},
		log: function ()
		{
			if (this .isReal ())
			{
				if (this .w > 0)
					return this .set (0, 0, 0, Math .log (this .w));

				else
					return this .set (Math .PI, 0, 0, Math .log (-this .w));
			}

			var
				l = this .abs (),
				v = this .imag .normalize () .multiply (Math .acos (this .w / l)),
				w = Math .log (l);

			this .x = v .x;
			this .y = v .y;
			this .z = v .z;
			this .w = w;
			return this;
		},
		exp: function ()
		{	
			if (this .isReal ())
				return this .set (0, 0, 0, Math .exp (this .w));

			var
				i  = this .imag,
				li = i .abs (),
				ew = Math .exp (this .w),
				w  = ew * Math .cos (li),
				v  = i .multiply (ew * Math .sin (li) / li);

			this .x = v .x;
			this .y = v .y;
			this .z = v .z;
			this .w = w;
			return this;
		},
		slerp: function (dest, t)
		{
			return Algorithm .slerp (this, t1 .assign (dest), t);
		},
		squad: function (a, b, destination, t)
		{
			// We must use shortest path slerp to prevent flipping.  Also see spline.

			return Algorithm .slerp (Algorithm .slerp (this, t1 .assign (destination), t),
                                  Algorithm .slerp (t2 .assign (a), t3 .assign (b), t),
                                  2 * t * (1 - t));
		},
		toString: function ()
		{
			return this .x + " " +
			       this .y + " " +
			       this .z + " " +
			       this .w;
		},
	};

module.exports = Quaternion

/*
	Object .defineProperty (Quaternion .prototype, "0",
	{
		get: function () { return this .x; },
		set: function (value) { this .x = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Quaternion .prototype, "1",
	{
		get: function () { return this .y; },
		set: function (value) { this .y = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Quaternion .prototype, "2",
	{
		get: function () { return this .z; },
		set: function (value) { this .z = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Quaternion .prototype, "3",
	{
		get: function () { return this .w; },
		set: function (value) { this .w = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Quaternion .prototype, "real",
	{
		get: function () { return this .w; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Quaternion .prototype, "imag",
	{
		get: (function ()
		{
			var result = new Vector3 (0, 0, 0);

			return function ()
			{
				return result .set (this .x,
				                    this .y,
				                    this .z);
			};
		})(),
		enumerable: false,
		configurable: false
	});

	Object .assign (Quaternion,
	{
		negate: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -this .x;
			copy .y = -this .y;
			copy .z = -this .z;
			copy .w = -this .w;
			return copy;
		},
		inverse: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -vector .x;
			copy .y = -vector .y;
			copy .z = -vector .z;
			copy .w =  vector .w;
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
		multLeft: function (lhs, rhs)
		{
			var
				copy = Object .create (this .prototype),
				ax = lhs .x, ay = lhs .y, az = lhs .z, aw = lhs .w,
				bx = rhs .x, by = rhs .y, bz = rhs .z, bw = rhs .w;

			copy .x = aw * bx + ax * bw + ay * bz - az * by;
			copy .y = aw * by + ay * bw + az * bx - ax * bz;
			copy .z = aw * bz + az * bw + ax * by - ay * bx;
			copy .w = aw * bw - ax * bx - ay * by - az * bz;

			return copy;
		},
		multRight: function (lhs, rhs)
		{
			var
				copy = Object .create (this .prototype),
				ax = lhs .x, ay = lhs .y, az = lhs .z, aw = lhs .w,
				bx = rhs .x, by = rhs .y, bz = rhs .z, bw = rhs .w;

			copy .x = bw * ax + bx * aw + by * az - bz * ay;
			copy .y = bw * ay + by * aw + bz * ax - bx * az;
			copy .z = bw * az + bz * aw + bx * ay - by * ax;
			copy .w = bw * aw - bx * ax - by * ay - bz * az;

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
		normalize: function (quat)
		{
			var
				copy   = Object .create (this .prototype),
				x      = quat .x,
				y      = quat .y,
				z      = quat .z,
				w      = quat .w,
				length = Math .sqrt (x * x + y * y + z * z + w * w);

			if (length)
			{
				length = 1 / length;

				copy .x = x * length;
				copy .y = y * length;
				copy .z = z * length;
				copy .w = w * length;
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
		slerp: function (source, dest, t)
		{
			return Algorithm .slerp (source .copy (), t2 .assign (dest), t);
		},
		squad: function (source, a, b, destination, t)
		{
			// We must use shortest path slerp to prevent flipping.  Also see spline.

			return Algorithm .slerp (Algorithm .slerp (source .copy (), t1 .assign (destination), t),
                                  Algorithm .slerp (t2 .assign (a), t3 .assign (b), t),
                                  2 * t * (1 - t));
		},
		bezier: function (q0, a, b, q1, t)
		{
			var q11 = Algorithm .slerp (q0,  a, t);
			var q12 = Algorithm .slerp ( a,  b, t);
			var q13 = Algorithm .slerp ( b, q1, t);

			return Algorithm .slerp (Algorithm .slerp (q11, q12, t), Algorithm .slerp (q12, q13, t), t);
		},
		spline: function (Q0, Q1, Q2)
		{
			q0 .assign (Q0);
			q1 .assign (Q1);
			q2 .assign (Q2);

			// If the dot product is smaller than 0 we must negate the quaternion to prevent flipping. If we negate all
			// the terms we get a different quaternion but it represents the same rotation.

			if (q0 .dot (q1) < 0)
				q0 .negate ();

			if (q2 .dot (q1) < 0)
				q2 .negate ();

			q1_i .assign (q1) .inverse ();

			// The result must be normalized as it will be used in slerp and we can only slerp normalized vectors.

			return q1 .multRight (
				t1 .assign (q1_i) .multRight (q0) .log () .add (t2 .assign (q1_i) .multRight (q2) .log ()) .divide (-4) .exp ()
			)
			.normalize () .copy ();
		},
	});

	var
		t1 = new Quaternion (0, 0, 0, 1),
		t2 = new Quaternion (0, 0, 0, 1),
		t3 = new Quaternion (0, 0, 0, 1);
	
	var
		q0   = new Quaternion (0, 0, 0, 1),
		q1   = new Quaternion (0, 0, 0, 1),
		q2   = new Quaternion (0, 0, 0, 1),
		q1_i = new Quaternion (0, 0, 0, 1);

	return Quaternion;
});
*/
