var container = document.querySelector('#container');
var panorama1 = new
    PANOLENS.ImagePanorama('picture/spring.jpg');
var panorama2 = new
    PANOLENS.ImagePanorama('picture/winter.jpg');
var panorama3 = new
    PANOLENS.ImagePanorama('picture/aurora.jpg');

var viewer = new PANOLENS.Viewer({ container: container });
viewer.add(panorama1, panorama2, panorama3);

var textureLoader = new THREE.TextureLoader();
var customInfospot = textureLoader.load('picture/next.png', function () {
var infospot = new PANOLENS.Infospot(500, 'picture/next.png');
infospot.position.set(0, -2000, -5000);
infospot.addEventListener('click', function () {
    panorama1.link(panorama2, infospot.position.set(0, -2000, -5000));
    panorama2.link(panorama3, infospot.position.set(0, -2000, -5000));
    panorama3.link(panorama1, infospot.position.set(0, -2000, -5000));
});
    panorama1.add(infospot);
});

var bar = document.querySelector('#bar');
function onProgressUpdate(event) {
    var percentage = event.progress.loaded / event.progress.total * 100;
    bar.style.width = percentage + "%";
    if (percentage >= 100) {
        bar.classList.add('hide');
        setTimeout(function () {
            bar.style.width = 0;
        }, 1000);
    }
}
function onButtonClick(targetPanorama) {
    bar.classList.remove('hide');
    viewer.setPanorama(targetPanorama);
}
panorama1.addEventListener('progress', onProgressUpdate);
panorama2.addEventListener('progress', onProgressUpdate);
panorama3.addEventListener('progress', onProgressUpdate);
