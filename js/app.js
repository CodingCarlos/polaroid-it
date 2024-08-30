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

    // Define form elements
    const textInput = document.getElementById("textInput");
    const download = document.getElementById("download");

    // Defining vars here to improve memory allocation
    const pictures = document.querySelectorAll('.polaroid__pic');
    const handles = document.querySelectorAll('.polaroid__handle');
    const capture = document.getElementById("capture");

    function setHandleTextPreview(text) {
      handles.forEach((handle) => handle.innerText = text);
    }

    function generatePolaroidFromFile(file) {
      // Prepare handle name
      const handleName = `@${removeExtension(file.name)}`;

      // Set image and handle
      pictures.forEach((image) => image.style = `background-image: url(${URL.createObjectURL(file)});`);
      setHandleTextPreview(textInput.value || handleName);
    }

    function handleFileSelected(files) {
      const [file] = files;
      if (!file) {
        console.warn('No file selected');
        return false;
      }

      generatePolaroidFromFile(file);
    }

    // Setup drag and drop handler
    UploadDragAndDrop(dropArea, handleFileSelected);

    textInput.addEventListener('input', (event) => {
      setHandleTextPreview(textInput.value);
    })

    // Setup download handler
    download.addEventListener('click', () => {
      // ToDo: Check if there is something to download
      downloadAsImage(capture, handles[0].innerText);
    });

  })();
} catch (err) {
  console.warn('Unhandled error detected! Your notaframework catched it, and you can see it below:'); 
  console.error(err);
}