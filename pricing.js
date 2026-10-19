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
    },
    de: {
      dir: 'ltr', tag: 'Werde stärker. Behalte deine Fortschritte im Blick.', theme: 'Hell / dunkel wechseln',
      title: 'Wähle deinen Plan', sub: 'Wähle den Plan, der zu deinen Zielen passt.',
      appLabel: 'FLEXIBLES TRAINING', appName: 'Nur App', appDesc: 'Dein Training, dein Tempo.',
      appF: ['Voller Zugriff auf die Musclivo-App', 'Kalorien, Mahlzeiten, Wasser und Gewicht erfassen', 'Training, Splits und Fortschrittsdiagramme'],
      coachLabel: 'PERSÖNLICHE BETREUUNG', coachName: 'App + Coach', coachDesc: 'Trainiere mit zusätzlicher Anleitung und Begleitung.',
      coachF: ['Alles aus „Nur App“', 'Chat mit deinem Coach', 'Trainingsprogramm und Ernährungsplan von deinem Coach', 'Wöchentlicher Check-in mit Feedback'],
      dur: 'Laufzeit des Abos', month: 'Monat', months: 'Monate', perMonth: '/ Monat', total: 'Gesamtpreis (USD)',
      cont: 'Weiter zur Zahlung →', payTitle: 'Zahlungsmethode', payDesc: 'Wähle deine Kryptowährung, bevor du zur Zahlungsseite gehst.',
      coinTitle: 'Kryptowährung und Netzwerk',
      otherTitle: 'Andere Zahlungsmethoden', otherDesc: 'Möchtest du anders bezahlen? Kontaktiere deinen Coach, um die Zahlung persönlich abzusprechen.',
      contact: 'Coach kontaktieren', otherSubj: 'Andere Zahlungsmethoden - Musclivo', otherBody: 'Hallo,\n\nich möchte nach anderen Zahlungsmethoden für ein Musclivo-Abo fragen.\n\nDanke.',
      noRenew: 'Einmalzahlung. Keine automatische Verlängerung.', rights: 'Alle Rechte vorbehalten.', privacy: 'Datenschutz', terms: 'Bedingungen', back: '← Zurück zur App',
      payH: 'Zahlung abschließen', plan: 'Plan', duration: 'Laufzeit', amount: 'Zu sendender Betrag', coin: 'Währung', network: 'Netzwerk',
      s1: 'Sende genau diesen Betrag', s1d: 'Die Netzwerkgebühr zahlst du. Der volle Betrag muss ankommen.',
      s2: 'Nutze nur dieses Netzwerk', s2d: 'Wenn du über ein anderes Netzwerk sendest, kann das Geld für immer verloren gehen. Wir können es nicht zurückholen.',
      s3: 'Wallet-Adresse', copy: 'Kopieren', copied: 'Kopiert ✓', scan: 'Oder scanne den Code mit deiner Wallet-App',
      s4: 'Schick uns nach der Zahlung die Bestätigung', s4d: 'Gib die E-Mail deines Musclivo-Kontos und die Transaktions-ID (TXID) an. Dein Coach prüft die Zahlung und aktiviert dein Abo, meist innerhalb von 24 Stunden.',
      email: 'E-Mail deines Musclivo-Kontos', txid: 'Transaktions-ID (TXID / Hash)', sendMail: 'Bestätigung per E-Mail senden', copyMsg: 'Nachricht kopieren', tg: 'Über Telegram senden',
      errEmail: 'Gib die E-Mail deines Musclivo-Kontos ein.', errTx: 'Füge die Transaktions-ID ein. Sie beginnt mit 0x und hat 66 Zeichen.',
      noRefund: 'Das Abo wird nach dem Start nicht erstattet.', change: '← Plan ändern', mailSubj: 'Musclivo-Zahlung',
      msg: 'Hallo! Ich habe ein Musclivo-Abo bezahlt.', mPlan: 'Plan', mDur: 'Laufzeit', mAmt: 'Betrag', mNet: 'Netzwerk', mEmail: 'Konto-E-Mail', mTx: 'TXID'
    },
    fr: {
      dir: 'ltr', tag: 'Gagne en force. Maîtrise tes progrès.', theme: 'Clair / sombre',
      title: 'Choisis ton offre', sub: 'Choisis l’offre adaptée à tes objectifs.',
      appLabel: 'ENTRAÎNEMENT FLEXIBLE', appName: 'Appli seule', appDesc: 'Ton entraînement, à ton rythme.',
      appF: ['Accès complet à l’appli Musclivo', 'Suivi des calories, repas, eau et poids', 'Séances, programmes et graphiques de progrès'],
      coachLabel: 'SUIVI PERSONNEL', coachName: 'Appli + coach', coachDesc: 'Entraîne-toi avec plus d’accompagnement et de suivi.',
      coachF: ['Tout ce qu’inclut « Appli seule »', 'Discussion avec ton coach', 'Programme d’entraînement et plan alimentaire de ton coach', 'Check-in hebdomadaire avec retour'],
      dur: 'Durée de l’abonnement', month: 'mois', months: 'mois', perMonth: '/ mois', total: 'Prix total (USD)',
      cont: 'Continuer vers le paiement →', payTitle: 'Moyen de paiement', payDesc: 'Choisis ta cryptomonnaie avant de passer à la page de paiement.',
      coinTitle: 'Cryptomonnaie et réseau',
      otherTitle: 'Autres moyens de paiement', otherDesc: 'Tu préfères payer autrement ? Contacte ton coach pour convenir du paiement.',
      contact: 'Contacter ton coach', otherSubj: 'Autres moyens de paiement - Musclivo', otherBody: 'Bonjour,\n\nJe voudrais me renseigner sur d’autres moyens de payer un abonnement Musclivo.\n\nMerci.',
      noRenew: 'Paiement unique. Pas de renouvellement automatique.', rights: 'Tous droits réservés.', privacy: 'Confidentialité', terms: 'Conditions', back: '← Retour à l’appli',
      payH: 'Finalise ton paiement', plan: 'Offre', duration: 'Durée', amount: 'Montant à envoyer', coin: 'Monnaie', network: 'Réseau',
      s1: 'Envoie exactement ce montant', s1d: 'Les frais de réseau sont à ta charge. Le montant complet doit arriver.',
      s2: 'Utilise uniquement ce réseau', s2d: 'Un envoi sur un autre réseau peut faire disparaître l’argent définitivement. Nous ne pourrons pas le récupérer.',
      s3: 'Adresse du portefeuille', copy: 'Copier', copied: 'Copié ✓', scan: 'Ou scanne le code avec ton appli de portefeuille',
      s4: 'Après le paiement, envoie-nous la confirmation', s4d: 'Indique l’e-mail de ton compte Musclivo et l’identifiant de transaction (TXID). Ton coach vérifie le paiement et active ton abonnement, en général sous 24 heures.',
      email: 'E-mail de ton compte Musclivo', txid: 'Identifiant de transaction (TXID / hash)', sendMail: 'Envoyer la confirmation par e-mail', copyMsg: 'Copier le message', tg: 'Envoyer sur Telegram',
      errEmail: 'Indique l’e-mail de ton compte Musclivo.', errTx: 'Colle l’identifiant de transaction. Il commence par 0x et compte 66 caractères.',
      noRefund: 'L’abonnement n’est pas remboursable une fois commencé.', change: '← Changer d’offre', mailSubj: 'Paiement Musclivo',
      msg: 'Bonjour ! J’ai payé un abonnement Musclivo.', mPlan: 'Offre', mDur: 'Durée', mAmt: 'Montant', mNet: 'Réseau', mEmail: 'E-mail du compte', mTx: 'TXID'
    },
    es: {
      dir: 'ltr', tag: 'Gana fuerza. Controla tu progreso.', theme: 'Claro / oscuro',
      title: 'Elige tu plan', sub: 'Elige el plan que encaja con tus objetivos.',
      appLabel: 'ENTRENAMIENTO FLEXIBLE', appName: 'Solo app', appDesc: 'Tu entrenamiento, a tu ritmo.',
      appF: ['Acceso completo a la app Musclivo', 'Registro de calorías, comidas, agua y peso', 'Entrenamientos, rutinas y gráficos de progreso'],
      coachLabel: 'ACOMPAÑAMIENTO PERSONAL', coachName: 'App + entrenador', coachDesc: 'Entrena con más guía y seguimiento.',
      coachF: ['Todo lo de «Solo app»', 'Chat con tu entrenador', 'Programa de entrenamiento y plan de comidas de tu entrenador', 'Check-in semanal con comentarios'],
      dur: 'Duración de la suscripción', month: 'mes', months: 'meses', perMonth: '/ mes', total: 'Precio total (USD)',
      cont: 'Continuar al pago →', payTitle: 'Método de pago', payDesc: 'Elige tu criptomoneda antes de ir a la página de pago.',
      coinTitle: 'Criptomoneda y red',
      otherTitle: 'Otros métodos de pago', otherDesc: '¿Prefieres pagar de otra forma? Contacta con tu entrenador para acordar el pago.',
      contact: 'Contactar con tu entrenador', otherSubj: 'Otros métodos de pago - Musclivo', otherBody: 'Hola:\n\nQuería preguntar por otros métodos de pago para una suscripción de Musclivo.\n\nGracias.',
      noRenew: 'Pago único. Sin renovación automática.', rights: 'Todos los derechos reservados.', privacy: 'Privacidad', terms: 'Condiciones', back: '← Volver a la app',
      payH: 'Completa tu pago', plan: 'Plan', duration: 'Duración', amount: 'Importe a enviar', coin: 'Moneda', network: 'Red',
      s1: 'Envía exactamente este importe', s1d: 'La comisión de red la pagas tú. Debe llegar el importe completo.',
      s2: 'Usa solo esta red', s2d: 'Si envías por otra red, el dinero puede perderse para siempre. No podemos recuperarlo.',
      s3: 'Dirección de la billetera', copy: 'Copiar', copied: 'Copiado ✓', scan: 'O escanea el código con tu app de billetera',
      s4: 'Después de pagar, envíanos la confirmación', s4d: 'Escribe el correo de tu cuenta de Musclivo y el ID de la transacción (TXID). Tu entrenador comprueba el pago y activa tu suscripción, normalmente en 24 horas.',
      email: 'Correo de tu cuenta de Musclivo', txid: 'ID de la transacción (TXID / hash)', sendMail: 'Enviar confirmación por correo', copyMsg: 'Copiar mensaje', tg: 'Enviar por Telegram',
      errEmail: 'Escribe el correo de tu cuenta de Musclivo.', errTx: 'Pega el ID de la transacción. Empieza por 0x y tiene 66 caracteres.',
      noRefund: 'La suscripción no se reembolsa una vez empezada.', change: '← Cambiar de plan', mailSubj: 'Pago de Musclivo',
      msg: '¡Hola! He pagado una suscripción de Musclivo.', mPlan: 'Plan', mDur: 'Duración', mAmt: 'Importe', mNet: 'Red', mEmail: 'Correo de la cuenta', mTx: 'TXID'
    },
    tr: {
      dir: 'ltr', tag: 'Gücünü geliştir. Gelişimini yönet.', theme: 'Açık / koyu',
      title: 'Planını seç', sub: 'Hedeflerine uyan planı seç.',
      appLabel: 'ESNEK ANTRENMAN', appName: 'Sadece uygulama', appDesc: 'Senin antrenmanın, senin hızın.',
      appF: ['Musclivo uygulamasına tam erişim', 'Kalori, öğün, su ve kilo takibi', 'Antrenmanlar, bölünmeler ve gelişim grafikleri'],
      coachLabel: 'KİŞİSEL TAKİP', coachName: 'Uygulama + koç', coachDesc: 'Ekstra rehberlik ve takiple antrenman yap.',
      coachF: ['“Sadece uygulama”daki her şey', 'Koçunla sohbet', 'Koçundan antrenman programı ve beslenme planı', 'Haftalık check-in ve geri bildirim'],
      dur: 'Abonelik süresi', month: 'ay', months: 'ay', perMonth: '/ ay', total: 'Toplam fiyat (USD)',
      cont: 'Ödemeye geç →', payTitle: 'Ödeme yöntemi', payDesc: 'Ödeme sayfasına geçmeden önce kripto paranı seç.',
      coinTitle: 'Kripto para ve ağ',
      otherTitle: 'Diğer ödeme yöntemleri', otherDesc: 'Başka bir şekilde mi ödemek istiyorsun? Ödemeyi ayarlamak için koçunla iletişime geç.',
      contact: 'Koçunla iletişime geç', otherSubj: 'Diğer ödeme yöntemleri - Musclivo', otherBody: 'Merhaba,\n\nMusclivo aboneliği için başka ödeme yöntemlerini sormak istiyorum.\n\nTeşekkürler.',
      noRenew: 'Tek seferlik ödeme. Otomatik yenileme yok.', rights: 'Tüm hakları saklıdır.', privacy: 'Gizlilik', terms: 'Koşullar', back: '← Uygulamaya dön',
      payH: 'Ödemeni tamamla', plan: 'Plan', duration: 'Süre', amount: 'Gönderilecek tutar', coin: 'Para birimi', network: 'Ağ',
      s1: 'Tam olarak bu tutarı gönder', s1d: 'Ağ ücretini sen ödersin. Tutarın tamamı ulaşmalı.',
      s2: 'Yalnızca bu ağı kullan', s2d: 'Başka bir ağdan gönderirsen para tamamen kaybolabilir. Geri alamayız.',
      s3: 'Cüzdan adresi', copy: 'Kopyala', copied: 'Kopyalandı ✓', scan: 'Ya da kodu cüzdan uygulamanla tara',
      s4: 'Ödemeden sonra bize onayı gönder', s4d: 'Musclivo hesabının e-postasını ve işlem kimliğini (TXID) yaz. Koçun ödemeyi kontrol eder ve aboneliğini genellikle 24 saat içinde etkinleştirir.',
      email: 'Musclivo hesabının e-postası', txid: 'İşlem kimliği (TXID / hash)', sendMail: 'Onayı e-postayla gönder', copyMsg: 'Mesajı kopyala', tg: 'Telegram ile gönder',
      errEmail: 'Musclivo hesabının e-postasını yaz.', errTx: 'İşlem kimliğini yapıştır. 0x ile başlar ve 66 karakterdir.',
      noRefund: 'Abonelik başladıktan sonra iade edilmez.', change: '← Planı değiştir', mailSubj: 'Musclivo ödemesi',
      msg: 'Merhaba! Musclivo aboneliği için ödeme yaptım.', mPlan: 'Plan', mDur: 'Süre', mAmt: 'Tutar', mNet: 'Ağ', mEmail: 'Hesap e-postası', mTx: 'TXID'
    },
    uk: {
      dir: 'ltr', tag: 'Ставай сильнішим. Керуй своїм прогресом.', theme: 'Світла / темна тема',
      title: 'Оберіть план', sub: 'Оберіть план, що відповідає вашим цілям.',
      appLabel: 'ГНУЧКІ ТРЕНУВАННЯ', appName: 'Лише застосунок', appDesc: 'Ваші тренування, ваш темп.',
      appF: ['Повний доступ до застосунку Musclivo', 'Облік калорій, їжі, води та ваги', 'Тренування, спліти й графіки прогресу'],
      coachLabel: 'ОСОБИСТИЙ СУПРОВІД', coachName: 'Застосунок + тренер', coachDesc: 'Тренуйтеся з додатковою підтримкою й контролем.',
      coachF: ['Усе з «Лише застосунок»', 'Чат із тренером', 'Програма тренувань і план харчування від тренера', 'Щотижневий чек-ін із відгуком'],
      dur: 'Тривалість підписки', month: 'місяць', months: 'міс.', perMonth: '/ міс.', total: 'Загальна ціна (USD)',
      cont: 'Перейти до оплати →', payTitle: 'Спосіб оплати', payDesc: 'Оберіть криптовалюту перед переходом до сторінки оплати.',
      coinTitle: 'Криптовалюта й мережа',
      otherTitle: 'Інші способи оплати', otherDesc: 'Хочете оплатити інакше? Зв’яжіться з тренером, щоб домовитися про оплату.',
      contact: 'Зв’язатися з тренером', otherSubj: 'Інші способи оплати - Musclivo', otherBody: 'Вітаю,\n\nхочу запитати про інші способи оплати підписки Musclivo.\n\nДякую.',
      noRenew: 'Разовий платіж. Без автоматичного продовження.', rights: 'Усі права захищено.', privacy: 'Конфіденційність', terms: 'Умови', back: '← Назад до застосунку',
      payH: 'Завершіть оплату', plan: 'План', duration: 'Тривалість', amount: 'Сума до відправлення', coin: 'Валюта', network: 'Мережа',
      s1: 'Надішліть точно цю суму', s1d: 'Комісію мережі сплачуєте ви. Має надійти повна сума.',
      s2: 'Використовуйте лише цю мережу', s2d: 'Якщо надіслати через іншу мережу, гроші можуть зникнути назавжди. Ми не зможемо їх повернути.',
      s3: 'Адреса гаманця', copy: 'Копіювати', copied: 'Скопійовано ✓', scan: 'Або відскануйте код застосунком гаманця',
      s4: 'Після оплати надішліть нам підтвердження', s4d: 'Вкажіть e-mail вашого акаунта Musclivo та ID транзакції (TXID). Тренер перевірить платіж і активує підписку, зазвичай протягом 24 годин.',
      email: 'E-mail акаунта Musclivo', txid: 'ID транзакції (TXID / hash)', sendMail: 'Надіслати підтвердження e-mail', copyMsg: 'Скопіювати повідомлення', tg: 'Надіслати в Telegram',
      errEmail: 'Вкажіть e-mail вашого акаунта Musclivo.', errTx: 'Вставте ID транзакції. Він починається з 0x і має 66 символів.',
      noRefund: 'Після початку підписки кошти не повертаються.', change: '← Змінити план', mailSubj: 'Оплата Musclivo',
      msg: 'Вітаю! Я оплатив(ла) підписку Musclivo.', mPlan: 'План', mDur: 'Тривалість', mAmt: 'Сума', mNet: 'Мережа', mEmail: 'E-mail акаунта', mTx: 'TXID'
    },
    pl: {
      dir: 'ltr', tag: 'Buduj siłę. Kontroluj swoje postępy.', theme: 'Jasny / ciemny',
      title: 'Wybierz plan', sub: 'Wybierz plan dopasowany do Twoich celów.',
      appLabel: 'ELASTYCZNY TRENING', appName: 'Tylko aplikacja', appDesc: 'Twój trening, Twoje tempo.',
      appF: ['Pełny dostęp do aplikacji Musclivo', 'Śledzenie kalorii, posiłków, wody i wagi', 'Treningi, splity i wykresy postępów'],
      coachLabel: 'OSOBISTA OPIEKA', coachName: 'Aplikacja + trener', coachDesc: 'Trenuj z dodatkowym wsparciem i kontrolą.',
      coachF: ['Wszystko z „Tylko aplikacja”', 'Czat z trenerem', 'Plan treningowy i plan posiłków od trenera', 'Cotygodniowy check-in z informacją zwrotną'],
      dur: 'Okres subskrypcji', month: 'miesiąc', months: 'mies.', perMonth: '/ mies.', total: 'Cena łączna (USD)',
      cont: 'Przejdź do płatności →', payTitle: 'Metoda płatności', payDesc: 'Wybierz kryptowalutę przed przejściem do strony płatności.',
      coinTitle: 'Kryptowaluta i sieć',
      otherTitle: 'Inne metody płatności', otherDesc: 'Wolisz zapłacić inaczej? Skontaktuj się z trenerem, aby ustalić płatność.',
      contact: 'Skontaktuj się z trenerem', otherSubj: 'Inne metody płatności - Musclivo', otherBody: 'Dzień dobry,\n\nchciałbym/chciałabym zapytać o inne metody płatności za subskrypcję Musclivo.\n\nDziękuję.',
      noRenew: 'Płatność jednorazowa. Bez automatycznego odnowienia.', rights: 'Wszelkie prawa zastrzeżone.', privacy: 'Prywatność', terms: 'Warunki', back: '← Powrót do aplikacji',
      payH: 'Dokończ płatność', plan: 'Plan', duration: 'Okres', amount: 'Kwota do wysłania', coin: 'Waluta', network: 'Sieć',
      s1: 'Wyślij dokładnie tę kwotę', s1d: 'Opłatę sieciową płacisz Ty. Musi dotrzeć pełna kwota.',
      s2: 'Używaj tylko tej sieci', s2d: 'Wysłanie przez inną sieć może sprawić, że pieniądze przepadną na zawsze. Nie możemy ich odzyskać.',
      s3: 'Adres portfela', copy: 'Kopiuj', copied: 'Skopiowano ✓', scan: 'Albo zeskanuj kod aplikacją portfela',
      s4: 'Po zapłacie wyślij nam potwierdzenie', s4d: 'Podaj e-mail swojego konta Musclivo i identyfikator transakcji (TXID). Trener sprawdzi płatność i aktywuje subskrypcję, zwykle w ciągu 24 godzin.',
      email: 'E-mail konta Musclivo', txid: 'Identyfikator transakcji (TXID / hash)', sendMail: 'Wyślij potwierdzenie e-mailem', copyMsg: 'Kopiuj wiadomość', tg: 'Wyślij przez Telegram',
      errEmail: 'Podaj e-mail swojego konta Musclivo.', errTx: 'Wklej identyfikator transakcji. Zaczyna się od 0x i ma 66 znaków.',
      noRefund: 'Po rozpoczęciu subskrypcja nie podlega zwrotowi.', change: '← Zmień plan', mailSubj: 'Płatność Musclivo',
      msg: 'Dzień dobry! Zapłaciłem/zapłaciłam za subskrypcję Musclivo.', mPlan: 'Plan', mDur: 'Okres', mAmt: 'Kwota', mNet: 'Sieć', mEmail: 'E-mail konta', mTx: 'TXID'
    },
    nb: {
      dir: 'ltr', tag: 'Bygg styrke. Eie fremgangen din.', theme: 'Bytt lys / mørk',
      title: 'Velg plan', sub: 'Velg planen som passer målene dine.',
      appLabel: 'FLEKSIBEL TRENING', appName: 'Bare appen', appDesc: 'Din trening, i ditt tempo.',
      appF: ['Full tilgang til Musclivo-appen', 'Logging av kalorier, måltider, vann og vekt', 'Trening, oppsett og fremdriftsdiagrammer'],
      coachLabel: 'PERSONLIG OPPFØLGING', coachName: 'App + coach', coachDesc: 'Tren med ekstra veiledning og oppfølging.',
      coachF: ['Alt i «Bare appen»', 'Chat med coachen din', 'Treningsprogram og kostplan fra coachen', 'Ukentlig check-in med tilbakemelding'],
      dur: 'Abonnementets lengde', month: 'måned', months: 'måneder', perMonth: '/ måned', total: 'Totalpris (USD)',
      cont: 'Fortsett til betaling →', payTitle: 'Betalingsmåte', payDesc: 'Velg kryptovaluta før du går videre til betalingssiden.',
      coinTitle: 'Kryptovaluta og nettverk',
      otherTitle: 'Andre betalingsmåter', otherDesc: 'Vil du betale på en annen måte? Kontakt coachen din for å avtale betaling.',
      contact: 'Kontakt coachen', otherSubj: 'Andre betalingsmåter - Musclivo', otherBody: 'Hei,\n\nJeg vil spørre om andre måter å betale et Musclivo-abonnement på.\n\nTakk.',
      noRenew: 'Engangsbetaling. Ingen automatisk fornyelse.', rights: 'Alle rettigheter forbeholdt.', privacy: 'Personvern', terms: 'Vilkår', back: '← Tilbake til appen',
      payH: 'Fullfør betalingen', plan: 'Plan', duration: 'Lengde', amount: 'Beløp å sende', coin: 'Valuta', network: 'Nettverk',
      s1: 'Send nøyaktig dette beløpet', s1d: 'Nettverksgebyret betaler du. Hele beløpet må komme fram.',
      s2: 'Bruk bare dette nettverket', s2d: 'Sender du på et annet nettverk, kan pengene forsvinne for godt. Vi kan ikke hente dem tilbake.',
      s3: 'Lommebokadresse', copy: 'Kopier', copied: 'Kopiert ✓', scan: 'Eller skann koden med lommebokappen din',
      s4: 'Send oss bekreftelsen etter at du har betalt', s4d: 'Skriv e-postadressen du bruker i Musclivo og transaksjons-ID-en (TXID). Coachen sjekker betalingen og aktiverer abonnementet, vanligvis innen 24 timer.',
      email: 'E-post for Musclivo-kontoen din', txid: 'Transaksjons-ID (TXID / hash)', sendMail: 'Send bekreftelse på e-post', copyMsg: 'Kopier meldingen', tg: 'Send på Telegram',
      errEmail: 'Skriv e-postadressen til Musclivo-kontoen din.', errTx: 'Lim inn transaksjons-ID-en. Den starter med 0x og har 66 tegn.',
      noRefund: 'Abonnementet refunderes ikke etter at det har startet.', change: '← Bytt plan', mailSubj: 'Betaling Musclivo',
      msg: 'Hei! Jeg har betalt et Musclivo-abonnement.', mPlan: 'Plan', mDur: 'Lengde', mAmt: 'Beløp', mNet: 'Nettverk', mEmail: 'Kontoens e-post', mTx: 'TXID'
    },
    da: {
      dir: 'ltr', tag: 'Byg styrke. Ej dine fremskridt.', theme: 'Skift lys / mørk',
      title: 'Vælg din plan', sub: 'Vælg den plan, der passer til dine mål.',
      appLabel: 'FLEKSIBEL TRÆNING', appName: 'Kun appen', appDesc: 'Din træning, i dit tempo.',
      appF: ['Fuld adgang til Musclivo-appen', 'Registrering af kalorier, måltider, vand og vægt', 'Træning, programmer og fremskridtsgrafer'],
      coachLabel: 'PERSONLIG OPFØLGNING', coachName: 'App + coach', coachDesc: 'Træn med ekstra vejledning og opfølgning.',
      coachF: ['Alt i »Kun appen«', 'Chat med din coach', 'Træningsprogram og kostplan fra din coach', 'Ugentligt check-in med feedback'],
      dur: 'Abonnementets længde', month: 'måned', months: 'måneder', perMonth: '/ måned', total: 'Samlet pris (USD)',
      cont: 'Fortsæt til betaling →', payTitle: 'Betalingsmetode', payDesc: 'Vælg kryptovaluta, før du går videre til betalingssiden.',
      coinTitle: 'Kryptovaluta og netværk',
      otherTitle: 'Andre betalingsmetoder', otherDesc: 'Vil du hellere betale på en anden måde? Kontakt din coach for at aftale betalingen.',
      contact: 'Kontakt din coach', otherSubj: 'Andre betalingsmetoder - Musclivo', otherBody: 'Hej,\n\nJeg vil gerne høre om andre måder at betale et Musclivo-abonnement på.\n\nTak.',
      noRenew: 'Engangsbetaling. Ingen automatisk fornyelse.', rights: 'Alle rettigheder forbeholdes.', privacy: 'Privatlivspolitik', terms: 'Vilkår', back: '← Tilbage til appen',
      payH: 'Gennemfør din betaling', plan: 'Plan', duration: 'Længde', amount: 'Beløb, der skal sendes', coin: 'Valuta', network: 'Netværk',
      s1: 'Send præcis dette beløb', s1d: 'Netværksgebyret betaler du. Hele beløbet skal nå frem.',
      s2: 'Brug kun dette netværk', s2d: 'Sender du på et andet netværk, kan pengene forsvinde for altid. Vi kan ikke få dem tilbage.',
      s3: 'Wallet-adresse', copy: 'Kopiér', copied: 'Kopieret ✓', scan: 'Eller scan koden med din wallet-app',
      s4: 'Send os bekræftelsen, når du har betalt', s4d: 'Skriv den e-mail, du bruger i Musclivo, og transaktions-ID’et (TXID). Din coach tjekker betalingen og aktiverer dit abonnement, som regel inden for 24 timer.',
      email: 'E-mail til din Musclivo-konto', txid: 'Transaktions-ID (TXID / hash)', sendMail: 'Send bekræftelse på e-mail', copyMsg: 'Kopiér beskeden', tg: 'Send på Telegram',
      errEmail: 'Skriv e-mailen til din Musclivo-konto.', errTx: 'Indsæt transaktions-ID’et. Det starter med 0x og har 66 tegn.',
      noRefund: 'Abonnementet refunderes ikke, når det er startet.', change: '← Skift plan', mailSubj: 'Betaling Musclivo',
      msg: 'Hej! Jeg har betalt et Musclivo-abonnement.', mPlan: 'Plan', mDur: 'Længde', mAmt: 'Beløb', mNet: 'Netværk', mEmail: 'Kontoens e-mail', mTx: 'TXID'
    }
  };
  var LANGS = ['ar', 'en', 'sv', 'ru', 'de', 'fr', 'es', 'tr', 'uk', 'pl', 'nb', 'da'];
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
    var ls = document.getElementById('lgx'); if (ls) { ls.value = LANGS.indexOf(lang) > 3 ? lang : ''; ls.classList.toggle('on', LANGS.indexOf(lang) > 3); }
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
    if (lg) lg.addEventListener('click', function (e) { var b = e.target.closest('button[data-lg]'); if (b) setLang(b.dataset.lg); });
    var ls = document.getElementById('lgx'); if (ls) ls.addEventListener('change', function () { if (ls.value) setLang(ls.value); });
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
