/// START VIDEO FRMO 28:00

// file-input is the class of the input field. 
const fileInput = document.querySelector(".file-input"), 
filterOptions = document.querySelectorAll(".filter button"), // this is for the filter buttons.  basically stores a nodelist. 
filterName = document.querySelector(".filter-info .name"), 
filterValue = document.querySelector(".filter-info .value"), 
filterSlider = document.querySelector(".slider input"), 
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".middle-block2 img"), // this is basically selecting img in the .middle-block2
resetFilterButton = document.querySelector(".reset-filters"),
saveImgBtn = document.querySelector(".save-image"),
chooseImageBtn = document.querySelector(".choose-image");

let brightness = 100, saturation =100, inversion =0, grayscale =0; 
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}

// adding click functionalities. 
chooseImageBtn.addEventListener("click", ()=> fileInput.click());

// now, when we write fileInput.click(), we're essentially calling the hidden button, which is there in the html.. 

// The above line will basically enable the "CHOOSE IMAGE" button. We can now use to it to click and choose images. 

// now, we'll define the load image function. 

// loadImage is a function which previews the file. 
const loadImage = () => {

    let file = fileInput.files[0]; // apparently, this is for getting the user selected file.
    if(!file) return ; // writing this above the console.log(file) will basically check if a file has been uploaded, before loggin anything. if we write this below the console.log(file), it'll basically log "undefined" even if nothing is uploaded. 
    
    // console.log(file); // we'd earlier used this for logging file, but now we're not.

    previewImg.src = URL.createObjectURL(file);
    // this is similar to doing this 
    // <img src="URL.createObjectURL(file)"></img> and the image here is the previewImg. 
    previewImg.addEventListener("load", ()=>{
        resetFilterButton.click(); 
        document.querySelector(".container").classList.remove("disable");
    });

    // This ^ is for removing the disable class, when the image is there. 
}
// Working on the filter buttons now 

// before getting into that, filterOptions is a nodeList & we can iterate over it. 
filterOptions.forEach((option)=> { 
    // option ^ here is basically the name given to the things returned by filterOptions
    option.addEventListener("click", () => { // adding click event listners to all filter buttons
        
        document.querySelector(".filter .active").classList.remove("active"); 
        option.classList.add("active"); 
        filterName.innerText = option.innerText;
        // filterValue.innerText = option.
        
        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else if (option.id === "grayscale"){ 
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    })
});

const updateFilter = () =>{
    // console.log(filterSlider.value); 
    filterValue.innerText = `${filterSlider.value}%`; 
    // alternatively, this could be done using 
    // filterValue.innerText = filterSlider.value + '%';

    const selectedFilter = document.querySelector(".filter .active");
    
    // changing the values of all the vairable according to what we want.
    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value; 
    }
    else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value; 
    }
    else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value; 
    }
    else if(selectedFilter.id === "grayscale"){
        grayscale = filterSlider.value; 
    }

    applyFilters(); 
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () =>{  
        // adding rotate/ flip functionalities to all the buttons 
        // console.log(icons);

        if(option.id === "left"){
            rotate -= 90; 
        }
        else if(option.id === "right"){
            rotate += 90; 
        }
        else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1? -1:1;
        }
        else{
            flipVertical = flipVertical === 1? -1:1;
        }
        applyFilters();
        
    });
});

// const resetFilter = () =>{
//     brightness = 100; saturation =100; inversion =0; grayscale =0;
//     rotate = 0; flipHorizontal = 1; flipVertical = 1;
//     filterOptions[0].click();  // what is this going to do?
//     // yeah so, this ^ is just so that brightness is selected at the end. 
//     applyFilters();
// }


const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // This is basically to
    applyFilters(); 
}

const saveImage = () =>{
    // console.log("save image button clicked");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth; 
    canvas.height = previewImg.naturalHeight; 

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.translate(canvas.width/2, canvas.height/2);

    if(rotate!== 0){
        ctx.rotate(rotate* Math.PI/180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    // document.body.appendChild(canvas); // this was for showing the image on the page. 
    const link = document.createElement("a"); 
    link.download = "image.jpg";
    link.href = canvas.toDataURL();    
    link.click(); 
}

fileInput.addEventListener("change", loadImage);
// alright, so this ^ is something different. The change is basically for the time when we change something in the input field. 
// So let's say we have "uploaded" an image through the button. 
// so now, that file will be logged as an image. 
// Now, if we upload the same file again, it won't log anything, cause it's just the same image. And we have an event listener for change. 
// And, if we upload a file, and then click again on the choose-image button, and upload nothing, "undefined" would be loaded. 

filterSlider.addEventListener("input", updateFilter);
// we could've used "change" here ^ instead of input, but then, if we had scrolled the slider, we wouldn't have been able to see the slider value update instantaneously. 

resetFilterButton.addEventListener("click", resetFilter);

saveImgBtn.addEventListener("click", saveImage);