let words = [
  { main: "агронОмія" },
  { main: "алфАвІт" },
  { main: "Аркушик" },
  { main: "асиметрІя" },
  { main: "багаторазОвий" },
  { main: "безпринцИпний" },
  { main: "бЕшкет" },
  { main: "блАговіст" },
  { main: "близькИй" },
  { main: "болотИстий" },
  { main: "борОдавка" },
  { main: "босОніж" },
  { main: "боЯзнь" },
  { main: "бурштинОвий" },
  { main: "бюлетЕнь" },
  { main: "вАги", ps: "у множині" },
  { main: "вантажІвка" },
  { main: "веснЯнИй" },
  { main: "вИгода", ps: "користь" },
  { main: "вигОда", ps: "зручність" },
  { main: "видАння" },
  { main: "визвОльний" },
  { main: "вимОга" },
  { main: "вИпадок" },
  { main: "вирАзний" },
  { main: "вИсіти" },
  { main: "вИтрата" },
  { main: "вишИваний" },
  { main: "відвезтИ" },
  { main: "відвестИ" },
  { main: "вІдгомін" },
  { main: "віднестИ" },
  { main: "вІдомість", ps: "список" },
  { main: "відОмість", ps: "повідомлення, дані, популярність" },
  { main: "вІрші" },
  { main: "віршовИй" },
  { main: "вітчИм" },
  { main: "гальмО" },
  { main: "гАльма" },
  { main: "глядАч" },
  { main: "горошИна" },
  { main: "граблІ" },
  { main: "гуртОжиток" },
  { main: "данИна" },
  { main: "дАно" },
  { main: "децимЕтр" },
  { main: "дЕщиця" },
  { main: "де-Юре" },
  { main: "джерелО" },
  { main: "дИвлячись" },
  { main: "дичАвіти" },
  { main: "діалОг" },
  { main: "добовИй" },
  { main: "добУток" },
  { main: "довезтИ" },
  { main: "довестИ" },
  { main: "довІдник" },
  { main: "дОгмат" },
  { main: "донестИ" },
  { main: "дОнька" },
  { main: "дочкА" },
  { main: "дрОва" },
  { main: "експЕрт" },
  { main: "єретИк" },
  { main: "жалюзІ" },
  { main: "завдАння" },
  { main: "завезтИ" },
  { main: "завестИ" },
  { main: "зАвжди" },
  { main: "завчасУ" },
  { main: "зАгадка" },
  { main: "заіржАвілий" },
  { main: "заіржАвіти" },
  { main: "закінчИти" },
  { main: "зАкладка", ps: "у книжці" },
  { main: "зАкрутка" },
  { main: "залишИти" },
  { main: "замІжня" },
  { main: "занестИ" },
  { main: "зАпонка" },
  { main: "заробІток" },
  { main: "зАставка" },
  { main: "зАстібка" },
  { main: "застОпорити" },
  { main: "звИсока" },
  { main: "здАлека" },
  { main: "зібрАння" },
  { main: "зобразИти" },
  { main: "зОзла" },
  { main: "зрАння" },
  { main: "зрУчний" },
  { main: "зубОжіння" },
  { main: "індУстрія" },
  { main: "кАмбала" },
  { main: "каталОг" },
  { main: "квартАл" },
  { main: "кИшка" },
  { main: "кіломЕтр" },
  { main: "кінчИти" },
  { main: "кОлесо" },
  { main: "кОлія" },
  { main: "кОпчений", ps: "дієприкметник" },
  { main: "копчЕний", ps: "прикметник" },
  { main: "корИсний" },
  { main: "кОсий" },
  { main: "котрИй" },
  { main: "крицЕвий" },
  { main: "крОїти" },
  { main: "кропивА" },
  { main: "кулінАрія" },
  { main: "кУрятина" },
  { main: "лАте" },
  { main: "листопАд" },
  { main: "літОпис" },
  { main: "лЮстро" },
  { main: "мАбУть" },
  { main: "магітстЕрський", ps: "про вчений ступінь" },
  { main: "мАркетинг" },
  { main: "мерЕжа" },
  { main: "металУргія" },
  { main: "мілімЕтр" },
  { main: "навчАння" },
  { main: "нанестИ" },
  { main: "напІй" },
  { main: "нАскрізний" },
  { main: "нАчинка" },
  { main: "ненАвидіти" },
  { main: "ненАвисний" },
  { main: "ненАвисть" },
  { main: "нестИ" },
  { main: "нІздря" },
  { main: "новИй" },
  { main: "обіцЯнка" },
  { main: "обрАння" },
  { main: "обрУч", ps: "іменник" },
  { main: "одинАдцять" },
  { main: "одноразОвий" },
  { main: "ознАка" },
  { main: "Олень" },
  { main: "оптОвий" },
  { main: "осетЕр" },
  { main: "отАман" },
  { main: "Оцет" },
  { main: "павИч" },
  { main: "партЕр" },
  { main: "пЕкарський" },
  { main: "перевезтИ" },
  { main: "перевестИ" },
  { main: "перЕкис" },
  { main: "перелЯк" },
  { main: "перенестИ" },
  { main: "перЕпад" },
  { main: "перЕпис" },
  { main: "піалА" },
  { main: "пІдданий", ps: "дієприкметник" },
  { main: "піддАний", ps: "іменник, істота" },
  { main: "пІдлітковий" },
  { main: "пізнАння" },
  { main: "пітнИй" },
  { main: "піцЕрія" },
  { main: "пОдруга" },
  { main: "пОзначка" },
  { main: "пОмИлка" },
  { main: "помІщик" },
  { main: "помОвчати" },
  { main: "понЯття" },
  { main: "порядкОвий" },
  { main: "посерЕдині" },
  { main: "привезтИ" },
  { main: "привестИ" },
  { main: "прИморозок" },
  { main: "принестИ" },
  { main: "прИчіп" },
  { main: "прОділ" },
  { main: "промІжок" },
  { main: "псевдонІм" },
  { main: "рАзом" },
  { main: "рЕмінь", ps: "пояс" },
  { main: "рЕшето" },
  { main: "рИнковий" },
  { main: "рівнИна" },
  { main: "роздрібнИй" },
  { main: "рОзпірка" },
  { main: "рукОпис" },
  { main: "руслО" },
  { main: "сантимЕтр" },
  { main: "свЕрдло" },
  { main: "серЕдина" },
  { main: "сЕча" },
  { main: "симетрІя" },
  { main: "сільськогосподАрський" },
  { main: "сімдесЯт" },
  { main: "слИна" },
  { main: "соломИнка" },
  { main: "стАтуя" },
  { main: "стовідсОтковий" },
  { main: "стрибАти" },
  { main: "текстовИй" },
  { main: "течіЯ" },
  { main: "тИгровий" },
  { main: "тисОвий" },
  { main: "тім'янИй" },
  { main: "травестІя" },
  { main: "тризУб" },
  { main: "тУлуб" },
  { main: "украЇнський" },
  { main: "уподОбання" },
  { main: "урочИстий" },
  { main: "усерЕдині" },
  { main: "фартУх" },
  { main: "фаховИй" },
  { main: "фенОмен" },
  { main: "фОльга" },
  { main: "фОрзац" },
  { main: "хАос", ps: "у міфології: стихія" },
  { main: "хаОс", ps: "безлад" },
  { main: "цАрина" },
  { main: "цемЕнт" },
  { main: "цЕнтнер" },
  { main: "ціннИк" },
  { main: "чарівнИй" },
  { main: "черговий" },
  { main: "читАння" },
  { main: "чорнОзем" },
  { main: "чорнОслив" },
  { main: "чотирнАдцять" },
  { main: "шляхопровІд" },
  { main: "шовкОвий" },
  { main: "шофЕр" },
  { main: "щЕлепа" },
  { main: "щИпці" },
  { main: "щодобовИй" },
  { main: "ярмаркОвий" },
];

let vowels = [ 'а', 'у', 'і', 'е', 'о', 'є', 'я', 'и', 'ю', 'ї' ]
let ID = {
  word: "word",
  ps: "ps",
  next_button: "next_button",
  correct_points_span: "correct_points",
  incorrect_points_span: "incorrect_points",
  game: "game",
  finish_congrats: "finish_congrats",
}

let CLASS = {
  right_vowels: ".vowel.right",
  false_vowels: ".vowel.false",
}

let user_answered = false;
let correct_points = 0;
let incorrect_points = 0;

function isVowel(char) {
  return vowels.includes(char.toLowerCase());
}

function enableButton(enable) {
  document.getElementById(ID.next_button).style.display = enable ? "block" : "none";
}

function update_scoreboard() {
  document.getElementById(ID.correct_points_span).innerText = correct_points;
  document.getElementById(ID.incorrect_points_span).innerText = incorrect_points;
}

function right_vowel_selected() {
  if (!user_answered) {
    correct_points++;
    next_step();
  }
}

function false_vowel_selected(element) {
  return () => { 
    if (!user_answered) {
      element.style = "color: red;";
      incorrect_points++;
      next_step();
    }
  };
}

function next_step() {
  document.querySelectorAll(".right").forEach((element, index, array) => {
    array[index].style = "color: green;";
  });
  
  enableButton(true);
  update_scoreboard();
  selected = true;
}

function next_button_clicked() {
  enableButton(false);
  new_word();
}

function isUppercase(c) {
  return c.toLowerCase() != c;
}

function finish_game() {
  document.getElementById(ID.game).style.display = "none";
  document.getElementById(ID.finish_congrats).style.display = "block";
}

function new_word() {
  if (words.length == 0) {
    finish_game();
  } else {
    let index = Math.trunc(Math.random() * words.length);
    let html = "";

    let main_part = words[index].main;
    let ps = words[index].ps;

    for (let i = 0;i < main_part.length;i++) {
      span_class = isVowel(main_part[i]) ? "vowel" : "not_vowel";
      span_class2 = isUppercase(main_part[i]) ? "right" : "false";
      html += `<span class="${span_class} ${span_class2}">${main_part[i].toLowerCase()}</span>`;
    }

    if (ps == undefined)
      document.getElementById(ID.ps).innerHTML = "";
    else
      document.getElementById(ID.ps).innerHTML = ps;

    document.getElementById(ID.word).innerHTML = html;

    document.querySelectorAll(CLASS.right_vowels).forEach((element, index, array) => {
      array[index].onclick = right_vowel_selected;
    });
    document.querySelectorAll(CLASS.false_vowels).forEach((element, index, array) => {
      array[index].onclick = false_vowel_selected(array[index]);
    });

    document.getElementById(ID.next_button).onclick = next_button_clicked;

    user_answered = false;
    words.splice(index, 1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  next_button_clicked();
});
