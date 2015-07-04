var FUploader = (function IIFE() {
    'use strict';

    function createImagePreview(file, imgTag) {
        var reader = new FileReader();

        reader.onload = function loadImage(evt) {
            //console.log('onload file', evt.target.result);
            imgTag.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    }

    function init(inputFile, preview, progress) {
        this.inputFile = inputFile;
        this.preview = preview;
        this.progress = progress;
        this.progress.value = 0;
        this.inputFile.onchange = onFilesSelecteds.bind(this);
        //console.log(inputFile, preview, progress);
    }

    function listFilesSelected() {
        if(this.inputFile && this.inputFile.files && this.preview) {

            while (this.preview.firstChild) {
                this.preview.removeChild(this.preview.firstChild);
            }

            for(var i = 0; i < this.inputFile.files.length; i++) {
                var file = this.inputFile.files[i];
                //console.log(i+'>' , file.name);
                var img = document.createElement('img');
                img.width = '100';
                img.alt = 'preview ' + file.name;
                this.preview.appendChild(img);
                createImagePreview(file, img);
            }
        }
    }

    function uploadData(url, data, resolve, reject) {

        var fire = false;
        var formData = new FormData();

        if(this.inputFile && this.inputFile.files) {

            for(var i = 0; i < this.inputFile.files.length; i++) {
                var file = this.inputFile.files[i];
                if(!file.type.match('image.*')) {
                    continue;
                }
                formData.append('images', file, file.name);
                fire = true;
            }
        }

        if(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    formData.append(key, data[key]);
                    fire = true;
                }
            }
        }

        if(fire) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);

            xhr.upload.addEventListener('progress', onXHRProgress.bind(this), false);
            //xhr.upload.addEventListener('load', onXHRLoad.bind(this, resolve), false);
            xhr.upload.addEventListener('error', onXHRError.bind(this, reject), false);
            xhr.upload.addEventListener('abort', onXHRAbort.bind(this, reject), false);
            xhr.addEventListener('load', onXHRLoad.bind(this, resolve), false);
            xhr.addEventListener('error', onXHRError.bind(this, reject), false);
            xhr.addEventListener('abort', onXHRAbort.bind(this, reject), false);

            try {
                xhr.send(formData);
            }
            catch(err) {
                reject(err);
            }
            
        }
        else {
            reject(new Error('No data to upload'));
        }
    }

    function upload(url, data) {
        var fn = uploadData.bind(this);
        return new Promise(function executor(resolve, reject) {
            fn(url, data, resolve, reject);
        });
    }

    function onXHRLoad(resolve, evt) {
        //console.log('Files loaded!', resolve, evt);
        if(this.progress) {
            this.progress.value = 1;
        }
        resolve(evt.target.response);
    }

    function onXHRError(reject, evt) {
        //console.log('Error on upload', reject, evt);
        reject(evt);
    }

    function onXHRAbort(reject, evt) {
        //console.log('Abort Uploader', reject, evt);
        reject(evt);
    }

    function onXHRProgress(evt) {
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            //console.log('Current Progress: ', percentComplete);
            if(this.progress) {
                this.progress.value = percentComplete;
            }
        } else {
            // Unable to compute progress information since the total size is unknown
            //console.log('Uncomputable progress');
            if(this.progress) {
                this.progress.value = '-1';
            }
        }
    }

    function onFilesSelecteds() {
        //console.log('Files changed');
        listFilesSelected.call(this);
    }

    var Uploader = {
        init: init,
        list: listFilesSelected,
        upload: upload
    };

    return function createUploader() {
        var uploader = Object.create(Uploader);
        return uploader;
    };
})();