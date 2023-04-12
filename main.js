const genBtn = document.querySelector("#generate-btn");
const qrImage = document.querySelector('.qr-image');
const inputField = document.querySelector('.input-field');
const downloadBtn = document.querySelector('.download-btn');
const pasteBtn = document.querySelector('.paste');


//generate QRcode from user input
genBtn.addEventListener('click', () => {
    let inputText = inputField.value;
    if(!inputText) return
    genBtn.innerText = 'Generating qrcode...';

    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${inputText}`;
    qrImage.addEventListener("load", () => {
        qrImage.classList.remove('hidden');
        genBtn.innerText = 'Generate';
        downloadBtn.classList.remove('hidden');
    })
   
})


//clear qrcode when input is empty
inputField.addEventListener('keyup', () => {
    if(!inputField.value){
        qrImage.classList.add('hidden');
        downloadBtn.classList.add('hidden');
    }
})

//paste data into input field from clipboard
pasteBtn.addEventListener('click', async () =>{
        const READ = await navigator.clipboard.readText()
        inputField.value = READ
})


//download qrcode to local device
function downloadFile(url, fileName) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], {type: "application/octet-stream"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    xhr.send();
  }

downloadBtn.addEventListener("click", function() {
    downloadFile(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${inputField.value}`, "qrcode.png");
  });