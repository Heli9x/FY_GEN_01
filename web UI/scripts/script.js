class DragnDrop{
    container = document.querySelector('#dropZone');
    fileInput = document.querySelector('#fileInput');
    fileNameDisplay = document.querySelector('#fileNameInput');
    fileName = document.querySelector('#fileName');
    file = undefined;

    activateDragnDrop(){
        this.container.addEventListener('click', () => fileInput.click());
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.container.classList.add('dragover');
        });

        this.container.addEventListener('dragleave', () => {
            this.container.classList.remove('dragover');
        });

        this.container.addEventListener('drop', (e) => {
            e.preventDefault();
            this.container.classList.remove('dragover');

            const files = e.dataTransfer.files;
            if (this.handleFile(files[0])) {
                if(files.length > 0){
                    this.file = files.length>0? files[0] : undefined;
                }
            }

        });

        // Handle file input change
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                this.handleFile(fileInput.files[0]);
            }
        });
    }

    handleFile(file) {
        if(file.name.split('.')[1] != 'csv'){
            this.fileName.innerHTML = "Only csv files allowed"
            this.file = undefined;
            console.log('only csv files allowed');
            console.log(file.name);
            return false
        }
        else {
            this.fileName.innerHTML = file.name;
            return file.name
        }
    }
}

const dND = new DragnDrop();
dND.activateDragnDrop();

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const convertBtn = document.querySelector('#submit');
const downloadBtn = document.querySelector('#download')
const fileName  = document.querySelector('#fileNameInput');
fileName.setAttribute("readonly", "True")
const fileType = document.querySelector('#fileType');
const dupesList = document.querySelector("#dupes");

//convert file
convertBtn.addEventListener('click', async()=>{

    fileName.value = "data"+generateRandomString(7);
    const formData = new FormData();
    formData.append('file', dND.file);
    formData.append('filename', fileName.value);
    formData.append('fileType', fileType.value);


    if(dND.file && fileType.value != "type"){
        await fetch(subLinks["upload"], {
        method: 'POST',
        body: formData
        })
        .then(res =>{
            if(!res.ok){
                throw new Error(`Error Occured: ${res.status}`)
            }
            return res.json();
        })
        .then(data =>{
            if(Object.keys(data["dupes"]).length > 0){
                console.log(document.querySelector('.component.dupes').classList);
                document.querySelector('.component.dupes').classList.remove('hide');
            }
            Object.keys(data["dupes"]).forEach(key => {
                newDupe = document.createElement('div');
                newDupe.classList += 'tag';
                newDupe.innerHTML = key;
                dupesList.appendChild(newDupe);
            });
            downloadBtn.classList.remove('hide');
            downloadBtn.setAttribute("data-file-name", `${fileName.value}.${fileType.value}`)
            convertBtn.classList.add('hide');
        })
        .catch(error =>{
            console.error('Upload error: ', error);
        })
    }
    else{
        console.log("Error processing the data...");
    }
})

downloadBtn.addEventListener("click", async ()=>{
    if(fileName.value == downloadBtn.getAttribute("data-file-name").split(".")[0]){
        window.location.href = `${subLinks["download"]}/${downloadBtn.getAttribute("data-file-name")}`;
        setTimeout(()=>{
            location.reload();
        }, 1000)
    }

    else{
        console.error(new Error("Can't process request at the moment..."));
    }

})


