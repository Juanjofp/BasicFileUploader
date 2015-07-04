var MUploader = (function IIFE() {
    'use strict';

    function createImagePreview(file, imgTag) {
        var reader = new FileReader();

        reader.onload = function loadImage(evt) {
            console.log('onload file', evt.target.result);
            imgTag.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    }

    function init(dataElements, progress) {
        this.eleFiles = dataElements;
        this.progress = progress;
        this.progress.value = 0;
        for(var i = 0; i < this.eleFiles.length; ++i) {
            var inputFile = this.eleFiles[i].file;
            inputFile.onchange = onFilesSelecteds.bind(this);
            console.log(inputFile);
        }
    }

    function listFilesSelected(inputTarget) {
        if(this.eleFiles && this.eleFiles.length > 0) {
            for(var j = 0; j < this.eleFiles.length; j++) {

                console.log('Matchibg', inputTarget, this.eleFiles[j]);
                if(inputTarget !== this.eleFiles[j].file) {
                    continue;
                }

                var inputFile = this.eleFiles[j].file;
                var preview = this.eleFiles[j].preview;
                if(inputFile && inputFile.files && preview) {

                    while (preview.firstChild) {
                        preview.removeChild(preview.firstChild);
                    }

                    for(var i = 0; i < inputFile.files.length; i++) {
                        var file = inputFile.files[i];
                        console.log(i+'>' , file.name);
                        var img = document.createElement('img');
                        img.width = '100';
                        img.alt = 'preview ' + file.name;
                        preview.appendChild(img);
                        createImagePreview(file, img);
                    }
                }
            }
        }
    }

    function upload(url, data) {
        var formData = new FormData();
        var fire = false;

        if(this.eleFiles && this.eleFiles.length > 0) {
            for(var j = 0; j < this.eleFiles.length; j++) {
                var inputFile = this.eleFiles[j].file;
                if(inputFile && inputFile.files) {
                    for(var i = 0; i < inputFile.files.length; i++) {
                        var file = inputFile.files[i];
                        if(!file.type.match('image.*')) {
                            continue;
                        }
                        console.log('Encapsulando file: ', inputFile.name, file, file.name);
                        formData.append(inputFile.name, file, file.name);
                        fire = true;
                    }
                }
            }
        }

        if(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    console.log('Encapsulando: ', key, data[key]);
                    formData.append(key, data[key]);
                    fire = true;
                }
            }
        }

        if(fire) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);

            xhr.upload.addEventListener('progress', onXHRProgress.bind(this), false);
            xhr.upload.addEventListener('load', onXHRLoad.bind(this), false);
            xhr.upload.addEventListener('error', onXHRError.bind(this), false);
            xhr.upload.addEventListener('abort', onXHRAbort.bind(this), false);

            xhr.send(formData);
        }
    }

    function onXHRLoad(evt) {
        console.log('Files loaded!', evt);
        if(this.progress) {
            this.progress.value = 1;
        }
    }

    function onXHRError(evt) {
        console.log('Error on upload', evt);
    }

    function onXHRAbort(evt) {
        console.log('Abort Uploader', evt);
    }

    function onXHRProgress(evt) {
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            console.log('Current Progress: ', percentComplete);
            if(this.progress) {
                this.progress.value = percentComplete;
            }
        } else {
            // Unable to compute progress information since the total size is unknown
            console.log('Uncomputable progress');
            if(this.progress) {
                this.progress.value = '-1';
            }
        }
    }

    function onFilesSelecteds(evt) {
        console.log('onclick', evt);
        evt.preventDefault();
        console.log('Files changed');
        listFilesSelected.call(this, evt.target);
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