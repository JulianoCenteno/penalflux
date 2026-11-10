/* PenalFlux: o conteúdo é entregue pelo servidor só para compradores logados. */
const AUDIOS=[{"f":"01-da-aplicao-da-lei-penal.mp3","t":"Título I: Da aplicação da lei penal","n":12,"d":625},{"f":"02-do-crime.mp3","t":"Título II: Do crime","n":13,"d":672},{"f":"03-da-imputabilidade-penal.mp3","t":"Título III: Da imputabilidade penal","n":3,"d":160},{"f":"04-do-concurso-de-pessoas.mp3","t":"Título IV: Do concurso de pessoas","n":3,"d":134},{"f":"05-das-penas.mp3","t":"Título V: Das penas","n":65,"d":3118},{"f":"06-das-medidas-de-segurana.mp3","t":"Título VI: Das medidas de segurança","n":4,"d":177},{"f":"07-da-ao-penal.mp3","t":"Título VII: Da ação penal","n":7,"d":346},{"f":"08-da-extino-da-punibilidade.mp3","t":"Título VIII: Da extinção da punibilidade","n":14,"d":774},{"f":"09-dos-crimes-contra-a-pessoa.mp3","t":"Título I: Dos crimes contra a pessoa","n":44,"d":2521},{"f":"10-dos-crimes-contra-o-patrimnio.mp3","t":"Título II: Dos crimes contra o patrimônio","n":33,"d":1841},{"f":"11-dos-crimes-contra-a-propriedade-imateria.mp3","t":"Título III: Dos crimes contra a propriedade imaterial","n":2,"d":125},{"f":"12-dos-crimes-contra-a-organizao-do-trabalh.mp3","t":"Título IV: Dos crimes contra a organização do trabalho","n":11,"d":670},{"f":"13-contra-o-sentimento-religioso-e-o-respei.mp3","t":"Título V: Contra o sentimento religioso e o respeito aos mortos","n":5,"d":358},{"f":"14-dos-crimes-contra-a-dignidade-sexual.mp3","t":"Título VI: Dos crimes contra a dignidade sexual","n":22,"d":1258},{"f":"15-dos-crimes-contra-a-famlia.mp3","t":"Título VII: Dos crimes contra a família","n":14,"d":799},{"f":"16-dos-crimes-contra-a-incolumidade-pblica.mp3","t":"Título VIII: Dos crimes contra a incolumidade pública","n":34,"d":1866},{"f":"17-dos-crimes-contra-a-paz-pblica.mp3","t":"Título IX: Dos crimes contra a paz pública","n":4,"d":211},{"f":"18-dos-crimes-contra-a-f-pblica.mp3","t":"Título X: Dos crimes contra a fé pública","n":24,"d":1414},{"f":"19-dos-crimes-contra-a-administrao-pblica.mp3","t":"Título XI: Dos crimes contra a administração pública","n":77,"d":4475},{"f":"20-dos-crimes-contra-o-estado-democrtico-de.mp3","t":"Título XII: Dos crimes contra o Estado Democrático de Direito","n":12,"d":645},{"f":"21-disposies-finais.mp3","t":"Disposições finais","n":2,"d":96}];

/* ================= ÍCONES ================= */
const ic=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC={
 hoje:ic('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>'),
 codigo:ic('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>'),
 mapa:ic('<circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 12h10M7 12l10-7M7 12l10 7"/>'),
 penas:ic('<path d="M12 3v18M7 21h10M5 8h14"/><path d="m5 8-2 6h4z"/><path d="m19 8-2 6h4z"/>'),
 cobrados:ic('<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>'),
 comparar:ic('<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>'),
 treinar:ic('<path d="m9 11 3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>'),
 pegadinhas:ic('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h0"/>'),
 cf:ic('<path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-7h6v7"/><path d="M4 9h16"/>'),
 conteudos:ic('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),
 ajustes:ic('<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>'),
 bell:ic('<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>'),
 search:ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
 back:ic('<path d="m15 18-6-6 6-6"/>'), chev:ic('<path d="m6 9 6 6 6-6"/>'),
 check:ic('<path d="M20 6 9 17l-5-5"/>'),
 lock:ic('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
 star:ic('<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>'),
 play:ic('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>'),
 copy:ic('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'),
 cards:ic('<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 2h12a2 2 0 0 1 2 2v12"/>'),
 spark:ic('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
 chat:ic('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>')
};
const sm=(k,s=14)=>IC[k].replace('<svg',`<svg width="${s}" height="${s}"`);

/* ================= DADOS DERIVADOS ================= */
const byN={};ARTS.forEach((a,i)=>{a.i=i;byN[a.n]=a;});
const crimes=ARTS.filter(a=>a.pena);
const TOP25=['1','13','14','18','20','23','25','26','28','29','121','121-A','129','138','147-A','155','157','158','171','180','213','312','316','317','333'].filter(n=>byN[n]);
const CMPS=[
 {id:'furto-roubo',t:'Furto ou roubo?',a:['155','157'],r:'Houve violência ou grave ameaça contra a pessoa? É roubo. Não houve? É furto.',s:'Pegou o celular da mesa sem ninguém ver. E se tivesse empurrado a vítima?'},
 {id:'concussao-corrupcao',t:'Exigiu, pediu ou ofereceu?',a:['316','317','333'],r:'Servidor exigiu: concussão. Servidor pediu ou recebeu: corrupção passiva. Particular ofereceu: corrupção ativa.',s:'O verbo é a resposta. É a comparação que mais cai em concurso.'},
 {id:'honra',t:'Calúnia, difamação ou injúria?',a:['138','139','140'],r:'Fato falso que é crime: calúnia. Fato que mancha a reputação: difamação. Xingamento sem fato: injúria.',s:'Os três crimes contra a honra lado a lado.'},
 {id:'roubo-extorsao',t:'Roubo ou extorsão?',a:['157','158'],r:'O criminoso pega a coisa? Roubo. Precisa que a vítima faça algo, como um Pix? Extorsão.',s:'Os dois têm violência ou ameaça. A diferença é quem age.'},
 {id:'furto-apropriacao',t:'Furto ou apropriação indébita?',a:['155','168'],r:'A vítima entregou a coisa antes, por vontade própria? Apropriação indébita. Não entregou? Furto.',s:'O notebook emprestado que nunca voltou.'},
 {id:'peculato-apropriacao',t:'Peculato ou apropriação?',a:['312','168'],r:'Tinha a posse do bem por causa de cargo público? Peculato. Era particular? Apropriação indébita.',s:'Mesma conduta, autor diferente.'},
 {id:'desacato-desobediencia',t:'Desacato ou desobediência?',a:['331','330'],r:'Ofendeu o servidor? Desacato. Não cumpriu a ordem legal? Desobediência.',s:'Os dois envolvem funcionário público em serviço.'},
 {id:'falsidades',t:'Documento falso ou conteúdo falso?',a:['297','299'],r:'A forma do documento é falsa ou foi adulterada? Falsificação (art. 297). O papel é verdadeiro e a informação é falsa? Falsidade ideológica (art. 299).',s:'Falsidade material e ideológica.'},
 {id:'estupro-importunacao',t:'Estupro ou importunação?',a:['213','215-A'],r:'Houve violência ou grave ameaça? Estupro. Ato sexual sem consentimento, sem violência ou ameaça? Importunação sexual.',s:'A presença de violência muda tudo.'},
 {id:'homicidio-feminicidio',t:'Homicídio ou feminicídio?',a:['121','121-A'],r:'A vítima é mulher e foi morta por razões da condição do sexo feminino? Feminicídio (art. 121-A). Nos demais casos, homicídio.',s:'Desde 2024 o feminicídio é crime autônomo.'}
].filter(c=>c.a.every(n=>byN[n]));
const ESPECIAIS=[
 {n:'Art. 33',l:'Lei de Drogas (11.343/06)',t:'Tráfico de drogas',k:'vender, transportar, guardar',s:'Produzir, vender, transportar, guardar ou fornecer droga sem autorização. O artigo tem 18 verbos.',pena:'Reclusão, de 5 a 15 anos, e 500 a 1.500 dias-multa.'},
 {n:'Art. 28',l:'Lei de Drogas (11.343/06)',t:'Porte para consumo pessoal',k:'trazer consigo para uso',s:'Ter droga para uso próprio. Não há pena de prisão.',pena:'Advertência, prestação de serviços à comunidade ou medida educativa.'},
 {n:'Art. 12',l:'Estatuto do Desarmamento (10.826/03)',t:'Posse irregular de arma de uso permitido',k:'possuir ou manter sob guarda',s:'Ter arma de uso permitido em casa ou no trabalho (sendo o responsável) em desacordo com a lei.',pena:'Detenção, de 1 a 3 anos, e multa.'},
 {n:'Art. 14',l:'Estatuto do Desarmamento (10.826/03)',t:'Porte ilegal de arma de uso permitido',k:'portar',s:'Andar com arma de uso permitido sem autorização. É inafiançável, salvo se a arma estiver registrada em nome do agente.',pena:'Reclusão, de 2 a 4 anos, e multa.'},
 {n:'Art. 24-A',l:'Lei Maria da Penha (11.340/06)',t:'Descumprir medida protetiva',k:'descumprir',s:'Desobedecer decisão judicial que deferiu medida protetiva de urgência. Em flagrante, só o juiz pode conceder fiança.',pena:'Reclusão, de 2 a 5 anos, e multa.'},
 {n:'Art. 306',l:'Código de Trânsito (9.503/97)',t:'Embriaguez ao volante',k:'conduzir alterado',s:'Dirigir com capacidade psicomotora alterada por álcool ou outra substância psicoativa.',pena:'Detenção, de 6 meses a 3 anos, multa e suspensão ou proibição de dirigir.'}
];
const UPDATES=[
 {d:'23/09/2026',l:'Lei 15.517/2026',t:'Furto e roubo de combustíveis',s:'Novo §10 no art. 155 (4 a 10 anos) e causas de aumento para subtração de petróleo, gás e combustíveis.',arts:['155','157']},
 {d:'04/05/2026',l:'Lei 15.397/2026',t:'Penas maiores para crimes patrimoniais',s:'Furto passa a 1 a 6 anos, roubo a 6 a 10, receptação a 2 a 6. Estelionato volta a ser de ação pública incondicionada.',arts:['155','157','171','180','180-A']},
 {d:'2026',l:'Outras leis de 2026',t:'Artigos alterados neste ano',s:'O PenalFlux marca com "Mudou em 2026" todo artigo alterado este ano.',arts:Object.keys(CHANGED).filter(n=>CHANGED[n]>='2026'&&byN[n])}
];
const PRODUCTS={
 basico:{tier:'entrada',name:'PenalFlux Básico',cover:'Básico',c:'#4E5A73',price:17,old:47,desc:`Todos os ${ARTS.length} dispositivos do Código Penal explicados pelo Método do Verbo-Chave.`,items:[`Do art. 1º ao 361: os ${ARTS.length} dispositivos em vigor, contando os artigos com letra`,'Verbo-chave, explicação simples e exemplo de cada um','Texto oficial atualizado até 2026','Acesso vitalício']},
 completo:{tier:'entrada',name:'PenalFlux Completo',cover:'Completo',c:'#0E1A33',price:37,old:147,desc:'Tudo do Básico, mais os simulados comentados, a tabela de penas, o mapa mental e as pegadinhas.',items:['Tudo do plano Básico','Os 25 artigos mais cobrados','Simulado comentado de Direito Penal (60 questões)','Simulado comentado da Constituição (40 questões)','Tabela completa de penas','Mapa mental do Código Penal','40 pegadinhas das principais bancas','Comparador de crimes e flashcards']},
 audio:{tier:'bump',name:'Resumos em áudio',cover:'Áudio',c:'#8A6A1F',price:12.9,desc:'Os 405 dispositivos narrados em português simples: 21 faixas, mais de 6 horas para ouvir onde estiver.',items:['21 faixas, uma por título do Código','Verbo-chave, explicação, pena e pegadinha','Toca com a tela bloqueada','Arquivos MP3 para baixar']},
 especiais:{tier:'bump',name:'Leis Penais Especiais',cover:'Leis especiais',c:'#7B1E2B',price:12.9,desc:'15 leis especiais (Drogas, Desarmamento, Maria da Penha, Trânsito, ECA e mais) pelo mesmo método, com e-book em PDF.',items:['15 leis, 253 dispositivos em vigor','Verbo-chave, explicação, pena e pegadinha','Quadros "Não confunda" em cada lei','E-book em PDF de 119 páginas']},
 verbos:{tier:'bump',name:'Mapa dos Verbos-Chave',cover:'Mapa dos verbos',c:'#C9631E',price:7.9,desc:'Os 241 crimes do Código em uma tabela para imprimir: verbo-chave, artigo e pena, separados por título.',items:['241 crimes em 1 tabela, por título','Verbo-chave, artigo e pena de cada crime','8 comparações "Não confunda" que mais caem','PDF de 20 páginas para imprimir']},
 cpp:{tier:'bump',name:'Processo Penal Essencial',cover:'Processo Penal',c:'#0E6E7A',price:9.9,desc:'Os 60 artigos do Código de Processo Penal que mais caem em prova, pelo mesmo método, com e-book em PDF.',items:['60 artigos do CPP mais cobrados','Palavra-chave, explicação e exemplo','Pegadinha de prova em cada artigo','E-book em PDF']},
 todos:{tier:'bump',name:'Leve todos os materiais',cover:'Todos',c:'#B8913A',price:21.9,old:30.7,desc:'Leis Penais Especiais + Mapa dos Verbos-Chave + Processo Penal Essencial, juntos com desconto.',items:['Leis Penais Especiais','Mapa dos Verbos-Chave','Processo Penal Essencial','Economia de R$ 8,80']},
 banco:{tier:'upsell',name:'Banco de Questões Infinito',cover:'Banco',c:'#22355F',price:47,desc:`Simulados novos a cada tentativa, gerados dos ${ARTS.length} dispositivos, com comentário em todas.`,items:['Simulado de 20 questões que nunca se repete','Questões de pena, verbo e situação','Comentário em todas as respostas']},
 mini:{tier:'downsell',of:'banco',name:'Simulado Diário',cover:'Diário',c:'#4A5F92',price:17,desc:'Um simulado novo de 10 questões por dia, com comentário.',items:['Simulado de 10 questões','Comentário nas respostas']},
 pro:{tier:'upsell',name:'PenalFlux Pro',cover:'Pro',c:'#1E7F5C',price:19.9,per:'/mês',desc:'Tutor que tira dúvidas na hora e alertas sempre que a lei muda.',items:['Tutor: pergunte qualquer dúvida de Penal','Alertas de mudança na lei','Novos conteúdos todo mês']},
 proanual:{tier:'downsell',of:'pro',name:'PenalFlux Pro Anual',cover:'Pro anual',c:'#3D9C79',price:97,per:'/ano',desc:'O Pro inteiro por menos da metade do preço mensal.',items:['Tudo do PenalFlux Pro','Equivale a R$ 8,08 por mês']}
};
const FEAT={cobrados:['completo'],simpenal:['completo'],simcf:['completo'],penas:['completo'],mapa:['completo'],pegadinhas:['completo'],comparador:['completo'],flashcards:['completo'],dicas:['completo'],audio:['audio'],especiais:['especiais','todos'],verbos:['verbos','todos'],cpp:['cpp','todos'],sim10:['mini','banco'],sim20:['banco'],tutor:['pro','proanual'],novidades:['pro','proanual']};

/* ================= ESTADO ================= */
const KEY='penalflux_v3';
const DEF={owned:{},studied:{},fav:{},box:{},quizzes:[],days:[],name:'',goal:5,obj:'',remind:{on:false,time:'19:00',sent:''},theme:'light',onb:false,part:'geral',open:{}};
let S=JSON.parse(JSON.stringify(DEF));
try{const r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r));}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
S.owned={};(window.PF_USER&&PF_USER.owned||[]).forEach(k=>{S.owned[k]=true;});if(!S.name&&window.PF_USER)S.name=(PF_USER.name||'').trim().split(/\s+/)[0]||'';
const CK={basico:'DF3BEC2E',completo:'423A541B',verbos:'A53E0AE7',cpp:'9B36B46D',especiais:'217341E6',todos:'D6CE5370',banco:'BACF7BE1',mini:'1DDC83DF'};
const has=f=>FEAT[f].some(p=>S.owned[p]);
const dk=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>dk(new Date());
const act=()=>{if(!S.days.includes(today()))S.days.push(today());save();};
const doneToday=()=>Object.values(S.studied).filter(d=>d===today()).length;
function streak(){let c=0;const d=new Date();if(!S.days.includes(dk(d)))d.setDate(d.getDate()-1);while(S.days.includes(dk(d))){c++;d.setDate(d.getDate()-1);}return c;}
const plural=(n,s,p)=>n+' '+(n===1?s:p);
const brl=v=>'R$ '+v.toFixed(2).replace('.',',').replace(',00','');
const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;');
const kLbl=a=>a.pena?'Verbo-chave':'Palavra-chave';
const changed26=a=>CHANGED[a.n]&&CHANGED[a.n]>='2026';
const titleOf=a=>TITLES[a.ti];
document.documentElement.dataset.theme=S.theme;

/* ================= NAVEGAÇÃO ================= */
const $=s=>document.querySelector(s);
const RAIL=[['Estudar',[['hoje','Início'],['codigo','Código Penal',ARTS.length],['cobrados','25 mais cobrados'],['mapa','Mapa mental'],['penas','Tabela de penas']]],['Praticar',[['treinar','Simulados'],['pegadinhas','40 pegadinhas'],['comparar','Comparar crimes']]],['Conta',[['conteudos','Meus conteúdos'],['ajustes','Ajustes']]]];
const TABS=[['hoje','Início'],['codigo','Código'],['treinar','Praticar'],['mapa','Mapa'],['conteudos','Conteúdos']];
function go(h){if(location.hash==='#'+h)route();else location.hash=h;}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2400);}
function route(){
  const h=decodeURIComponent((location.hash||'#hoje').slice(1));
  let base=h.startsWith('artigo-')?'codigo':h.startsWith('cmp-')?'comparar':h;
  if(['quiz','flash'].includes(base))base='treinar';
  if(['especiais','verbos','cpp','tutor','novidades','audio'].includes(base))base='conteudos';
  $('#railnav').innerHTML=RAIL.map(([g,items])=>`<div class="rgroup">${g}</div>`+items.map(([k,l,c])=>`<button class="rl ${base===k?'on':''}" onclick="go('${k}')">${IC[k]}${l}${c?`<span class="cnt">${c}</span>`:''}</button>`).join('')).join('');
  const tb=['penas','cobrados','pegadinhas','comparar'].includes(base)?(base==='penas'||base==='cobrados'?'codigo':'treinar'):base;
  $('#tabbar').innerHTML=TABS.map(([k,l])=>`<button class="tb ${tb===k?'on':''}" onclick="go('${k}')">${IC[k]}<span>${l}</span></button>`).join('');
  $('#railcard').innerHTML=`<b>${S.name?S.name+', ':''}plano ${S.owned.completo?'Completo':'Básico'}</b><span>${plural(streak(),'dia seguido','dias seguidos')} de estudo</span>${S.owned.completo?'':`<button class="btn gold sm block" style="margin-top:12px" onclick="offer('completo')">Liberar o Completo</button>`}`;
  $('#bellBtn').innerHTML=IC.bell+(S.remind.on?'':'<span class="dot"></span>');$('#setBtn').innerHTML=IC.ajustes;
  if(h.startsWith('artigo-'))vArt(h.slice(7));
  else if(h.startsWith('cmp-'))vCmp(h.slice(4));
  else ({hoje:vHome,codigo:vCode,cobrados:vTop,mapa:vMap,penas:vPenas,treinar:vTrain,quiz:vQuiz,flash:vFlash,pegadinhas:vTraps,comparar:vCmpList,conteudos:vStore,especiais:vEsp,verbos:vVerbos,cpp:vCpp,audio:vAudio,tutor:vTutor,novidades:vNews,ajustes:vSet}[h]||vHome)();
  const m=$('#app');m.classList.remove('page');void m.offsetWidth;m.classList.add('page');window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
const legal=`<p class="legal">Texto legal: Decreto-Lei 2.848/1940 em vigor, atualizado até a Lei 15.517/2026 (23/09/2026), conforme o texto compilado do Planalto. As explicações são didáticas e não substituem orientação jurídica. Confira sempre o <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm" target="_blank" rel="noopener">texto oficial</a>.</p>`;
const lockChip=p=>`<span class="chip">${sm('lock',12)} ${PRODUCTS[p].name.replace('PenalFlux ','')}</span>`;
function guard(f,p){if(has(f))return true;offer(p);return false;}

/* ================= INÍCIO ================= */
function vHome(){
  const dt=doneToday(),goal=S.goal,st=Object.keys(S.studied).length;
  const pool=crimes.filter(a=>a.k&&!a.k.includes(',')&&a.k.split(' ').length<=2&&a.e&&TITLES[a.ti].name.indexOf('dignidade sexual')<0&&TOP25.concat(['147','148','150','163','168','288','297','299','319','330','331','342','339']).includes(a.n));
  const vod=pool[Math.floor(Date.now()/864e5)%pool.length];
  const wk=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return S.days.includes(dk(d));});
  const next=ARTS.find(a=>!S.studied[a.n]);
  const hr=new Date().getHours(),greet=hr<12?'Bom dia':hr<18?'Boa tarde':'Boa noite';
  const late=S.remind.on&&dt<goal&&new Date().toTimeString().slice(0,5)>=S.remind.time;
  const r=26,c=2*Math.PI*r,p=Math.min(1,dt/goal);
  const mods=[['cobrados','25 artigos mais cobrados','Comece pelo que mais cai em prova.','cobrados','completo'],['treinar','Simulados comentados','Direito Penal e Constituição, com comentário em cada questão.','simpenal','completo'],['penas','Tabela completa de penas',`As penas de ${crimes.length} crimes, com busca e filtro.`,'penas','completo'],['mapa','Mapa mental','O Código inteiro em Parte, Título e Capítulo.','mapa','completo'],['pegadinhas','40 pegadinhas','As armadilhas que as bancas mais usam.','pegadinhas','completo'],['comparar','Comparar crimes','Furto ou roubo? Exigiu ou pediu? Lado a lado.','comparador','completo']];
  $('#app').innerHTML=`
  <p class="muted" style="font-weight:600">${greet}${S.name?', '+esc(S.name):''}</p>
  <h1 style="margin:2px 0 18px">${dt>=goal?'Meta de hoje cumprida.':`Faltam ${plural(goal-dt,'artigo','artigos')} para a meta de hoje.`}</h1>
  <section class="hero">
    <div style="position:relative"><div class="eb">Verbo do dia</div><div class="verb"><span>${esc(vod.k)}</span></div>
      <p><b style="color:#fff">Art. ${vod.n}, ${esc(vod.t.toLowerCase())}.</b> ${esc(vod.s)}</p>
      <div class="btns"><button class="btn gold" onclick="go('artigo-${vod.n}')">Estudar este artigo</button>${next?`<button class="btn ghost" onclick="go('artigo-${next.n}')">Continuar do art. ${next.n}</button>`:''}</div></div>
    <div class="hero-stats">
      <div class="hstat"><div class="ring"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="${r}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="7"/><circle cx="32" cy="32" r="${r}" fill="none" stroke="#D6B467" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p)}"/></svg><b>${dt}/${goal}</b></div><div class="l"><b style="color:#fff;display:block">Meta diária</b>${dt>=goal?'Cumprida hoje':'artigos estudados hoje'}</div></div>
      <div class="hstat" style="display:block"><div class="row" style="gap:12px"><div class="n">${streak()}</div><div class="l">${streak()===1?'dia seguido':'dias seguidos'} estudando</div></div><div class="week" style="margin-top:10px">${wk.map(o=>`<i class="${o?'on':''}"></i>`).join('')}</div></div>
      <div class="hstat"><div class="n">${st}</div><div class="l">de ${ARTS.length} dispositivos estudados<div class="bar" style="margin-top:8px;background:rgba(255,255,255,.08);border:0"><i style="width:${st/ARTS.length*100}%"></i></div></div></div>
    </div>
  </section>
  ${late?`<div class="remind">${IC.bell}<div><b>Lembrete das ${S.remind.time}</b>Ainda falta para a meta. Um artigo leva 2 minutos.</div><button class="btn navy sm" onclick="go('artigo-${(next||ARTS[0]).n}')">Estudar</button></div>`:''}
  ${!S.remind.on?`<div class="remind">${IC.bell}<div><b>Ative o lembrete diário</b>Estudar no mesmo horário todo dia mantém a sequência.</div><button class="btn navy sm" onclick="remindSheet()">Ativar</button></div>`:''}
  <section class="sec"><div class="sec-h"><h2>Seu material</h2><a class="link" href="#conteudos">Ver tudo</a></div>
  <div class="g3">${mods.map(([to,t,d,f,p])=>`<button class="mod" onclick="${has(f)?`go('${to}')`:`offer('${p}')`}"><span class="ic">${IC[to]}</span>${has(f)?'':`<span class="lock">${lockChip(p)}</span>`}<h3>${t}</h3><p>${d}</p></button>`).join('')}</div></section>
  <section class="sec"><div class="sec-h"><h2>Trilhas do Código</h2><a class="link" href="#codigo">Abrir o Código</a></div>
  <div class="panel" style="padding:8px 20px">${TITLES.filter(t=>t.part!=='final').map((t,ti)=>{const arr=ARTS.filter(a=>TITLES[a.ti]===t);const d=arr.filter(a=>S.studied[a.n]).length;return `<button class="trail" style="width:100%;text-align:left" onclick="openTitle(${TITLES.indexOf(t)})"><span class="roman" style="width:42px;height:42px;font-size:15px;border-radius:12px">${t.r}</span><span style="flex:1;min-width:0"><span class="xs muted" style="font-weight:700">${t.part==='geral'?'Parte Geral':'Parte Especial'}</span><b style="display:block;font-size:15px">${t.name}</b><span class="bar" style="display:block;margin-top:6px"><i style="width:${arr.length?d/arr.length*100:0}%"></i></span></span><span class="muted xs" style="font-weight:700">${d}/${arr.length}</span></button>`;}).slice(0,6).join('')}<div style="padding:12px 4px"><a class="link" href="#codigo">Ver os ${TITLES.length-1} títulos</a></div></div></section>
  ${legal}`;
}
function openTitle(ti){S.part=TITLES[ti].part==='geral'?'geral':'especial';S.open={};S.open[ti]=1;save();go('codigo');setTimeout(()=>{const el=document.getElementById('t'+ti);el&&el.scrollIntoView({behavior:'smooth',block:'start'});},80);}

/* ================= CÓDIGO ================= */
function aRow(a){return `<button class="arow" onclick="go('artigo-${a.n}')"><span class="no"><small>Art.</small>${a.n}</span><span style="min-width:0"><span class="t">${esc(a.t)}</span><span class="v">${kLbl(a)}: <span class="mark">${esc(a.k)}</span></span></span><span class="st">${changed26(a)?'<span class="chip gold">2026</span>':''}${S.fav[a.n]?`<span style="color:var(--gold);display:grid">${sm('star',18)}</span>`:''}${S.studied[a.n]?`<span class="tick">${IC.check}</span>`:''}</span></button>`;}
let Q_='';
function vCode(){
  $('#app').innerHTML=`<h1>Código Penal</h1><p class="lede">Do art. 1º ao 361: os ${ARTS.length} dispositivos em vigor, contando os artigos com letra, na ordem do Código.</p>
  <div class="search">${IC.search}<input id="q" placeholder="Busque por número, crime, verbo ou palavra: 155, golpe, exigir" value="${esc(Q_)}" aria-label="Buscar"></div>
  <div id="res"></div>${legal}`;
  const draw=()=>{
    const q=norm(Q_.trim());
    if(q){const r=ARTS.filter(a=>norm(a.n)===q||norm([a.n,a.t,a.k,a.s,a.e,a.rub].join(' ')).includes(q)).slice(0,80);
      $('#res').innerHTML=`<div class="title-card">${r.length?r.map(aRow).join(''):`<div class="empty">Nada encontrado para "${esc(Q_)}". Tente o número do artigo ou um verbo, como "subtrair".</div>`}</div>`;return;}
    $('#res').innerHTML=`<div class="parts">${[['geral','Parte Geral'],['especial','Parte Especial']].map(([k,l])=>`<button class="${S.part===k?'on':''}" data-p="${k}">${l}</button>`).join('')}</div>`+
    TITLES.map((t,ti)=>({t,ti})).filter(({t})=>S.part==='geral'?t.part==='geral':t.part!=='geral').map(({t,ti})=>{
      const arr=ARTS.filter(a=>a.ti===ti),d=arr.filter(a=>S.studied[a.n]).length,op=S.open[ti];
      let body='';if(op){let last=null;arr.forEach(a=>{if(a.ch&&a.ch!==last){body+=`<div class="chap">${esc(a.ch)}</div>`;last=a.ch;}body+=aRow(a);});}
      return `<div class="title-card ${op?'open':''}" id="t${ti}"><button class="title-head" data-t="${ti}"><span class="roman">${t.r}</span><span class="meta"><b>${t.name}</b><span class="muted xs" style="font-weight:700">Arts. ${arr[0].n} a ${arr[arr.length-1].n} · ${d}/${arr.length} estudados</span><span class="bar" style="display:block;margin-top:6px;max-width:260px"><i style="width:${d/arr.length*100}%"></i></span></span><span class="chev">${IC.chev}</span></button>${body}</div>`;}).join('');
    document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{S.part=b.dataset.p;save();draw();});
    document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const t=b.dataset.t;S.open[t]?delete S.open[t]:S.open[t]=1;save();draw();});
  };
  $('#q').oninput=e=>{Q_=e.target.value;draw();};draw();
}
const cmpFor=n=>CMPS.find(c=>c.a.includes(n));
function vArt(n){
  const a=byN[n];if(!a)return go('codigo');
  const t=titleOf(a),prev=ARTS[a.i-1],next=ARTS[a.i+1],cmp=cmpFor(a.n),free=t.part==='geral';
  const showD=has('dicas')||TOP25.slice(0,3).includes(a.n);
  const lines=a.txt.map((l,i)=>{if(i===0)return `<p>${esc(l)}</p>`;if(/^pena/i.test(l))return `<p class="pn">${esc(l)}</p>`;if(/^(§|par[aá]grafo|[IVXL]+ [-–]|[a-z]\))/i.test(l))return `<p class="par">${esc(l)}</p>`;if(!/[.:;]$/.test(l)&&l.length<70)return `<p class="rub">${esc(l)}</p>`;return `<p>${esc(l)}</p>`;}).join('');
  $('#app').innerHTML=`<button class="back" onclick="history.length>1?history.back():go('codigo')">${IC.back}Voltar</button>
  <div class="crumbs">${t.part==='geral'?'Parte Geral':'Parte Especial'} › Título ${t.r} › ${esc(t.name)}${a.ch?' › '+esc(a.ch):''}</div>
  <div class="art-wrap"><div>
    <div class="art-head"><div class="art-num"><small>Art.</small><b>${a.n}</b></div><div>${changed26(a)?'<span class="chip gold" style="margin-bottom:6px">Mudou em 2026</span>':''}<h1>${esc(a.t)}</h1></div></div>
    <div class="kv"><div class="lbl">${kLbl(a)}</div><div class="w"><span class="mark">${esc(a.k)}</span></div></div>
    <div class="layers">
      <div class="layer"><span class="k">1</span><div><h3>O que diz a lei</h3><p class="law">${esc(a.caput)}</p></div></div>
      <div class="layer simple"><span class="k">2</span><div><h3>Em português simples</h3><p>${esc(a.s)}</p></div></div>
      ${a.e?`<div class="layer case"><span class="k">3</span><div><h3>Na prática</h3><p>${esc(a.e)}</p></div></div>`:''}
      <div class="layer trap"><span class="k">${a.e?4:3}</span><div><h3>Pegadinha de prova</h3><p>${showD?esc(a.d):`<button class="link" style="padding:0" onclick="offer('completo')">Desbloqueie as pegadinhas de todos os artigos no plano Completo</button>`}</p></div></div>
    </div>
    ${a.pena?`<div class="pena"><span class="ic">${IC.penas}</span><div><span>Pena (caput)</span><b>${esc(a.pena)}</b></div></div>`:''}
    <details class="full"${a.txt.length<=3?' open':''}><summary>Texto completo do artigo <span class="muted xs">${a.txt.length} ${a.txt.length===1?'linha':'linhas'}</span></summary><div class="lawtxt">${lines}</div></details>
    <div class="prevnext">${prev?`<button class="btn soft sm" onclick="go('artigo-${prev.n}')">${sm('back',16)} Art. ${prev.n}</button>`:'<span></span>'}${next?`<button class="btn soft sm" onclick="go('artigo-${next.n}')">Art. ${next.n} ›</button>`:''}</div>
  </div>
  <aside class="side">
    <button class="btn ${S.studied[a.n]?'soft':'go'} block" id="bS">${S.studied[a.n]?IC.check+'Estudado':'Marcar como estudado'}</button>
    <button class="btn soft sm block" id="bF">${IC.star}${S.fav[a.n]?'Salvo':'Salvar'}</button>
    <button class="btn soft sm block" id="bC">${IC.copy}Copiar resumo</button>
    ${cmp?`<a class="confuse" href="#cmp-${cmp.id}"><span class="muted xs" style="font-weight:700">Costuma confundir com</span><h3 style="margin:2px 0 4px">${cmp.a.filter(x=>x!==a.n).map(x=>'Art. '+x+', '+esc(byN[x].t.toLowerCase())).join(' e ')}</h3><span class="link">Ver a diferença</span></a>`:''}
    <div class="panel" style="padding:16px"><span class="muted xs" style="font-weight:700">Texto conferido com o Planalto</span><h3>${CHANGED[a.n]?'Última alteração em '+CHANGED[a.n].split('-').reverse().join('/'):'Redação vigente'}</h3><p class="muted xs">Texto em vigor conferido até 23/09/2026.</p></div>
  </aside></div>${legal}`;
  $('#bS').onclick=()=>{if(S.studied[a.n])delete S.studied[a.n];else{S.studied[a.n]=today();act();const d=doneToday();toast(d===S.goal?'Meta de hoje cumprida!':`Estudado. ${d}/${S.goal} hoje.`);}save();vArt(n);};
  $('#bF').onclick=()=>{S.fav[a.n]?delete S.fav[a.n]:S.fav[a.n]=1;save();vArt(n);};
  $('#bC').onclick=async()=>{try{await navigator.clipboard.writeText(`Art. ${a.n}, ${a.t}\n${kLbl(a)}: ${a.k}\n${a.s}${a.pena?'\nPena: '+a.pena:''}`);toast('Resumo copiado');}catch(e){toast('Não foi possível copiar neste navegador');}};
  if($('#bA'))$('#bA').onclick=()=>{if(!has('audio'))return offer('audio');AUDIO_I=null;go('audio');return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(`Artigo ${a.n}. ${a.t}. ${kLbl(a)}: ${a.k}. ${a.s} ${a.e?'Na prática: '+a.e:''} ${a.pena?'Pena: '+a.pena:''}`);u.lang='pt-BR';speechSynthesis.speak(u);toast('Tocando o áudio do artigo');}catch(e){toast('Este navegador não reproduz áudio');}};
}

/* ================= 25 MAIS COBRADOS ================= */
function vTop(){
  if(!has('cobrados')){paywall('Os 25 artigos mais cobrados','A trilha com os artigos que mais aparecem em concursos, OAB e provas de faculdade, na ordem certa para estudar.','completo');return;}
  const d=TOP25.filter(n=>S.studied[n]).length;
  $('#app').innerHTML=`<h1>Os 25 artigos mais cobrados</h1><p class="lede">Se você tem pouco tempo, comece aqui. São os artigos que mais aparecem em provas de concursos, OAB e faculdade.</p>
  <div class="panel" style="margin-top:18px;display:flex;align-items:center;gap:16px"><div style="flex:1"><b>${d} de 25 concluídos</b><div class="bar" style="margin-top:8px"><i style="width:${d/25*100}%"></i></div></div>${d<25?`<button class="btn navy sm" onclick="go('artigo-${TOP25.find(n=>!S.studied[n])}')">Continuar</button>`:''}</div>
  <div class="title-card" style="margin-top:14px">${TOP25.map((n,i)=>{const a=byN[n];return `<button class="arow" style="grid-template-columns:44px 64px minmax(0,1fr) auto" onclick="go('artigo-${n}')"><span class="rank">${i+1}</span><span class="no"><small>Art.</small>${n}</span><span style="min-width:0"><span class="t">${esc(a.t)}</span><span class="v">${kLbl(a)}: <span class="mark">${esc(a.k)}</span></span></span><span class="st">${S.studied[n]?`<span class="tick">${IC.check}</span>`:''}</span></button>`;}).join('')}</div>${legal}`;
}
function paywall(t,d,p){$('#app').innerHTML=`<h1>${t}</h1><div class="panel" style="margin-top:20px;text-align:center;padding:40px 22px"><div style="width:58px;height:58px;margin:0 auto 14px;border-radius:50%;background:var(--goldbg);color:var(--gold);display:grid;place-items:center">${sm('lock',24)}</div><h2>Disponível no ${PRODUCTS[p].name}</h2><p class="muted" style="margin:8px auto 20px;max-width:440px">${d}</p><button class="btn gold" onclick="offer('${p}')">Ver o ${PRODUCTS[p].name.replace('PenalFlux ','plano ')}</button></div>`;}

/* ================= MAPA MENTAL ================= */
let MM={p:'especial',t:null};
function vMap(){
  if(!has('mapa')){paywall('Mapa mental do Código Penal','O Código inteiro organizado em Parte, Título e Capítulo, com acesso direto a cada artigo.','completo');return;}
  const tis=TITLES.map((t,i)=>({t,i})).filter(({t})=>MM.p==='geral'?t.part==='geral':t.part!=='geral');
  if(MM.t===null||!tis.find(x=>x.i===MM.t))MM.t=tis[0].i;
  const arr=ARTS.filter(a=>a.ti===MM.t);const chs=[];arr.forEach(a=>{const c=a.ch||'Artigos';let g=chs.find(x=>x.c===c);if(!g){g={c,a:[]};chs.push(g);}g.a.push(a);});
  const mob=innerWidth<900;
  $('#app').innerHTML=`<h1>Mapa mental</h1><p class="lede">O Código Penal como uma árvore: escolha a parte, o título e vá direto ao artigo.</p>
  <div class="mm">
   <div class="mm-col">${[['geral','Parte Geral','Arts. 1 a 120'],['especial','Parte Especial','Arts. 121 a 361']].map(([k,l,s])=>`<button class="mm-node ${MM.p===k?'on':''}" data-p="${k}"><span><b>${l}</b><small>${s}</small></span></button>`).join('')}</div>
   <div class="mm-col">${tis.map(({t,i})=>`<button class="mm-node ${MM.t===i?'on':''}" data-t="${i}"><span class="r">${t.r}</span><span>${t.name}<small>${ARTS.filter(a=>a.ti===i).length} dispositivos</small></span></button>`).join('')}</div>
   <div class="mm-col" id="mmleaf">${mob?`<div class="mm-leaf" style="background:var(--navy);color:#fff"><b>Título ${TITLES[MM.t].r}: ${TITLES[MM.t].name}</b></div>`:''}${chs.map(g=>`<div class="mm-leaf"><h4>${esc(g.c)}</h4><div class="mm-chips">${g.a.map(a=>`<a href="#artigo-${a.n}"><b>${a.n}</b>${esc(a.t)}</a>`).join('')}</div></div>`).join('')}</div>
  </div>${legal}`;
  document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{MM.p=b.dataset.p;MM.t=null;vMap();});
  document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{MM.t=+b.dataset.t;vMap();if(mob)$('#mmleaf').scrollIntoView({behavior:'smooth'});});
}

/* ================= TABELA DE PENAS ================= */
let PT={q:'',t:'all',tipo:'all',sort:'n'};
function months(p){const m=norm(p).match(/de (\d+) (dias?|mes(?:es)?|anos?)?\s*a (\d+) (dias?|mes(?:es)?|anos?)/);if(!m)return [0,0];const u=x=>/dia/.test(x||'')?1/30:/mes/.test(x||'')?1:12;const u2=u(m[4]),u1=m[2]?u(m[2]):u2;return [m[1]*u1,m[3]*u2];}
function vPenas(){
  if(!has('penas')){paywall('Tabela completa de penas',`As penas de todos os ${crimes.length} crimes do Código, com busca por crime e filtro por título.`,'completo');return;}
  $('#app').innerHTML=`<h1>Tabela completa de penas</h1><p class="lede">${crimes.length} crimes do Código Penal com a pena do caput, tirada do texto oficial. Toque no cabeçalho para ordenar.</p>
  <div class="search">${IC.search}<input id="pq" placeholder="Busque o crime: furto, peculato, ameaça" value="${esc(PT.q)}"></div>
  <div class="filters"><select id="pt"><option value="all">Todos os títulos</option>${TITLES.map((t,i)=>t.part==='especial'?`<option value="${i}" ${PT.t==i?'selected':''}>Título ${t.r}: ${t.name}</option>`:'').join('')}</select>
  <select id="pk"><option value="all">Reclusão e detenção</option><option value="reclus" ${PT.tipo==='reclus'?'selected':''}>Só reclusão</option><option value="deten" ${PT.tipo==='deten'?'selected':''}>Só detenção</option></select></div>
  <div class="tblwrap"><table class="tbl"><thead><tr><th data-s="n">Art.</th><th data-s="t">Crime</th><th data-s="max">Pena</th></tr></thead><tbody id="tb"></tbody></table></div>${legal}`;
  const draw=()=>{const q=norm(PT.q);let r=crimes.filter(a=>(PT.t==='all'||a.ti==PT.t)&&(PT.tipo==='all'||norm(a.pena).includes(PT.tipo))&&(!q||norm(a.t+' '+a.k+' '+a.n).includes(q)));
    if(PT.sort==='t')r=r.slice().sort((x,y)=>x.t.localeCompare(y.t));if(PT.sort==='max')r=r.slice().sort((x,y)=>months(y.pena)[1]-months(x.pena)[1]);
    $('#tb').innerHTML=r.map(a=>`<tr onclick="go('artigo-${a.n}')" style="cursor:pointer"><td class="n">${a.n}</td><td><b>${esc(a.t)}</b><div class="muted xs"><span class="mark">${esc(a.k)}</span></div></td><td class="p">${esc(a.pena)}</td></tr>`).join('')||`<tr><td colspan="3" class="empty">Nenhum crime com esse filtro.</td></tr>`;};
  $('#pq').oninput=e=>{PT.q=e.target.value;draw();};$('#pt').onchange=e=>{PT.t=e.target.value;draw();};$('#pk').onchange=e=>{PT.tipo=e.target.value;draw();};
  document.querySelectorAll('th[data-s]').forEach(th=>th.onclick=()=>{PT.sort=th.dataset.s;draw();});draw();
}

/* ================= PRATICAR ================= */
function vTrain(){
  const last=S.quizzes.slice(-1)[0];
  const mode=(fn,lbl,t,d,f,p)=>{const ok=!f||has(f);return `<button class="mode" onclick="${ok?fn:`offer('${p}')`}"><span class="ico">${lbl}</span><span class="meta"><h3>${t}</h3><p class="muted small">${d}</p></span>${ok?'':lockChip(p)}</button>`;};
  $('#app').innerHTML=`<h1>Praticar</h1><p class="lede">${last?`Último simulado: ${last.c} de ${last.t} (${last.p}%), ${last.k}.`:'Teste o que estudou com questões no estilo das bancas.'}</p>
  <section class="sec"><h2 style="margin-bottom:12px">Simulados comentados</h2><div class="g2">
  ${mode("startQ('penal')",'§',`Direito Penal`,`${SIMPENAL.length} questões estilo banca, com comentário em cada uma.`,'simpenal','completo')}
  ${mode("startQ('cf')",'CF',`Constituição Federal`,`${SIMCF.length} questões dos artigos mais cobrados da CF, comentadas.`,'simcf','completo')}
  </div></section>
  <section class="sec"><h2 style="margin-bottom:12px">Simulados gerados</h2><div class="g3">
  ${mode("startQ('gen',5)",'5','Rápido','5 questões novas para o dia a dia.')}
  ${mode("startQ('gen',10)",'10','Simulado diário','10 questões novas, com comentário.','sim10','mini')}
  ${mode("startQ('gen',20)",'20','Banco infinito','20 questões que nunca se repetem, comentadas.','sim20','banco')}
  </div></section>
  <section class="sec"><h2 style="margin-bottom:12px">Revisão</h2><div class="g3">
  ${mode("go('pegadinhas')",'!','40 pegadinhas','Certo ou errado: as armadilhas das bancas.','pegadinhas','completo')}
  ${mode("go('flash')",'Aa','Flashcards','Repetição espaçada: o que você erra volta mais.','flashcards','completo')}
  ${mode("go('comparar')",'⇄','Comparar crimes','Crimes parecidos lado a lado.','comparador','completo')}
  </div></section>${legal}`;
}
let Q=null;
const shuf=x=>x.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
function genQ(n){
  const pool=crimes.filter(a=>a.k&&a.s),qs=[],penas=[...new Set(pool.map(a=>a.pena))];
  shuf(pool).slice(0,n*2).forEach((a,i)=>{
    const lbl=x=>`${x.t} (art. ${x.n})`;
    if(i%3===0){const o=shuf([a.pena,...shuf(penas.filter(p=>p!==a.pena)).slice(0,3)]);qs.push({q:`Qual é a pena do caput do art. ${a.n} (${a.t.toLowerCase()})?`,o,a:o.indexOf(a.pena),c:`Art. ${a.n}: ${a.pena}.`,ref:'Art. '+a.n});}
    else if(i%3===1){const o=shuf([lbl(a),...shuf(pool.filter(x=>x.n!==a.n&&x.ti===a.ti)).concat(shuf(pool)).filter(x=>x.n!==a.n).slice(0,3).map(lbl)]);qs.push({q:`Qual crime tem o verbo-chave "${a.k}"?`,o:[...new Set(o)].slice(0,4),a:0,c:`"${a.k}" é o núcleo do art. ${a.n}. ${a.d||''}`,ref:'Art. '+a.n});const L=qs[qs.length-1];L.a=L.o.indexOf(lbl(a));if(L.a<0)qs.pop();}
    else if(a.e){const near=cmpFor(a.n)?cmpFor(a.n).a.filter(x=>x!==a.n).map(x=>byN[x]):[];const w=[...new Set(near.concat(shuf(pool.filter(x=>x.ti===a.ti&&x.n!==a.n))).concat(shuf(pool)).filter(x=>x.n!==a.n).map(lbl))].slice(0,3);const o=shuf([lbl(a),...w]);qs.push({q:`Situação: ${a.e} Qual é o crime?`,o,a:o.indexOf(lbl(a)),c:`${a.s} ${cmpFor(a.n)?'Regra: '+cmpFor(a.n).r:''}`,ref:'Art. '+a.n});}
  });
  return shuf(qs).slice(0,n);
}
function startQ(kind,n){
  let qs,com=true,name;
  if(kind==='penal'){if(!guard('simpenal','completo'))return;qs=shuf(SIMPENAL).map(x=>({...x}));name='Direito Penal';}
  else if(kind==='cf'){if(!guard('simcf','completo'))return;qs=shuf(SIMCF).map(x=>({...x}));name='Constituição';}
  else{qs=genQ(n);com=has('sim10');name='gerado';}
  qs=qs.map(q=>{const right=q.o[q.a];const o=shuf(q.o);return {...q,o,a:o.indexOf(right)};});
  Q={qs,i:0,c:0,miss:[],kind,n,com,name};act();go('quiz');
}
function vQuiz(){
  if(!Q)return go('treinar');
  if(Q.i>=Q.qs.length){
    const p=Math.round(Q.c/Q.qs.length*100);const refs=[...new Set(Q.miss)].map(r=>{const m=r&&r.match(/Art\.\s*([\d]+(?:-[A-Z])?)/);return m&&byN[m[1]]&&Q.kind!=='cf'?byN[m[1]]:null;}).filter(Boolean);
    $('#app').innerHTML=`<div class="quiz" style="text-align:center;padding-top:16px"><p class="muted" style="font-weight:700">Simulado ${Q.name}</p><div class="score">${p}%</div><p style="font-size:18px;margin:6px 0 20px">${Q.c} de ${Q.qs.length} certas. ${p>=80?'Você está dominando o conteúdo.':p>=50?'Bom caminho. Revise o que errou.':'Revise os artigos abaixo e tente de novo.'}</p>
    ${refs.length?`<div class="title-card" style="text-align:left">${refs.map(aRow).join('')}</div>`:''}
    <div class="row" style="justify-content:center;margin-top:20px;flex-wrap:wrap"><button class="btn navy" onclick="startQ('${Q.kind}',${Q.n||0})">Refazer</button><button class="btn soft" onclick="Q=null;go('treinar')">Voltar</button></div>
    ${Q.kind==='gen'&&!has('sim20')?`<button class="prod" style="margin-top:26px" onclick="offer('banco')">${cover('banco')}<span class="meta"><h3>Quer simulados novos todo dia?</h3><p>O Banco de Questões Infinito gera um simulado diferente a cada tentativa, com comentário.</p><span class="foot"><span class="price">${brl(47)}</span></span></span></button>`:''}</div>`;return;}
  const q=Q.qs[Q.i];
  $('#app').innerHTML=`<div class="quiz"><div class="row" style="justify-content:space-between;font-weight:700;font-size:14px;color:var(--ink2);margin-bottom:8px"><span>Questão ${Q.i+1} de ${Q.qs.length}${q.tema?' · '+esc(q.tema):''}</span><span>${Q.c} certas</span></div>
  <div class="qbar"><i style="width:${Q.i/Q.qs.length*100}%"></i></div><div class="qtext">${esc(q.q)}</div>
  ${q.o.map((o,i)=>`<button class="opt" data-i="${i}"><span class="l">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`).join('')}<div id="after"></div></div>`;
  document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i,ok=i===q.a;if(ok)Q.c++;else Q.miss.push(q.ref);
    document.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;if(j===q.a)x.classList.add('right');else if(j===i)x.classList.add('wrong');});
    $('#after').innerHTML=(Q.com?`<div class="comment"><b>${ok?'Certa.':'Errada.'}</b> ${esc(q.c)} ${q.ref?`<span class="muted xs" style="font-weight:700">(${esc(q.ref)})</span>`:''}</div>`:`<div class="comment locked">${sm('lock',18)}<div><b>${ok?'Certa.':'Errada.'}</b> <span class="muted">O comentário desta questão está no Simulado Diário e no Banco de Questões.</span></div></div>`)+`<div style="text-align:right;margin-top:14px"><button class="btn navy" id="nx">${Q.i+1<Q.qs.length?'Próxima questão':'Ver resultado'}</button></div>`;
    $('#nx').onclick=()=>{Q.i++;if(Q.i>=Q.qs.length){S.quizzes.push({d:Date.now(),c:Q.c,t:Q.qs.length,p:Math.round(Q.c/Q.qs.length*100),k:Q.name});save();}vQuiz();};$('#nx').focus();
  });
}
let TR={i:0,ord:null,ans:null,ok:0};
function vTraps(){
  if(!has('pegadinhas')){paywall('40 pegadinhas das principais bancas','Afirmações que parecem certas e derrubam candidatos. Responda certo ou errado e veja a regra.','completo');return;}
  if(!TR.ord)TR.ord=shuf(TRAPS.map((_,i)=>i));
  if(TR.i>=TRAPS.length){$('#app').innerHTML=`<div class="quiz" style="text-align:center"><p class="muted" style="font-weight:700">40 pegadinhas</p><div class="score">${TR.ok}/40</div><p style="margin:10px 0 20px">${TR.ok>=32?'Você não cai fácil.':'Vale repassar as que errou.'}</p><button class="btn navy" onclick="TR={i:0,ord:null,ans:null,ok:0};vTraps()">Recomeçar</button></div>`;return;}
  const t=TRAPS[TR.ord[TR.i]];
  $('#app').innerHTML=`<button class="back" onclick="go('treinar')">${IC.back}Praticar</button><div class="row" style="justify-content:space-between"><h1>40 pegadinhas</h1><span class="muted" style="font-weight:800">${TR.i+1}/40</span></div>
  <div class="trap-card"><span class="chip gold">${esc(t.t)}</span><p class="af">“${esc(t.afirmacao)}”</p>
  ${TR.ans===null?`<div class="g2" style="grid-template-columns:1fr 1fr"><button class="btn good" onclick="trapAns(true)">Certo</button><button class="btn bad" onclick="trapAns(false)">Errado</button></div>`:
  `<div class="comment"><b>${TR.ans===t.certo?'Você acertou.':'Caiu na pegadinha.'}</b> A afirmação está <b>${t.certo?'certa':'errada'}</b>. ${esc(t.explica)} <span class="muted xs" style="font-weight:700">(${esc(t.ref)})</span></div><div style="text-align:right;margin-top:14px"><button class="btn navy" onclick="TR.i++;TR.ans=null;vTraps()">Próxima</button></div>`}</div>`;
}
function trapAns(v){const t=TRAPS[TR.ord[TR.i]];TR.ans=v;if(v===t.certo)TR.ok++;act();vTraps();}
let deck=[],fi=0;
function vFlash(){
  if(!has('flashcards')){paywall('Flashcards','Repetição espaçada com todos os crimes: veja o verbo, lembre o crime e a pena.','completo');return;}
  if(!deck.length||fi>=deck.length){deck=crimes.filter(a=>a.k).sort((x,y)=>(S.box[x.n]||0)-(S.box[y.n]||0)||Math.random()-.5).slice(0,30);fi=0;}
  const a=deck[fi];const dom=crimes.filter(x=>(S.box[x.n]||0)>=4).length;
  $('#app').innerHTML=`<button class="back" onclick="go('treinar')">${IC.back}Praticar</button><div class="row" style="justify-content:space-between"><h1>Flashcards</h1><span class="muted" style="font-weight:800">${fi+1}/${deck.length}</span></div><p class="muted small">${dom} de ${crimes.length} crimes dominados</p>
  <div class="fc" id="fc" tabindex="0" role="button" aria-label="Virar card"><div class="face front"><div style="color:var(--gold2);font-weight:700">Art. ${a.n}</div><div class="w">${esc(a.k)}</div><div style="color:#C3CBDD">Que crime é esse e qual a pena?</div><div class="xs" style="color:#8590AA;margin-top:22px">Toque para virar</div></div>
  <div class="face back"><span class="muted xs" style="font-weight:700">Art. ${a.n}</span><h2>${esc(a.t)}</h2><p>${esc(a.s)}</p><div class="pena" style="margin-top:4px"><span class="ic">${IC.penas}</span><div><b style="font-size:15px">${esc(a.pena)}</b></div></div></div></div>
  <div class="fc-act" id="fa" style="visibility:hidden"><button class="btn bad" onclick="rate(0)">Errei</button><button class="btn good" onclick="rate(1)">Acertei</button></div>`;
  const flip=()=>{$('#fc').classList.toggle('flip');$('#fa').style.visibility='visible';};$('#fc').onclick=flip;$('#fc').onkeydown=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();flip();}};
}
function rate(ok){const a=deck[fi];S.box[a.n]=ok?Math.min(4,(S.box[a.n]||0)+1):0;act();save();fi++;if(fi>=deck.length){toast('Rodada concluída');deck=[];}vFlash();}
function cmpCard(c){return `<button class="cmp-card" onclick="go('cmp-${c.id}')"><span class="vs">${c.a.map(n=>esc(byN[n].t)).join('<em>ou</em>')}</span><span class="muted small">${c.s}</span>${has('comparador')?'':lockChip('completo')}</button>`;}
function vCmpList(){$('#app').innerHTML=`<h1>Comparar crimes</h1><p class="lede">Crimes parecidos lado a lado. Cada comparação termina com uma regra de uma frase para usar na prova.</p><div class="cmp-list" style="margin-top:22px">${CMPS.map(cmpCard).join('')}</div>${legal}`;}
function vCmp(id){
  const c=CMPS.find(x=>x.id===id);if(!c)return go('comparar');
  if(!has('comparador')){paywall(c.t,`Veja ${c.a.map(n=>byN[n].t.toLowerCase()).join(', ')} lado a lado, com verbo, pena, exemplo e a regra para não errar.`,'completo');return;}
  $('#app').innerHTML=`<button class="back" onclick="go('comparar')">${IC.back}Comparações</button><h1>${c.t}</h1>
  <div class="cmp-cols" style="grid-template-columns:repeat(${innerWidth<900?1:c.a.length},minmax(0,1fr))">${c.a.map(n=>{const a=byN[n];return `<div class="cmp-col"><div><span class="muted xs" style="font-weight:700">Art. ${a.n}, ${esc(a.t.toLowerCase())}</span><div class="w"><span class="mark">${esc(a.k)}</span></div></div><div><div class="f">Em português simples</div><p>${esc(a.s)}</p></div>${a.e?`<div><div class="f">Na prática</div><p>${esc(a.e)}</p></div>`:''}<div><div class="f">Pena</div><p style="font-weight:700;color:var(--wine)">${esc(a.pena)}</p></div><button class="btn soft sm" onclick="go('artigo-${a.n}')">Abrir artigo</button></div>`;}).join('')}</div>
  <div class="rule"><div class="lbl">Regra para a prova</div><p>${c.r}</p></div>${legal}`;
}

/* ================= CONTEÚDOS / FUNIL ================= */
const cover=id=>{const p=PRODUCTS[id];return `<span class="cover" style="--c:${p.c}"><small>PENALFLUX</small><b>${p.cover}</b></span>`;};
function prodCard(id,to){const p=PRODUCTS[id],own=S.owned[id],par=p.of&&S.owned[p.of];
  const st=own?`<span class="chip ok">${sm('check',12)} Liberado</span>`:par?`<span class="chip">Incluído no ${PRODUCTS[p.of].name.replace('PenalFlux ','')}</span>`:`<span class="price">${p.old?`<s>${brl(p.old)}</s>`:''}${brl(p.price)}${p.per||''}</span>`;
  return `<button class="prod" onclick="${own||par?to:`offer('${id}')`}">${cover(id)}<span class="meta"><h3>${p.name}</h3><p>${p.desc}</p><span class="foot">${st}</span></span></button>`;}
function vStore(){
  const plan=S.owned.completo?'completo':'basico';
  const lib=[['codigo',`361 artigos explicados`,'codigo',null],['cobrados','25 artigos mais cobrados','cobrados','completo'],['treinar','Simulado comentado de Direito Penal','simpenal','completo'],['penas','Tabela completa de penas','penas','completo'],['cf','Simulado comentado da Constituição','simcf','completo'],['mapa','Mapa mental do Código Penal','mapa','completo'],['pegadinhas','40 pegadinhas das principais bancas','pegadinhas','completo'],['comparar','Comparador de crimes','comparador','completo'],['cards','Flashcards','flashcards','completo'],['penas','Leis Penais Especiais','especiais','especiais'],['mapa','Mapa dos Verbos-Chave','verbos','verbos'],['codigo','Processo Penal Essencial','cpp','cpp'],['chat','Tutor de dúvidas','tutor','pro'],['spark','Mudanças na lei','novidades','pro']];
  const dest={audio:'audio',cobrados:'cobrados',simpenal:"startQ('penal')",penas:'penas',simcf:"startQ('cf')",mapa:'mapa',pegadinhas:'pegadinhas',comparador:'comparar',flashcards:'flash',especiais:'especiais',verbos:'verbos',cpp:'cpp',tutor:'tutor',novidades:'novidades'};
  $('#app').innerHTML=`<h1>Meus conteúdos</h1>
  <section class="plan-hero" style="margin-top:20px"><div><span style="color:var(--gold2);font-weight:700">Seu plano</span><h2 style="font-size:30px;margin-top:2px">${PRODUCTS[plan].name}</h2><p style="color:#C3CBDD;margin-top:6px">${PRODUCTS[plan].desc}</p></div>${plan==='basico'?`<button class="btn gold" onclick="offer('completo')">Conhecer o Completo</button>`:`<span class="chip gold" style="font-size:14px">Acesso vitalício</span>`}</section>
  <section class="sec"><h2 style="margin-bottom:12px">Biblioteca</h2><div class="g3">${lib.map(([icn,l,f,p])=>{const ok=!p||has(f);const d=f==='codigo'?"go('codigo')":(dest[f]&&dest[f].includes('(')?dest[f]:`go('${dest[f]}')`);return `<button class="mode" onclick="${ok?d:`offer('${p}')`}"><span class="ico" style="${ok?'':'background:var(--surface2);color:var(--ink3)'}">${ok?sm(icn,22):sm('lock',20)}</span><span class="meta"><h3 style="font-size:15px">${l}</h3><p class="muted xs" style="font-weight:600">${ok?'Abrir':'No '+PRODUCTS[p].name.replace('PenalFlux ','')}</p></span></button>`;}).join('')}</div></section>
  <section class="sec"><h2 style="margin-bottom:12px">Turbine seus estudos</h2><div class="g2">${prodCard('verbos',`go('verbos')`)}${prodCard('cpp',`go('cpp')`)}${prodCard('especiais',`go('especiais')`)}${['especiais','verbos','cpp'].every(k=>S.owned[k])?'':prodCard('todos',`go('conteudos')`)}</div></section>
  <section class="sec"><h2 style="margin-bottom:12px">Próximo nível</h2><div class="g2">${prodCard('banco',`go('treinar')`)}${S.owned.banco?'':prodCard('mini',`go('treinar')`)}</div></section>${legal}`;
}
let ESEL=0;
function vEsp(){
  if(!has('especiais')){paywall('Leis Penais Especiais',`As ${LEIS.length} leis especiais que mais caem em prova pelo Método do Verbo-Chave.`,'especiais');return;}
  const L=LEIS[ESEL];
  $('#app').innerHTML=`<button class="back" onclick="go('conteudos')">${IC.back}Conteúdos</button><div class="row" style="justify-content:space-between;flex-wrap:wrap"><h1>Leis Penais Especiais</h1><a class="btn soft sm" href="#" onclick="return pfPdf('especiais')">Baixar e-book em PDF</a></div><p class="lede">${LEIS.length} leis, ${LEIS.reduce((s,l)=>s+l.itens.length,0)} dispositivos, texto em vigor em 2026.</p>
  <div class="filters"><select id="esel" aria-label="Escolher lei">${LEIS.map((l,i)=>`<option value="${i}" ${i===ESEL?'selected':''}>${esc(l.nome)} (${esc(l.lei)})</option>`).join('')}</select></div>
  <div class="rule" style="margin-top:16px"><div class="lbl">${esc(L.lei)}</div><p style="font-family:Manrope;font-size:17px;font-weight:600">${esc(L.intro)}</p></div>
  <div class="layers" style="margin-top:16px">${L.itens.map(x=>`<div class="panel" style="padding:18px"><div class="row" style="gap:10px;flex-wrap:wrap"><span class="chip gold">${esc(x.n)}</span><h3>${esc(x.t)}</h3></div>
  <p style="font-family:var(--serif);font-size:24px;margin-top:6px"><span class="mark">${esc(x.k)}</span></p>
  <p class="law" style="font-size:16px;margin:8px 0;color:var(--ink2)">${esc(x.lei)}</p><p>${esc(x.s)}</p>${x.e?`<p class="muted small" style="margin-top:6px"><b>Na prática:</b> ${esc(x.e)}</p>`:''}
  ${x.pena?`<div class="pena" style="margin-top:10px"><span class="ic">${IC.penas}</span><div><span>Pena</span><b style="font-size:15px">${esc(x.pena)}</b></div></div>`:''}
  <div class="comment" style="margin-top:10px"><b>Pegadinha:</b> ${esc(x.d)}</div></div>`).join('')}</div>
  ${(L.comparar||[]).length?`<div class="rule"><div class="lbl">Não confunda</div>${L.comparar.map(c=>`<p style="font-size:18px;margin-top:10px"><b style="color:var(--gold2)">${esc(c.t)}</b><br>${esc(c.regra)}</p>`).join('')}</div>`:''}${legal}`;
  $('#esel').onchange=e=>{ESEL=+e.target.value;vEsp();};
}

const VCMP=[['Furto x Roubo','Violência ou grave ameaça contra a pessoa? Roubo. Não houve? Furto.'],['Roubo x Extorsão','O agente pega a coisa? Roubo. A vítima precisa agir (ex.: fazer um Pix)? Extorsão.'],['Concussão x Corrupção passiva x Corrupção ativa','Servidor EXIGE: concussão. Servidor SOLICITA ou RECEBE: corrupção passiva. Particular OFERECE: corrupção ativa.'],['Calúnia x Difamação x Injúria','Fato falso que é crime: calúnia. Fato que ofende a reputação: difamação. Xingamento sem fato: injúria.'],['Peculato x Apropriação indébita','Tinha a posse por causa de cargo público? Peculato. Particular? Apropriação indébita.'],['Desacato x Desobediência','Ofendeu o servidor? Desacato. Não cumpriu ordem legal? Desobediência.'],['Falsificação x Falsidade ideológica','Documento com forma falsa? Falsificação. Documento verdadeiro com conteúdo falso? Falsidade ideológica.'],['Estupro x Importunação sexual','Violência ou grave ameaça? Estupro. Sem violência ou ameaça e sem consentimento? Importunação.']];
let VQ='';
function vVerbos(){
  if(!has('verbos')){paywall('Mapa dos Verbos-Chave','Os 241 crimes do Código em uma tabela para imprimir: verbo-chave, artigo e pena.','verbos');return;}
  const cr=ARTS.filter(a=>a.pena);
  $('#app').innerHTML=`<button class="back" onclick="go('conteudos')">${IC.back}Conteúdos</button><div class="row" style="justify-content:space-between;flex-wrap:wrap"><h1>Mapa dos Verbos-Chave</h1><a class="btn soft sm" href="#" onclick="return pfPdf('verbos')">Baixar PDF para imprimir</a></div><p class="lede">${cr.length} crimes: ache o verbo do enunciado e veja o crime e a pena.</p>
  <div class="search">${IC.search}<input id="vq" placeholder="Buscar verbo ou crime (ex.: exigir, subtrair)" value="${esc(VQ)}" aria-label="Buscar verbo ou crime"></div><div id="vlist"></div>
  <div class="rule"><div class="lbl">Não confunda</div>${VCMP.map(c=>`<p style="font-size:17px;margin-top:10px"><b style="color:var(--gold2)">${c[0]}</b><br>${c[1]}</p>`).join('')}</div>${legal}`;
  const draw=()=>{const q=norm(VQ);let h='';TITLES.forEach((t,ti)=>{const r=cr.filter(a=>a.ti===ti&&(!q||norm(a.k+' '+a.t).includes(q)));if(!r.length)return;
    h+=`<section class="sec"><h2 style="margin-bottom:10px">Título ${t.r} · ${esc(t.name)}</h2><div class="title-card">${r.map(a=>`<a class="arow" href="#artigo-${a.n}" style="grid-template-columns:minmax(0,0.9fr) minmax(0,1.3fr);color:inherit;text-decoration:none"><span style="font-weight:800;text-transform:uppercase;font-size:13px;color:var(--gold2);letter-spacing:.02em">${esc(a.k)}</span><span style="min-width:0"><span class="t">${esc(a.t)}</span><span class="v">Art. ${a.n} · ${esc(a.pena)}</span></span></a>`).join('')}</div></section>`;});
    $('#vlist').innerHTML=h||'<p class="muted" style="margin-top:20px">Nada encontrado.</p>';};
  draw();$('#vq').oninput=e=>{VQ=e.target.value;draw();};
}
let CQ='';
function vCpp(){
  if(!has('cpp')){paywall('Processo Penal Essencial','Os 60 artigos do Código de Processo Penal que mais caem em prova, pelo Método do Verbo-Chave.','cpp');return;}
  const temas=[...new Set(CPP.map(x=>x.tema))];
  $('#app').innerHTML=`<button class="back" onclick="go('conteudos')">${IC.back}Conteúdos</button><div class="row" style="justify-content:space-between;flex-wrap:wrap"><h1>Processo Penal Essencial</h1><a class="btn soft sm" href="#" onclick="return pfPdf('cpp')">Baixar e-book em PDF</a></div><p class="lede">${CPP.length} artigos do Código de Processo Penal (Decreto-Lei 3.689/1941) que mais caem, texto em vigor em 2026.</p>
  <div class="search">${IC.search}<input id="cq" placeholder="Buscar artigo ou assunto (ex.: flagrante, 312)" value="${esc(CQ)}" aria-label="Buscar no CPP"></div><div id="clist"></div>
  <p class="legal">Texto legal: Decreto-Lei 3.689/1941 em vigor, conforme o texto compilado do Planalto. Material didático, não substitui orientação jurídica. Confira o <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm" target="_blank" rel="noopener">texto oficial</a>.</p>`;
  const draw=()=>{const q=norm(CQ);$('#clist').innerHTML=temas.map(tm=>{const r=CPP.filter(x=>x.tema===tm&&(!q||norm('art '+x.n+' '+x.t+' '+x.k+' '+x.tema+' '+x.s).includes(q)));if(!r.length)return '';
    return `<section class="sec"><h2 style="margin-bottom:10px">${esc(tm)}</h2><div class="layers">${r.map(x=>`<div class="panel" style="padding:18px"><div class="row" style="gap:10px;flex-wrap:wrap"><span class="chip gold">Art. ${esc(x.n)}</span><h3>${esc(x.t)}</h3></div>
    <p style="font-family:var(--serif);font-size:24px;margin-top:6px"><span class="mark">${esc(x.k)}</span></p><p class="law" style="font-size:16px;margin:8px 0;color:var(--ink2)">${esc(x.lei)}</p><p>${esc(x.s)}</p>${x.e?`<p class="muted small" style="margin-top:6px"><b>Na prática:</b> ${esc(x.e)}</p>`:''}<div class="comment" style="margin-top:10px"><b>Pegadinha:</b> ${esc(x.d)}</div>${x.stf?`<div class="comment" style="margin-top:10px;border-color:var(--gold);background:var(--goldbg)"><b>Atenção, STF:</b> ${esc(x.stf)}</div>`:''}</div>`).join('')}</div></section>`;}).join('')||'<p class="muted" style="margin-top:20px">Nada encontrado.</p>';};
  draw();$('#cq').oninput=e=>{CQ=e.target.value;draw();};
}
let AUDIO_I=null;
function vAudio(){
  if(!has('audio')){paywall('Resumos em áudio','Os 405 dispositivos narrados em português simples, em 21 faixas: ouça no ônibus, na academia ou antes de dormir.','audio');return;}
  $('#app').innerHTML=`<button class="back" onclick="go('conteudos')">${IC.back}Conteúdos</button><h1>Resumos em áudio</h1><p class="lede">${AUDIOS.length} faixas, uma por título do Código, com verbo-chave, explicação, exemplo, pena e pegadinha de cada artigo. ${Math.round(AUDIOS.reduce((s,a)=>s+a.d,0)/3600*10)/10} horas no total.</p>
  <div class="panel aplw" style="margin-top:18px;position:sticky;top:10px;z-index:5;background:var(--navy);color:#fff;border:0"><div class="muted xs" style="color:var(--gold2);font-weight:700" id="anow">${AUDIO_I===null?'Escolha uma faixa':''}</div><audio id="aplayer" controls preload="none" style="width:100%;margin-top:8px"></audio></div>
  <div class="title-card" style="margin-top:14px">${AUDIOS.map((a,i)=>`<button class="arow" style="grid-template-columns:44px minmax(0,1fr) auto" data-a="${i}"><span class="rank" style="font-size:22px">${i+1}</span><span style="min-width:0"><span class="t">${esc(a.t)}</span><span class="v">${a.n} artigos · ${Math.round(a.d/60)} min</span></span><span class="st">${sm('play',20)}</span></button>`).join('')}</div>
  <p class="note">Dica: no celular, o áudio continua tocando com a tela bloqueada. Os arquivos também podem ser baixados para ouvir sem internet.</p>`;
  const P=$('#aplayer');
  const play=i=>{AUDIO_I=i;const a=AUDIOS[i];P.src='audio/'+a.f;P.play().catch(()=>{});$('#anow').textContent=`Tocando ${i+1}/${AUDIOS.length}: ${a.t}`;};
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>play(+b.dataset.a));
  P.onended=()=>{if(AUDIO_I!==null&&AUDIO_I+1<AUDIOS.length)play(AUDIO_I+1);};
}
function vNews(){
  if(!has('novidades')){paywall('Mudanças na lei','Quando o Código Penal muda, o PenalFlux atualiza os artigos e avisa você.','pro');return;}
  $('#app').innerHTML=`<button class="back" onclick="go('conteudos')">${IC.back}Conteúdos</button><h1>Mudanças na lei</h1><p class="lede">Quando o Código Penal muda, os artigos são atualizados e aparecem aqui.</p>
  <div class="layers" style="margin-top:20px">${UPDATES.map(u=>`<div class="layer"><span class="k" style="background:var(--gold);color:#fff;border:0">${sm('spark',16)}</span><div><span class="muted xs" style="font-weight:700">${u.d}, ${u.l}</span><h3>${u.t}</h3><p>${u.s}</p><div class="mm-chips" style="margin-top:10px">${u.arts.map(n=>`<a href="#artigo-${n}"><b>${n}</b>${esc(byN[n].t)}</a>`).join('')}</div></div></div>`).join('')}</div>`;
}
let chat=[];
function vTutor(){
  if(!has('tutor')){paywall('Tutor de dúvidas','Pergunte "furto ou roubo?" ou "qual a pena de peculato?" e receba a resposta com o artigo certo.','pro');return;}
  if(!chat.length)chat=[{b:1,t:'Olá! Pergunte sobre qualquer crime, pena ou diferença. Exemplos: "furto ou roubo?", "qual a pena de receptação?", "o que é concussão?"'}];
  $('#app').innerHTML=`<button class="back" onclick="go('conteudos')">${IC.back}Conteúdos</button><h1>Tutor de dúvidas</h1>
  <div class="panel" style="margin-top:18px;max-width:740px"><div class="chat">${chat.map(m=>`<div class="bub ${m.b?'bot':'me'}">${m.t}</div>`).join('')}</div>
  <form id="tf" class="row" style="gap:8px"><input id="ti" style="flex:1;min-width:0;padding:13px 14px;border-radius:14px;border:1px solid var(--line);background:var(--surface2);outline:none" placeholder="Digite sua dúvida" autocomplete="off"><button class="btn navy">Perguntar</button></form>
  <p class="note">Nesta demonstração o tutor responde a partir dos ${ARTS.length} dispositivos do app. Na versão publicada, ele usa IA com a mesma base revisada.</p></div>`;
  $('#tf').onsubmit=e=>{e.preventDefault();const v=$('#ti').value.trim();if(!v)return;chat.push({b:0,t:esc(v)});chat.push({b:1,t:answer(v)});vTutor();$('#ti').focus();};
}
function answer(q){
  const stop=['qual','que','pena','crime','diferenca','entre','artigo','sobre','para','como','isso','uma','com','sem','sao','tem','quando','codigo','penal'];
  const t=norm(q).replace(/[^a-z0-9\- ]/g,' ').split(/\s+/).filter(w=>w.length>2&&!stop.includes(w));
  const num=(q.match(/\b(\d{1,3}(?:-[a-zA-Z])?)\b/)||[])[1];
  if(num&&byN[num.toUpperCase()]){const a=byN[num.toUpperCase()];return fmt(a);}
  const sc=ARTS.map(a=>{const tt=norm(a.t+' '+a.k),b=norm(a.s+' '+a.e);let s=0;t.forEach(w=>{if(tt.includes(w))s+=3;else if(b.includes(w))s+=1;});return [s,a];}).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]);
  if(!sc.length)return 'Não encontrei esse assunto. Tente o nome do crime ou o número do artigo, como "155" ou "estelionato".';
  const c=CMPS.find(c=>sc.slice(0,3).filter(x=>c.a.includes(x[1].n)).length>=2&&sc[1]&&sc[1][0]>=3);
  if(c)return `<b>${c.t}</b><br>${c.r}<br><a href="#cmp-${c.id}">Ver a comparação</a>`;
  return fmt(sc[0][1]);
}
const fmt=a=>`<b>Art. ${a.n}, ${esc(a.t.toLowerCase())}.</b> ${esc(a.s)}<br><b>${kLbl(a)}:</b> ${esc(a.k)}${a.pena?`<br><b>Pena:</b> ${esc(a.pena)}`:''}<br><a href="#artigo-${a.n}">Abrir o artigo</a>`;

/* ================= AJUSTES ================= */
function vSet(){
  $('#app').innerHTML=`<h1>Ajustes</h1>
  <section class="panel" style="margin-top:20px">
    <div class="set"><div><h3>Lembrete diário</h3><p class="muted small">${S.remind.on?'Todos os dias às '+S.remind.time:'Desligado'}</p></div><button class="btn soft sm" onclick="remindSheet()">${S.remind.on?'Alterar':'Configurar'}</button></div>
    <div class="set"><div><h3>Meta diária</h3><p class="muted small">${S.goal} artigos por dia</p></div><div class="row" style="gap:6px">${[3,5,10].map(g=>`<button class="btn sm ${S.goal===g?'navy':'soft'}" onclick="S.goal=${g};save();vSet()">${g}</button>`).join('')}</div></div>
    <div class="set"><div><h3>Modo escuro</h3><p class="muted small">Mais confortável para estudar à noite</p></div><button class="switch ${S.theme==='dark'?'on':''}" aria-label="Modo escuro" onclick="S.theme=S.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=S.theme;save();vSet()"></button></div>
    <div class="set"><div><h3>Instalar no celular</h3><p class="muted small">Abra no navegador do celular, toque no menu e em "Adicionar à tela inicial".</p></div></div>
  </section>
  <section class="panel" style="margin-top:16px"><h2>Minha conta</h2><p class="muted small" style="margin:6px 0 14px">${esc((window.PF_USER&&PF_USER.name)||'')}<br>${esc((window.PF_USER&&PF_USER.email)||'')}</p>
    <p class="muted xs" style="margin-bottom:14px">Seu acesso é pessoal e vale em até 2 aparelhos ao mesmo tempo. Ao entrar num terceiro, o mais antigo é desconectado.</p>
    <button class="btn soft sm" onclick="pfLogout()">Sair desta conta</button>
  </section>${legal}`;
}


/* ================= SHEETS ================= */
function openSheet(h){$('#sheet').innerHTML='<div class="grab"></div>'+h;$('#scrim').classList.add('show');setTimeout(()=>{const f=$('#sheet').querySelector('button,input');f&&f.focus();},50);}
function closeSheet(){$('#scrim').classList.remove('show');}
$('#scrim').onclick=e=>{if(e.target.id==='scrim')closeSheet();};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet();});
const li=t=>`<li>${IC.check}<span>${t}</span></li>`;
function offer(id){
  const p=PRODUCTS[id],down=Object.keys(PRODUCTS).find(k=>PRODUCTS[k].of===id),up=false,price=p.price;
  openSheet(`<div class="row">${cover(id)}<div><span class="muted xs" style="font-weight:700">${{entrada:'Plano',bump:'Complemento',upsell:'Próximo nível',downsell:'Oferta especial'}[p.tier]}</span><h2>${p.name}</h2><p class="price" style="margin-top:4px">${p.old?`<s>${brl(p.old)}</s>`:''}${up?brl(20)+' <span class="muted small" style="font-weight:600">de diferença</span>':brl(p.price)+(p.per||'')}</p></div></div>
  <p style="margin-top:14px">${p.desc}</p><ul>${p.items.map(li).join('')}</ul>
  ${CK[id]?`<a class="btn go block" href="https://appdigitalhub.com.br/c/${CK[id]}" target="_blank" rel="noopener">Desbloquear agora</a><p class="note">Na compra, use o mesmo e-mail desta conta: o conteúdo libera aqui sozinho quando o pagamento for aprovado.</p>`:`<button class="btn soft block" disabled>Em breve</button>`}
  ${down&&!S.owned[down]?`<button class="btn soft block" style="margin-top:8px" onclick="offer('${down}')">Prefiro a versão de ${brl(PRODUCTS[down].price)}${PRODUCTS[down].per||''}</button>`:''}
  <button class="btn block" style="margin-top:4px;color:var(--ink2)" onclick="closeSheet()">Agora não</button>`);
}
let pay='pix';
function checkout(id){if(CK[id])window.open('https://appdigitalhub.com.br/c/'+CK[id],'_blank','noopener');}
function remindSheet(){let time=S.remind.time;
  openSheet(`<h2>Lembrete diário</h2><p class="muted" style="margin-top:4px">Escolha o horário em que você costuma ter 10 minutos livres.</p>
  <div class="opts" style="margin-top:16px">${['07:00','12:30','19:00','21:30'].map(t=>`<button data-tm="${t}" class="${time===t?'on':''}">${t}</button>`).join('')}</div>
  <div class="field"><label for="rt">Outro horário</label><input type="time" id="rt" value="${time}"></div>
  <button class="btn go block" style="margin-top:18px" id="rs">Ativar lembrete</button>${S.remind.on?'<button class="btn soft block" style="margin-top:8px" id="roff">Desligar lembrete</button>':''}
  <p class="note">Com o app aberto, o PenalFlux avisa no horário e mostra o lembrete no Início. Notificações com o celular bloqueado chegam na versão instalada (PWA ou app nas lojas).</p>`);
  document.querySelectorAll('[data-tm]').forEach(b=>b.onclick=()=>{time=b.dataset.tm;$('#rt').value=time;document.querySelectorAll('[data-tm]').forEach(x=>x.classList.toggle('on',x===b));});
  $('#rt').onchange=e=>{time=e.target.value;};
  $('#rs').onclick=()=>{S.remind={on:true,time,sent:''};save();try{if('Notification'in window&&Notification.permission==='default')Notification.requestPermission().catch(()=>{});}catch(e){}closeSheet();toast(`Lembrete ativado para as ${time}`);route();};
  const off=$('#roff');if(off)off.onclick=()=>{S.remind.on=false;save();closeSheet();toast('Lembrete desligado');route();};
}
setInterval(()=>{if(!S.remind.on)return;const now=new Date().toTimeString().slice(0,5);if(now>=S.remind.time&&S.remind.sent!==today()&&doneToday()<S.goal){S.remind.sent=today();save();const m=`Faltam ${S.goal-doneToday()} artigos para sua meta de hoje.`;try{if(Notification.permission==='granted')new Notification('Hora de estudar no PenalFlux',{body:m});}catch(e){}toast(m);}},30000);
$('#bellBtn').onclick=remindSheet;$('#setBtn').onclick=()=>go('ajustes');
function onboard(){let obj=S.obj,goal=S.goal;
  openSheet(`<svg class="seal" width="56" height="56" style="background:none;box-shadow:none;margin-bottom:14px;width:56px;height:56px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EBD08E"/><stop offset=".5" stop-color="#C9A24A"/><stop offset="1" stop-color="#8E6C24"/></linearGradient>
    <linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A2B52"/><stop offset="1" stop-color="#0B1530"/></linearGradient>
  </defs>
  <rect width="512" height="512" rx="116" fill="url(#bg3)"/>
  <g transform="rotate(-45 256 256)">
    <circle cx="168" cy="256" r="92" fill="none" stroke="url(#g3)" stroke-width="30"/>
    <path d="M258 241 H430 a14 14 0 0 1 0 30 H258 Z" fill="url(#g3)"/>
    <rect x="352" y="262" width="26" height="54" rx="6" fill="url(#g3)"/>
    <rect x="394" y="262" width="26" height="40" rx="6" fill="url(#g3)"/>
    <g transform="rotate(45 168 256)"><text x="168" y="300" text-anchor="middle" font-family="DM Serif Display, Georgia, serif" font-size="128" fill="#EBD08E">§</text></g>
  </g>
</svg>
<h2>Bem-vindo ao PenalFlux</h2><p class="muted" style="margin-top:4px">Os 361 artigos do Código Penal explicados pelo verbo de cada crime. Três perguntas rápidas:</p>
  <div class="field"><label for="on">Como podemos te chamar?</label><input id="on" placeholder="Seu primeiro nome" value="${esc(S.name)}"></div>
  <div class="field"><label>Para que você está estudando?</label><div class="opts">${['Concurso policial','OAB','Faculdade de Direito','Outro concurso','Curiosidade'].map(o=>`<button data-o="${o}" class="${obj===o?'on':''}">${o}</button>`).join('')}</div></div>
  <div class="field"><label>Quantos artigos por dia?</label><div class="opts" id="og">${[3,5,10].map(g=>`<button data-g="${g}" class="${goal===g?'on':''}">${g} por dia</button>`).join('')}</div></div>
  <button class="btn gold block" style="margin-top:20px" id="ost">Começar a estudar</button>`);
  document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{obj=b.dataset.o;document.querySelectorAll('[data-o]').forEach(x=>x.classList.toggle('on',x===b));});
  document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{goal=+b.dataset.g;document.querySelectorAll('[data-g]').forEach(x=>x.classList.toggle('on',x===b));});
  $('#ost').onclick=()=>{S.name=$('#on').value.trim().split(' ')[0];S.obj=obj;S.goal=goal;S.onb=true;save();closeSheet();route();setTimeout(remindSheet,400);};
}
route();if(!S.onb)setTimeout(onboard,350);
