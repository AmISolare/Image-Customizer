// General DOM Elements
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tabContent');

// Tab Switching Logic
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Hide all tab contents
        tabContents.forEach(content => content.style.display = 'none');
        // Activate selected tab and content
        tab.classList.add('active');
        tabContents[index].style.display = 'block';
    });
});

// Image Hue Adjustment
const imageInput = document.getElementById('imageInput');
const image = document.getElementById('image');
const hueRange = document.getElementById('hueRange');
const downloadButton = document.getElementById('downloadButton');

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            image.src = reader.result; // Load the image into the <img> element
            image.style.display = 'block'; // Ensure the image is visible
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});

hueRange.addEventListener('input', () => {
    const hueValue = hueRange.value;
    image.style.filter = `hue-rotate(${hueValue}deg)`; // Apply hue adjustment
});

downloadButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.filter = `hue-rotate(${hueRange.value}deg)`; // Apply the same filter
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = 'hue-adjusted-image.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Invert Colors
const imageInput2 = document.getElementById('imageInput2');
const image2 = document.getElementById('image2');
const invertColorsButton = document.getElementById('invertColors');
const downloadButtonInvert = document.getElementById('downloadButtonInvert');

imageInput2.addEventListener('change', () => {
    const file = imageInput2.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            image2.src = reader.result; // Load the image into the <img> element
            image2.style.display = 'block'; // Ensure the image is visible
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});

invertColorsButton.addEventListener('click', () => {
    image2.style.filter = `invert(1)`; // Apply inversion filter
});

downloadButtonInvert.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image2.width;
    canvas.height = image2.height;

    ctx.filter = `invert(1)`; // Apply the same inversion filter
    ctx.drawImage(image2, 0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = 'inverted-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
