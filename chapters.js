/* Progressive enhancement: the authored sections remain the content source. */
(() => {
  'use strict';
  const sections = [...document.querySelectorAll('body > section')];
  if (sections.length !== 9) return;
  const titles = ['Dein nächster Schritt', 'Was ist BWL?', 'Dein BWL-Fit', 'Dein Studienweg', 'Deine Schwerpunkte', 'International', 'Dein Campusleben', 'Deine Perspektiven', 'Dein Start'];
  const ids = ['start', 'studium', 'fit-check', 'studienweg', 'schwerpunkte', 'international', 'campusleben', 'perspektiven', 'abschluss'];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const main = document.createElement('main');
  main.className = 'chapter-deck';
  sections[0].before(main);
  const pages = sections.map((section, i) => {
    if (!section.id) section.id = ids[i];
    const page = document.createElement('div');
    page.className = 'chapter-page';
    page.dataset.chapter = i;
    page.setAttribute('role', 'region');
    page.setAttribute('aria-label', `${i + 1}. ${titles[i]}`);
    page.tabIndex = -1;
    page.hidden = true;
    page.append(section);
    main.append(page);
    return page;
  });
  const footer = document.querySelector('body > footer');
  if (footer) pages[8].append(footer);
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';
  nav.setAttribute('aria-label', 'Kapitel wechseln');
  nav.innerHTML = '<div class="chapter-progress" aria-hidden="true"><span></span></div><button type="button" class="chapter-back"><span aria-hidden="true">←</span> Zurück</button><div class="chapter-location"><span class="chapter-count" aria-hidden="true"></span><label class="chapter-select-label"><span class="chapter-sr">Kapitel auswählen</span><select class="chapter-select"></select></label></div><button type="button" class="chapter-next">Weiter <span aria-hidden="true">→</span></button><p class="chapter-sr chapter-announcement" aria-live="polite" aria-atomic="true"></p>';
  document.body.append(nav);
  const back = nav.querySelector('.chapter-back');
  const next = nav.querySelector('.chapter-next');
  const select = nav.querySelector('select');
  titles.forEach((title, i) => select.add(new Option(`${String(i + 1).padStart(2, '0')} · ${title}`, String(i))));
  let active = -1, transition;
  function targetFromHash() {
    try { return document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return null; }
  }
  function show(index, { historyMode = 'push', focus = true, target = null } = {}) {
    if (index < 0 || index >= pages.length) return;
    const changed = index !== active;
    transition?.cancel();
    if (changed) {
      pages.forEach((page, i) => { page.hidden = i !== index; page.inert = i !== index; });
      const direction = index > active ? 1 : -1;
      active = index;
      if (focus) pages[index].focus({ preventScroll:true });
      if (!reduced.matches && focus) transition = pages[index].animate([
        { opacity:0, transform:`translateY(${direction * 14}px)` }, { opacity:1, transform:'none' }
      ], { duration:360, easing:'cubic-bezier(.22,.61,.36,1)' });
    }
    select.value = String(index);
    back.disabled = index === 0;
    next.innerHTML = index === 8 ? 'Zum Anfang <span aria-hidden="true">↗</span>' : 'Weiter <span aria-hidden="true">→</span>';
    next.setAttribute('aria-label', index === 8 ? 'Zurück zum ersten Kapitel' : `Weiter: ${titles[index + 1]}`);
    nav.querySelector('.chapter-count').textContent = `${String(index + 1).padStart(2,'0')} / 09`;
    nav.querySelector('.chapter-progress span').style.transform = `scaleX(${(index + 1) / 9})`;
    nav.querySelector('.chapter-announcement').textContent = `Kapitel ${index + 1} von 9: ${titles[index]}`;
    if (historyMode !== 'none') history[`${historyMode}State`](null, '', `#${target?.id || sections[index].id}`);
    document.dispatchEvent(new CustomEvent('chapterchange', { detail:{ index, page:pages[index] } }));
    if (target && target !== sections[index]) requestAnimationFrame(() => {
      if (target.id.startsWith('journey-stage-')) {
        target.querySelector('.journey-preview')?.click();
      } else target.scrollIntoView({ block:'nearest', behavior:'instant' });
    });
  }
  back.addEventListener('click', () => show(active - 1));
  next.addEventListener('click', () => show(active === 8 ? 0 : active + 1));
  select.addEventListener('change', () => show(Number(select.value)));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(link.hash.slice(1))); } catch { return; }
    const index = pages.findIndex(page => page.contains(target));
    if (index < 0) return;
    event.preventDefault();
    // The previous end-of-gallery link leads into the campus chapter.
    if (target.id === 'international-end') show(6);
    else show(index, { target });
  });
  const restore = () => {
    const target = targetFromHash();
    const index = pages.findIndex(page => page.contains(target));
    show(index < 0 ? 0 : index, { historyMode:'none', target });
  };
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', restore);
  reduced.addEventListener('change', () => transition?.cancel());
  document.documentElement.classList.add('chapter-mode');
  const target = targetFromHash();
  show(Math.max(0, pages.findIndex(page => page.contains(target))), { historyMode:'none', focus:false, target });
  // Journey panel IDs are generated by its own component later in this document.
  document.addEventListener('DOMContentLoaded', () => { if (location.hash) restore(); }, { once:true });

  const symbols = ['marketing', 'finance', 'controlling', 'entrepreneurship', 'international'];
  document.querySelectorAll('.hero-topics li').forEach((item, i) => {
    const label = document.createElement('span');
    label.textContent = item.textContent;
    const img = document.createElement('img');
    img.src = `Bilder/topics/${symbols[i]}.svg`;
    img.alt = '';
    img.width = 160; img.height = 160;
    item.replaceChildren(img, label);
  });
})();
