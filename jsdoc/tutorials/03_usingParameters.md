Parametric JSCAD designs unleash a new level of functionality, allowing you to build flexibility into 
your designs, so that they can easily adapt to different situations.

## ParametricBox.js
```javascript
const jscad = require('@jscad/modeling')
const { booleans, primitives } = jscad

const getParameterDefinitions = () => {
  return [
    {name: 'outerWidth', caption: 'Outer width of box:', type: 'float', initial: 120},
    {name: 'outerDepth', caption: 'Outer depth of box:', type: 'float', initial: 100},
    {name: 'outerHeight', caption: 'Outer height of box:', type: 'float', initial: 50},
    {name: 'wallThickness', caption: 'Wall Thickness:', type: 'float', initial: 2},
    {name: 'cornerRadius', caption: 'Inside Corner Radius:', type: 'float', initial: 5},
   ];
}

const main = (params) => {
	return booleans.subtract(
		outerBox(params),
		innerBox(params)
	);
}

const outerBox = (params) => {
	return primitives.cuboid({
		size: [params.outerWidth, params.outerDepth, params.outerHeight],
		center: [0, 0, params.outerHeight / 2]
	});
}

const innerBox = (params) => {
	const size = [
		params.outerWidth - (2 * params.wallThickness),
		params.outerDepth - (2 * params.wallThickness),
		params.outerHeight + (2 * params.cornerRadius)
	];
	const center = [0, 0, (size[2] / 2) + params.wallThickness];

	return primitives.roundedCuboid({ size, center, roundRadius: params.cornerRadius, segments: 32 });
}

module.exports = { main, getParameterDefinitions }
```
<img src="img/parametricBox.png" alt="Parametric Box example">

## All Parameter Types:
Below is a comprehensive example of all the types of parameters you can specify in JSCAD:
```javascript
const getParameterDefinitions = () => {
  return [
    { name: 'group1', type: 'group', caption: 'Group 1: Text Entry' },
    { name: 'text', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Plain Text:', placeholder: '20 characters' },
    { name: 'int', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Integer:' },
    { name: 'number', type: 'number', initial: 2.0, min: 1.0, max: 10.0, step: 0.1, caption: 'Number:' },
    { name: 'date', type: 'date', initial: '2020-01-01', min: '2020-01-01', max: '2030-12-31', caption: 'Date:', placeholder: 'YYYY-MM-DD' },
    { name: 'email', type: 'email', initial: 'me@example.com', caption: 'Email:' },
    { name: 'url', type: 'url', initial: 'www.example.com', size: 40, maxLength: 40, caption: 'Url:', placeholder: '40 characters' },
    { name: 'password', type: 'password', initial: '', caption: 'Password:' },

    { name: 'group2', type: 'group', caption: 'Group 2: Interactive Controls' },
    { name: 'checkbox', type: 'checkbox', checked: true, initial: '20', caption: 'Checkbox:' },
    { name: 'color', type: 'color', initial: '#FFB431', caption: 'Color:' },
    { name: 'slider', type: 'slider', initial: 3, min: 1, max: 10, step: 1, caption: 'Slider:' },
    { name: 'choice1', type: 'choice', caption: 'Dropdown Menu:', values: [0, 1, 2, 3], captions: ['No', 'Yes', 'Maybe', 'So so'], initial: 2 },
    { name: 'choice3', type: 'choice', caption: 'Dropdown Menu:', values: ['No', 'Yes', 'Maybe', 'So so'], initial: 'No' },
    { name: 'choice2', type: 'radio', caption: 'Radio Buttons:', values, captions, initial: 5 },

    { name: 'group3', type: 'group', initial: 'closed', caption: 'Group 3: Initially Closed Group' },
    { name: 'checkbox2', type: 'checkbox', checked: true, initial: '20', caption: 'Optional Checkbox:' }
  ]
}
```