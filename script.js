// Vetores

let musicas = [
    {titulo: 'Runaway', artista: 'Aurora'
    ,src: 'musicas/AURORA - Runaway_d_HlPboLRL8.mp3', img: 'imagens/Aurora.jpg'},
    {titulo: 'Come A Little Close', artista: 'Cage The Elephant'
    ,src: 'musicas/Cage The Elephant - Come A Little Closer (Official Video)_KVYup3Qwh8Q.mp3', img: 'imagens/Cage.jpg'},
    {titulo: 'Heaven Knows I Am Miserable Now' , artista: 'The Smiths'
    ,src: 'musicas/The Smiths.mp3', img: 'imagens/The Smiths.jpg'}
];

//Variaveis Globais

let musica = document.querySelector('audio');
let indexMusica = 0; 
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// Lista de Eventos do JavaScript
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
musica.addEventListener('loadeddata', duration);
document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if(indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});
document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if(indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});


// Lista de funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor(( musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function duration() {
    let duracaoMusica = document.querySelector('.fim');
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos/60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' + campoSegundos;
}

