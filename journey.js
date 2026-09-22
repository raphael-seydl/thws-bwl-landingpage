(() => {
  'use strict';
  const journey = document.querySelector('.journey');
  if (!journey) return;
  const wrap = journey.querySelector('.journey-wrap');
  const gallery = journey.querySelector('.journey-steps');
  const steps = [...gallery.querySelectorAll('.journey-step')];
  const descriptions = ['Begrüßung im großen Hörsaal', 'Vorlesung mit Professor und Studierenden',
    'Gemeinsames Lernen in der Lounge', 'Präsentation im Unternehmen',
    'Persönlicher Austausch nach der Vorlesung', 'Auslandserfahrung in Budapest', 'Abschlussfeier mit fliegenden Hüten'];
  const crops = ['0% 50%', '50% 50%', '58% 50%', '48% 50%', '58% 50%', '40% 50%', '50% 38%'];
  journey.querySelector('.journey-visual').hidden = true;
  journey.querySelector('h2').id = 'journey-heading';
  journey.setAttribute('aria-labelledby', 'journey-heading');
  // Authored HTML remains the sole source for titles, summaries and full copy.
  const previews = steps.map((step, i) => {
    step.id = `journey-stage-${i + 1}`;
    const copy = step.querySelector('div');
    copy.className = 'journey-panel-copy';
    const full = document.createElement('p');
    full.className = 'journey-step-full';
    full.textContent = step.dataset.text;
    copy.append(full);
    const img = document.createElement('img');
    img.className = 'journey-photo';
    img.src = `Bilder/journey/${String(i + 1).padStart(2, '0')}.webp`;
    img.alt = descriptions[i];
    img.width = 2200;
    img.height = 1244;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.objectPosition = crops[i];
    const preview = document.createElement('button');
    preview.type = 'button';
    preview.className = 'journey-preview';
    preview.setAttribute('aria-label', `Schritt ${i + 1}: ${step.dataset.title}`);
    preview.setAttribute('aria-controls', step.id);
    const number = document.createElement('span');
    number.textContent = String(i + 1).padStart(2, '0');
    const label = document.createElement('span');
    label.className = 'journey-preview-title';
    label.textContent = step.dataset.title;
    preview.append(number, label);
    step.prepend(img, preview);
    return preview;
  });
  const navigation = document.createElement('nav');
  navigation.className = 'journey-navigation';
  navigation.setAttribute('aria-label', 'Studienweg: sieben Schritte');
  const counter = document.createElement('span');
  counter.className = 'journey-counter';
  const links = steps.map((step, i) => {
    const link = document.createElement('a');
    link.href = `#${step.id}`;
    link.textContent = String(i + 1).padStart(2, '0');
    link.setAttribute('aria-label', `Schritt ${i + 1}: ${step.dataset.title}`);
    navigation.append(link);
    return link;
  });
  navigation.prepend(counter);
  wrap.append(navigation);
  journey.classList.add('journey-panels');
  let active = -1, desktop = false, trigger, layout, motion;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const documentTop = element => {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
    return top;
  };
  function paint(animate = false) {
    if (!desktop || !layout) return;
    let x = 0;
    motion?.kill();
    const destinations = steps.map((step, i) => {
      const width = i === active ? layout.large : layout.small;
      const target = { x, clipPath:`inset(0px ${layout.large - width}px 0px 0px)` };
      x += width + layout.gap;
      return target;
    });
    // Full-size photos translate behind clipping edges; images never stretch.
    if (animate) {
      motion = gsap.timeline({ defaults:{ duration:.6, ease:'power3.inOut' } });
      steps.forEach((step, i) => {
        motion.to(step, destinations[i], 0);
        motion.to(step.querySelector('img'), { x:i === active ? 0 : -Math.round((layout.large - layout.small) * .48) }, 0);
      });
    } else steps.forEach((step, i) => {
      gsap.set(step, destinations[i]);
      gsap.set(step.querySelector('img'), { x:i === active ? 0 : -Math.round((layout.large - layout.small) * .48) });
    });
  }
  function setActive(index, animate = false) {
    if (index === active) return;
    active = index;
    counter.textContent = `${String(index + 1).padStart(2, '0')} / 07`;
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
      [links[i], previews[i]].forEach(control => {
        if (i === index) control.setAttribute('aria-current', 'step');
        else control.removeAttribute('aria-current');
      });
    });
    paint(animate);
  }
  function go(index) {
    if (desktop && trigger) {
      // Land within the hold, avoiding smooth-scroll races with active state.
      window.scrollTo({ top:trigger.start + (index + .35) / 7 * (trigger.end - trigger.start), behavior:'instant' });
      setActive(index, true);
    } else {
      steps[index].scrollIntoView({ block:'start', behavior:reduced.matches ? 'instant' : 'smooth' });
      setActive(index);
    }
  }
  [...links, ...previews].forEach((control, i) => {
    const index = i % 7;
    control.addEventListener('click', event => { event.preventDefault(); go(index); });
    control.addEventListener('keydown', event => {
      const keys = { ArrowRight:Math.min(6,index + 1), ArrowLeft:Math.max(0,index - 1), Home:0, End:6 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      const target = keys[event.key];
      (i < 7 ? links : previews)[target].focus({ preventScroll:true });
      go(target);
    });
  });
  setActive(0);
  if (!window.gsap || !window.ScrollTrigger) return; // Readable image-card fallback.
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add({ wide:'(min-width:1000px) and (min-height:700px)', compact:'(max-width:999px), (max-height:699px)', reduce:'(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
    desktop = conditions.wide && !conditions.reduce;
    journey.classList.toggle('journey-desktop', desktop);
    if (desktop) {
      const measure = () => {
        const gap = 8, available = gallery.clientWidth - gap * 6;
        // Integer resting geometry keeps completed transforms on the pixel grid.
        // Interpolated motion remains fluid between those exact end positions.
        layout = { gap, small:Math.round(available * .065), large:Math.round(available * .61) };
        gallery.style.setProperty('--panel-width', `${layout.large}px`);
        gallery.style.setProperty('--preview-width', `${layout.small}px`);
        paint();
      };
      measure();
      trigger = ScrollTrigger.create({
        id:'study-journey', trigger:journey,
        start:() => documentTop(journey),
        end:() => documentTop(journey) + journey.offsetHeight - innerHeight,
        onRefreshInit:measure,
        onRefresh:self => { setActive(Math.min(6, Math.floor(self.progress * 7))); paint(); },
        onUpdate:self => setActive(Math.min(6, Math.floor(self.progress * 7)), true)
      });
    } else {
      let stops = [];
      const measure = () => { stops = steps.map(step => documentTop(step) - innerHeight * .45); };
      const sync = self => {
        let index = 0;
        stops.forEach((stop, i) => { if (self.scroll() >= stop) index = i; });
        setActive(index);
      };
      measure();
      trigger = ScrollTrigger.create({ id:'study-journey', start:0, end:'max', onRefreshInit:measure, onRefresh:sync, onUpdate:sync });
    }
    return () => {
      motion?.kill();
      trigger = undefined;
      desktop = false;
      journey.classList.remove('journey-desktop');
      steps.forEach(step => {
        step.style.removeProperty('transform');
        step.style.removeProperty('clip-path');
        step.querySelector('img').style.removeProperty('transform');
      });
    };
  });
})();
