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

// Testo tradotto, con gli "a capo" (\n) trasformati in <br>
const testo = v => esc(t(v)).replace(/\n/g, '<br>');

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
      <div class="card-media">${mediaHTML(p.copertina || '', { alt: t(p.titolo), sfondo: true })}</div>
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
    document.title = `${titolo.replace(/\s*\n\s*/g, ' ')} — ${nome}`;

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
        <div class="work-grid">${simili.map(x => cardHTML(x)).join('')}</div>
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
