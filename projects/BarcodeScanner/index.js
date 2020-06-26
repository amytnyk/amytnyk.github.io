let videoElement = null; 

document.addEventListener("DOMContentLoaded", () => {
  videoElement = document.querySelector('video');
  initCamera(videoElement, (barcode) => {
    // console.log(barcode);
    alert(barcode);
  });
});