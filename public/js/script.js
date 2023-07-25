console.log("Hi");
document.addEventListener("DOMContentLoaded", function() {
   // let blogData = JSON.parse(localStorage.getItem("blogData")) || [];
  
    function createBlogElement(heading, content) {
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog-post");
  
      const headingElement = document.createElement("h2");
      headingElement.textContent = heading;
      blogElement.appendChild(headingElement);
  
      const contentElement = document.createElement("p");
      contentElement.textContent = content;
      blogElement.appendChild(contentElement);
  
      return blogElement;
    }
  
    function displayBlogs() {
      const blogContainer = document.getElementById("blog-container");
      blogContainer.innerHTML = ""; // Clear existing content before displaying new blogs
  
      blogData.forEach((blog) => {
        const blogElement = createBlogElement(blog.heading, blog.content);
        blogContainer.appendChild(blogElement);
      });
    }
  
    function handleCreateBlog() {
     console.log("Hello");
      const container = document.createElement("div");
      container.classList.add("input-container");
  
      const headingInput = document.createElement("input");
      headingInput.type = "text";
      headingInput.placeholder = "Enter the blog heading";
  
      const contentTextarea = document.createElement("textarea");
      contentTextarea.placeholder = "Enter the blog content";
  
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save Blog";
  
      saveButton.addEventListener("click", () => {
        const heading = headingInput.value.trim();
        const content = contentTextarea.value.trim();
  
        if (heading && content) {
          blogData.push({ heading, content });
          displayBlogs();
          document.body.removeChild(container);
          // Save the updated blog data in local storage
        localStorage.setItem("blogData", JSON.stringify(blogData));
        }
      });
  
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
  
      cancelButton.addEventListener("click", () => {
        document.body.removeChild(container);
      });
  
      container.appendChild(headingInput);
      container.appendChild(contentTextarea);
      container.appendChild(saveButton);
      container.appendChild(cancelButton);
  
      document.body.appendChild(container);
    }
  
    const createBlogButton = document.getElementById("createBlogButton");
    createBlogButton.addEventListener("click", handleCreateBlog);
  });
  