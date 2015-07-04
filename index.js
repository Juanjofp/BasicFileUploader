(function IIFE() {
    'use strict';

    // Recovery input file
    var eleFile = document.getElementById('file'),
        preview = document.getElementById('preview'),
        eleUpload = document.getElementById('upload'),
        eleProgress = document.getElementById('progress1'),

        eleFile1 = document.getElementById('file1'),
        preview1 = document.getElementById('preview1'),
        eleFile2 = document.getElementById('file2'),
        preview2 = document.getElementById('preview2'),
        eleFile3 = document.getElementById('file3'),
        preview3 = document.getElementById('preview3'),
        eleFile4 = document.getElementById('file4'),
        preview4 = document.getElementById('preview4'),
        eleUpload2 = document.getElementById('upload2'),
        eleProgress2 = document.getElementById('progress2'),

        uploader = FUploader(),
        uploader2 = MUploader();

    uploader.init(eleFile, preview, eleProgress);

    uploader2.init([{file: eleFile1, preview: preview1},
        {file: eleFile2, preview: preview2},
        {file: eleFile3, preview: preview3},
        {file: eleFile4, preview: preview4}], eleProgress2);

    // URL file uploader
    var url = 'http://localhost:3123/api/v1/files/';

    eleUpload.onclick= function onClick(evt) {
        evt.preventDefault();
        var data = {};//Object.create(null);
        data.valor1 = 'valor 1';
        data.valor2 = 'valor 2';
        data.valor3 = 'valor 3';
        data.valor4 = 'valor 4';
        uploader.upload(url, data);
    };

    eleUpload2.onclick= function onClick(evt) {
        evt.preventDefault();
        var data = {};//Object.create(null);
        data.valor1 = 'valor 1';
        data.valor2 = 'valor 2';
        data.valor3 = 'valor 3';
        data.valor4 = 'valor 4';
        uploader2.upload(url, data);
    };
})();