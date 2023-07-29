const contentButton = document.getElementById("contentButton");
const bigContainer = document.getElementById('bigContainer');
const errorBox = document.getElementById('errorBox');
const dropZone = document.getElementsByClassName('drop-zone__input');



setDropZone(dropZone);
function setDropZone(dropZone) {
    var imgDropZone = dropZone[0];
    var vidDropZone = dropZone[1];

    imgDropZone.setAttribute('name', 'blog-image');
    vidDropZone.setAttribute('name', 'blog-video');

    imgDropZone.setAttribute('accept', 'image/*');
    vidDropZone.setAttribute('accept', 'video/*');
}


addDeleteFuntionallity(document.getElementsByClassName('deleteBox')[0]);
errorBox.style.display = 'none';

contentButton.addEventListener('click', (e) => {
    errorBox.style.display = 'none';
    if (checkHead() || checkPara()) {
        return;
    }
    bigContainer.appendChild(createContainer());
});


function checkHead() {
    var heads = document.getElementsByClassName('headingInput');
    for (var i = 0; i < heads.length; i++) {
        if (heads[i].value.length == 0) {
            errorBox.innerText= `Please complete the content box no. ${i+1}`;
            errorBox.style.display = 'block';
            return true;
        }
    }
    return false;
}

function checkPara() {
    var paras = document.getElementsByClassName('paragraphInput');
    for (var i = 0; i < paras.length; i++) {
        if (paras[i].value.length == 0) {
            errorBox.innerText= `Please complete the content box no. ${i+1}`;
            errorBox.style.display = 'block';
            return true;
        }
    }
    return false;
}


function createContainer() {
    var container = document.createElement('div');
    var contentNo = document.createElement('h2');
    var headLabel = document.createElement('label');
    var paraLabel = document.createElement('label');
    var headInput = document.createElement('input');
    var paraInput = document.createElement('textarea');
    var deleteBox = document.createElement('button');

    contentNo.innerText = `Content Box ${document.getElementsByClassName('container').length+1}`;
    contentNo.classList.add('contentNo');

    deleteBox.setAttribute('type', 'button');
    deleteBox.classList.add('deleteBox');
    deleteBox.innerText = 'Delete';
    addDeleteFuntionallity(deleteBox);

    container.classList.add('container');
    
    headLabel.setAttribute('for', 'headingInput');
    headLabel.innerHTML = '<h3>Heading</h3>';
    
    paraLabel.setAttribute('for', 'paragraphInput');
    paraLabel.innerHTML = '<h3>Paragraph</h3>';
    
    headInput.setAttribute('type', 'text');
    headInput.setAttribute('name', 'headingInput');
    headInput.classList.add('headingInput');
    
    paraInput.setAttribute('rows', '4');
    paraInput.setAttribute('name', 'paragraphInput');
    paraInput.classList.add('paragraphInput');

    container.appendChild(contentNo);
    container.appendChild(headLabel);
    container.appendChild(document.createElement('br'));
    container.appendChild(headInput);
    container.appendChild(document.createElement('br'));
    container.appendChild(paraLabel);
    container.appendChild(paraInput);
    container.appendChild(deleteBox);

    return container;
}

function addDeleteFuntionallity(deleteBox) {
    deleteBox.addEventListener('click', (e) => {
        deleteBox.parentElement.remove();
        updateContentNo();
        errorBox.style.display = 'none';
    });
}

function updateContentNo() {
    var contentNo = document.getElementsByClassName('contentNo');
    console.log(contentNo.length);
    for (var i = 0; i < contentNo.length; i++) {
        contentNo[i].innerText = `Content Box ${i+1}`;
    }
}

function checkform() {
    document.getElementById('img-error').innerText = "";
    document.getElementById('vid-error').innerText = "";
    document.getElementById('title-error').innerText = "";

    var imgDropZone = dropZone[0];
    var vidDropZone = dropZone[1];
    var title = document.getElementById('titleInput');

    var check = true;

    if (imgDropZone.value.length > 0) {
        if (!imgDropZone.value.endsWith('.jpeg') && !imgDropZone.value.endsWith('.png') && !imgDropZone.value.endsWith('.jpg')) {
            document.getElementById('img-error').innerText = "**File type is not image (.png, .jpg, etc.)";
            check = false;
        }
    }
    if (vidDropZone.value.length > 0) {
        if (!vidDropZone.value.endsWith('.mp4') && !vidDropZone.value.endsWith('.avi') && !vidDropZone.value.endsWith('.mov') && !vidDropZone.value.endsWith('.wmv') && !vidDropZone.value.endsWith('.flv')) {
            document.getElementById('vid-error').innerText = "**File type is not video (.mp4, .avi, .mov, etc)";
            check = false;
        }
    }
    if (title.value.length == 0) {
        document.getElementById('title-error').innerText = "**Please enter the Title of the blog";
        check = false;
    }
    if (checkHead()) check = false;
    if (checkPara()) check = false;

    return check;
    
}