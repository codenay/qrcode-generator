const genBtn = document.querySelector("#generate-btn");
const qrImage = document.querySelector('.qr-image');
const inputField = document.querySelector('.input-field');
const downloadBtn = document.querySelector('.download-btn');


genBtn.addEventListener('click', () => {
    let inputText = inputField.value;
    if(!inputText) return
    genBtn.innerText = 'Generating qrcode...';

    qrImage.src = ` https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${inputText}`;
    qrImage.addEventListener("load", () => {
        qrImage.classList.remove('hidden');
        genBtn.innerText = 'Generate';
        downloadBtn.classList.remove('hidden');
    })
   
})

