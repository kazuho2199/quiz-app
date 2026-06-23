const questions = [
  {
    text: '日本の国土面積はおよそ何万km²でしょう？',
    choices: ['約18万km²', '約26万km²', '約38万km²', '約52万km²'],
    correct: 2,
    explanation: '日本の国土面積は約37.8万km²で、世界第61位です。',
  },
  {
    text: '光が真空中を1秒間に進む距離として最も近いものはどれでしょう？',
    choices: ['約30万km', '約3万km', '約3億km', '約30億km'],
    correct: 0,
    explanation: '光速は約30万km/s（正確には約29万9,792km/s）です。',
  },
  {
    text: '元素記号「Fe」が表す元素はどれでしょう？',
    choices: ['銅', '金', '鉄', '銀'],
    correct: 2,
    explanation: 'Feはラテン語の「Ferrum（鉄）」に由来する元素記号です。',
  },
  {
    text: '世界で最も深い湖はどれでしょう？',
    choices: ['カスピ海', 'バイカル湖', 'タンガニーカ湖', 'スペリオル湖'],
    correct: 1,
    explanation: 'バイカル湖（ロシア）の最大水深は約1,642mで、世界一深い湖です。',
  },
  {
    text: '日本国憲法が施行された年はいつでしょう？',
    choices: ['1945年', '1946年', '1947年', '1952年'],
    correct: 2,
    explanation: '日本国憲法は1946年11月3日に公布され、1947年5月3日に施行されました。',
  },
  {
    text: '太陽系で最も大きな惑星はどれでしょう？',
    choices: ['土星', '天王星', '木星', '海王星'],
    correct: 2,
    explanation: '木星は直径が地球の約11倍、質量は太陽系の全惑星の合計の2倍以上あります。',
  },
  {
    text: '「モナ・リザ」を描いた芸術家はだれでしょう？',
    choices: ['ミケランジェロ', 'レオナルド・ダ・ヴィンチ', 'ラファエロ', 'ボッティチェリ'],
    correct: 1,
    explanation: 'レオナルド・ダ・ヴィンチが16世紀初頭に描いた作品で、現在パリのルーブル美術館に所蔵されています。',
  },
  {
    text: '日本で最も長い川はどれでしょう？',
    choices: ['利根川', '石狩川', '信濃川', '最上川'],
    correct: 2,
    explanation: '信濃川の全長は約367kmで、日本最長の川です。新潟県を流れて日本海に注ぎます。',
  },
  {
    text: '近代オリンピックが初めて開催された都市はどこでしょう？',
    choices: ['パリ', 'ロンドン', 'アテネ', 'ストックホルム'],
    correct: 2,
    explanation: '第1回近代オリンピックは1896年にギリシャのアテネで開催されました。',
  },
  {
    text: '血液型の分類として「ABO式血液型」を発見したのはだれでしょう？',
    choices: ['ルイ・パスツール', 'カール・ラントシュタイナー', 'アレクサンダー・フレミング', 'ロベルト・コッホ'],
    correct: 1,
    explanation: 'カール・ラントシュタイナーは1900年にABO式血液型を発見し、1930年にノーベル生理学・医学賞を受賞しました。',
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const screenStart = document.getElementById('screen-start');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const questionNumber = document.getElementById('question-number');
const progressFill = document.getElementById('progress-fill');
const questionText = document.getElementById('question-text');
const choicesList = document.getElementById('choices');
const feedback = document.getElementById('feedback');
const feedbackMessage = document.getElementById('feedback-message');
const feedbackExplanation = document.getElementById('feedback-explanation');
const btnNext = document.getElementById('btn-next');
const scoreDisplay = document.getElementById('score-display');
const scoreMessage = document.getElementById('score-message');

document.getElementById('btn-start').addEventListener('click', startQuiz);
btnNext.addEventListener('click', nextQuestion);
document.getElementById('btn-retry').addEventListener('click', retryQuiz);

function show(screen) {
  [screenStart, screenQuiz, screenResult].forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  show(screenQuiz);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const q = questions[currentIndex];

  questionNumber.textContent = `問題 ${currentIndex + 1} / ${questions.length}`;
  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;
  questionText.textContent = q.text;

  feedback.className = 'feedback hidden';
  choicesList.innerHTML = '';

  q.choices.forEach((choice, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(i));
    li.appendChild(btn);
    choicesList.appendChild(li);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesList.querySelectorAll('.choice-btn');

  buttons.forEach(btn => (btn.disabled = true));

  if (selectedIndex === q.correct) {
    score++;
    buttons[selectedIndex].classList.add('correct');
    buttons[selectedIndex].textContent += '　（正解）';
    feedback.className = 'feedback correct-feedback';
    feedbackMessage.textContent = '正解！';
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[selectedIndex].textContent += '　（不正解）';
    buttons[q.correct].classList.add('correct');
    buttons[q.correct].textContent += '　（正解）';
    feedback.className = 'feedback wrong-feedback';
    feedbackMessage.textContent = '不正解…';
  }

  feedbackExplanation.textContent = q.explanation;

  const isLast = currentIndex === questions.length - 1;
  btnNext.textContent = isLast ? '結果を見る' : '次の問題へ';
}

function nextQuestion() {
  if (!answered) return;
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressFill.style.width = '100%';
  show(screenResult);

  scoreDisplay.textContent = `${score} / ${questions.length}`;

  const messages = [
    '残念！また挑戦してみましょう。',
    'もう少し！復習して再挑戦！',
    'なかなか優秀です！',
    'すばらしい！ほぼ満点です！',
    '完璧！全問正解おめでとうございます！',
  ];
  const messageIndex = score === questions.length ? 4 : score >= 8 ? 3 : score >= 6 ? 2 : score >= 4 ? 1 : 0;
  scoreMessage.textContent = messages[messageIndex];
}

function retryQuiz() {
  show(screenStart);
}
