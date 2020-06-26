let initCamera = function(videoElement, onBarcodeDetected) {
  let _ZXing = null;
  let decodePtr = null;
  const detectInterval = 30;

  // ZXing init
  let tick = () => {
    if (window.ZXing) {
      _ZXing = ZXing();
      decodePtr = _ZXing.Runtime.addFunction((ptr, len) => {
        let result = new Uint8Array(_ZXing.HEAPU8.buffer, ptr, len);
        onBarcodeDetected(String.fromCharCode.apply(null, result));
      });
    } else {
      setTimeout(tick, 10);
    }
  };
  tick();

  // Scanning
  let scanBarcode = () => {
    if (_ZXing != null) {
      let barcodeCanvas = document.createElement("canvas");
      barcodeCanvas.width = videoElement.videoWidth;
      barcodeCanvas.height = videoElement.videoHeight;
      
      let barcodeContext = barcodeCanvas.getContext('2d');
      let imageWidth = videoElement.videoWidth;
      let imageHeight = videoElement.videoHeight;
      barcodeContext.drawImage(videoElement, 0, 0, imageWidth, imageHeight);

      let imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
      let data = imageData.data;
      let imagePtr = _ZXing._resize(imageWidth, imageHeight);
      for (var i = 0, j = 0; i < data.length; i += 4, j++) {
        _ZXing.HEAPU8[imagePtr + j] = data[i];
      }
      _ZXing._decode_any(decodePtr);
      setTimeout(scanBarcode, detectInterval);
    }
  }

  // Camera setup
  let gotStream = (stream) => {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    scanBarcode();
  };
  let getStream = () => {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  
    const constraints = {
      video: {
        facingMode: { exact: "environment" },
        width: { min: 1280, ideal: 1920 }, height: { min: 720, ideal: 1080 }
      }
    };
  
    navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).catch((error) => {
        console.log('Error: ', error);
      });
  };
  navigator.mediaDevices.enumerateDevices().then(getStream).catch((error) => {
    console.log('Error: ', error);
  });
}