// Define a global variable 'Module' with a method 'onRuntimeInitialized':
// onRuntimeInitialized 콜백 함수는 4.X  버전 이상에서만 제데로 동작한다.
Module = {
    onRuntimeInitialized() {
        // this is our application:
        console.log('ready to use')
        console.log(cv.getBuildInformation())
    }
}
const cv = require('../../libs/opencv');