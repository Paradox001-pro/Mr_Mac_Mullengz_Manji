var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/paradox-conceptz/upload';

var CLOUDINARY_UPLOAD_PRESET = 'mk0trqn4'


    // var Cloudinary::Uploader.upload("my_image.jpg", :use_filename => true, :unique_filename => false)




var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');


fileUpload.addEventListener('change', (event)  => {
    // event.preventDefault();
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    // console.log(file);


    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then( (res) => {
        console.log(res)
        imgPreview.src = res.data.secure_url;
    }).catch( (err) => {
        console.error(err)
    })
})