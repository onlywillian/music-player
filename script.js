const cover = document.getElementById("music-image");
const title = document.querySelector("h3");
const band = document.querySelector("p");
const music = document.getElementById("music-archive");
/* Image Variables */
const image = document.getElementById("image");
const imageLabel = document.querySelector(".user-image");
/* Controls Variables */
const audioPlayer = document.querySelector('audio');
const pauseAndPlay = document.getElementById("pause");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const controlsContainer = document.querySelector('.controls');
var allowNextAndPrevious = 0;/* Abilitando os cotroles */
var lastFile = 0;

/* Mudando a cor dos controles */
function updateControlColors() {
    if (allowNextAndPrevious === 0) {
        previous.style.color = 'rgb(192, 192, 192)';
    } else if (allowNextAndPrevious == lastFile) {
        next.style.color = 'rgb(192, 192, 192)';
    } else {
        previous.style.color = 'white';
        next.style.color = 'white';
    }
}
updateControlColors();

/* Atualizando os valores na tela */
var musicValue = 0;
function updateMusicData() {
    var fileData = music.files;
    fileName = fileData[musicValue].name;
    /* Adicionando detalhes */
    var pointCut = fileName.indexOf('.', 0);
    var musicName = fileName.substring(0, pointCut);
    var musicExtension = fileName.substring(pointCut);
    title.innerHTML = musicName;
    band.innerHTML = musicExtension;

    var caminho = URL.createObjectURL(fileData[musicValue]);/* Criando um caminho para o arquivo */
    var audioPlayer = document.querySelector('audio');
    audioPlayer.src = caminho;

    controlsContainer.style.visibility = 'visible';

    lastFile = music.files.length - 1;
    return lastFile;
}

/* Quando escolher os arquivos */
music.addEventListener('change', updateMusicData);

/* Todos os eventos dos botão */
var isPaused = false;
pauseAndPlay.addEventListener('click', () => {
    if (isPaused === false) {
        pauseAndPlay.innerHTML = "pause"
        audioPlayer.play()
        isPaused = true;
    } else {
        pauseAndPlay.innerHTML = "play_arrow"
        audioPlayer.pause()
        isPaused = false;
    }
})

next.addEventListener("click", () => {
    if (allowNextAndPrevious == lastFile) {
        return;
    } else {
        musicValue += 1;
        updateMusicData();
        allowNextAndPrevious += 1;
        updateControlColors();
    }
    
});

previous.addEventListener("click", () => {
    if (allowNextAndPrevious === 0) {
        return;
    } else {
        musicValue -= 1;
        updateMusicData();
        allowNextAndPrevious -= 1;
        updateControlColors();
    }
    
});

image.addEventListener("change", () => {
    var imageFile = image.files;
    console.log(imageFile);
    var caminho = URL.createObjectURL(imageFile[0]);

    var insertImage = document.createElement("img");
    const container = document.getElementById("background-player");
    container.prepend(insertImage);
    insertImage.src = caminho;
    image.remove();
    imageLabel.remove();
})