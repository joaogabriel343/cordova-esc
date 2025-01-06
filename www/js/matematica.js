
const respostasCorretas = {
    1: ['A', 'B', 'B'], 
    2: ['A', 'B', 'A']  
};

let respostasCorretasNivel1 = 0;
let respostasCorretasNivel2 = 0;
let totalPerguntasRespondidasNivel1 = 0;
let totalPerguntasRespondidasNivel2 = 0;

function checkAnswer(nivel, resposta) {
    if (nivel === 1) {
        totalPerguntasRespondidasNivel1++;
        if (resposta === respostasCorretas[1][totalPerguntasRespondidasNivel1 - 1]) {
            respostasCorretasNivel1++;
        }

        if (totalPerguntasRespondidasNivel1 === 3) {
            const porcentagemAcertos = (respostasCorretasNivel1 / 3) * 100;
            if (porcentagemAcertos >= 60) {
                alert('Parabéns, você passou! Nível 2 desbloqueado!!');
                document.getElementById('nivel-1').style.display = 'none';
                document.getElementById('nivel-2').style.display = 'block'; 
            } else {
                alert('Tente novamente para desbloquear o nível 2!!');
                respostasCorretasNivel1 = 0;
                totalPerguntasRespondidasNivel1 = 0;
            }
        }
    } else if (nivel === 2) {
        totalPerguntasRespondidasNivel2++;
        if (resposta === respostasCorretas[2][totalPerguntasRespondidasNivel2 - 1]) {
            respostasCorretasNivel2++;
        }

        if (totalPerguntasRespondidasNivel2 === 3) {
            const porcentagemAcertos = (respostasCorretasNivel2 / 3) * 100;
            if (porcentagemAcertos >= 60) {
                alert('Parabéns, você passou! Nível 3 desbloqueado!!');
                document.getElementById('nivel-2').style.display = 'none';
            } else {
                alert('Tente novamente para desbloquear o nível 3!!');
                respostasCorretasNivel2 = 0;
                totalPerguntasRespondidasNivel2 = 0;
            }
        }
    }
}








window.addEventListener('load', () => {
    // Seleciona o conteúdo do header
    const headerContent = document.querySelector('.header-content');
    const h2 = document.querySelector('h2');
    const h1 = document.querySelector('h1');
    const p = document.querySelector('p');

    // Adiciona a classe "visible" após o carregamento da página
    setTimeout(() => {
        headerContent.classList.add('visible');
        h2.classList.add('visible');
        h1.classList.add('visible');
        p.classList.add('visible');
    }, 500); // Delay de 500ms antes de iniciar a animação
});












