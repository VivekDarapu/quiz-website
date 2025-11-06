// Personality quiz with 2 axes:
// energy: +1 = Extrovert (E), -1 = Introvert (I)
// method: +1 = Planner (P), -1 = Spontaneous (S)

const QUESTIONS = [
  {
    q: "At a party, you…",
    opts: [
      { label: "Work the room and meet everyone", energy: +1, method: 0 },
      { label: "Stick with a couple of people you know", energy: -1, method: 0 }
    ]
  },
  {
    q: "Your ideal weekend is…",
    opts: [
      { label: "Scheduled activities and reservations", energy: 0, method: +1 },
      { label: "See where the day takes me", energy: 0, method: -1 }
    ]
  },
  {
    q: "Group projects feel…",
    opts: [
      { label: "Fun. I like to lead or coordinate", energy: +1, method: +1 },
      { label: "Draining. I prefer solo work", energy: -1, method: 0 }
    ]
  },
  {
    q: "When travel plans change last minute…",
    opts: [
      { label: "No problem. I'll improvise", energy: 0, method: -1 },
      { label: "Annoying. I want a new plan", energy: 0, method: +1 }
    ]
  },
  {
    q: "At a networking event, you…",
    opts: [
      { label: "Jump into conversations", energy: +1, method: 0 },
      { label: "Observe first, talk when ready", energy: -1, method: 0 }
    ]
  },
  {
    q: "Your calendar looks…",
    opts: [
      { label: "Blocked with time slots", energy: 0, method: +1 },
      { label: "Light. I keep it open", energy: 0, method: -1 }
    ]
  },
  {
    q: "Big decision style…",
    opts: [
      { label: "Draft options, set deadlines", energy: 0, method: +1 },
      { label: "Gut feel and momentum", energy: 0, method: -1 }
    ]
  },
  {
    q: "Meeting a new team…",
    opts: [
      { label: "I introduce myself first", energy: +1, method: 0 },
      { label: "I wait and read the room", energy: -1, method: 0 }
    ]
  }
];

// Four result buckets from the two axes
const RESULTS = {
  "E+P+": {
    title: "The Leader",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    text: "Outgoing and organized. You rally people and execute."
  },
  "E+P-": {
    title: "The Explorer",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    text: "Social and spontaneous. You experiment and adapt fast."
  },
  "E-P+": {
    title: "The Architect",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=80",
    text: "Quiet planner. You design systems and think ahead."
  },
  "E-P-": {
    title: "The Dreamer",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    text: "Reflective and free-form. You create space for ideas."
  }
};

// ---------- App state ----------
let answers = Array(QUESTIONS.length).fill(null);
let index = 0;
let totals = { energy: 0, method: 0 };

// ---------- DOM ----------
const intro = document.getElementById('intro');
const startBtn = document.getElementById('startBtn');
const quiz = document.getElementById('quiz');
const questionField = document.getElementById('questionField');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const result = document.getElementById('result');
const resultTitle = document.getElementById('resultTitle');
const resultImg = document.getElementById('resultImg');
const resultText = document.getElementById('resultText');
const retakeBtn = document.getElementById('retakeBtn');
const shareTwitter = document.getElementById('shareTwitter');

startBtn.onclick = () => showQuiz();

prevBtn.onclick = () => {
  if (index > 0) {
    index--;
    renderQuestion();
  }
};

nextBtn.onclick = () => {
  if (index < QUESTIONS.length - 1) {
    index++;
    renderQuestion();
  } else finish();
};

retakeBtn.onclick = () => reset();

function showQuiz() {
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
  quiz.setAttribute('aria-hidden', 'false');
  renderQuestion();
}

function renderQuestion() {
  const item = QUESTIONS[index];
  questionField.innerHTML = '';
  const legend = document.createElement('legend');
  legend.className = 'question';
  legend.textContent = `Q${index + 1}. ${item.q}`;
  questionField.appendChild(legend);

  const opts = document.createElement('div');
  opts.className = 'options';
  item.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-pressed', answers[index] === i ? 'true' : 'false');
    btn.textContent = o.label;
    btn.onclick = () => {
      answers[index] = i;
      Array.from(opts.children).forEach((c, ci) =>
        c.setAttribute('aria-pressed', ci === i ? 'true' : 'false')
      );
    };
    opts.appendChild(btn);
  });
  questionField.appendChild(opts);

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index < QUESTIONS.length - 1 ? 'Next' : 'Finish';
}

function finish() {
  // compute totals
  totals = { energy: 0, method: 0 };
  for (let q = 0; q < QUESTIONS.length; q++) {
    if (answers[q] !== null) {
      const opt = QUESTIONS[q].opts[answers[q]];
      totals.energy += opt.energy;
      totals.method += opt.method;
    }
  }
  const eSign = totals.energy >= 0 ? "E+" : "E-";
  const pSign = totals.method >= 0 ? "P+" : "P-";
  const key = `${eSign}${pSign}`;
  showResult(key);
}

function showResult(key) {
  const r = RESULTS[key];
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  result.setAttribute('aria-hidden', 'false');
  resultTitle.textContent = r.title;
  resultImg.src = r.img;
  resultImg.alt = r.title;
  resultText.textContent = r.text;
  const shareText = encodeURIComponent(`I got \"${r.title}\" on this personality quiz. What about you?`);
  shareTwitter.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${location.href}`;
}

function reset() {
  answers = Array(QUESTIONS.length).fill(null);
  index = 0;
  result.classList.add('hidden');
  intro.classList.remove('hidden');
  quiz.classList.add('hidden');
  quiz.setAttribute('aria-hidden', 'true');
}
