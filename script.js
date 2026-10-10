(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));

  /* ---------- Terminal test run ---------- */
  const term = document.getElementById('term');
  const prompt = '<span class="g">➜</span> <span class="c">~/career</span> ';
  const command = 'npx wdio run ./ashif-reza.conf.ts';
  const specs = [
    ['ships 3+ years of manual + automation testing', '1.2s'],
    ['builds iOS frameworks with WebdriverIO + Appium (POM)', '0.9s'],
    ['automates web flows with Playwright & Selenium', '0.7s'],
    ['breaks APIs on purpose with Postman', '0.4s'],
    ['load-tests with JMeter before real users do', '2.1s'],
    ['runs parallel device suites on BrowserStack', '0.8s'],
    ['mentors junior QA engineers', '0.3s'],
    ['actually reads the PRD', '0.1s'],
  ];
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let runId = 0;

  async function runSuite() {
    const id = ++runId;
    const alive = () => id === runId;
    let html = prompt;
    term.innerHTML = html + '<span class="caret"></span>';

    for (let i = 1; i <= command.length; i++) {
      if (!alive()) return;
      term.innerHTML = html + '<span class="w">' + esc(command.slice(0, i)) + '</span><span class="caret"></span>';
      await sleep(28 + Math.random() * 40);
    }
    html += '<span class="w">' + esc(command) + '</span>\n\n';

    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    for (let f = 0; f < 12; f++) {
      if (!alive()) return;
      term.innerHTML = html + '<span class="d">' + frames[f % frames.length] + ' Launching iPhone simulator…</span>';
      await sleep(70);
    }
    html += '<span class="d">[</span><span class="c">iOS 18 · iPhone 16</span><span class="d"> #0-0]</span> <span class="y">RUNNING</span> <span class="d">in</span> ashif-reza.e2e.ts\n\n';
    html += '  <span class="w">Ashif Reza — SQA Engineer II @ Pathao</span>\n';
    term.innerHTML = html;
    await sleep(350);

    for (const [name, t] of specs) {
      if (!alive()) return;
      html += '    <span class="g">✓</span> ' + esc(name) + ' <span class="d">(' + t + ')</span>\n';
      term.innerHTML = html;
      await sleep(260);
    }

    if (!alive()) return;
    html += '\n<span class="d">Spec Files:</span>  <span class="g">1 passed</span>, 1 total <span class="d">(100% completed)</span>\n';
    html += '<span class="d">Flaky tests:</span> <span class="g">0</span>   <span class="d">Bugs caught before prod:</span> <span class="p">a lot</span>\n\n';
    html += prompt + '<span class="d">hire --role "QA Automation Engineer"</span> ';
    term.innerHTML = html + '<span class="caret"></span>';
  }

  runSuite();
  document.querySelector('.rerun').addEventListener('click', runSuite);

  /* ---------- KPI counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    let n = 0;
    const tick = () => {
      n += 1;
      el.textContent = n;
      if (n < target) setTimeout(tick, 900 / target);
    };
    setTimeout(tick, 400);
  });

  /* ---------- Scroll reveal ---------- */
  const revealables = document.querySelectorAll('.section-head, .about-text, .principles li, .card, .stack, .release, .suite, .products, .bug-report');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Easter egg: find the bug ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg, link) {
    toast.textContent = msg;
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'toast-link';
      a.textContent = link.text;
      a.addEventListener('click', () => { toast.hidden = true; });
      toast.append(' ', a);
    }
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, link ? 8000 : 4200);
  }

  const hosts = document.querySelectorAll('.card, .release .rel-body, .principles li');
  const host = hosts[Math.floor(Math.random() * hosts.length)];
  const bug = document.createElement('button');
  bug.type = 'button';
  bug.className = 'critter';
  bug.textContent = '🐞';
  bug.setAttribute('aria-label', 'A bug. Report it?');
  const spots = [
    { top: '8px', right: '8px' }, { bottom: '8px', right: '10px' }, { bottom: '8px', left: '10px' },
  ];
  Object.assign(bug.style, spots[Math.floor(Math.random() * spots.length)]);
  host.style.position = 'relative';
  host.appendChild(bug);

  bug.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    bug.classList.add('squashed');
    showToast('🐞 BUG-001 reported & fixed. You have a QA eye.', { href: '#contact', text: 'Let\'s talk →' });
    const hint = document.getElementById('hint');
    hint.textContent = '0 bugs on this page (thanks to you)';
    hint.disabled = true;
    setTimeout(() => bug.remove(), 600);
  });

  document.getElementById('hint').addEventListener('click', () => {
    if (!bug.isConnected) return;
    bug.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    bug.classList.remove('wiggle');
    void bug.offsetWidth;
    bug.classList.add('wiggle');
    showToast('Hint: it\'s crawling on one of the cards. Click it to report.');
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
