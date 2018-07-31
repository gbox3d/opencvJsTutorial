try {
  if(gbox3d == null) {
    gbox3d={}
  }
}
catch (e) {
  console.log(e);
  gbox3d={}
}
gbox3d.matics = {}
gbox3d.matics.helper = {

  mat2dToCCTX : function (_) {
      let _transform = _.transform
      _.context.setTransform(_transform[0],_transform[1],_transform[2],_transform[3],_transform[4],_transform[5],_transform[6]);
    },
  makeVec2d : function (_) {
    return vec2.set(vec2.create(), _.x,_.y);
  },
  makeMat2dFromTranslation(_) {
    return mat2d.fromTranslation(mat2d.create(),this.makeVec2d(_));
  },
  makeMat2dFromRotation(_) {
    return mat2d.fromRotation(mat2d.create(), THREE.Math.degToRad( _.degree) );
  },
  makeMat2dFromScale(_) {
    return mat2d.fromScaling(mat2d.create(),this.makeVec2d(_));
  }
}

