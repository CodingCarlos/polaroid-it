// ************************ Drag and drop ***************** //
// Credits to Joe Zim. 
// Original code from: https://codepen.io/joezimjs/pen/yPWQbd

// ToDo: Document how to use this.
// ToDo: Create custom errors.
// ToDo: Refactor so it returns an instance of the object that allow to listen/define custom handlers later

function UploadDragAndDrop(dropArea, handleFiles) {
  // Error control
  if (!dropArea || !handleFiles) {
    throw new Error('Invalid drop area or handler function');
  }

  const fileInput = dropArea.querySelector('input[type="file"]');
  if (!fileInput) {
    throw new Error('Input type file not found in drop are');
  }

  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function highlight(e) {
    dropArea.classList.add('highlight')
  }

  function unhighlight(e) {
    dropArea.classList.remove('active')
  }

  function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files

    handleFiles(files)
  }

  function handleInputChange() {
    handleFiles(fileInput.files);
  }

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)   
    document.body.addEventListener(eventName, preventDefaults, false)
  });

  // Highlight drop area when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  });

  // Handle drop area events
  dropArea.addEventListener('drop', handleDrop, false);
  dropArea.addEventListener('click', () => fileInput.click(), false);
  
  // Handle file input change
  fileInput.addEventListener('change', handleInputChange, false);
}
