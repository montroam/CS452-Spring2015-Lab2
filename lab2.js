/**
		 Allison Montroy
		 CS 452 || Lab 2
			02/17/15

**/
var x = 0;
var y = 0;
var gl,canvas;
var vColors = new Float32Array([ 
 // Vertex coordinates and color 
((x*.1)-.1), ((y*.1)-.1), 1.0, 0.0, 0.0, 
((x*.1)+.2), ((y*.1)+.2), 0.0, 0.0, 1.0, 
((x*.1)-.05), ((y*.1)+.1), 0.0, 1.0, 0.0, 
((x*.1)+.1), ((y*.1)+.01), 0.0, 0.0, 1.0, 
((x*.1)-.2), ((y*.1)-.2), 0.0, 0.0, 1.0

 ]); 

window.onload = function init() { 
 canvas = document.getElementById( "gl-canvas" ); 
 gl = WebGLUtils.setupWebGL(canvas); 
 if (!gl) { console.log('Failed to get the rendering context for WebGL'); return;} 
 gl.viewport( 0, 0, canvas.width, canvas.height ); 
 gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); 

// Create shading program 
 var program = initShaders( gl, "vertex-shader", "fragment-shader" ); 
 gl.useProgram( program ); 
 gl.program = program; 
 
 var cBuffer = gl.createBuffer(); 
 // Bind the buffer object to target 
 gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer); 
 gl.bufferData(gl.ARRAY_BUFFER, vColors, gl.STATIC_DRAW); 
 var FSIZE = vColors.BYTES_PER_ELEMENT; 
 var vPosition = gl.getAttribLocation(gl.program, 'vPosition'); 
 
 gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, FSIZE * 5, 0); 
 gl.enableVertexAttribArray(vPosition); 
 
 // Get the storage location of fColor, assign buffer and enable 
 var fColor = gl.getAttribLocation(gl.program, 'fColor'); 
 gl.vertexAttribPointer(fColor, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2); 
 gl.enableVertexAttribArray(fColor); 
 gl.bindBuffer(gl.ARRAY_BUFFER, null); 

window.onkeypress = function(event) {
	var char = String.fromCharCode(event.keyCode);
	
	switch(char){
		case 'w':
		if(y<10)y++;
		break;
		case 'a':
		if(x>-10)x--;
		break;
		case 's':
		if(y>-10)y--;
		break;
		case 'd':
		if(x<10)x++;
		break;
		case '1':
		x = 0;y = 0;
		break;	
	}
	update(cBuffer);
	
	render();
	}; 

render();
}
function update(cBuffer) { 
 vColors = new Float32Array([ 
((x*.1)-.1), ((y*.1)-.1), 1.0, 0.0, 0.0, 
((x*.1)+.2), ((y*.1)+.2), 0.0, 0.0, 1.0, 
((x*.1)-.05), ((y*.1)+.1), 0.0, 1.0, 0.0, 
((x*.1)+.1), ((y*.1)+.01), 0.0, 0.0, 1.0, 
((x*.1)-.2), ((y*.1)-.2), 0.0, 0.0, 1.0
 ]); 

 // Bind the buffer object to target 
 gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer); 
 gl.bufferData(gl.ARRAY_BUFFER, vColors, gl.STATIC_DRAW); 
 var FSIZE = vColors.BYTES_PER_ELEMENT; 
 var vPosition = gl.getAttribLocation(gl.program, 'vPosition'); 
 
 gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, FSIZE * 5, 0); 
 gl.enableVertexAttribArray(vPosition); 
 
 // Get the storage location of fColor, assign buffer and enable 
 var fColor = gl.getAttribLocation(gl.program, 'fColor'); 
 gl.vertexAttribPointer(fColor, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2); 
 gl.enableVertexAttribArray(fColor); 
 gl.bindBuffer(gl.ARRAY_BUFFER, null); 
}

function render(){
	 	gl.clear(gl.COLOR_BUFFER_BIT); 
 		gl.drawArrays(gl.TRIANGLE_FAN, 0, 5); 
 }
