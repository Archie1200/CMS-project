const titleInput = document.getElementById('titleInput');
const headingInput = document.getElementById('headingInput');
const paragraphInput = document.getElementById('paragraphInput');
const contentButton = document.getElementById('contentButton');
const container = document.querySelector('.container');
let blogElement = null;
let images = [];
let videos = [];

function checkInputs() {
  // Check if all input fields have content
  const titleValue = titleInput.value.trim();
  const headingValue = headingInput.value.trim();
  const paragraphValue = paragraphInput.value.trim();

  // Enable or disable the button based on the input values
  if (titleValue !== '' && headingValue !== '' && paragraphValue !== '') {
    contentButton.disabled = false;
  } else {
    contentButton.disabled = true;
  }
}

// Event listeners for input changes
titleInput.addEventListener('input', checkInputs);
headingInput.addEventListener('input', checkInputs);
paragraphInput.addEventListener('input', checkInputs);

// Event listener for the "Add Content" button click
contentButton.addEventListener('click', function() {
  const titleValue = titleInput.value.trim();
  const headingValue = headingInput.value.trim();
  const paragraphValue = paragraphInput.value.trim();

  // Create the blog content
  const content = `
    <div class="blog">
      <h1>${titleValue}</h1>
      <h2>${headingValue}</h2>
      <p>${paragraphValue}</p>
      <div class="images">
        ${images.map(image => `<img src="${image}" alt="Image">`).join('')}
      </div>
      <div class="videos">
        ${videos.map(video => `<video src="${video}" controls></video>`).join('')}
      </div>
    </div>
  `;

  // Create a new div to hold the blog content
  const blogElement = document.createElement('div');
  blogElement.innerHTML = content;
  blogElement.className = 'blog';

  // Create "Upload Blog" button
  const uploadButton = document.createElement('button');
  uploadButton.textContent = 'Upload Blog';
  uploadButton.className = 'uploadButton';

  // Create "Cancel" button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.className = 'cancelButton';

  // Append the new blog and buttons to the container
  container.appendChild(blogElement);
  container.appendChild(uploadButton);
  container.appendChild(cancelButton);

  // Event listener for "Upload Blog" button click
  uploadButton.addEventListener('click', function() {
    // You can add your logic to upload the blog content here.
    alert('Blog content uploaded:\n\n' + content);

    // Clear the input fields and file uploads
    titleInput.value = '';
    headingInput.value = '';
    paragraphInput.value = '';
    contentButton.disabled = true;
    images = [];
    videos = [];

    // Remove the buttons after uploading
    container.removeChild(uploadButton);
    container.removeChild(cancelButton);
  });

  // Event listener for "Cancel" button click
  cancelButton.addEventListener('click', function() {
    // Remove the newly created blog and buttons when canceled
    container.removeChild(blogElement);
    container.removeChild(uploadButton);
    container.removeChild(cancelButton);

    // Clear the input fields and file uploads
    titleInput.value = '';
    headingInput.value = '';
    paragraphInput.value = '';
    contentButton.disabled = true;
    images = [];
    videos = [];
  });
});

// Event listener for image upload button click
const imageButton = document.getElementById('imageButton');
imageButton.addEventListener('click', function() {
  // You can add logic to handle the image upload process here.
  // For demonstration purposes, we will just add a placeholder URL for an image.
  const imageUrl = 'https://via.placeholder.com/150';
  images.push(imageUrl);
});

// Event listener for video upload button click
const videoButton = document.getElementById('videoButton');
videoButton.addEventListener('click', function() {
  // You can add logic to handle the video upload process here.
  // For demonstration purposes, we will just add a placeholder URL for a video.
  const videoUrl = 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
  videos.push(videoUrl);
});

