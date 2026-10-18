// Musclivo: الأسعار والدفع (مشترك بين pricing.html و payment.html)
// غيّر الأسعار هون بس، والصفحتين بيتحدّثوا لحالهم.
var MV = (function () {
  var PRICES = {
    app:   { 1: 14.99, 3: 39.99, 6: 74.99,  12: 129.99 },
    coach: { 1: 39.99, 3: 89.99, 6: 169.99, 12: 299.99 }
  };
  // نفس العنوان للعملتين (حساب Binance). الشبكة هي الفرق.
  var WALLET = '0x1f6b7e95bcc6b4b2b6eafe59d4d6459358fc1410';
  var COINS = {
    USDT: { net: 'BNB Smart Chain (BEP20)', short: 'BEP20' },
    USDC: { net: 'Ethereum (ERC20)', short: 'ERC20' }
  };
  var COACH_MAIL = 'pt.bodybuildingxx@gmail.com';

  var T = {
    en: {
      dir: 'ltr', tag: 'Build your strength. Own your progress.', theme: 'Switch light / dark',
      title: 'Choose Your Plan', sub: 'Choose the plan that fits your fitness goals.',
      appLabel: 'FLEXIBLE TRAINING', appName: 'App Only', appDesc: 'Your training journey, your pace.',
      appF: ['Full access to the Musclivo app', 'Calories, meals, water and weight tracking', 'Workouts, splits and progress charts'],
      coachLabel: 'PERSONAL GUIDANCE', coachName: 'App + Coach', coachDesc: 'Train with extra guidance and accountability.',
      coachF: ['Everything in App Only', 'Chat with your coach', 'Workout program and meal plan from your coach', 'Weekly check-in and feedback'],
      dur: 'Subscription duration', month: 'Month', months: 'Months', perMonth: '/ month', total: 'Total price (USD)',
      cont: 'Continue to Payment →', payTitle: 'Payment Method', payDesc: 'Select your preferred cryptocurrency before continuing to the payment page.',
      coinTitle: 'Cryptocurrency and network',
      otherTitle: 'Other Payment Methods', otherDesc: 'Prefer another way to pay? Contact your coach to discuss available payment options and arrange your payment personally.',
      contact: 'Contact Your Coach', otherSubj: 'Alternative payment methods - Musclivo', otherBody: 'Hello,\n\nI would like to ask about other payment methods for a Musclivo subscription.\n\nThank you.',
      noRenew: 'One-time payment. No automatic renewal.', rights: 'All rights reserved.', privacy: 'Privacy Policy', terms: 'Terms', back: '← Back to the app',
      // payment page
      payH: 'Complete Your Payment', plan: 'Plan', duration: 'Duration', amount: 'Amount to send', coin: 'Currency', network: 'Network',
      s1: 'Send exactly this amount', s1d: 'The network fee is paid by you. The full amount must arrive.',
      s2: 'Use this network only', s2d: 'Sending on any other network can make the money disappear for good. We cannot recover it.',
      s3: 'Wallet address', copy: 'Copy', copied: 'Copied ✓', scan: 'Or scan the code with your wallet app',
      s4: 'After you pay, send us the confirmation', s4d: 'Write the email you use in Musclivo and the transaction ID (TXID). Your coach checks the payment and activates your subscription, usually within 24 hours.',
      email: 'Your Musclivo account email', txid: 'Transaction ID (TXID / hash)', sendMail: 'Send confirmation by email', copyMsg: 'Copy message', tg: 'Send on Telegram',
      errEmail: 'Write the email of your Musclivo account.', errTx: 'Paste the transaction ID. It starts with 0x and has 66 characters.',
      noRefund: 'The subscription is not refundable once it has started.', change: '← Change plan', mailSubj: 'Musclivo payment',
      msg: 'Hello! I paid for a Musclivo subscription.', mPlan: 'Plan', mDur: 'Duration', mAmt: 'Amount', mNet: 'Network', mEmail: 'Account email', mTx: 'TXID'
    },
    ar: {
      dir: 'rtl', tag: 'ابنِ قوتك. وامتلك تقدّمك.', theme: 'غيّر بين الفاتح والداكن',
      title: 'اختر خطتك', sub: 'اختر الخطة اللي بتناسب أهدافك.',
      appLabel: 'تدريب مرن', appName: 'التطبيق فقط', appDesc: 'رحلتك التدريبية، على سرعتك.',
      appF: ['استخدام كامل لتطبيق Musclivo', 'تسجيل السعرات والوجبات والماء والوزن', 'التمارين والتقسيمات ورسوم التقدّم'],
      coachLabel: 'متابعة شخصية', coachName: 'التطبيق + المدرب', coachDesc: 'تدرّب مع متابعة وتوجيه من المدرب.',
      coachF: ['كل ميزات «التطبيق فقط»', 'محادثة مع المدرب', 'برنامج تمارين وخطة أكل من المدرب', 'Check-in أسبوعي وملاحظات على تقدّمك'],
      dur: 'مدة الاشتراك', month: 'شهر', months: 'أشهر', perMonth: '/ شهر', total: 'السعر الكامل (دولار)',
      cont: 'المتابعة للدفع ←', payTitle: 'طريقة الدفع', payDesc: 'اختر العملة الرقمية قبل المتابعة لصفحة الدفع.',
      coinTitle: 'العملة الرقمية والشبكة',
      otherTitle: 'طرق دفع أخرى', otherDesc: 'بدك تدفع بطريقة تانية؟ تواصل مع المدرب لتتفقوا على طريقة الدفع.',
      contact: 'تواصل مع المدرب', otherSubj: 'طرق دفع أخرى - Musclivo', otherBody: 'مرحباً،\n\nبدي أسأل عن طرق دفع تانية لاشتراك Musclivo.\n\nشكراً.',
      noRenew: 'دفعة واحدة، بدون تجديد تلقائي.', rights: 'جميع الحقوق محفوظة.', privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام', back: '→ الرجوع إلى التطبيق',
      payH: 'أكمل الدفع', plan: 'الخطة', duration: 'المدة', amount: 'المبلغ المطلوب', coin: 'العملة', network: 'الشبكة',
      s1: 'ابعت هذا المبلغ بالضبط', s1d: 'رسوم الشبكة عليك، ولازم يوصل المبلغ كامل.',
      s2: 'استعمل هذه الشبكة فقط', s2d: 'إذا بعتت على شبكة تانية ممكن تضيع المصاري نهائياً، وما منقدر نرجعها.',
      s3: 'عنوان المحفظة', copy: 'نسخ', copied: 'تم النسخ ✓', scan: 'أو امسح الرمز بتطبيق محفظتك',
      s4: 'بعد الدفع ابعتلنا التأكيد', s4d: 'اكتب الإيميل اللي بتستعمله بـ Musclivo ورقم المعاملة (TXID). المدرب بيتأكد من الدفعة وبيفعّل اشتراكك، عادةً خلال 24 ساعة.',
      email: 'إيميل حسابك بـ Musclivo', txid: 'رقم المعاملة (TXID / hash)', sendMail: 'ابعت التأكيد بالإيميل', copyMsg: 'انسخ الرسالة', tg: 'ابعت على تيليغرام',
      errEmail: 'اكتب إيميل حسابك بـ Musclivo.', errTx: 'الصق رقم المعاملة. بيبلش بـ 0x وطوله 66 حرف.',
      noRefund: 'الاشتراك لا يُسترد بعد أن يبدأ.', change: '→ غيّر الخطة', mailSubj: 'دفع اشتراك Musclivo',
      msg: 'مرحباً! دفعت اشتراك Musclivo.', mPlan: 'الخطة', mDur: 'المدة', mAmt: 'المبلغ', mNet: 'الشبكة', mEmail: 'إيميل الحساب', mTx: 'رقم المعاملة'
    },
    sv: {
      dir: 'ltr', tag: 'Bygg din styrka. Äg dina framsteg.', theme: 'Växla ljust / mörkt',
      title: 'Välj din plan', sub: 'Välj planen som passar dina mål.',
      appLabel: 'FLEXIBEL TRÄNING', appName: 'Bara appen', appDesc: 'Din träningsresa, i din takt.',
      appF: ['Full tillgång till Musclivo-appen', 'Logga kalorier, måltider, vatten och vikt', 'Träning, uppdelningar och framstegsdiagram'],
      coachLabel: 'PERSONLIG COACHNING', coachName: 'App + coach', coachDesc: 'Träna med extra stöd och uppföljning.',
      coachF: ['Allt i Bara appen', 'Chatt med din coach', 'Träningsprogram och kostschema från coachen', 'Veckoavstämning med återkoppling'],
      dur: 'Abonnemangets längd', month: 'månad', months: 'månader', perMonth: '/ månad', total: 'Totalpris (USD)',
      cont: 'Fortsätt till betalning →', payTitle: 'Betalningssätt', payDesc: 'Välj kryptovaluta innan du går vidare till betalningssidan.',
      coinTitle: 'Kryptovaluta och nätverk',
      otherTitle: 'Andra betalningssätt', otherDesc: 'Vill du betala på ett annat sätt? Kontakta din coach så kommer ni överens.',
      contact: 'Kontakta din coach', otherSubj: 'Andra betalningssätt - Musclivo', otherBody: 'Hej,\n\nJag vill fråga om andra sätt att betala ett Musclivo-abonnemang.\n\nTack.',
      noRenew: 'Engångsbetalning. Ingen automatisk förnyelse.', rights: 'Alla rättigheter förbehållna.', privacy: 'Integritetspolicy', terms: 'Villkor', back: '← Tillbaka till appen',
      payH: 'Slutför din betalning', plan: 'Plan', duration: 'Längd', amount: 'Belopp att skicka', coin: 'Valuta', network: 'Nätverk',
      s1: 'Skicka exakt detta belopp', s1d: 'Nätverksavgiften betalar du. Hela beloppet måste komma fram.',
      s2: 'Använd bara detta nätverk', s2d: 'Skickar du på ett annat nätverk kan pengarna försvinna för alltid. Vi kan inte få tillbaka dem.',
      s3: 'Plånboksadress', copy: 'Kopiera', copied: 'Kopierat ✓', scan: 'Eller skanna koden med din plånboksapp',
      s4: 'När du har betalat, skicka bekräftelsen', s4d: 'Skriv e-postadressen du använder i Musclivo och transaktions-ID (TXID). Coachen kontrollerar betalningen och aktiverar abonnemanget, oftast inom 24 timmar.',
      email: 'E-post för ditt Musclivo-konto', txid: 'Transaktions-ID (TXID / hash)', sendMail: 'Skicka bekräftelse via e-post', copyMsg: 'Kopiera meddelandet', tg: 'Skicka på Telegram',
      errEmail: 'Skriv e-postadressen för ditt Musclivo-konto.', errTx: 'Klistra in transaktions-ID. Det börjar med 0x och har 66 tecken.',
      noRefund: 'Abonnemanget återbetalas inte när det har börjat.', change: '← Byt plan', mailSubj: 'Betalning Musclivo',
      msg: 'Hej! Jag har betalat ett Musclivo-abonnemang.', mPlan: 'Plan', mDur: 'Längd', mAmt: 'Belopp', mNet: 'Nätverk', mEmail: 'Kontots e-post', mTx: 'TXID'
    },
    ru: {
      dir: 'ltr', tag: 'Становись сильнее. Управляй своим прогрессом.', theme: 'Светлая / тёмная тема',
      title: 'Выберите план', sub: 'Выберите план под ваши цели.',
      appLabel: 'ГИБКИЕ ТРЕНИРОВКИ', appName: 'Только приложение', appDesc: 'Ваш путь, ваш темп.',
      appF: ['Полный доступ к приложению Musclivo', 'Учёт калорий, еды, воды и веса', 'Тренировки, сплиты и графики прогресса'],
      coachLabel: 'ЛИЧНОЕ СОПРОВОЖДЕНИЕ', coachName: 'Приложение + тренер', coachDesc: 'Тренируйтесь с поддержкой и контролем.',
      coachF: ['Всё из «Только приложение»', 'Чат с тренером', 'Программа тренировок и план питания от тренера', 'Еженедельный отчёт и обратная связь'],
      dur: 'Срок подписки', month: 'месяц', months: 'мес.', perMonth: '/ мес.', total: 'Итого (USD)',
      cont: 'Перейти к оплате →', payTitle: 'Способ оплаты', payDesc: 'Выберите криптовалюту перед переходом к оплате.',
      coinTitle: 'Криптовалюта и сеть',
      otherTitle: 'Другие способы оплаты', otherDesc: 'Хотите оплатить иначе? Свяжитесь с тренером, чтобы договориться.',
      contact: 'Связаться с тренером', otherSubj: 'Другие способы оплаты - Musclivo', otherBody: 'Здравствуйте,\n\nхочу узнать о других способах оплаты подписки Musclivo.\n\nСпасибо.',
      noRenew: 'Разовый платёж. Без автопродления.', rights: 'Все права защищены.', privacy: 'Политика конфиденциальности', terms: 'Условия', back: '← Назад в приложение',
      payH: 'Завершите оплату', plan: 'План', duration: 'Срок', amount: 'Сумма к отправке', coin: 'Валюта', network: 'Сеть',
      s1: 'Отправьте точно эту сумму', s1d: 'Комиссию сети платите вы. Должна прийти полная сумма.',
      s2: 'Используйте только эту сеть', s2d: 'Если отправить через другую сеть, деньги могут пропасть навсегда. Мы не сможем их вернуть.',
      s3: 'Адрес кошелька', copy: 'Копировать', copied: 'Скопировано ✓', scan: 'Или отсканируйте код приложением кошелька',
      s4: 'После оплаты отправьте подтверждение', s4d: 'Укажите e-mail вашего аккаунта Musclivo и ID транзакции (TXID). Тренер проверит платёж и активирует подписку, обычно в течение 24 часов.',
      email: 'E-mail аккаунта Musclivo', txid: 'ID транзакции (TXID / hash)', sendMail: 'Отправить подтверждение по e-mail', copyMsg: 'Скопировать сообщение', tg: 'Отправить в Telegram',
      errEmail: 'Укажите e-mail вашего аккаунта Musclivo.', errTx: 'Вставьте ID транзакции. Он начинается с 0x и содержит 66 символов.',
      noRefund: 'После начала подписки деньги не возвращаются.', change: '← Сменить план', mailSubj: 'Оплата Musclivo',
      msg: 'Здравствуйте! Я оплатил подписку Musclivo.', mPlan: 'План', mDur: 'Срок', mAmt: 'Сумма', mNet: 'Сеть', mEmail: 'E-mail аккаунта', mTx: 'TXID'
    }
  };
  var LANGS = ['ar', 'en', 'sv', 'ru'];
  var lang = 'en';
  try {
    var q = new URLSearchParams(location.search).get('lang');
    var s = localStorage.getItem('sa3rati_lang');
    lang = LANGS.indexOf(q) >= 0 ? q : LANGS.indexOf(s) >= 0 ? s : (LANGS.indexOf((navigator.language || 'en').slice(0, 2)) >= 0 ? (navigator.language || 'en').slice(0, 2) : 'en');
  } catch (e) {}

  function t(k) { return (T[lang] && T[lang][k] != null) ? T[lang][k] : T.en[k]; }
  function money(n) { return '$' + Number(n).toFixed(2); }
  function durLabel(m) { return m + ' ' + (m === 1 ? t('month') : t('months')); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = t('dir');
    document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.dataset.t); });
    document.querySelectorAll('[data-ta]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.ta)); });
    document.querySelectorAll('[data-tp]').forEach(function (el) { el.setAttribute('placeholder', t(el.dataset.tp)); });
    document.querySelectorAll('[data-tl]').forEach(function (el) {
      el.innerHTML = t(el.dataset.tl).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    });
    document.querySelectorAll('#lg button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lg === lang); });
  }
  function setLang(l) {
    if (LANGS.indexOf(l) < 0) return;
    lang = l;
    try { localStorage.setItem('sa3rati_lang', l); } catch (e) {}
    apply();
    if (MV.onLang) MV.onLang();
  }
  function initChrome() {
    var lg = document.getElementById('lg');
    if (lg) lg.addEventListener('click', function (e) { var b = e.target.closest('[data-lg]'); if (b) setLang(b.dataset.lg); });
    var themeBtn = document.getElementById('themeBtn');
    function sync() {
      var light = document.documentElement.dataset.theme === 'light';
      themeBtn.textContent = light ? '🌙' : '☀️';
      var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = light ? '#F2F6F4' : '#0A0E0C';
    }
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var light = document.documentElement.dataset.theme !== 'light';
        if (light) document.documentElement.dataset.theme = 'light'; else delete document.documentElement.dataset.theme;
        try { localStorage.setItem('musclivo_theme', light ? 'light' : 'dark'); } catch (e) {}
        sync();
      });
      sync();
    }
    var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
    apply();
  }
  function copy(text, btn) {
    function done() { if (btn) { var o = btn.textContent; btn.textContent = t('copied'); setTimeout(function () { btn.textContent = o; }, 1800); } }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() {
      var a = document.createElement('textarea'); a.value = text; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0';
      document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove(); done();
    }
  }
  return { PRICES: PRICES, WALLET: WALLET, COINS: COINS, COACH_MAIL: COACH_MAIL, t: t, money: money, durLabel: durLabel, esc: esc, initChrome: initChrome, copy: copy, lang: function () { return lang; }, onLang: null };
})();
