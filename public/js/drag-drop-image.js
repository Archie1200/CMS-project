document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drag-drop-inp');
    const imageButton = document.getElementById('imageButton');
    let selectedImage;

    // Prevent the default drag-and-drop behavior
    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = '#f0f0f0'; // Optional visual effect
    });

    // Handle the dragged item being dropped
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = '#ffffff'; // Restore the original background color
      const file = e.dataTransfer.files[0];
      if (file.type.includes('image/')) {
        selectedImage = file;
        dropArea.innerText = 'Image selected: ' + selectedImage.name;
      } else {
        dropArea.innerText = 'Invalid file format. Please select an image file.';
      }
    });

    // Handle clicking on the drop area to select a file
    dropArea.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file.type.includes('image/')) {
          selectedImage = file;
          dropArea.innerText = 'Image selected: ' + selectedImage.name;
        } else {
          dropArea.innerText = 'Invalid file format. Please select an image file.';
        }
      });
      document.body.appendChild(fileInput);
      fileInput.click();
    });

    // Handle the upload button click
    imageButton.addEventListener('click', () => {
      if (selectedImage) {
        // Implement your image upload logic here, using the selectedImage File object.
        // You can use AJAX, fetch API, or any other method to upload the image to your server.
        console.log('Uploading image: ', selectedImage);
        // Reset the selection after upload (optional)
        selectedImage = null;
        dropArea.innerText = 'Drag &amp; Drop image here or click to select';
      } else {
        alert('Please select an image before clicking the "Upload" button.');
      }
    });
  });


    