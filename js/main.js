/* =========================================================
   Questo file costruisce le pagine a partire da sito.js
   e progetti.js. Di norma non serve modificarlo.
   ========================================================= */

document.documentElement.classList.add('js');


/* ---------- Lingua ---------- */

const LINGUE = ['en', 'it'];
const LINGUA_PREDEFINITA = 'en';

function memorizza(l) {
  try { localStorage.setItem('lingua', l); } catch (e) { /* navigazione privata: pazienza */ }
}
function linguaIniziale() {
  const daIndirizzo = new URLSearchParams(location.search).get('lang');
  if (LINGUE.includes(daIndirizzo)) { memorizza(daIndirizzo); return daIndirizzo; }
  try {
    const salvata = localStorage.getItem('lingua');
    if (LINGUE.includes(salvata)) return salvata;
  } catch (e) { /* ignora */ }
  return LINGUA_PREDEFINITA;
}
const lingua = linguaIniziale();
document.documentElement.lang = lingua;

// Sceglie la versione giusta di un testo: "testo" (uguale per tutte le lingue)
// oppure { en: "...", it: "..." }. Se manca una lingua usa l'altra.
const t = v => (v && typeof v === 'object' && !Array.isArray(v))
  ? (v[lingua] || v.en || v.it || '')
  : (v ?? '');

// Parole fisse dell'interfaccia
const UI = {
  en: {
    lavori: 'Work', servizi: 'Services', chiSono: 'About', contatti: 'Contact',
    menu: 'Menu', chiudi: 'Close', scorri: 'Scroll',
    lavoriSelezionati: 'Selected work', tuttiLavori: 'All work', diconoDiMe: 'Kind words',
    tutti: 'All', griglia: 'Grid', elenco: 'List',
    progetto: 'project', progetti: 'projects', nessuno: 'No projects in this category yet.',
    categoria: 'Category', cliente: 'Client', software: 'Software', anno: 'Year',
    ilProgetto: 'The project', successivo: 'Next project', altriLavori: 'More',
    nonTrovato: 'Project not found', tornaLavori: 'Back to all work',
    pagine: 'Pages', social: 'Social', partitaIva: 'VAT',
  },
  it: {
    lavori: 'Lavori', servizi: 'Servizi', chiSono: 'Chi sono', contatti: 'Contatti',
    menu: 'Menu', chiudi: 'Chiudi', scorri: 'Scorri',
    lavoriSelezionati: 'Lavori selezionati', tuttiLavori: 'Tutti i lavori', diconoDiMe: 'Dicono di me',
    tutti: 'Tutti', griglia: 'Griglia', elenco: 'Elenco',
    progetto: 'progetto', progetti: 'progetti', nessuno: 'Nessun progetto in questa categoria, per ora.',
    categoria: 'Categoria', cliente: 'Cliente', software: 'Software', anno: 'Anno',
    ilProgetto: 'Il progetto', successivo: 'Progetto successivo', altriLavori: 'Altri lavori',
    nonTrovato: 'Progetto non trovato', tornaLavori: 'Torna a tutti i lavori',
    pagine: 'Pagine', social: 'Social', partitaIva: 'P.IVA',
  },
};
const ui = k => (UI[lingua] && UI[lingua][k]) || UI.en[k] || k;
const conta = n => `${n} ${n === 1 ? ui('progetto') : ui('progetti')}`;


/* ---------- Strumenti ---------- */

// Rende sicuro un testo da inserire nell'HTML
const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Testo tradotto, con gli "a capo" (\n) trasformati in <br>.
// **parola** = titolo largo rosso, *parola* = corsivo grassetto
const testo = v => esc(t(v))
  .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
  .replace(/<\/strong>\n/g, '</strong>')   // il titolo largo va già a capo da solo
  .replace(/\n/g, '<br>');
// Lo stesso testo senza simboli, per titoli della scheda e attributi
const semplice = v => String(t(v)).replace(/\*/g, '');

function youtubeId(url) {
  const m = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return m && m[1];
}
function vimeoId(url) {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m && m[1];
}

// Riconosce il tipo di media dall'indirizzo
function tipoMedia(src) {
  if (youtubeId(src)) return 'youtube';
  if (vimeoId(src)) return 'vimeo';
  if (/\.(mp4|webm|mov)(\?|#|$)/i.test(src)) return 'video';
  return 'immagine';
}

// Crea l'HTML di un media. "sfondo" = in loop, muto, senza controlli
function mediaHTML(src, { alt = '', sfondo = false, poster = '' } = {}) {
  const tipo = tipoMedia(src);
  if (tipo === 'youtube') {
    const id = youtubeId(src);
    const q = sfondo
      ? `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&hl=${lingua}`
      : `?rel=0&hl=${lingua}`;
    return `<iframe src="https://www.youtube-nocookie.com/embed/${id}${q}" title="${esc(alt)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  }
  if (tipo === 'vimeo') {
    const q = sfondo ? '?background=1' : '?dnt=1';
    return `<iframe src="https://player.vimeo.com/video/${vimeoId(src)}${q}" title="${esc(alt)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  }
  if (tipo === 'video') {
    return `<video src="${esc(src)}"${poster ? ` poster="${esc(poster)}"` : ''} autoplay muted loop playsinline preload="metadata"></video>`;
  }
  return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`;
}

function figureHTML(src, alt) {
  const tipo = tipoMedia(src);
  const cls = tipo === 'immagine' ? 'is-img' : (tipo === 'video' ? 'is-video' : 'is-embed');
  return `<figure class="${cls}">${mediaHTML(src, { alt })}</figure>`;
}


/* ---------- Dati ---------- */

const tutti = typeof PROGETTI !== 'undefined' ? PROGETTI : [];
const categorie = typeof CATEGORIE !== 'undefined' ? CATEGORIE : [];
const sito = typeof SITO !== 'undefined' ? SITO : {};
const pagina = document.body.dataset.pagina || '';


/* ---------- Stili delle scritte (da sito.js → stili) ----------
   Ogni nome di sito.js corrisponde a uno o più elementi della pagina. */

const SCRITTE = {
  testo:                'body',
  logo:                 '.logo',
  menu:                 '.nav a, .lang button, .menu-btn',
  etichette:            '.label, .hero .label, .footer-grid .label',
  heroTitolo:           '.hero .display',
  heroTitoloCorsivo:    '.hero .display em',
  heroTitoloRiga2:      '.hero .display strong',
  heroSottotitolo:      '.hero-foot, .hero-foot p',
  titoliSezione:        '.title',
  titoliSezioneCorsivo: '.title em',
  titoliSezioneRiga2:   '.title strong',
  categorie:            '.row h3',
  categorieFrase:       '.row p',
  cardTitolo:           '.card-info h3',
  cardFrase:            '.card-info p',
  cardCategoria:        '.card-info .tag',
  chiSono:              '.intro .lead',
  contattiFrase:        '.cta .display',
  contattiFraseCorsivo: '.cta .display em',
  contattiFraseRiga2:   '.cta .display strong',
  contattiEmail:        '.cta-mail',
  progettoTitolo:       '.project-hero .display',
  progettoTesto:        '.story-body, .project-hero .lead',
  progettoSuccessivo:   '.next-project .display',
  footerTesto:          '.footer',
  footerNome:           '.footer-big',
};

const COLORI = {
  bianco: 'var(--text)', grigio: 'var(--muted)', rosso: 'var(--accent)',
  verde: 'var(--accent-2)', nero: 'var(--bg)',
};

(function applicaStili() {
  const stili = sito.stili || {};
  const fontNome = f => String(f).trim().replace(/["']/g, '');
  // Font di una scritta: il suo, oppure quello della scritta "madre" (heroTitoloCorsivo → heroTitolo)
  const fontDi = k => (stili[k] && stili[k].font) ||
    (/(Corsivo|Riga2)$/.test(k) ? fontDi(k.replace(/(Corsivo|Riga2)$/, '')) : null);

  // 1) Regole CSS. "html body" davanti vince sullo stile base ma non sugli effetti al passaggio del mouse
  const regole = [];
  const famiglie = {};   // font → pesi, corsivo, larghezze usati
  Object.entries(stili).forEach(([k, s]) => {
    const sel = SCRITTE[k];
    if (!sel || !s) return;
    const p = [];
    if (s.font) p.push(`font-family:"${fontNome(s.font)}", sans-serif`);
    if (s.peso) p.push(`font-weight:${Number(s.peso)}`);
    if (s.colore) p.push(`color:${COLORI[s.colore] || s.colore}`);
    if (s.corsivo != null) p.push(`font-style:${s.corsivo ? 'italic' : 'normal'}`);
    if (s.maiuscolo != null) p.push(`text-transform:${s.maiuscolo ? 'uppercase' : 'none'}`);
    if (s.larghezza) p.push(`font-stretch:${Number(s.larghezza)}%`);
    else if (s.font) p.push('font-stretch:100%');
    if (p.length) {
      const prefissato = sel.split(',').map(x => x.trim() === 'body' ? 'html body' : `html body ${x.trim()}`).join(', ');
      regole.push(`${prefissato}{${p.join(';')}}`);
    }

    const f = fontDi(k);
    if (f) {
      const fam = famiglie[fontNome(f)] ||= { pesi: new Set([400]), corsivo: false, larghezze: new Set() };
      fam.pesi.add(Number(s.peso) || 400);
      if (s.corsivo) fam.corsivo = true;
      if (s.larghezza) fam.larghezze.add(Number(s.larghezza));
    }
  });
  if (regole.length) {
    const st = document.createElement('style');
    st.id = 'stili-scritte';
    st.textContent = regole.join('\n');
    document.head.appendChild(st);
  }

  // 2) Carica i font da Google Fonts. Se una combinazione non esiste
  //    (es. il font non ha il corsivo o la larghezza) riprova con meno opzioni.
  Object.entries(famiglie).forEach(([nomeFont, fam]) => {
    const pesi = [...fam.pesi].sort((a, b) => a - b);
    const larg = [...fam.larghezze].sort((a, b) => a - b);
    const url = (conCorsivo, conLarghezza) => {
      const assi = [], tuple = [];
      const ital = conCorsivo ? [0, 1] : [null];
      const wdth = conLarghezza && larg.length ? [...new Set([100, ...larg])].sort((a, b) => a - b) : [null];
      if (conCorsivo) assi.push('ital');
      if (wdth[0] != null) assi.push('wdth');
      assi.push('wght');
      ital.forEach(i => wdth.forEach(w => pesi.forEach(p =>
        tuple.push([i, w, p].filter(v => v != null).join(',')))));
      return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(nomeFont).replace(/%20/g, '+')}:${assi.join(',')}@${tuple.join(';')}&display=swap`;
    };
    const tentativi = [
      url(fam.corsivo, true), url(false, true), url(fam.corsivo, false), url(false, false),
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(nomeFont).replace(/%20/g, '+')}&display=swap`,
    ].filter((u, i, a) => a.indexOf(u) === i);
    const prova = i => {
      if (i >= tentativi.length) return;
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = tentativi[i];
      l.onerror = () => { l.remove(); prova(i + 1); };
      document.head.appendChild(l);
    };
    prova(0);
  });
})();

// Legge un valore da sito.js, es. leggi("home.titolo")
const leggi = percorso => percorso.split('.').reduce((o, k) => (o == null ? o : o[k]), sito);

// Nome di una categoria nella lingua attuale
const nomeCategoria = nome => {
  const c = categorie.find(x => x.nome === nome);
  return (c && t(c.etichetta)) || nome || '';
};

function linkProgetto(p) {
  return `progetto.html?id=${encodeURIComponent(p.id)}`;
}

function cardHTML(p, cls = '') {
  const frase = t(p.frase);
  return `
    <a href="${linkProgetto(p)}" class="card ${cls}" data-reveal>
      <div class="card-media">${mediaHTML(p.copertina || '', { alt: semplice(p.titolo), sfondo: true })}</div>
      <div class="card-info">
        <div><h3>${testo(p.titolo)}</h3>${frase ? `<p>${testo(frase)}</p>` : ''}</div>
        <span class="tag">${esc(nomeCategoria(p.categoria))}</span>
      </div>
    </a>`;
}


/* ---------- Parti comuni: intestazione, contatti, piè di pagina ---------- */

const nome = t(sito.nome);
const inHome = pagina === 'home';
const ancora = id => (inHome ? '#' : 'index.html#') + id;
const social = (sito.social || []).filter(x => x.nome && x.link);
const linkEsterno = x => `<a href="${esc(x.link)}" target="_blank" rel="noopener">${esc(t(x.nome))}</a>`;
const mail = sito.email ? `<a href="mailto:${esc(sito.email)}">${esc(sito.email)}</a>` : '';
const tel = sito.telefono
  ? `<a href="tel:${esc(String(sito.telefono).replace(/[^+\d]/g, ''))}">${esc(sito.telefono)}</a>` : '';

// Titolo della scheda del browser e descrizione per Google
document.title = inHome
  ? [nome, t(sito.ruolo)].filter(Boolean).join(' — ')
  : `${pagina === 'lavori' ? ui('lavori') : ui('nonTrovato')} — ${nome}`;
const metaDescr = document.querySelector('meta[name="description"]');
if (metaDescr && sito.descrizione) metaDescr.content = t(sito.descrizione);

const header = document.getElementById('header');
if (header) {
  const attuale = pagina === 'lavori' || pagina === 'progetto' ? ' aria-current="page"' : '';
  header.innerHTML = `
    <a href="index.html" class="logo">${esc(nome)}</a>
    <nav class="nav" id="nav">
      <a href="lavori.html"${attuale}>${ui('lavori')}</a>
      <a href="${ancora('servizi')}">${ui('servizi')}</a>
      <a href="${ancora('chi-sono')}">${ui('chiSono')}</a>
      <a href="${ancora('contatti')}">${ui('contatti')}</a>
    </nav>
    <div class="lang" role="group" aria-label="Language">
      ${LINGUE.map(l => `<button data-lang="${l}" aria-pressed="${l === lingua}">${l.toUpperCase()}</button>`).join('<span>/</span>')}
    </div>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav">${ui('menu')}</button>`;

  // Cambio lingua: ricarica la pagina nella lingua scelta
  header.querySelectorAll('[data-lang]').forEach(b => {
    b.addEventListener('click', () => {
      if (b.dataset.lang === lingua) return;
      memorizza(b.dataset.lang);
      const params = new URLSearchParams(location.search);
      params.set('lang', b.dataset.lang);
      location.search = params.toString();
    });
  });
}

const cta = document.getElementById('contatti');
if (cta) {
  const frase = (sito.cta || {})[pagina];
  cta.innerHTML = `
    <p class="label" data-reveal>${ui('contatti')}</p>
    ${t(frase) ? `<h2 class="display" data-reveal style="margin-top:24px">${testo(frase)}</h2>` : ''}
    ${sito.email ? `<a href="mailto:${esc(sito.email)}" class="cta-mail" data-reveal>${esc(sito.email)}</a>` : ''}`;
}

const footer = document.getElementById('footer');
if (footer) {
  const f = sito.footer || {};
  footer.innerHTML = `
    <div class="footer-grid">
      <div>
        ${t(f.titolo) ? `<p class="label">${testo(f.titolo)}</p>` : ''}
        ${t(f.testo) ? `<p>${testo(f.testo)}</p>` : ''}
      </div>
      <div>
        <p class="label">${ui('pagine')}</p>
        <ul>
          <li><a href="lavori.html">${ui('lavori')}</a></li>
          <li><a href="${ancora('servizi')}">${ui('servizi')}</a></li>
          <li><a href="${ancora('chi-sono')}">${ui('chiSono')}</a></li>
        </ul>
      </div>
      <div>
        ${social.length ? `<p class="label">${ui('social')}</p><ul>${social.map(x => `<li>${linkEsterno(x)}</li>`).join('')}</ul>` : ''}
      </div>
      <div>
        <p class="label">${ui('contatti')}</p>
        <ul>${[mail, tel].filter(Boolean).map(x => `<li>${x}</li>`).join('')}</ul>
      </div>
    </div>
    <p class="footer-big">${esc(nome)}</p>
    <div class="footer-bottom">
      <span>© <span class="anno"></span> ${esc(nome)}</span>
      ${sito.partitaIva ? `<span>${ui('partitaIva')} ${esc(sito.partitaIva)}</span>` : ''}
    </div>`;
}

// Parole fisse segnate nell'HTML con data-ui="..."
document.querySelectorAll('[data-ui]').forEach(el => {
  el.textContent = ui(el.dataset.ui);
});
// Testi segnati nell'HTML con data-sito="..."
document.querySelectorAll('[data-sito]').forEach(el => {
  const valore = t(leggi(el.dataset.sito));
  if (valore) el.innerHTML = testo(valore);
  else el.hidden = true;
});
// Sezioni che spariscono se il loro testo è vuoto (data-se="...")
document.querySelectorAll('[data-se]').forEach(el => {
  if (!t(leggi(el.dataset.se))) el.hidden = true;
});


/* ---------- Animazione di comparsa ---------- */

const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' })
  : null;

function osserva(root = document) {
  root.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => {
    io ? io.observe(el) : el.classList.add('is-in');
  });
}


/* ---------- Video in loop ----------
   Alcuni browser (Opera, modalità risparmio energetico o dati) non avviano
   da soli i video, anche se muti. Qui li avviamo esplicitamente e, se il
   browser rifiuta, riproviamo al primo tocco, clic o tasto del visitatore. */

function avviaVideo(root = document) {
  root.querySelectorAll('video[autoplay]').forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const prova = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => { /* bloccato: riproveremo al primo gesto */ });
    };
    if (v.readyState >= 2) prova();
    else v.addEventListener('canplay', prova, { once: true });
  });
}

function riprendiVideo() {
  document.querySelectorAll('video[autoplay]').forEach(v => {
    if (v.paused) v.play().catch(() => {});
  });
}
['pointerdown', 'touchstart', 'keydown', 'click'].forEach(ev =>
  window.addEventListener(ev, riprendiVideo, { passive: true }));
// Quando si torna sulla scheda del sito, i video riprendono
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) riprendiVideo();
});


/* ---------- HOME ---------- */

const showreel = document.getElementById('showreel');
const reel = sito.showreel || (typeof SHOWREEL !== 'undefined' ? SHOWREEL : null);
if (showreel && reel && reel.media) {
  showreel.innerHTML = mediaHTML(reel.media, { alt: '', sfondo: true, poster: reel.poster });
  const img = showreel.querySelector('img');
  if (img) img.loading = 'eager';
  const vid = showreel.querySelector('video');
  if (vid) vid.preload = 'auto';   // lo sfondo si carica subito
}

const righeCategorie = document.getElementById('categorie');
if (righeCategorie) {
  righeCategorie.innerHTML = categorie.map((c, i) => {
    const n = tutti.filter(p => p.categoria === c.nome).length;
    return `
      <li data-reveal>
        <a class="row" href="lavori.html?categoria=${encodeURIComponent(c.nome)}">
          <span class="num">${String(i + 1).padStart(2, '0')}</span>
          <h3>${esc(nomeCategoria(c.nome))}</h3>
          <p>${testo(c.frase)} <span class="count">${conta(n)} →</span></p>
        </a>
      </li>`;
  }).join('');
}

/* Carosello: copertine di tutti i progetti in ordine casuale, scorrimento
   automatico infinito. Ai lati le immagini sfumano e rimpiccioliscono. */
const traccia = document.getElementById('carosello-traccia');
if (traccia) {
  const conCopertina = tutti.filter(p => p.copertina);
  if (!conCopertina.length) {
    traccia.parentElement.hidden = true;
  } else {
    // Mescola (Fisher-Yates)
    const lista = conCopertina.slice();
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    const voce = p => `
      <a href="${linkProgetto(p)}" class="carousel-item" aria-label="${esc(semplice(p.titolo))}">
        ${mediaHTML(p.copertina, { alt: semplice(p.titolo), sfondo: true })}
      </a>`;
    // Due copie in fila: quando la prima è uscita del tutto si riparte da capo senza salti
    traccia.innerHTML = lista.map(voce).join('') + lista.map(voce).join('');
    traccia.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });

    const sezione = traccia.parentElement;
    const voci = [...traccia.children];
    const VELOCITA = 40;          // pixel al secondo
    const SCALA_MIN = 0.7;        // dimensione ai lati
    const OPACITA_MIN = 0.08;     // opacità ai bordi estremi
    const MENO_OPACITA_LATI = 0.2; // le card ai lati hanno il 20% di opacità in meno (il centro resta pieno)
    const ZOOM = 2;               // ingrandimento della card sotto il mouse (2 = 200%)
    const RAGGIO = 0.8;           // ampiezza del gradiente sulle vicine, in card (più basso = più rapido)
    const REATTIVITA = 7;         // quanto in fretta le card seguono il mouse (più basso = più morbido)
    const FRENATA = 3;            // quanto in fretta lo scorrimento si ferma e riparte
    const fermo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let x = 0, ultimo = 0, visibile = true, metà = 0, larg = 0, passoCard = 0;
    let mouseX = null;            // posizione del mouse sul carosello, null = fuori
    let perno = null;             // posizione del mouse "ammorbidita"
    let forza = 0;                // 0 = nessun ingrandimento, 1 = ingrandimento pieno
    let velAttuale = fermo ? 0 : VELOCITA;
    let base = [];                // centro di ogni card senza trasformazioni

    // Lunghezza esatta di una copia (inizio della seconda copia − inizio della prima)
    const misura = () => {
      metà = voci[lista.length].offsetLeft - voci[0].offsetLeft;
      larg = voci[0].offsetWidth;
      passoCard = voci.length > 1 ? voci[1].offsetLeft - voci[0].offsetLeft : larg;
      base = voci.map(el => el.offsetLeft + el.offsetWidth / 2);
    };
    misura();
    window.addEventListener('resize', misura);
    window.addEventListener('load', misura);

    if (conMouse) {
      sezione.addEventListener('pointermove', e => { mouseX = e.clientX; });
      sezione.addEventListener('pointerleave', () => { mouseX = null; });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { visibile = e.isIntersecting; }).observe(sezione);
    }

    // Avvicina "da" a "a" in modo morbido, uguale a qualsiasi frequenza dello schermo
    const verso = (da, a, rapidità, dt) => da + (a - da) * (1 - Math.exp(-rapidità * dt));
    const curva = v => v * v * (3 - 2 * v);   // smoothstep 0..1

    const sfuma = dt => {
      if (!passoCard) return;
      const centro = window.innerWidth / 2;
      const origine = sezione.getBoundingClientRect().left + x;

      // Il mouse viene seguito con un leggero ritardo; uscendo, le card si sgonfiano piano
      if (mouseX != null) perno = perno == null ? mouseX : verso(perno, mouseX, REATTIVITA * 1.5, dt);
      forza = verso(forza, mouseX != null ? 1 : 0, REATTIVITA, dt);
      if (forza < 0.001 && mouseX == null) { forza = 0; perno = null; }
      const p = perno == null ? null : perno - origine;   // mouse nelle coordinate della fila

      // 1) ingrandimento: massimo sotto il mouse, cala con una curva morbida (gaussiana)
      const zoom = base.map(c => {
        if (p == null || !forza) return 1;
        const d = (c - p) / passoCard;
        return 1 + (ZOOM - 1) * forza * Math.exp(-0.5 * (d / RAGGIO) ** 2);
      });

      // 2) le card ingrandite allargano la fila; il punto sotto il mouse resta fermo
      const sposta = base.map(() => 0);
      if (p != null && forza) {
        const inizio = base[0] - passoCard / 2;
        const slot = zoom.map(z => passoCard + larg * (z - 1));
        const nuovoCentro = [];
        let acc = inizio;
        slot.forEach((s, i) => { nuovoCentro.push(acc + s / 2); acc += s; });
        // dove cade il mouse nella fila nuova (stessa frazione della stessa card)
        const kk = Math.max(0, Math.min(base.length - 1, Math.floor((p - inizio) / passoCard)));
        const fraz = (p - (base[kk] - passoCard / 2)) / passoCard;
        const pNuovo = nuovoCentro[kk] - slot[kk] / 2 + fraz * slot[kk];
        const offset = p - pNuovo;
        base.forEach((c, i) => { sposta[i] = nuovoCentro[i] + offset - c; });
      }

      voci.forEach((el, i) => {
        const cx = origine + base[i] + sposta[i];
        const d = Math.min(1, Math.abs(cx - centro) / centro);   // 0 al centro, 1 al bordo
        const k = d * d;                                         // morbido al centro
        const hover = (zoom[i] - 1) / (ZOOM - 1);                // 0..1
        const scala = (1 - (1 - SCALA_MIN) * k) * zoom[i];
        const opac = (1 - (1 - OPACITA_MIN) * k) * (1 - MENO_OPACITA_LATI * curva(Math.min(1, d / 0.6)));
        el.style.transform = `translate3d(${sposta[i].toFixed(2)}px,0,0) scale(${scala.toFixed(4)})`;
        el.style.opacity = (opac + (1 - opac) * hover).toFixed(3);
        el.style.zIndex = Math.round(zoom[i] * 100);
      });
    };

    const passo = ora => {
      const dt = ultimo ? Math.min(0.05, (ora - ultimo) / 1000) : 0;
      ultimo = ora;
      if (visibile) {
        // lo scorrimento rallenta fino a fermarsi sotto il mouse e riparte con calma
        velAttuale = verso(velAttuale, mouseX != null || fermo ? 0 : VELOCITA, FRENATA, dt);
        if (metà) {
          x -= velAttuale * dt;
          if (-x >= metà) x += metà;
          traccia.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
        }
        sfuma(dt);
      }
      requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }
}

const inEvidenza = document.getElementById('lavori-in-evidenza');
if (inEvidenza) {
  // Schema: uno largo, poi due affiancati (il secondo più in basso), e così via
  inEvidenza.innerHTML = tutti.filter(p => p.inEvidenza).map((p, i) => {
    const pos = i % 3;
    return cardHTML(p, pos === 0 ? 'wide' : pos === 2 ? 'offset' : '');
  }).join('');
}


/* ---------- PAGINA LAVORI ---------- */

const griglia = document.getElementById('griglia-lavori');
if (griglia) {
  const filtri = document.getElementById('filtri');
  const conteggio = document.getElementById('conteggio');
  const TUTTI = '*';
  let attiva = new URLSearchParams(location.search).get('categoria') || TUTTI;
  if (!categorie.some(c => c.nome === attiva)) attiva = TUTTI;

  filtri.innerHTML = [TUTTI, ...categorie.map(c => c.nome)].map(n =>
    `<button data-categoria="${esc(n)}">${esc(n === TUTTI ? ui('tutti') : nomeCategoria(n))}</button>`).join('');

  function mostra() {
    const lista = attiva === TUTTI ? tutti : tutti.filter(p => p.categoria === attiva);
    griglia.innerHTML = lista.length
      ? lista.map(p => cardHTML(p)).join('')
      : `<p class="muted">${ui('nessuno')}</p>`;
    conteggio.textContent = conta(lista.length);
    filtri.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.categoria === attiva));
    const params = new URLSearchParams(location.search);
    if (attiva === TUTTI) params.delete('categoria'); else params.set('categoria', attiva);
    const q = params.toString();
    history.replaceState(null, '', location.pathname + (q ? '?' + q : ''));
    osserva(griglia);
    avviaVideo(griglia);
  }

  filtri.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    attiva = b.dataset.categoria;
    mostra();
  });

  // Griglia / elenco
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      griglia.classList.toggle('is-list', btn.dataset.mode === 'list');
      document.querySelectorAll('[data-mode]').forEach(b =>
        b.setAttribute('aria-pressed', b === btn));
    });
  });

  mostra();
}


/* ---------- PAGINA PROGETTO ---------- */

const paginaProgetto = document.getElementById('progetto');
if (paginaProgetto) {
  const id = new URLSearchParams(location.search).get('id');
  const indice = tutti.findIndex(p => p.id === id);
  const p = tutti[indice];

  if (!p) {
    paginaProgetto.innerHTML = `
      <section class="project-hero">
        <h1 class="display">${ui('nonTrovato')}</h1>
        <p class="lead muted" style="margin-top:20px"><a href="lavori.html" class="arrow-link">${ui('tornaLavori')} <span>→</span></a></p>
      </section>`;
  } else {
    const titolo = t(p.titolo);
    const frase = t(p.frase);
    document.title = `${semplice(titolo).replace(/\s*\n\s*/g, ' ')} — ${nome}`;

    const dati = [
      [ui('categoria'), p.categoria && `<a href="lavori.html?categoria=${encodeURIComponent(p.categoria)}">${esc(nomeCategoria(p.categoria))}</a>`],
      [ui('cliente'), esc(t(p.cliente))],
      [ui('software'), esc(t(p.software))],
      [ui('anno'), esc(t(p.anno))],
    ].filter(([, v]) => v);

    const blocchi = (p.media || []).map(m => Array.isArray(m)
      ? `<div class="images two" data-reveal>${m.map(src => figureHTML(src, titolo)).join('')}</div>`
      : `<div class="images" data-reveal>${figureHTML(m, titolo)}</div>`);

    const paragrafi = String(t(p.testo)).split(/\n\s*\n/).map(x => x.trim()).filter(Boolean);
    const racconto = paragrafi.length ? `
      <section class="section">
        <div class="story">
          <p class="label" data-reveal>${ui('ilProgetto')}</p>
          <div class="story-body" data-reveal>${paragrafi.map(x => `<p>${testo(x)}</p>`).join('')}</div>
        </div>
      </section>` : '<div class="spacer"></div>';

    const successivo = tutti[(indice + 1) % tutti.length];
    const simili = tutti.filter(x => x.categoria === p.categoria && x !== p && x !== successivo).slice(0, 2);

    paginaProgetto.innerHTML = `
      <section class="project-hero">
        <a href="lavori.html" class="back">← ${ui('tuttiLavori')}</a>
        <h1 class="display" data-reveal>${testo(titolo)}</h1>
        ${frase ? `<p class="lead muted" data-reveal style="margin-top:20px">${testo(frase)}</p>` : ''}
        ${dati.length ? `<ul class="meta" data-reveal>${dati.map(([k, v]) =>
          `<li><span class="label">${k}</span>${v}</li>`).join('')}</ul>` : ''}
      </section>

      ${blocchi[0] || ''}
      ${racconto}
      ${blocchi.slice(1).join('')}

      ${successivo && successivo !== p ? `
      <a href="${linkProgetto(successivo)}" class="next-project" data-reveal>
        <span class="label">${ui('successivo')}</span>
        <span class="display">${testo(successivo.titolo)} →</span>
      </a>` : ''}

      ${simili.length ? `
      <section class="section">
        <div class="section-head"><p class="label">${ui('altriLavori')} ${esc(nomeCategoria(p.categoria))}</p></div>
        <div class="work-grid simili">${simili.map(x => cardHTML(x)).join('')}</div>
      </section>` : ''}`;
  }
}


/* ---------- Comune a tutte le pagine ---------- */

osserva();
avviaVideo();

// Anno automatico nel piè di pagina
document.querySelectorAll('.anno').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Intestazione: sfondo scuro quando si esce dall'hero (in home) o si scorre (altre pagine)
const hero = document.querySelector('.hero');
if (header) {
  const aggiornaHeader = () => {
    const soglia = hero ? hero.offsetHeight - header.offsetHeight : 10;
    header.classList.toggle('is-scrolled', window.scrollY > soglia);
  };
  window.addEventListener('scroll', aggiornaHeader, { passive: true });
  window.addEventListener('resize', aggiornaHeader);
  aggiornaHeader();
}

// Menu su telefono
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
  const toggleMenu = open => {
    document.documentElement.classList.toggle('menu-open', open);   // blocca lo scorrimento
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? ui('chiudi') : ui('menu');
  };
  menuBtn.addEventListener('click', () => {
    toggleMenu(!document.body.classList.contains('menu-open'));
  });
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });
  // Chiudi con Esc, o se lo schermo si allarga (es. telefono ruotato)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', e => {
    if (e.matches) toggleMenu(false);
  });
}

// Lightbox: clic su un'immagine di un progetto per ingrandirla
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const bigImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.textContent = `${ui('chiudi')} ×`;
    closeBtn.setAttribute('aria-label', ui('chiudi'));
  }

  document.querySelectorAll('.images img').forEach(img => {
    img.addEventListener('click', () => {
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    lightbox.hidden = true;
    bigImg.src = '';
    document.body.style.overflow = '';
  };

  lightbox.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });
}
