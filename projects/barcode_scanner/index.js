let videoElement = null; 

document.addEventListener("DOMContentLoaded", () => {
  videoElement = document.querySelector('video');
  initCamera(videoElement, (barcode) => {
    setItemByBarcode(barcode);
  });
});

function setItemByBarcode(barcode) {
  alert(barcode);
}