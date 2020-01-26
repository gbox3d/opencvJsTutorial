const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');
// This is our program. This time we use JavaScript async / await and promises to handle asynchronicity.
(async () => {
    // before loading opencv.js we emulate a minimal HTML DOM. See the function declaration below.
    installDOM();
    console.log('install dom complete');

    await loadOpenCV();
    console.log('opencv load complete');

    // using node-canvas, we an image file to an object compatible with HTML DOM Image and therefore with cv.imread()
    const image = await loadImage('../../res/lena.png');
    const src = cv.imread(image);
    const dst = new cv.Mat();

    //   const M = cv.Mat.ones(5, 5, cv.CV_8U);
    //   const anchor = new cv.Point(-1, -1);
    //   cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

    // we create an object compatible HTMLCanvasElement
    const canvas = createCanvas(dst.cols,dst.rows);
    cv.imshow(canvas, dst);
    writeFileSync('../../temp/output.jpg', canvas.toBuffer('image/jpeg'));
    src.delete();
    dst.delete();
})();
// Load opencv.js just like before but using Promise instead of callbacks:
function loadOpenCV() {
    return new Promise(resolve => {
        global.Module = {
            onRuntimeInitialized: resolve
        };
        global.cv = require('../../libs/opencv');

    });
}
// Using jsdom and node-canvas we define some global variables to emulate HTML DOM.
// Although a complete emulation can be archived, here we only define those globals used
// by cv.imread() and cv.imshow().
function installDOM() {
    const dom = new JSDOM();
    global.document = dom.window.document;
    // The rest enables DOM image and canvas and is provided by node-canvas
    global.Image = Image;
    global.HTMLCanvasElement = Canvas;
    global.ImageData = ImageData;
    global.HTMLImageElement = Image;
}