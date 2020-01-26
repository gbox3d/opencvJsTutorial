const Jimp = require('jimp');
async function onRuntimeInitialized() {

    console.log('module load complete')

    // load local image file with jimp. It supports jpg, png, bmp, tiff and gif:
    var jimpSrc = await Jimp.read('../../res/lena.png');
    // `jimpImage.bitmap` property has the decoded ImageData that we can use to create a cv:Mat
    var src = cv.matFromImageData(jimpSrc.bitmap);
    // following lines is copy&paste of opencv.js dilate tutorial:
    let dst = new cv.Mat();
    let dst2 = new cv.Mat();

    // let M = cv.Mat.ones(5, 5, cv.CV_8U);
    // let anchor = new cv.Point(-1, -1);
    // cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    cv.cvtColor(src,dst, cv.COLOR_RGBA2GRAY);
    

    // // Now that we are finish, we want to write `dst` to file `output.png`. For this we create a `Jimp`
    // image which accepts the image data as a [`Buffer`](https://nodejs.org/docs/latest-v10.x/api/buffer.html).
    // `write('output.png')` will write it to disk and Jimp infers the output format from given file name:
    cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGB); //jimp rgb 만 인식한다. 출력전에 다시 rgb로 변환 
    new Jimp({
        width: dst.cols,
        height: dst.rows,
        data: Buffer.from(dst.data)
    })
        .write('../../temp/output.png');

    src.delete();
    dst.delete();
}
// Finally, load the open.js as before. The function `onRuntimeInitialized` contains our program.
Module = {
    onRuntimeInitialized
};
// cv = require('./opencv.js');
const cv = require('../../libs/opencv');