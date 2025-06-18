// Variáveis do jogo
let polinizadorX;
let polinizadorY;
let velocidadePolinizador = 5;
let flores = [];
let obstaculos = [];
let pontuacao = 0;
let tempoJogo = 6000; // 60 segundos (60 frames por segundo * 60 segundos)

// --- Função setup() ---
// É executada apenas uma vez no início.
function setup() {
    // Cria um canvas (tela de desenho) com 800 pixels de largura por 600 de altura
    createCanvas(800, 600);
    // Define a posição inicial do polinizador no centro da tela
    polinizadorX = width / 2;
    polinizadorY = height / 2;

    // Cria algumas flores e obstáculos iniciais (você pode gerar mais durante o jogo)
    for (let i = 0; i < 5; i++) {
        flores.push(criarFlor());
        obstaculos.push(criarObstaculo());
    }
}

// --- Função draw() ---
// É executada continuamente, cerca de 60 vezes por segundo (cria a animação).
function draw() {
    // Desenha o fundo do cenário (um céu azul claro)
    background(135, 206, 235); // Cor azul claro

    // Diminui o tempo de jogo
    tempoJogo--;

    // Desenha o chão verde (gramado)
    fill(124, 252, 0); // Cor verde grama
    rect(0, height - 100, width, 100);

    // Movimenta o polinizador de acordo com as teclas pressionadas
    movimentarPolinizador();
    // Desenha o polinizador (um círculo amarelo para começar)
    fill(255, 204, 0); // Cor amarela
    ellipse(polinizadorX, polinizadorY, 30, 30); // Círculo de 30x30 pixels

    // Desenha e atualiza as flores
    for (let i = 0; i < flores.length; i++) {
        desenharFlor(flores[i]);
        // Verifica colisão com o polinizador
        if (dist(polinizadorX, polinizadorY, flores[i].x, flores[i].y) < 25) {
            pontuacao += 10; // Aumenta a pontuação
            flores.splice(i, 1); // Remove a flor coletada
            flores.push(criarFlor()); // Adiciona uma nova flor
        }
    }

    // Desenha e atualiza os obstáculos
    for (let i = 0; i < obstaculos.length; i++) {
        desenharObstaculo(obstaculos[i]);
        // Move o obstáculo (ex: para baixo, simulando que ele se aproxima)
        obstaculos[i].y += obstaculos[i].velocidade;
        // Se o obstáculo sair da tela, recria ele em cima
        if (obstaculos[i].y > height) {
            obstaculos[i] = criarObstaculo();
        }

        // Verifica colisão com o polinizador
        if (dist(polinizadorX, polinizadorY, obstaculos[i].x, obstaculos[i].y) < 30) {
            pontuacao -= 5; // Perde pontos
            // Você pode adicionar um som ou efeito visual aqui
            obstaculos[i] = criarObstaculo(); // Recria o obstáculo após a colisão
        }
    }

    // Exibe a pontuação
    fill(0); // Cor preta para o texto
    textSize(24);
    text('Pontos: ' + pontuacao, 10, 30);

    // Exibe o tempo restante
    let segundosRestantes = floor(tempoJogo / 60); // Converte frames para segundos
    text('Tempo: ' + segundosRestantes, 10, 60);

    // Verifica se o jogo acabou
    if (tempoJogo <= 0) {
        fimDeJogo();
    }
}

// --- Funções Auxiliares ---

function movimentarPolinizador() {
    if (keyIsDown(LEFT_ARROW)) {
        polinizadorX -= velocidadePolinizador;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        polinizadorX += velocidadePolinizador;
    }
    if (keyIsDown(UP_ARROW)) {
        polinizadorY -= velocidadePolinizador;
    }
    if (keyIsDown(DOWN_ARROW)) {
        polinizadorY += velocidadePolinizador;
    }

    // Garante que o polinizador não saia da tela
    polinizadorX = constrain(polinizadorX, 15, width - 15);
    polinizadorY = constrain(polinizadorY, 15, height - 15);
}

function criarFlor() {
    return {
        x: random(width), // Posição X aleatória
        y: random(height - 150), // Posição Y aleatória (evita o chão)
        tamanho: random(15, 25)
    };
}

function desenharFlor(flor) {
    fill(255, 100, 100); // Cor vermelha para a flor
    ellipse(flor.x, flor.y, flor.tamanho, flor.tamanho);
    fill(255, 255, 0); // Miolo amarelo
    ellipse(flor.x, flor.y, flor.tamanho * 0.4, flor.tamanho * 0.4);
}

function criarObstaculo() {
    return {
        x: random(width),
        y: random(-200, -50), // Começa acima da tela
        tamanho: random(40, 60),
        velocidade: random(1, 3)
    };
}

function desenharObstaculo(obstaculo) {
    fill(100, 100, 100, 150); // Cor cinza com transparência para "nuvem" ou "poluição"
    ellipse(obstaculo.x, obstaculo.y, obstaculo.tamanho, obstaculo.tamanho * 0.7);
    ellipse(obstaculo.x - obstaculo.tamanho / 3, obstaculo.y + obstaculo.tamanho / 4, obstaculo.tamanho * 0.7, obstaculo.tamanho * 0.7);
    ellipse(obstaculo.x + obstaculo.tamanho / 3, obstaculo.y + obstaculo.tamanho / 4, obstaculo.tamanho * 0.7, obstaculo.tamanho * 0.7);
}

function fimDeJogo() {
    noLoop(); // Para o loop do draw()
    background(50); // Fundo escuro
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('FIM DE JOGO!', width / 2, height / 2 - 30);
    textSize(32);
    text('Sua Pontuação: ' + pontuacao, width / 2, height / 2 + 20);
}function desenharFlor(flor) {
    // Desenha o caule
    stroke(34, 139, 34); // Cor verde para o caule
    strokeWeight(flor.tamanho * 0.1); // Espessura do caule proporcional ao tamanho da flor
    line(flor.x, flor.y, flor.x, flor.y + flor.tamanho * 1.5); // Linha vertical para o caule
    noStroke(); // Remove o contorno para as próximas formas

    // Desenha as folhas
    fill(60, 179, 113); // Cor verde mais clara para as folhas
    ellipse(flor.x - flor.tamanho * 0.5, flor.y + flor.tamanho * 0.5, flor.tamanho * 0.8, flor.tamanho * 0.4); // Folha esquerda
    ellipse(flor.x + flor.tamanho * 0.5, flor.y + flor.tamanho * 0.5, flor.tamanho * 0.8, flor.tamanho * 0.4); // Folha direita

    // Desenha as pétalas
    fill(255, 182, 193); // Cor rosa claro para as pétalas (pode mudar para roxo, vermelho, etc.)
    ellipse(flor.x, flor.y - flor.tamanho * 0.4, flor.tamanho * 0.7, flor.tamanho * 0.9); // Pétala superior
    ellipse(flor.x, flor.y + flor.tamanho * 0.4, flor.tamanho * 0.7, flor.tamanho * 0.9); // Pétala inferior
    ellipse(flor.x - flor.tamanho * 0.4, flor.y, flor.tamanho * 0.9, flor.tamanho * 0.7); // Pétala esquerda
    ellipse(flor.x + flor.tamanho * 0.4, flor.y, flor.tamanho * 0.9, flor.tamanho * 0.7); // Pétala direita

    // Desenha o miolo da flor
    fill(255, 255, 0); // Cor amarela para o miolo
    ellipse(flor.x, flor.y, flor.tamanho * 0.6, flor.tamanho * 0.6); // Miolo central
}