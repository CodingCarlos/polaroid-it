try {
  (function () {
  
    // --- Utils ---

    function removeExtension(filename) {
      return filename.substring(0, filename.lastIndexOf('.')) || filename;
    }

    function clearDynamicLink(link) {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }

    function downloadURI(uri, name) {
      const link = document.createElement("a");

      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      clearDynamicLink(link); 
    }

    function downloadAsImage(element, filename) {
      html2canvas(element).then(function (canvas) {
        const myImage = canvas.toDataURL();
        downloadURI(myImage, `${filename}.png`);
      });
    }

    // --- Main app code ---

    // Select expected image drop element
    const dropArea = document.getElementById('drop-area');

    // Defining vars here to improve memory allocation
    const imgOutput = document.getElementById('preview');
    const handle = document.getElementById('handle');
    const capture = document.getElementById("capture");

    function generatePolaroidFromFile(file) {
      // Prepare handle name
      const handleName = `@${removeExtension(file.name)}`;

      // Set image and handle
      imgOutput.style = `background-image: url(${URL.createObjectURL(file)});`;
      handle.innerText = handleName;

      // Download image
      downloadAsImage(capture, handleName);}

    function handleFileSelected(files) {
      const [file] = files;

      if (!file) {
        console.warn('No file selected');
        return false;
      }

      generatePolaroidFromFile(file);
    }

    // Drag and drop handler
    UploadDragAndDrop(dropArea, handleFileSelected);
  })();
} catch (err) {
  console.warn('Unhandled error detected! Your notaframework catched it, and you can see it below:'); 
  console.error(err);
}