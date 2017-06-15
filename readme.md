# humanoid-figure

mesh and matrix calculations to manipulate a rigged low-poly boxy 3d humanoid
figure

# example

[view this example](https://substack.neocities.org/example/humanoid-figure.html)

``` js
var regl = require('regl')()
var camera = require('regl-camera')(regl, { distance: 4, theta: -Math.PI/4 })
var mat4 = require('gl-mat4')

var skelly = require('humanoid-figure')
var skmatrix = require('humanoid-figure/matrix')
var skmodel = skmatrix({}, skelly)

var draw = {}
Object.keys(skelly).forEach(function (key, i) {
  draw[key] = regl({
    frag: `
      precision highp float;
      void main () {
        gl_FragColor = vec4(1,0.2,0.5,1);
      }
    `,
    vert: `
      precision highp float;
      uniform mat4 projection, view, model;
      attribute vec3 position;
      void main () {
        gl_Position = projection * view * model * vec4(position,1);
      }
    `,
    uniforms: { model: function () { return skmodel[key] } },
    attributes: { position: skelly[key].positions },
    elements: skelly[key].cells
  })
})
regl.frame(function (context) {
  regl.clear({ color: [0,0,0,1], depth: true })
  
  // hand shake
  mat4.identity(skelly.lforearm.matrix)
  mat4.rotateX(skelly.lforearm.matrix,skelly.lforearm.matrix,
    1.2 + Math.sin(context.time*4)*0.2)

  // head bob
  mat4.identity(skelly.head.matrix)
  mat4.rotateX(skelly.head.matrix,skelly.head.matrix,
    Math.sin(context.time*8)*0.2)

  // foot tap
  mat4.identity(skelly.rfoot.matrix)
  mat4.rotateX(skelly.rfoot.matrix,skelly.rfoot.matrix,
    Math.pow(Math.max(0,Math.sin(context.time*2)),8)*0.2)
  mat4.rotateY(skelly.rfoot.matrix,skelly.rfoot.matrix,
    Math.sin(context.time*1)*0.2)

  skmatrix(skmodel, skelly)
  camera(function () {
    Object.keys(draw).forEach(function (key) { draw[key]() })
  })
})
```

# api

``` js
var figure = require('humanoid-figure')
var fmatrix = require('humanoid-figure/matrix')
```

## figure

Object mapping shape names to shapes.

The shape names are:

* chest
* head
* larm
* lfoot
* lforearm
* lleg
* lmiddledistal
* lpalm
* lproximal
* lthigh
* lthumb
* neck
* pelvis
* rarm
* rfoot
* rforearm
* rleg
* rmiddledistal
* rpalm
* rproximal
* rthigh
* rthumb
* spine

Each shape has:

* shape.pivot - coordinate to pivot rotation about
* shape.matrix - matrix to store shape rotations
* shape.parent - name of parent shape, if applicable
* shape.positions - geometry verticies
* shape.cells - geometry triangle vertex indicies

## fmatrix(models, figure)

Calculate model matricies for each shape in the figure given each shape's
matrix, pivot point, and parent shape.

If a model matrix doesn't exist it will be allocated. Otherwise existing model
matricies will be reused. Returns `models`.

# install

npm install humanoid-figure

# license

public domain
