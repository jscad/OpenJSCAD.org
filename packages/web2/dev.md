

# viewers
These viewers are meant to be interchangeable, and to implement as muchs as possible of features.

 - JscadBabylonViewer.js
 - JscadReglViewer.js
 - JscadThreeViewer.js

 # resize

 Most reliable way to handle proper size of the viewer is to use  [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
 
 Put the viewer in an element that you can reference and use flex stretching to resize the canvas, but put overflow hidden so th viewer
 will allow resizing properly and not prevnet shrinking. etc
 ```
const resizeObserver = new ResizeObserver(entries => {
  const rect = entries[0].contentRect
  viewer.resize(rect)
})
resizeObserver.observe(yourDomElement)   
```
