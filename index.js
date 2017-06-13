var mat4 = require('gl-mat4')
var vec3 = require('gl-vec3')

module.exports = function () {
  var shapes = {}
  var cells = [
    [2,1,0],[3,2,0], // bottom
    [0,1,4],[5,4,1],[1,2,5],[6,5,2],[2,3,6],[7,6,3],[7,3,0],[0,4,7], // sides
    [4,5,6],[4,6,7] // top
  ]
  var lfootmat = mat4.identity([])
  shapes.LFOOT = {
    parent: 'LLEG',
    matrix: mat4.rotateY(lfootmat,lfootmat,0.2),
    pivot: [-0.6,-0.91,0],
    positions: [
      [-0.15,-1,-0.23],
      [-0.1,-1,+0.07],
      [-0.03,-1,+0.07],
      [-0.02,-1,-0.29],
      [-0.15,-0.97,-0.23],
      [-0.1,-0.9,+0.06],
      [-0.03,-0.9,+0.06],
      [-0.02,-0.95,-0.29]
    ],
    cells: cells
  }
  var rfootmat = mat4.identity([])
  shapes.RFOOT = {
    parent: 'RLEG',
    matrix: mat4.rotateY(rfootmat,rfootmat,-0.2),
    pivot: [+0.6,-0.91,0],
    positions: [
      [+0.02,-1,-0.29],
      [+0.03,-1,+0.07],
      [+0.1,-1,+0.07],
      [+0.15,-1,-0.23],
      [+0.02,-0.95,-0.29],
      [+0.03,-0.9,+0.06],
      [+0.1,-0.9,+0.06],
      [+0.15,-0.97,-0.23]
    ],
    cells: cells
  }
  shapes.LLEG = {
    parent: 'LTHIGH',
    matrix: mat4.identity([]),
    pivot: [-0.08,-0.5,-0.01],
    positions: [
      [-0.01,-0.9,+0.05],
      [-0.04,-0.9,-0.07],
      [-0.15,-0.9,-0.07],
      [-0.12,-0.9,+0.05],
      [-0.01,-0.48,+0.05],
      [-0.04,-0.48,-0.07],
      [-0.15,-0.48,-0.07],
      [-0.12,-0.48,+0.05],
    ],
    cells: cells
  }
  shapes.RLEG = {
    parent: 'RTHIGH',
    matrix: mat4.identity([]),
    pivot: [+0.08,-0.5,-0.01],
    positions: [
      [+0.12,-0.9,+0.05],
      [+0.15,-0.9,-0.07],
      [+0.04,-0.9,-0.07],
      [+0.01,-0.9,+0.05],
      [+0.12,-0.48,+0.05],
      [+0.15,-0.48,-0.07],
      [+0.04,-0.48,-0.07],
      [+0.01,-0.48,+0.05]
    ],
    cells: cells
  }
  var lthighmat = mat4.identity([])
  mat4.rotateZ(lthighmat,lthighmat,0.15)
  mat4.rotateX(lthighmat,lthighmat,0.1)
  shapes.LTHIGH = {
    parent: 'PELVIS',
    matrix: lthighmat,
    pivot: [0,0,0],
    positions: [
      [-0.09,-0.48,+0.05],
      [-0.12,-0.48,-0.06],
      [-0.23,-0.48,-0.04],
      [-0.20,-0.48,+0.06],
      [-0.07,+0.1,+0.05],
      [-0.12,+0.1,-0.05],
      [-0.19,+0.1,-0.02],
      [-0.16,+0.1,+0.03],
    ],
    cells: cells
  }
  var rthighmat = mat4.identity([])
  mat4.rotateZ(rthighmat,rthighmat,-0.15)
  mat4.rotateX(rthighmat,rthighmat,0.1)
  shapes.RTHIGH = {
    parent: 'PELVIS',
    matrix: rthighmat,
    pivot: [0,0,0],
    positions: [
      [+0.20,-0.48,+0.06],
      [+0.23,-0.48,-0.04],
      [+0.12,-0.48,-0.06],
      [+0.09,-0.48,+0.05],
      [+0.16,+0.1,+0.03],
      [+0.19,+0.1,-0.02],
      [+0.12,+0.1,-0.05],
      [+0.07,+0.1,+0.05],
    ],
    cells: cells
  }
  shapes.PELVIS = {
    parent: 'SPINE',
    matrix: mat4.identity([]),
    pivot: [0,0,0],
    positions: [
      [+0.07,+0.0,+0.06],
      [+0.07,+0.0,-0.04],
      [-0.07,+0.0,-0.04],
      [-0.07,+0.0,+0.06],
      [+0.17,+0.2,+0.1],
      [+0.17,+0.2,-0.04],
      [-0.17,+0.2,-0.04],
      [-0.17,+0.2,+0.1],
    ],
    cells: cells
  }
  shapes.SPINE = {
    matrix: mat4.identity([]),
    pivot: [0,0,0],
    positions: [
      [+0.04,+0.2,+0.06],
      [+0.04,+0.2,-0.02],
      [-0.04,+0.2,-0.02],
      [-0.04,+0.2,+0.06],
      [+0.04,+0.4,+0.06],
      [+0.04,+0.4,-0.02],
      [-0.04,+0.4,-0.02],
      [-0.04,+0.4,+0.06],
    ],
    cells: cells
  }
  Object.keys(shapes).forEach(function (key) {
    var shape = shapes[key]
    shape.positions.forEach(function (p) {
      vec3.transformMat4(p,p,shape.matrix)
    })
    shape.matrix = mat4.identity([])
  })
  return shapes
}
