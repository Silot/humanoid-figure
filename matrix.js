var identity = require('gl-mat4/identity')
var translate = require('gl-mat4/translate')
var multiply = require('gl-mat4/multiply')
var negate = require('gl-vec3/negate')

var p = [0,0,0], m = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

module.exports = function (output, shapes) {
  if (!output) output = {}
  for (var key in shapes) {
    var model = output[key] || []
    identity(model)
    var s = shapes[key]
    while (s) {
      identity(m)
      translate(m,m,s.pivot)
      multiply(m,m,s.matrix)
      translate(m,m,negate(p,s.pivot))
      multiply(model,m,model)
      s = shapes[s.parent]
    }
    output[key] = model
  }
  return output
}
