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

        eleFile11 = document.getElementById('file11'),
        img1 = document.getElementById('img1'),
        eleFile21 = document.getElementById('file21'),
        img2 = document.getElementById('img2'),
        eleFile31 = document.getElementById('file31'),
        img3 = document.getElementById('img3'),
        eleFile41 = document.getElementById('file41'),
        img4 = document.getElementById('img4'),
        eleUpload3 = document.getElementById('upload3'),
        eleProgress3 = document.getElementById('progress3'),

        uploader = FUploader(),
        uploader2 = MUploader(),
        uploader3 = SMUploader();

    uploader.init(eleFile, preview, eleProgress);

    uploader2.init([{file: eleFile1, preview: preview1},
        {file: eleFile2, preview: preview2},
        {file: eleFile3, preview: preview3},
        {file: eleFile4, preview: preview4}], eleProgress2);

    uploader3.init([{file: eleFile11, preview: img1},
        {file: eleFile21, preview: img2},
        {file: eleFile31, preview: img3},
        {file: eleFile41, preview: img4}], eleProgress3);

    // URL file uploader
    var url = 'http://localhost:3123/api/v1/files/';

    eleUpload.onclick= function onClick(evt) {
        evt.preventDefault();
        var data = {};//Object.create(null);
        data.valor1 = 'valor 1';
        data.valor2 = 'valor 2';
        data.valor3 = 'valor 3';
        data.valor4 = 'valor 4';
        uploader.upload(url, data).then(
            function fulfilled(data){
                console.log('Promise OK', JSON.parse(data));
            }, 
            function rejected(err) {
                console.log('Promise Error', err);
            }
        );
    };

    eleUpload2.onclick= function onClick(evt) {
        evt.preventDefault();
        var data = {};//Object.create(null);
        data.valor1 = 'valor 1';
        data.valor2 = 'valor 2';
        data.valor3 = 'valor 3';
        data.valor4 = 'valor 4';
        uploader2.upload(url, data).then(
            function fulfilled(data){
                console.log('Promise Multi OK', JSON.parse(data));
            }, 
            function rejected(err) {
                console.log('Promise Multi Error', err);
            }
        );
    };

    eleUpload3.onclick= function onClick(evt) {
        evt.preventDefault();
        var data = {};//Object.create(null);
        data.valor1 = 'valor 1';
        data.valor2 = 'valor 2';
        data.valor3 = 'valor 3';
        data.valor4 = 'valor 4';
        uploader3.upload(url, data).then(
            function fulfilled(data){
                console.log('Promise Single Multi OK', JSON.parse(data));
            }, 
            function rejected(err) {
                console.log('Promise Single Multi Error', err);
            }
        );
    };
})();