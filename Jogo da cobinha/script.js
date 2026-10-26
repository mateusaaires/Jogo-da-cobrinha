
const jogo = document.getElementById("jogo");
const pontosTexto = document.getElementById("pontos");
const gameover = document.getElementById("gameover");
const finalTexto = document.getElementById("final");

const tamanho = 20;
const quantidade = 20;

let cobra = [{ x: 5, y: 5 }];
let direcao = { x: 1, y: 0 };
let pontos = 0;
let acabou = false;

let comida = {
    x: 12,
    y: 8
};

function desenhar() {
    jogo.innerHTML = "";

    cobra.forEach(function (parte) {
        const quadrado = document.createElement("div");

        quadrado.className = "cobra";
        quadrado.style.left = parte.x * tamanho + "px";
        quadrado.style.top = parte.y * tamanho + "px";

        jogo.appendChild(quadrado);
    });

    const vermelho = document.createElement("div");

    vermelho.className = "comida";
    vermelho.style.left = comida.x * tamanho + "px";
    vermelho.style.top = comida.y * tamanho + "px";

    jogo.appendChild(vermelho);
}

function criarComida() {
    do {
        comida.x = Math.floor(Math.random() * quantidade);
        comida.y = Math.floor(Math.random() * quantidade);
    } while (
        cobra.some(parte =>
            parte.x === comida.x && parte.y === comida.y
        )
    );
}

function mover() {
    if (acabou) return;

    const cabeca = {
        x: cobra[0].x + direcao.x,
        y: cobra[0].y + direcao.y
    };

    if (
        cabeca.x < 0 || cabeca.x >= quantidade ||
        cabeca.y < 0 || cabeca.y >= quantidade
    ) {
        terminar();
        return;
    }

    const comeu =
        cabeca.x === comida.x && cabeca.y === comida.y;

    const corpo = comeu ? cobra : cobra.slice(0, -1);

    if (corpo.some(parte =>
        parte.x === cabeca.x && parte.y === cabeca.y
    )) {
        terminar();
        return;
    }

    cobra.unshift(cabeca);

    if (comeu) {
        pontos++;
        pontosTexto.textContent = pontos;
        criarComida();
    } else {
        cobra.pop();
    }

    desenhar();
}

function terminar() {
    acabou = true;
    finalTexto.textContent = pontos;
    gameover.style.display = "block";
}

document.addEventListener("keydown", function (evento) {
    if (acabou) return;

    if (evento.key === "ArrowUp" && direcao.y !== 1) {
        direcao = { x: 0, y: -1 };
    } else if (evento.key === "ArrowDown" && direcao.y !== -1) {
        direcao = { x: 0, y: 1 };
    } else if (evento.key === "ArrowLeft" && direcao.x !== 1) {
        direcao = { x: -1, y: 0 };
    } else if (evento.key === "ArrowRight" && direcao.x !== -1) {
        direcao = { x: 1, y: 0 };
    }
});

desenhar();
setInterval(mover, 150);