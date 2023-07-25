document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drag-drop-inp');
    const videoButton = document.getElementById('videoButton');
    let selectedVideo;

    // Prevent the default drag-and-drop behavior
    dropArea.addEventListener('click',(e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = '#f0f0f0'; // Optional visual effect
    });

    // Handle the dragged item being dropped
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = '#ffffff'; // Restore the original background color
      const file = e.dataTransfer.files[0];
      if (file.type.includes('video/')) {
        selectedVideo = file;
        dropArea.innerText = 'Video selected: ' + selectedVideo.name;
      } else {
        dropArea.innerText = 'Invalid file format. Please select a video file.';
      }
    });

    // Handle clicking on the drop area to select a file
    dropArea.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'video/*';
      fileInput.style.display = 'none';
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file.type.includes('video/')) {
          selectedVideo = file;
          dropArea.innerText = 'Video selected: ' + selectedVideo.name;
        } else {
          dropArea.innerText = 'Invalid file format. Please select a video file.';
        }
      });
      document.body.appendChild(fileInput);
      fileInput.click();
    });

    // Handle the upload button click
    videoButton.addEventListener('click', () => {
      if (selectedVideo) {
        // Implement your video upload logic here, using the selectedVideo File object.
        // You can use AJAX, fetch API, or any other method to upload the video to your server.
        console.log('Uploading video: ', selectedVideo);
        // Reset the selection after upload (optional)
        selectedVideo = null;
        dropArea.innerText = 'Drag &amp; Drop video here or click to select';
      } else {
        alert('Please select a video before clicking the "Upload" button.');
      }
    });
  });
// const video_button = document.getElementById('videoButton');
//     video_button.addEventListener('click', (e) => {
//         console.log("updated the button to accept videos");
//         fileElement.setAttribute('accept', 'video/*');  
//     });
    