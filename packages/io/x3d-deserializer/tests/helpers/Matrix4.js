const Vector3 = require('./Vector3')
const Rotation4 = require('./Rotation4')
const Matrix3 = require('./Matrix3')



function Matrix4 ()
	{
		if (arguments .length)
		{
			this [ 0] = arguments [ 0];
			this [ 1] = arguments [ 1];
			this [ 2] = arguments [ 2];
			this [ 3] = arguments [ 3];
			this [ 4] = arguments [ 4];
			this [ 5] = arguments [ 5];
			this [ 6] = arguments [ 6];
			this [ 7] = arguments [ 7];
			this [ 8] = arguments [ 8];
			this [ 9] = arguments [ 9];
			this [10] = arguments [10];
			this [11] = arguments [11];
			this [12] = arguments [12];
			this [13] = arguments [13];
			this [14] = arguments [14];
			this [15] = arguments [15];
		}
		else
		{
			this .identity ();
		}
	}

	Matrix4 .prototype =
	{
		constructor: Matrix4,
		order: 4,
		length: 16,
		copy: function ()
		{
			var copy = Object .create (Matrix4 .prototype);
			copy [ 0] = this [ 0];
			copy [ 1] = this [ 1];
			copy [ 2] = this [ 2];
			copy [ 3] = this [ 3];
			copy [ 4] = this [ 4];
			copy [ 5] = this [ 5];
			copy [ 6] = this [ 6];
			copy [ 7] = this [ 7];
			copy [ 8] = this [ 8];
			copy [ 9] = this [ 9];
			copy [10] = this [10];
			copy [11] = this [11];
			copy [12] = this [12];
			copy [13] = this [13];
			copy [14] = this [14];
			copy [15] = this [15];
			return copy;
		},
		assign: function (matrix)
		{
			this [ 0] = matrix [ 0];
			this [ 1] = matrix [ 1];
			this [ 2] = matrix [ 2];
			this [ 3] = matrix [ 3];
			this [ 4] = matrix [ 4];
			this [ 5] = matrix [ 5];
			this [ 6] = matrix [ 6];
			this [ 7] = matrix [ 7];
			this [ 8] = matrix [ 8];
			this [ 9] = matrix [ 9];
			this [10] = matrix [10];
			this [11] = matrix [11];
			this [12] = matrix [12];
			this [13] = matrix [13];
			this [14] = matrix [14];
			this [15] = matrix [15];
			return this;
		},
		equals: function (matrix)
		{
			return this [ 0] === matrix [ 0] &&
			       this [ 1] === matrix [ 1] &&
			       this [ 2] === matrix [ 2] &&
			       this [ 3] === matrix [ 3] &&
			       this [ 4] === matrix [ 4] &&
			       this [ 5] === matrix [ 5] &&
			       this [ 6] === matrix [ 6] &&
			       this [ 7] === matrix [ 7] &&
			       this [ 8] === matrix [ 8] &&
			       this [ 9] === matrix [ 9] &&
			       this [10] === matrix [10] &&
			       this [11] === matrix [11] &&
			       this [12] === matrix [12] &&
			       this [13] === matrix [13] &&
			       this [14] === matrix [14] &&
			       this [15] === matrix [15];
		},
		set1: function (r, c, value)
		{
			this [r * this .order + c] = value;

			return this;
		},
		get1: function (r, c)
		{
			return this [r * this .order + c];
		},
		set: function (translation, rotation, scale, scaleOrientation, center)
		{
//console.log('Matrix4.set')
translation = new Vector3(translation[0], translation[1], translation[2])
rotation = new Rotation4(rotation[0], rotation[1], rotation[2], rotation[3])
scale = new Vector3(scale[0], scale[1], scale[2])
scaleOrientation = new Rotation4(scaleOrientation[0], scaleOrientation[1], scaleOrientation[2], scaleOrientation[3])
center = new Vector3(center[0], center[1], center[2])

			switch (arguments .length)
			{
				case 0:
				{
					this .identity ();
					break;
				}
				case 1:
				{
					if (translation === null) translation = Vector3 .Zero;

					this .identity ();
					this .translate (translation);
					break;
				}
				case 2:
				{
					if (translation === null) translation = Vector3 .Zero;
					if (rotation    === null) rotation    = Rotation4 .Identity;

					this .identity ();
					this .translate (translation);

					if (! rotation .equals (Rotation4 .Identity))
						this .rotate (rotation);

					break;
				}
				case 3:
				{
					if (translation === null) translation = Vector3 .Zero;
					if (rotation    === null) rotation    = Rotation4 .Identity;
					if (scale       === null) scale       = Vector3 .One;

					this .identity ();
					this .translate (translation);

					if (! rotation .equals (Rotation4 .Identity))
						this .rotate (rotation);

					if (! scale .equals (Vector3 .One))
						this .scale  (scale);

					break;
				}
				case 4:
				{
					if (translation      === null) translation      = Vector3 .Zero;
					if (rotation         === null) rotation         = Rotation4 .Identity;
					if (scale            === null) scale            = Vector3 .One;
					if (scaleOrientation === null) scaleOrientation = Rotation4 .Identity;

					this .identity ();
					this .translate (translation);

					if (! rotation .equals (Rotation4 .Identity))
						this .rotate (rotation);

					if (! scale .equals (Vector3 .One))
					{
						var hasScaleOrientation = ! scaleOrientation .equals (Rotation4 .Identity);

						if (hasScaleOrientation)
						{
							this .rotate (scaleOrientation);
							this .scale (scale);
							this .rotate (Rotation4 .inverse (scaleOrientation));
						}
						else
							this .scale (scale);
					}

					break;
				}
				case 5:
				{
					if (translation      === null) translation      = Vector3 .Zero;
					if (rotation         === null) rotation         = Rotation4 .Identity;
					if (scale            === null) scale            = Vector3 .One;
					if (scaleOrientation === null) scaleOrientation = Rotation4 .Identity;
					if (center           === null) center           = Vector3 .Zero;

					// P' = T * C * R * SR * S * -SR * -C * P
					this .identity ();
					this .translate (translation);

					var hasCenter = ! center .equals (Vector3 .Zero);

					if (hasCenter)
						this .translate (center);

					if (! rotation .equals (Rotation4 .Identity))
						this .rotate (rotation);

					if (! scale .equals (Vector3 .One))
					{
						if (! scaleOrientation .equals (Rotation4 .Identity))
						{
							this .rotate (scaleOrientation);
							this .scale (scale);
							this .rotate (Rotation4 .inverse (scaleOrientation));
						}
						else
							this .scale (scale);
					}

					if (hasCenter)
						this .translate (Vector3 .negate (center));

					break;
				}
				case 16:
				{
					this [ 0] = arguments [ 0];
					this [ 1] = arguments [ 1];
					this [ 2] = arguments [ 2];
					this [ 3] = arguments [ 3];
					this [ 4] = arguments [ 4];
					this [ 5] = arguments [ 5];
					this [ 6] = arguments [ 6];
					this [ 7] = arguments [ 7];
					this [ 8] = arguments [ 8];
					this [ 9] = arguments [ 9];
					this [10] = arguments [10];
					this [11] = arguments [11];
					this [12] = arguments [12];
					this [13] = arguments [13];
					this [14] = arguments [14];
					this [15] = arguments [15];
					break;
				}
			}

			return this;
		},
		get: (function ()
		{
			var
				dummyTranslation      = new Vector3 (0, 0, 0),
				dummyRotation         = new Rotation4 (),
				dummyScale            = new Vector3 (0, 0, 0),
				dummyScaleOrientation = new Rotation4 (),
				dummyCenter           = new Vector3 (0, 0, 0),
				rot                   = new Matrix3 (),
				so                    = new Matrix3 (),
				c                     = new Vector3 (0, 0, 0);

			return function (translation, rotation, scale, scaleOrientation, center)
			{
				if (translation      === null) translation      = dummyTranslation;
				if (rotation         === null) rotation         = dummyRotation;
				if (scale            === null) scale            = dummyScale;
				if (scaleOrientation === null) scaleOrientation = dummyScaleOrientation;
				if (center           === null) center           = dummyCenter;

				switch (arguments .length)
				{
					case 1:
					{
						translation .set (this [12], this [13], this [14]);
						break;
					}
					case 2:
					{
						this .factor (translation, rot, dummyScale, so);
						rotation .setMatrix (rot);
						break;
					}
					case 3:
					{
						this .factor (translation, rot, scale, so);
						rotation .setMatrix (rot);
						break;
					}
					case 4:
					{
						this .factor (translation, rot, scale, so);
						rotation         .setMatrix (rot);
						scaleOrientation .setMatrix (so);
						break;
					}
					case 5:
					{
						var m = new Matrix4 ();

						m .set (c .assign (center) .negate ());
						m .multLeft (this);
						m .translate (center);

						m .get (translation, rotation, scale, scaleOrientation);
						break;
					}
				}
			};
		})(),
		setRotation: function (rotation)
		{
			return this .setQuaternion (rotation .value);
		},
		setQuaternion: function (quaternion)
		{
//console.log('setQuaternion',quaternion)
			var
				x = quaternion .x,
				y = quaternion .y,
				z = quaternion .z,
				w = quaternion .w,
				A = y * y,
				B = z * z,
				C = x * y,
				D = z * w,
				E = z * x,
				F = y * w,
				G = x * x,
				H = y * z,
				I = x * w;

			this [0]  = 1 - 2 * (A + B);
			this [1]  = 2 * (C + D);
			this [2]  = 2 * (E - F);
			this [3]  = 0;
			this [4]  = 2 * (C - D);
			this [5]  = 1 - 2 * (B + G);
			this [6]  = 2 * (H + I);
			this [7]  = 0;
			this [8]  = 2 * (E + F);
			this [9]  = 2 * (H - I);
			this [10] = 1 - 2 * (A + G);
			this [11] = 0;
			this [12] = 0;
			this [13] = 0;
			this [14] = 0;
			this [15] = 1;
//console.log('this',this)

			return this;
		},
		factor: (function ()
		{
			var
				si   = new Matrix3 (),
				sosi = new Matrix3 (),
				b    = new Matrix3 ();

			var eigen = { values: [ ], vectors: [[ ], [ ], [ ]] };

			return function (translation, rotation, scale, scaleOrientation)
			{
				// (1) Get translation.
				translation .set (this [12], this [13], this [14]);

				// (2) Create 3x3 matrix.
				var a = this .submatrix;

				// (3) Compute det A. If negative, set sign = -1, else sign = 1
				var det      = a .determinant ();
				var det_sign = det < 0 ? -1 : 1;

				if (det === 0)
					throw new Error ("Matrix4 .factor: determinant is 0.");

				// (4) B = A * !A  (here !A means A transpose)
				b .assign (a) .transpose () .multLeft (a);
				var e = eigendecomposition (b, eigen);

				// Find min / max eigenvalues and do ratio test to determine singularity.

				scaleOrientation .set (e .vectors [0] [0], e .vectors [0] [1], e .vectors [0] [2],
				                       e .vectors [1] [0], e .vectors [1] [1], e .vectors [1] [2],
				                       e .vectors [2] [0], e .vectors [2] [1], e .vectors [2] [2]);

				// Compute s = sqrt(evalues), with sign. Set si = s-inverse

				scale .x = det_sign * Math .sqrt (e .values [0]);
				scale .y = det_sign * Math .sqrt (e .values [1]);
				scale .z = det_sign * Math .sqrt (e .values [2]);

				si [0] = 1 / scale .x;
				si [4] = 1 / scale .y;
				si [8] = 1 / scale .z;

				// (5) Compute U = !R ~S R A.
				rotation .assign (sosi .assign (scaleOrientation) .multRight (si) .transpose () .multLeft (scaleOrientation) .multRight (a));

				scaleOrientation .transpose ();
				return true;
			};
		})(),
		determinant3: function ()
		{
			var
				m00 = this [0], m01 = this [1], m02 = this [ 2],
				m04 = this [4], m05 = this [5], m06 = this [ 6],
				m08 = this [8], m09 = this [9], m10 = this [10];

			return m00 * (m05 * m10 - m06 * m09) -
			       m01 * (m04 * m10 - m06 * m08) +
			       m02 * (m04 * m09 - m05 * m08);
		},
		determinant: function ()
		{
			var
				m00 = this [ 0],
				m01 = this [ 1],
				m02 = this [ 2],
				m03 = this [ 3],
				m04 = this [ 4],
				m05 = this [ 5],
				m06 = this [ 6],
				m07 = this [ 7],
				m08 = this [ 8],
				m09 = this [ 9],
				m10 = this [10],
				m11 = this [11],
				m12 = this [12],
				m13 = this [13],
				m14 = this [14],
				m15 = this [15],
				b = m10 * m15,
				c = m14 * m11,
				d = m06 * m15,
				e = m14 * m07,
				f = m06 * m11,
				g = m10 * m07,
				h = m02 * m15,
				i = m14 * m03,
				j = m02 * m11,
				o = m10 * m03,
				r = m02 * m07,
				x = m06 * m03,
				H = b * m05 + e * m09 + f * m13 - (c * m05) - (d * m09) - (g * m13),
				I = c * m01 + h * m09 + o * m13 - (b * m01) - (i * m09) - (j * m13),
				J = d * m01 + i * m05 + r * m13 - (e * m01) - (h * m05) - (x * m13),
				K = g * m01 + j * m05 + x * m09 - (f * m01) - (o * m05) - (r * m09);

			return m00 * H + m04 * I + m08 * J + m12 * K;
		},
		transpose: function ()
		{
			var tmp;

			tmp = this [ 1]; this [ 1] = this [ 4]; this [ 4] = tmp;
			tmp = this [ 2]; this [ 2] = this [ 8]; this [ 8] = tmp;
			tmp = this [ 3]; this [ 3] = this [12]; this [12] = tmp;
			tmp = this [ 6]; this [ 6] = this [ 9]; this [ 9] = tmp;
			tmp = this [ 7]; this [ 7] = this [13]; this [13] = tmp;
			tmp = this [11]; this [11] = this [14]; this [14] = tmp;

			return this;
		},
		inverse: function ()
		{
			var
				m00 = this [ 0],
				m01 = this [ 1],
				m02 = this [ 2],
				m03 = this [ 3],
				m04 = this [ 4],
				m05 = this [ 5],
				m06 = this [ 6],
				m07 = this [ 7],
				m08 = this [ 8],
				m09 = this [ 9],
				m10 = this [10],
				m11 = this [11],
				m12 = this [12],
				m13 = this [13],
				m14 = this [14],
				m15 = this [15],
				b = m10 * m15,
				c = m14 * m11,
				d = m06 * m15,
				e = m14 * m07,
				f = m06 * m11,
				g = m10 * m07,
				h = m02 * m15,
				i = m14 * m03,
				j = m02 * m11,
				o = m10 * m03,
				r = m02 * m07,
				x = m06 * m03,
				t = m08 * m13,
				p = m12 * m09,
				v = m04 * m13,
				s = m12 * m05,
				y = m04 * m09,
				z = m08 * m05,
				A = m00 * m13,
				C = m12 * m01,
				D = m00 * m09,
				E = m08 * m01,
				F = m00 * m05,
				G = m04 * m01,
				H = b * m05 + e * m09 + f * m13 - ((c * m05) + (d * m09) + (g * m13)),
				I = c * m01 + h * m09 + o * m13 - ((b * m01) + (i * m09) + (j * m13)),
				J = d * m01 + i * m05 + r * m13 - ((e * m01) + (h * m05) + (x * m13)),
				K = g * m01 + j * m05 + x * m09 - ((f * m01) + (o * m05) + (r * m09)),
				B = m00 * H + m04 * I + m08 * J + m12 * K;

			if (B === 0)
				throw new Error ("Matrix4 .inverse: determinant is 0.");

			B = 1 / B;

			this [ 0] = B * H;
			this [ 1] = B * I;
			this [ 2] = B * J;
			this [ 3] = B * K;
			this [ 4] = B * (c * m04 + d * m08 + g * m12 - (b * m04) - (e * m08) - (f * m12));
			this [ 5] = B * (b * m00 + i * m08 + j * m12 - (c * m00) - (h * m08) - (o * m12));
			this [ 6] = B * (e * m00 + h * m04 + x * m12 - (d * m00) - (i * m04) - (r * m12));
			this [ 7] = B * (f * m00 + o * m04 + r * m08 - (g * m00) - (j * m04) - (x * m08));
			this [ 8] = B * (t * m07 + s * m11 + y * m15 - (p * m07) - (v * m11) - (z * m15));
			this [ 9] = B * (p * m03 + A * m11 + E * m15 - (t * m03) - (C * m11) - (D * m15));
			this [10] = B * (v * m03 + C * m07 + F * m15 - (s * m03) - (A * m07) - (G * m15));
			this [11] = B * (z * m03 + D * m07 + G * m11 - (y * m03) - (E * m07) - (F * m11));
			this [12] = B * (v * m10 + z * m14 + p * m06 - (y * m14) - (t * m06) - (s * m10));
			this [13] = B * (D * m14 + t * m02 + C * m10 - (A * m10) - (E * m14) - (p * m02));
			this [14] = B * (A * m06 + G * m14 + s * m02 - (F * m14) - (v * m02) - (C * m06));
			this [15] = B * (F * m10 + y * m02 + E * m06 - (D * m06) - (G * m10) - (z * m02));

			return this;
		},
		multLeft: function (matrix)
		{
			var
				a00 = this [ 0], a01 = this [ 1], a02 = this [ 2], a03 = this [ 3],
				a04 = this [ 4], a05 = this [ 5], a06 = this [ 6], a07 = this [ 7],
				a08 = this [ 8], a09 = this [ 9], a10 = this [10], a11 = this [11],
				a12 = this [12], a13 = this [13], a14 = this [14], a15 = this [15],
				b00 = matrix [ 0], b01 = matrix [ 1], b02 = matrix [ 2], b03 = matrix [ 3],
				b04 = matrix [ 4], b05 = matrix [ 5], b06 = matrix [ 6], b07 = matrix [ 7],
				b08 = matrix [ 8], b09 = matrix [ 9], b10 = matrix [10], b11 = matrix [11],
				b12 = matrix [12], b13 = matrix [13], b14 = matrix [14], b15 = matrix [15];

			this [ 0] = a00 * b00 + a04 * b01 + a08 * b02 + a12 * b03;
			this [ 1] = a01 * b00 + a05 * b01 + a09 * b02 + a13 * b03;
			this [ 2] = a02 * b00 + a06 * b01 + a10 * b02 + a14 * b03;
			this [ 3] = a03 * b00 + a07 * b01 + a11 * b02 + a15 * b03;
			this [ 4] = a00 * b04 + a04 * b05 + a08 * b06 + a12 * b07;
			this [ 5] = a01 * b04 + a05 * b05 + a09 * b06 + a13 * b07;
			this [ 6] = a02 * b04 + a06 * b05 + a10 * b06 + a14 * b07;
			this [ 7] = a03 * b04 + a07 * b05 + a11 * b06 + a15 * b07;
			this [ 8] = a00 * b08 + a04 * b09 + a08 * b10 + a12 * b11;
			this [ 9] = a01 * b08 + a05 * b09 + a09 * b10 + a13 * b11;
			this [10] = a02 * b08 + a06 * b09 + a10 * b10 + a14 * b11;
			this [11] = a03 * b08 + a07 * b09 + a11 * b10 + a15 * b11;
			this [12] = a00 * b12 + a04 * b13 + a08 * b14 + a12 * b15;
			this [13] = a01 * b12 + a05 * b13 + a09 * b14 + a13 * b15;
			this [14] = a02 * b12 + a06 * b13 + a10 * b14 + a14 * b15;
			this [15] = a03 * b12 + a07 * b13 + a11 * b14 + a15 * b15;

			return this;
		},
		multRight: function (matrix)
		{
			var
				a00 = this [ 0], a01 = this [ 1], a02 = this [ 2], a03 = this [ 3],
				a04 = this [ 4], a05 = this [ 5], a06 = this [ 6], a07 = this [ 7],
				a08 = this [ 8], a09 = this [ 9], a10 = this [10], a11 = this [11],
				a12 = this [12], a13 = this [13], a14 = this [14], a15 = this [15],
				b00 = matrix [ 0], b01 = matrix [ 1], b02 = matrix [ 2], b03 = matrix [ 3],
				b04 = matrix [ 4], b05 = matrix [ 5], b06 = matrix [ 6], b07 = matrix [ 7],
				b08 = matrix [ 8], b09 = matrix [ 9], b10 = matrix [10], b11 = matrix [11],
				b12 = matrix [12], b13 = matrix [13], b14 = matrix [14], b15 = matrix [15];

			this [ 0] = a00 * b00 + a01 * b04 + a02 * b08 + a03 * b12;
			this [ 1] = a00 * b01 + a01 * b05 + a02 * b09 + a03 * b13;
			this [ 2] = a00 * b02 + a01 * b06 + a02 * b10 + a03 * b14;
			this [ 3] = a00 * b03 + a01 * b07 + a02 * b11 + a03 * b15;
			this [ 4] = a04 * b00 + a05 * b04 + a06 * b08 + a07 * b12;
			this [ 5] = a04 * b01 + a05 * b05 + a06 * b09 + a07 * b13;
			this [ 6] = a04 * b02 + a05 * b06 + a06 * b10 + a07 * b14;
			this [ 7] = a04 * b03 + a05 * b07 + a06 * b11 + a07 * b15;
			this [ 8] = a08 * b00 + a09 * b04 + a10 * b08 + a11 * b12;
			this [ 9] = a08 * b01 + a09 * b05 + a10 * b09 + a11 * b13;
			this [10] = a08 * b02 + a09 * b06 + a10 * b10 + a11 * b14;
			this [11] = a08 * b03 + a09 * b07 + a10 * b11 + a11 * b15;
			this [12] = a12 * b00 + a13 * b04 + a14 * b08 + a15 * b12;
			this [13] = a12 * b01 + a13 * b05 + a14 * b09 + a15 * b13;
			this [14] = a12 * b02 + a13 * b06 + a14 * b10 + a15 * b14;
			this [15] = a12 * b03 + a13 * b07 + a14 * b11 + a15 * b15;

			return this;
		},
		multVecMatrix: function (vector)
		{
			if (vector .length === 3)
			{
				var
					x = vector .x,
					y = vector .y,
					z = vector .z,
					w = 1 / (x * this [3] + y * this [7] + z * this [11] + this [15]);

				vector .x = (x * this [0] + y * this [4] + z * this [ 8] + this [12]) * w;
				vector .y = (x * this [1] + y * this [5] + z * this [ 9] + this [13]) * w;
				vector .z = (x * this [2] + y * this [6] + z * this [10] + this [14]) * w;

				return vector;
			}

			var
				x = vector .x,
				y = vector .y,
				z = vector .z,
				w = vector .w;

			vector .x = x * this [0] + y * this [4] + z * this [ 8] + w * this [12];
			vector .y = x * this [1] + y * this [5] + z * this [ 9] + w * this [13];
			vector .z = x * this [2] + y * this [6] + z * this [10] + w * this [14];
			vector .w = x * this [3] + y * this [7] + z * this [11] + w * this [15];

			return vector;
		},
		multMatrixVec: function (vector)
		{
			if (vector .length === 3)
			{
				var
					x = vector .x,
					y = vector .y,
					z = vector .z,
					w = 1 / (x * this [12] + y * this [13] + z * this [14] + this [15]);

				vector .x = (x * this [0] + y * this [1] + z * this [ 2] + this [ 3]) * w;
				vector .y = (x * this [4] + y * this [5] + z * this [ 6] + this [ 7]) * w;
				vector .z = (x * this [8] + y * this [9] + z * this [10] + this [11]) * w;

				return vector;
			}

			var
				x = vector .x,
				y = vector .y,
				z = vector .z,
				w = vector .w;

			vector .x = x * this [ 0] + y * this [ 1] + z * this [ 2] + w * this [ 3];
			vector .y = x * this [ 4] + y * this [ 5] + z * this [ 6] + w * this [ 7];
			vector .z = x * this [ 8] + y * this [ 9] + z * this [10] + w * this [11];
			vector .w = x * this [12] + y * this [13] + z * this [14] + w * this [15];

			return vector;
		},
		multDirMatrix: function (vector)
		{
			var
				x = vector .x,
				y = vector .y,
				z = vector .z;

			vector .x = x * this [0] + y * this [4] + z * this [ 8];
			vector .y = x * this [1] + y * this [5] + z * this [ 9];
			vector .z = x * this [2] + y * this [6] + z * this [10];

			return vector;
		},
		multMatrixDir: function (vector)
		{
			var
				x = vector .x,
				y = vector .y,
				z = vector .z;

			vector .x = x * this [0] + y * this [1] + z * this [ 2];
			vector .y = x * this [4] + y * this [5] + z * this [ 6];
			vector .z = x * this [8] + y * this [9] + z * this [10];

			return vector;
		},
		identity: function ()
		{
			this [ 0] = 1; this [ 1] = 0; this [ 2] = 0; this [ 3] = 0;
			this [ 4] = 0; this [ 5] = 1; this [ 6] = 0; this [ 7] = 0;
			this [ 8] = 0; this [ 9] = 0; this [10] = 1; this [11] = 0;
			this [12] = 0; this [13] = 0; this [14] = 0; this [15] = 1;
		},
		translate: function (translation)
		{
			var
				x = translation .x,
				y = translation .y,
				z = translation .z;

			this [12] += this [ 0] * x + this [ 4] * y + this [ 8] * z;
			this [13] += this [ 1] * x + this [ 5] * y + this [ 9] * z;
			this [14] += this [ 2] * x + this [ 6] * y + this [10] * z;

			return this;
		},
		rotate: function (rotation)
		{
			this .multLeft (rotateMatrix .setQuaternion (rotation .value));

			return this;
		},
		scale: function (scale)
		{
			var
				x = scale .x,
				y = scale .y,
				z = scale .z;

			this [ 0] *= x;
			this [ 4] *= y;
			this [ 8] *= z;

			this [ 1] *= x;
			this [ 5] *= y;
			this [ 9] *= z;

			this [ 2] *= x;
			this [ 6] *= y;
			this [10] *= z;

			return this;
		},
		getDepth: function (vector)
		{
			var
				x = vector .x,
				y = vector .y,
				z = vector .z,
				w = 1 / (x * this [3] + y * this [7] + z * this [11] + this [15]);

			return (x * this [2] + y * this [6] + z * this [10] + this [14]) * w;
		},
		toString: function ()
		{
			return this [ 0] + " " + this [ 1] + " " + this [ 2] + " " + this [ 3] + " " +
			       this [ 4] + " " + this [ 5] + " " + this [ 6] + " " + this [ 7] + " " +
			       this [ 8] + " " + this [ 9] + " " + this [10] + " " + this [11] + " " +
			       this [12] + " " + this [13] + " " + this [14] + " " + this [15]
		},
	};

        var rotateMatrix = new Matrix4 ();


module.exports = Matrix4

/*
	Object .defineProperty (Matrix4 .prototype, "x",
	{
		get: (function ()
		{
			var vector = new Vector4 (0, 0, 0, 0);

			return function () { return vector .set (this [0], this [1], this [2], this [3]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix4 .prototype, "y",
	{
		get: (function ()
		{
			var vector = new Vector4 (0, 0, 0, 0);

			return function () { return vector .set (this [4], this [5], this [6], this [7]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix4 .prototype, "z",
	{
		get: (function ()
		{
			var vector = new Vector4 (0, 0, 0, 0);

			return function () { return vector .set (this [8], this [9], this [10], this [11]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix4 .prototype, "xAxis",
	{
		get: (function ()
		{
			var vector = new Vector3 (0, 0, 0);

			return function () { return vector .set (this [0], this [1], this [2]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix4 .prototype, "yAxis",
	{
		get: (function ()
		{
			var vector = new Vector3 (0, 0, 0);

			return function () { return vector .set (this [4], this [5], this [6]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix4 .prototype, "zAxis",
	{
		get: (function ()
		{
			var vector = new Vector3 (0, 0, 0);

			return function () { return vector .set (this [8], this [9], this [10]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix4 .prototype, "origin",
	{
		get: (function ()
		{
			var vector = new Vector3 (0, 0, 0);

			return function () { return vector .set (this [12], this [13], this [14]); };
		})(),
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix4 .prototype, "submatrix",
	{
		get: (function ()
		{
			var matrix = new Matrix3 ();

			return function ()
			{
				matrix [0] = this [0]; matrix [1] = this [1]; matrix [2] = this [ 2];
				matrix [3] = this [4]; matrix [4] = this [5]; matrix [5] = this [ 6];
				matrix [6] = this [8]; matrix [7] = this [9]; matrix [8] = this [10];
				return matrix;
			};
		})(),
		enumerable: false,
		configurable: false
	});

	Object .assign (Matrix4,
	{
		Identity: new Matrix4 (),
		Rotation: function (rotation)
		{
			return Object .create (this .prototype) .setQuaternion (rotation .value);
		},
		Quaternion: function (quaternion)
		{
			return Object .create (this .prototype) .setQuaternion (quaternion);
		},
		Matrix3: function (matrix)
		{
			return new Matrix4 (matrix [0], matrix [1], matrix [2], 0,
			                    matrix [3], matrix [4], matrix [5], 0,
			                    matrix [6], matrix [7], matrix [8], 0,
			                    0, 0, 0, 1);
		},
		transpose: function (matrix)
		{
			var copy = Object .create (this .prototype);
			copy [ 0] = matrix [ 0]; copy [ 1] = matrix [ 4]; copy [ 2] = matrix [ 8]; copy [ 3] = matrix [12];
			copy [ 4] = matrix [ 1]; copy [ 5] = matrix [ 5]; copy [ 6] = matrix [ 9]; copy [ 7] = matrix [13];
			copy [ 8] = matrix [ 2]; copy [ 9] = matrix [ 6]; copy [10] = matrix [10]; copy [11] = matrix [14];
			copy [12] = matrix [ 3]; copy [13] = matrix [ 7]; copy [14] = matrix [11]; copy [15] = matrix [15];
			return copy;
		},
		inverse: function (matrix)
		{
			var
				copy = Object .create (this .prototype),
				m00 = matrix [ 0],
				m01 = matrix [ 1],
				m02 = matrix [ 2],
				m03 = matrix [ 3],
				m04 = matrix [ 4],
				m05 = matrix [ 5],
				m06 = matrix [ 6],
				m07 = matrix [ 7],
				m08 = matrix [ 8],
				m09 = matrix [ 9],
				m10 = matrix [10],
				m11 = matrix [11],
				m12 = matrix [12],
				m13 = matrix [13],
				m14 = matrix [14],
				m15 = matrix [15],
				b = m10 * m15,
				c = m14 * m11,
				d = m06 * m15,
				e = m14 * m07,
				f = m06 * m11,
				g = m10 * m07,
				h = m02 * m15,
				i = m14 * m03,
				j = m02 * m11,
				o = m10 * m03,
				r = m02 * m07,
				x = m06 * m03,
				t = m08 * m13,
				p = m12 * m09,
				v = m04 * m13,
				s = m12 * m05,
				y = m04 * m09,
				z = m08 * m05,
				A = m00 * m13,
				C = m12 * m01,
				D = m00 * m09,
				E = m08 * m01,
				F = m00 * m05,
				G = m04 * m01,
				H = b * m05 + e * m09 + f * m13 - ((c * m05) + (d * m09) + (g * m13)),
				I = c * m01 + h * m09 + o * m13 - ((b * m01) + (i * m09) + (j * m13)),
				J = d * m01 + i * m05 + r * m13 - ((e * m01) + (h * m05) + (x * m13)),
				K = g * m01 + j * m05 + x * m09 - ((f * m01) + (o * m05) + (r * m09)),
				B = m00 * H + m04 * I + m08 * J + m12 * K;

			if (B == 0)
				throw new Error ("Matrix4 .inverse: determinant is 0.");

			B = 1 / B;

			copy [ 0] = B * H;
			copy [ 1] = B * I;
			copy [ 2] = B * J;
			copy [ 3] = B * K;
			copy [ 4] = B * (c * m04 + d * m08 + g * m12 - (b * m04) - (e * m08) - (f * m12));
			copy [ 5] = B * (b * m00 + i * m08 + j * m12 - (c * m00) - (h * m08) - (o * m12));
			copy [ 6] = B * (e * m00 + h * m04 + x * m12 - (d * m00) - (i * m04) - (r * m12));
			copy [ 7] = B * (f * m00 + o * m04 + r * m08 - (g * m00) - (j * m04) - (x * m08));
			copy [ 8] = B * (t * m07 + s * m11 + y * m15 - (p * m07) - (v * m11) - (z * m15));
			copy [ 9] = B * (p * m03 + A * m11 + E * m15 - (t * m03) - (C * m11) - (D * m15));
			copy [10] = B * (v * m03 + C * m07 + F * m15 - (s * m03) - (A * m07) - (G * m15));
			copy [11] = B * (z * m03 + D * m07 + G * m11 - (y * m03) - (E * m07) - (F * m11));
			copy [12] = B * (v * m10 + z * m14 + p * m06 - (y * m14) - (t * m06) - (s * m10));
			copy [13] = B * (D * m14 + t * m02 + C * m10 - (A * m10) - (E * m14) - (p * m02));
			copy [14] = B * (A * m06 + G * m14 + s * m02 - (F * m14) - (v * m02) - (C * m06));
			copy [15] = B * (F * m10 + y * m02 + E * m06 - (D * m06) - (G * m10) - (z * m02));

			return copy;
		},
		multLeft: function (lhs, rhs)
		{
			var
				copy = Object .create (this .prototype),
				a00 = lhs [ 0], a01 = lhs [ 1], a02 = lhs [ 2], a03 = lhs [ 3],
				a04 = lhs [ 4], a05 = lhs [ 5], a06 = lhs [ 6], a07 = lhs [ 7],
				a08 = lhs [ 8], a09 = lhs [ 9], a10 = lhs [10], a11 = lhs [11],
				a12 = lhs [12], a13 = lhs [13], a14 = lhs [14], a15 = lhs [15],
				b00 = rhs [ 0], b01 = rhs [ 1], b02 = rhs [ 2], b03 = rhs [ 3],
				b04 = rhs [ 4], b05 = rhs [ 5], b06 = rhs [ 6], b07 = rhs [ 7],
				b08 = rhs [ 8], b09 = rhs [ 9], b10 = rhs [10], b11 = rhs [11],
				b12 = rhs [12], b13 = rhs [13], b14 = rhs [14], b15 = rhs [15];

			copy [ 0] = a00 * b00 + a04 * b01 + a08 * b02 + a12 * b03;
			copy [ 1] = a01 * b00 + a05 * b01 + a09 * b02 + a13 * b03;
			copy [ 2] = a02 * b00 + a06 * b01 + a10 * b02 + a14 * b03;
			copy [ 3] = a03 * b00 + a07 * b01 + a11 * b02 + a15 * b03;
			copy [ 4] = a00 * b04 + a04 * b05 + a08 * b06 + a12 * b07;
			copy [ 5] = a01 * b04 + a05 * b05 + a09 * b06 + a13 * b07;
			copy [ 6] = a02 * b04 + a06 * b05 + a10 * b06 + a14 * b07;
			copy [ 7] = a03 * b04 + a07 * b05 + a11 * b06 + a15 * b07;
			copy [ 8] = a00 * b08 + a04 * b09 + a08 * b10 + a12 * b11;
			copy [ 9] = a01 * b08 + a05 * b09 + a09 * b10 + a13 * b11;
			copy [10] = a02 * b08 + a06 * b09 + a10 * b10 + a14 * b11;
			copy [11] = a03 * b08 + a07 * b09 + a11 * b10 + a15 * b11;
			copy [12] = a00 * b12 + a04 * b13 + a08 * b14 + a12 * b15;
			copy [13] = a01 * b12 + a05 * b13 + a09 * b14 + a13 * b15;
			copy [14] = a02 * b12 + a06 * b13 + a10 * b14 + a14 * b15;
			copy [15] = a03 * b12 + a07 * b13 + a11 * b14 + a15 * b15;

			return copy;
		},
		multRight: function (lhs, rhs)
		{
			var
				copy = Object .create (this .prototype),
				a00 = lhs [ 0], a01 = lhs [ 1], a02 = lhs [ 2], a03 = lhs [ 3],
				a04 = lhs [ 4], a05 = lhs [ 5], a06 = lhs [ 6], a07 = lhs [ 7],
				a08 = lhs [ 8], a09 = lhs [ 9], a10 = lhs [10], a11 = lhs [11],
				a12 = lhs [12], a13 = lhs [13], a14 = lhs [14], a15 = lhs [15],
				b00 = rhs [ 0], b01 = rhs [ 1], b02 = rhs [ 2], b03 = rhs [ 3],
				b04 = rhs [ 4], b05 = rhs [ 5], b06 = rhs [ 6], b07 = rhs [ 7],
				b08 = rhs [ 8], b09 = rhs [ 9], b10 = rhs [10], b11 = rhs [11],
				b12 = rhs [12], b13 = rhs [13], b14 = rhs [14], b15 = rhs [15];

			copy [ 0] = a00 * b00 + a01 * b04 + a02 * b08 + a03 * b12;
			copy [ 1] = a00 * b01 + a01 * b05 + a02 * b09 + a03 * b13;
			copy [ 2] = a00 * b02 + a01 * b06 + a02 * b10 + a03 * b14;
			copy [ 3] = a00 * b03 + a01 * b07 + a02 * b11 + a03 * b15;
			copy [ 4] = a04 * b00 + a05 * b04 + a06 * b08 + a07 * b12;
			copy [ 5] = a04 * b01 + a05 * b05 + a06 * b09 + a07 * b13;
			copy [ 6] = a04 * b02 + a05 * b06 + a06 * b10 + a07 * b14;
			copy [ 7] = a04 * b03 + a05 * b07 + a06 * b11 + a07 * b15;
			copy [ 8] = a08 * b00 + a09 * b04 + a10 * b08 + a11 * b12;
			copy [ 9] = a08 * b01 + a09 * b05 + a10 * b09 + a11 * b13;
			copy [10] = a08 * b02 + a09 * b06 + a10 * b10 + a11 * b14;
			copy [11] = a08 * b03 + a09 * b07 + a10 * b11 + a11 * b15;
			copy [12] = a12 * b00 + a13 * b04 + a14 * b08 + a15 * b12;
			copy [13] = a12 * b01 + a13 * b05 + a14 * b09 + a15 * b13;
			copy [14] = a12 * b02 + a13 * b06 + a14 * b10 + a15 * b14;
			copy [15] = a12 * b03 + a13 * b07 + a14 * b11 + a15 * b15;

			return copy;
		},
	});

	var rotateMatrix = new Matrix4 ();

	return Matrix4;
});
*/
