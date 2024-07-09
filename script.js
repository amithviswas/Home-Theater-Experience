const mediaUrls = [
    'https://assets.codepen.io/3421562/lavalamp.mp4',
    'https://assets.codepen.io/3421562/onepunch.mp4',
    'https://assets.codepen.io/3421562/spiderverse.mp4',
    'https://assets.codepen.io/3421562/PlayStation+5++Startup.mp4',
    '',
];

let currentIndex = 0;

let preloadedVideos = {};
function preloadVideo(url) {
    if (!preloadedVideos[url]) {
        const video = document.createElement('video');
        video.src = url;
        video.type = 'video/mp4';
        video.preload = 'auto';
        video.style.display = 'none';
        document.body.appendChild(video);
        preloadedVideos[url] = true;
    }
}

function swapMedia() {
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';
    const url = mediaUrls[currentIndex];
    const nextUrl = mediaUrls[(currentIndex + 1) % mediaUrls.length];
    const isImg = /\.(jpg|jpeg|png|gif)$/i.test(url);
    for (let i = 0; i < 4; i++) {
        if (isImg) {
            const img = document.createElement('img');
            img.src = url;
            mediaContainer.appendChild(img);
        } else {
            const video = document.createElement('video');
            const source = document.createElement('source');
            source.src = url;
            source.type = 'video/mp4';
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            ( i > 0 ) ? video.style.opacity = currentOpacity : '';
            video.appendChild(source);
            mediaContainer.appendChild(video);
            preloadVideo(nextUrl);
        }
    }
    currentIndex = (currentIndex + 1) % mediaUrls.length;
}
let ps5 = document.querySelector(".ps5");
document.querySelector("#media-container").addEventListener('click', (e)=>{
    e.preventDefault();
    if (ps5.classList.contains("on")) {
        ps5.classList.remove('on');
        currentIndex = 0;
    }
    (currentIndex == 3) ? currentIndex++ : '';
    swapMedia();
});
ps5.addEventListener('click', ()=>{
    if (ps5.classList.contains("on")) {
        ps5.classList.remove('on');
        currentIndex = 4;
        swapMedia();
    } else {
        ps5.classList.add('on');
        currentIndex = 3;
        swapMedia();
    }
});


let currentOpacity = 1;
document.querySelector("input#opacity").addEventListener("input", (e) => {
    currentOpacity = e.target.value;
    let bgTarget = document.querySelectorAll("video");
    for (let i = 1; i < bgTarget.length; i++) {
        bgTarget[i].style.opacity = currentOpacity;
    }
});


const d = new Date();
const hr = d.getHours() % 12 || 12;
const min = d.getMinutes().toString().padStart(2, '0');
document.querySelector(".display").innerHTML = `${hr}:${min}`;