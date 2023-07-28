const titleInput = document.getElementById('titleInput');
    const headingInput = document.getElementById('headingInput');
    const paragraphInput = document.getElementById('paragraphInput');
    const contentButton = document.getElementById('contentButton');
    const container = document.querySelector('.container');
    const blogContainer = document.getElementById('blogContainer');
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

      // Append the new blog content to the blog container
      blogContainer.innerHTML += content;

      // Clear the input fields and file uploads
      titleInput.value = '';
      headingInput.value = '';
      paragraphInput.value = '';
      contentButton.disabled = true;
      images = [];
      videos = [];

      window.alert('Content has been added to the blog!');
    });

    // Function to add images to the blog container
    function addImageToBlog(imageUrl) {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.className = 'blog-item';
      blogContainer.appendChild(imageElement);
    }

    // Function to add videos to the blog container
    function addVideoToBlog(videoUrl) {
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      videoElement.controls = true;
      videoElement.className = 'blog-item';
      blogContainer.appendChild(videoElement);
    }

    // Function to check file size
    async function checkFileSize(url, maxSizeInBytes) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob.size <= maxSizeInBytes;
      } catch (error) {
        console.error('Error fetching the file:', error);
        return false;
      }
    }

    // Event listener for image upload button click
    const imageButton = document.getElementById('imageButton');
    imageButton.addEventListener('change', async function() {
      const file = this.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const isValidSize = await checkFileSize(imageUrl, 1 * 1024 * 1024);
        if (isValidSize) {
          images.push(imageUrl);
          addImageToBlog(imageUrl);
          window.alert('Your image has been added to the blog!');
        } else {
          window.alert('Image size should be less than 1MB.');
        }
      }
    });

    // Event listener for video upload button click
    const videoButton = document.getElementById('videoButton');
    videoButton.addEventListener('change', async function() {
      const file = this.files[0];
      if (file) {
        const videoUrl = URL.createObjectURL(file);
        const isValidSize = await checkFileSize(videoUrl, 5 * 1024 * 1024);
        if (isValidSize) {
          videos.push(videoUrl);
          addVideoToBlog(videoUrl);
          window.alert('Your video has been added to the blog!');
        } else {
          window.alert('Video size should be less than 5MB.');
        }
      }
    });