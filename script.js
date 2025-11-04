const QUESTIONS = [
  {q: "Pick a snack", opts: ["Potato chips", "Pretzels", "Seaweed", "Nothing"], values: [0, 1, 2, 3]},
  {q: "Preferred drink", opts: ["Soda", "Iced tea", "Water", "Cocktail"], values: [0, 1, 2, 3]},
  {q: "Weekend vibe", opts: ["Loud party", "Small hangout", "Solo hiking", "Reading"], values: [0, 1, 2, 3]}
];

const RESULTS = [
  {title: "Salty Classic", img: "https://images.unsplash.com/photo-1543352634-8c1f1b4ad3f6?w=1200&q=80", text: "You like bold flavors and simple comforts."},
  {title: "Tangy Pretzel", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80", text: "You enjoy crunch and balance."},
  {title: "Ocean Breeze", img: "https://images.unsplash.com/photo-1505577058444-a3dab1b3f3f8?w=1200&q=80", text: "You prefer lightness and freshness."},
  {title: "Low Salt", img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80", text: "Low-key and understated."}
];

let answers = Array(QUESTIONS.length).fill(null);
let index = 0;

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
  item.opts.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-pressed', answers[index] === item.values[i] ? 'true' : 'false');
    btn.textContent = label;
    btn.onclick = () => {
      answers[index] = item.values[i];
      Array.from(opts.children).forEach((c, ci) => c.setAttribute('aria-pressed', ci === i ? 'true' : 'false'));
    };
    opts.appendChild(btn);
  });
  questionField.appendChild(opts);
  prevBtn.disabled = index === 0;
  nextBtn.textContent = index < QUESTIONS.length - 1 ? 'Next' : 'Finish';
}

function finish() {
  answers = answers.map(a => a === null ? 0 : a);
  const total = answers.reduce((s, v) => s + v, 0);
  const bucket = Math.min(RESULTS.length - 1, Math.floor(total / (QUESTIONS.length * 1.0)));
  showResult(bucket);
}

function showResult(i) {
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  result.setAttribute('aria-hidden', 'false');
  resultTitle.textContent = RESULTS[i].title;
  resultImg.src = RESULTS[i].img;
  resultImg.alt = RESULTS[i].title;
  resultText.textContent = RESULTS[i].text;
  const shareText = encodeURIComponent(`I got \"${RESULTS[i].title}\" on this quick quiz! Try it:`);
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
