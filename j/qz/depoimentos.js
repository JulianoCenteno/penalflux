/* PenalFlux · depoimentos mostrados nos quizzes (carrossel antes da oferta e faixa junto do pagamento).
   Use só depoimentos reais, com autorização, e apague telefone e foto de quem não autorizou.

   Dois formatos (pode misturar):
     { print: '/j/qz/depo/maria.webp' }                               → print de WhatsApp/Instagram
     { nome: 'Maria S.', info: 'Concurso PC-SP', texto: 'O verbo-chave mudou meu jeito de estudar.', foto: '/j/qz/depo/maria-foto.webp' }

   Enquanto a lista estiver vazia, a seção não aparece para os visitantes.
   Para ver como fica com os cards de exemplo, abra o quiz com ?ver=depoimentos no fim do link. */
window.PF_DEPOIMENTOS = [
];

/* Vídeo do app por dentro (opcional). Com um link de vídeo MP4 vertical aqui, ele substitui as telas animadas.
   Exemplo: window.PF_VIDEO_APP = '/j/qz/app/video.mp4'; */
window.PF_VIDEO_APP = '';
