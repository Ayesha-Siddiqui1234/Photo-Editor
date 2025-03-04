const choose=document.getElementById("but1");
const inpu=document.getElementById("imageInput");
const preview=document.getElementById("imagePreview");
choose.onclick=()=>{   
    console.log("choose image button clicked");
    inpu.click();
};
    //Whenever the user selects an image file (through the Choose Image button), the function inside this code will automatically run.This line stores the selected image file inside the file variable.
    // files[0] means:
    // The first file selected by the user.
    // It will always select only one file at a time.
    // if (file) { ... }
    // This checks:
    // If the user has selected a file.
    // If no file is selected, nothing will happen.
    // let reader = new FileReader();
    // This creates a special object called FileReader.
    // The job of FileReader is to read the file data (like images, text files, etc.).
    // reader.onload = () => { ... }
    // This means:
    // When the file is completely read by the FileReader, this function will run.
    // imagePreview.src = reader.result;
    // reader.result stores the image data in URL format (Data URL).
    // It sets the image's src attribute to display the uploaded image.
    // imagePreview.style.display = "block";
    // This makes the image visible on the screen.
    // (Only if your image was hidden before with display: none in CSS.)
    // reader.readAsDataURL(file);
    // This line starts the reading process of the selected file.
    // It converts the image into a URL that can be shown on the website.
    
    
inpu.onchange=()=>{
    let file=inpu.files[0];
    if(file){
        let read=new FileReader();
        read.onload=()=>{
            preview.src=read.result;
            preview.style.display="block";
        };
        read.readAsDataURL(file);
    }
};

const slid=document.getElementById("slider");
slid.oninput=()=>{  //"When the user moves the slider (changes its value), run this function."
    let brightValue=slid.value;    //get the current number of the slider
    preview.style.filter=`brightness(${brightValue}%)`;   //it appky filter css on image like brightness 100% fullbrightness 50% dullbrightness if slider 200% high brightness
}
const satu=document.getElementById("Saturation");
satu.onclick=()=>{
    preview.style.filter="saturate(200%)";
}
const inverse=document.getElementById("Inversion");
inverse.onclick=()=>{
preview.style.filter="invert(100%)";
}
const gray=document.getElementById("Gray");
gray.onclick=()=>{
preview.style.filter="grayscale(100%)";
}
//for image rotation
let rotate=0;
document.getElementById("leftRotate").onclick=()=>{
    rotate-=90;
    preview.style.transform=`rotate(${rotate}deg)`;
}

document.getElementById("rightRotate").onclick=()=>{
    rotate+=90;
    preview.style.transform=`rotate(${rotate}deg)`;
}
let scaleX=1;
let scaleY=-1;
document.getElementById("flipHorizontally").onclick=()=>{
    scaleX*=-1;
    preview.style.transform=`rotate(${rotate}deg) scale(${scaleX},${scaleY})`;
}
document.getElementById("flipVertically").onclick=()=>{
    scaleY*=-1;
    preview.style.transform=`rotate(${rotate}deg)  scale(${scaleX},${scaleY})`;
}

document.getElementById("resFil").onclick=()=>{
    preview.style.filter="none";
    preview.style.transform="none";
    slid.value=100;
    
}
document.getElementById("but2").onclick = () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    let img = new Image();  // Create a new image element
    img.src = preview.src;  // Assign the current preview image source

    img.onload = () => {   // Wait for the image to fully load
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.filter = preview.style.filter;  // Apply filters
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);  // Draw the image

        let link = document.createElement("a");
        link.download = "edited_image.png";
        link.href = canvas.toDataURL("image/png");  // Convert to PNG URL
        link.click();  // Trigger download
    };
};
