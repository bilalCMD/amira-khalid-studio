(function(){
  "use strict";

  /* ---------- CONFIG ---------- */
  var WHATSAPP_NUMBER = "966530005384";
  // Dates Amira is fully booked / unavailable — add more "YYYY-MM-DD" strings as needed.
  var BLOCKED_DATES = [];
  // Google Apps Script Web App URL (see google-apps-script.gs for setup steps).
  var GOOGLE_SHEET_WEBAPP_URL = "REPLACE_WITH_YOUR_APPS_SCRIPT_WEB_APP_URL";
  // Moyasar publishable key (safe to expose client-side) — from your Moyasar dashboard.
  var MOYASAR_PUBLISHABLE_KEY = "REPLACE_WITH_MOYASAR_PUBLISHABLE_KEY";
  var langChangeListeners = [];
  function onLangChange(fn){ langChangeListeners.push(fn); }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- I18N ---------- */
  var translations = {
    ar: {
      "brand.name":"أميرة خالد","brand.tag":"استوديو مكياج · جدة",
      "nav.home":"الرئيسية","nav.about":"من أنا","nav.portfolio":"أعمالي","nav.pricing":"الأسعار","nav.contact":"تواصل","nav.bookNow":"احجزي الآن",
      "hero.eyebrow":"خبيرة مكياج معتمدة","hero.title":"إطلالتكِ الأجمل ","hero.titleAccent":"تبدأ من هنا",
      "hero.subtitle":"مكياج احترافي وتسريحات راقية في استوديو أميرة خالد بجدة — أو أينما كنتِ.",
      "hero.ctaBook":"احجزي موعدك","hero.ctaPortfolio":"استعرضي أعمالي",
      "hero.badge1":"+500 عروس وعميلة","hero.badge2":"تعقيم 100% للأدوات","hero.badge3":"الاستوديو أو لديكِ",
      "hero.chip1Num":"2500 ريال","hero.chip1Label":"باقة العروس الكاملة","hero.chip2Num":"4.9 ★","hero.chip2Label":"تقييم العميلات",
      "hero.scroll":"مرري للأسفل",
      "cta.badge":"تأكيد فوري عبر واتساب","cta.title":"لا تؤجلي إطلالتكِ المثالية",
      "cta.body":"احجزي موعدك اليوم واحصلي على تأكيد فوري عبر واتساب، بدون التزامات معقدة وبأسعار واضحة من البداية.",
      "cta.check1":"تأكيد سريع عبر واتساب","cta.check2":"في الاستوديو أو لديكِ","cta.check3":"منتجات عالمية أصلية","cta.check4":"تعقيم 100% للأدوات",
      "cta.panelBadge":"تأكيد فوري","cta.panelTitle":"جاهزة تحجزين؟","cta.panelBody":"اختاري الخدمة والتاريخ المناسب، وسنؤكد كل التفاصيل معكِ مباشرة.",
      "cta.panelBtn1":"احجزي موعدك","cta.panelBtn2":"تواصلي واتساب",
      "portfolio.videosEyebrow":"لقطات من الاستوديو","portfolio.videosTitle":"شاهدي أعمالي مباشرة","portfolio.videosSub":"مقاطع حقيقية من جلسات المكياج ونصائح سريعة",
      "ba.eyebrow":"قبل وبعد","ba.title":"شاهدي الفرق","ba.sub":"تحوّلات حقيقية من جلسات مكياج فعلية","ba.before":"قبل","ba.after":"بعد",
      "home.reelsEyebrow":"فيديوهات","home.reelsTitle":"لقطات حية من الاستوديو","home.reelsSub":"شاهدي جلسات مكياج حقيقية ونصائح سريعة","home.reelsMore":"شاهدي المزيد من الريلز",
      "home.journalEyebrow":"مدونة الجمال","home.journalTitle":"نصائح وخبرات من أميرة","home.journalSub":"مقالات تساعدكِ على التحضير ليومكِ المثالي","home.journalMore":"تصفحي كل المقالات",
      "portfolio.instaFollow":"تابعي أحدث الريلز على إنستغرام",
      "reel3.caption":"لحظات من كواليس التصوير",
      "reel8.caption":"لمسات مكياج احترافية","reel9.caption":"تفاصيل تصنع الفرق",
      "reel10.caption":"بدون فلاتر... النتيجة الحقيقية","reel11.caption":"خبيرة تجميل في جدة","reel12.caption":"لوك سهرة فاخر",
      "reel13.caption":"دقة في كل لمسة","reel14.caption":"جمال العروس بأدق تفاصيله","reel15.caption":"إطلالة سهرة ساحرة","reel16.caption":"بريق وثقة بلا حدود",
      "reel17.caption":"لمسة غموض وأناقة","reel18.caption":"عروس بتاج اللؤلؤ","reel19.caption":"تفاصيل عروس لا تُنسى",
      "reel20.caption":"لحظة هدوء وجمال","reel21.caption":"تموجات ناعمة وأناقة","reel22.caption":"ابتسامة عروس صادقة","reel23.caption":"تفاصيل عروس ملكية","reel24.caption":"لمسة أناقة كلاسيكية",
      "about.journeyEyebrow":"رحلتي","about.journeyTitle":"كيف بدأت القصة",
      "journey.step1Title":"البداية","journey.step1Desc":"بدأت أميرة شغفها بالمكياج من سن مبكر، وطورت مهاراتها عبر دورات احترافية معتمدة.",
      "journey.step2Title":"الاحتراف","journey.step2Desc":"أكثر من 10 سنوات من الخبرة في مكياج العرائس والمناسبات الخاصة داخل جدة وخارجها، منذ عام 2016.",
      "journey.step3Title":"الثقة","journey.step3Desc":"أكثر من 500 عروس وعميلة وثقن بأميرة لإبراز جمالهن في أهم لحظاتهن.",
      "journey.step4Title":"اليوم","journey.step4Desc":"استوديو أميرة خالد اليوم وجهة موثوقة لكل عروس تبحث عن إطلالة استثنائية في جدة.",
      "pricing.faqEyebrow":"الأسئلة الشائعة","pricing.faqTitle":"عندكِ سؤال؟",
      "faq.q1":"هل يشمل السعر تجربة مسبقة للعروس؟","faq.a1":"نعم، باقة العروس تشمل جلسة تجربة قبل يوم الزفاف للتأكد من اللوك المثالي لكِ.",
      "faq.q2":"كم المدة اللازمة لتأكيد الحجز؟","faq.a2":"ننصح بالحجز قبل أسبوعين على الأقل للمناسبات العادية، وقبل شهر على الأقل لباقة العروس لضمان توفر الموعد.",
      "faq.q3":"هل يمكن إلغاء أو تعديل الموعد؟","faq.a3":"يمكنكِ تعديل أو إلغاء الموعد قبل 48 ساعة على الأقل من الموعد المحدد بدون أي رسوم.",
      "faq.q4":"هل هناك رسوم إضافية للخدمة خارج الاستوديو؟","faq.a4":"الأسعار المعلنة للخدمة الخاصة تشمل التنقل داخل جدة. للمواقع خارج جدة قد تُضاف رسوم تنقل تُحدد عند التواصل.",
      "faq.q5":"ما هي طريقة الدفع؟","faq.a5":"الدفع نقدًا أو تحويل بنكي مباشر في يوم الموعد، ونؤكد كافة التفاصيل مسبقًا عبر واتساب.",
      "faq.q7":"هل تشمل خدمة المكياج تسريحة الشعر أيضًا؟","faq.a7":"المكياج الاحترافي وحده لا يشمل التسريحة. إذا رغبتِ في تسريحة شعر أيضًا، اختاري باقة \"مكياج + تسريحة شعر كاملة\" أو \"مكياج + سشوار وكيرلي ناعم\" من قائمة الخدمات.",
      "faq.q8":"ماذا تتضمن باقة العروس بالتحديد؟","faq.a8":"باقة العروس تشمل: مكياج احترافي، رموش بريميوم، تسريحة شعر كاملة، وجلسة تألق للجسم (Body Glow). للخدمة الخارجية للعروس تتوفر باقات مماثلة بتفاصيل مختلفة — راجعي قسم الأسعار أعلاه لكل التفاصيل.",
      "faq.q6":"هل يلزم دفع عربون لتأكيد الحجز؟","faq.a6":"نؤكد الحجز عبر واتساب مباشرة. بالنسبة لباقة العروس، قد نطلب عربونًا لحجز التاريخ بشكل نهائي — سنوضح التفاصيل عند التواصل معكِ.",
      "contact.mapEyebrow":"موقعنا","contact.mapTitle":"موقعنا على الخريطة",
      "marquee.m1":"مكياج عرايس","marquee.m2":"تسريحات شعر راقية","marquee.m3":"خدمة في جدة","marquee.m4":"حجز عبر واتساب","marquee.m5":"منتجات عالمية احترافية",
      "page.about.eyebrow":"من نحن","page.about.title":"تعرّفي على أميرة","page.about.sub":"القصة، الخبرة، والالتزام خلف كل إطلالة",
      "page.portfolio.eyebrow":"معرض الأعمال","page.portfolio.title":"أعمالي","page.portfolio.sub":"مجموعة مختارة من إطلالات العرائس، السهرات، والتسريحات",
      "page.pricing.eyebrow":"الأسعار","page.pricing.title":"الأسعار والباقات","page.pricing.sub":"أسعار واضحة بدون مفاجآت — اختاري ما يناسب مناسبتكِ",
      "page.contact.eyebrow":"احجزي الآن","page.contact.title":"احجزي موعدكِ","page.contact.sub":"عبّي البيانات وسنؤكد موعدكِ عبر واتساب مباشرة",
      "about.eyebrow":"من نحن","about.title":"تعرّفي على أميرة",
      "about.body":"أميرة خالد خبيرة مكياج محترفة في جدة، شغوفة بإبراز جمالكِ الطبيعي بلمسة فنية أنيقة تليق بمناسباتكِ الخاصة — من يوم زفافك إلى أجمل سهراتكِ. تعتمد أميرة على منتجات عالمية احترافية، وتلتزم بأعلى معايير التعقيم مع أدوات مخصصة لكل عميلة.",
      "about.feat1":"منتجات عالمية احترافية","about.feat2":"تعقيم كامل وأدوات فردية لكل عميلة","about.feat3":"خدمة في الاستوديو أو لدى العميلة","about.feat4":"تجربة راقية من الحجز إلى التنفيذ",
      "about.floatYears":"سنوات خبرة","about.floatRating":"تقييم العميلات",
      "about.stat1":"سنوات خبرة","about.stat2":"عروس وعميلة","about.stat3":"التأسيس","about.stat4":"تقييم العميلات ★",
      "portfolio.filterAll":"الكل","portfolio.filterBridal":"مكياج عرايس","portfolio.filterEvening":"مكياج سهرة","portfolio.filterHair":"تسريحات الشعر","portfolio.filterBA":"قبل وبعد",
      "portfolio.note":"* صور حقيقية من أعمال أميرة — سيتم إضافة المزيد بعد إطلاق الحساب الرسمي للموقع",
      "pf.item1.title":"إطلالة عروس بالطرحة","pf.item2.title":"مكياج عروس ناعم","pf.item3.title":"سهرة درامية بالمخمل","pf.item4.title":"مكياج سهرة أنيق",
      "pf.item5.title":"تسريحة عروس أنيقة","pf.item6.title":"مكياج نهاري طبيعي","pf.item7.title":"تحضير بشرة احترافي",
      "pf.item8.title":"لمسة روج نهائية","pf.item9.title":"لوك عروس بالتول","pf.item10.title":"تاج لؤلؤي للعروس","pf.item11.title":"سهرة بعيون دخانية","pf.item12.title":"لوك جانبي أنيق","pf.item13.title":"عروس بباقة الورد",
      "pf.item14.title":"عروس بفستان أزهار الدانتيل","pf.item15.title":"سهرة بعيون برونزية ساحرة","pf.item16.title":"تسريحة عالية أنيقة","pf.item17.title":"لمسة أناقة وتفاصيل ذهبية",
      "testi.eyebrow":"آراء العميلات على جوجل","testi.title":"ماذا قالت عميلاتنا","testi.googleLink":"4.9 — شاهدي كل التقييمات على خرائط جوجل",
      "testi.q1":"“مكياجي يوم زفافي كان أحلى من الحلم، أميرة فهمت اللوك اللي أبيه بالضبط من أول جلسة”","testi.n1":"سارة","testi.r1":"عروس",
      "testi.q2":"“سشوار وكيرلي ثابت طول السهرة، والاحترافية من أول لحظة. أنصح فيها بشدة”","testi.n2":"نورة","testi.r2":"عميلة سهرة",
      "testi.q3":"“خدمة راقية ونظافة تامة في الأدوات، حسيت بالراحة والاهتمام من أول دقيقة”","testi.n3":"لمى","testi.r3":"عروس",
      "testi.a1":"س","testi.a2":"ن","testi.a3":"ل",
      "pricing.groupEvening":"مكياج سهرة","pricing.groupBridal":"مكياج عروس","pricing.groupTraining":"تدريب مكياج خاص 1:1","pricing.featured":"الأكثر طلبًا","pricing.bookBtn":"احجزي الآن",
      "pricing.homeStudioNote":"* جميع الخدمات تُقدَّم حصريًا بموعد مسبق في استوديو أميرة الخاص بجدة","pricing.priceOnRequest":"السعر عند التواصل",
      "pricing.onRequest":"السعر عند التواصل",
      "pricing.durationRegular":"<strong>35–45</strong> دقيقة — حسب نوع البشرة","pricing.durationBride":"<strong>60–75</strong> دقيقة — جلسة العروس",
      "trust.brands":"منتجات عالمية احترافية","trust.sterile":"تعقيم كامل للأدوات","trust.single":"أدوات فردية لكل عميلة",
      "trust.brandsDesc":"نستخدم فقط ماركات مكياج عالمية معتمدة تدوم طويلًا وتناسب جميع أنواع البشرة",
      "trust.sterileDesc":"جميع الأدوات تُعقّم بالكامل قبل كل جلسة وفق أعلى معايير النظافة",
      "trust.singleDesc":"فرش وأدوات مخصصة لكل عميلة وحدها، لراحتكِ وأمانكِ الكامل",
      "trust.since2016":"خبيرة مكياج محترفة منذ 2016","trust.detail":"دقة في كل التفاصيل","trust.personalized":"مكياج مخصص لكل وجه",
      "trust.since2016Desc":"أكثر من 10 سنوات من الخبرة الاحترافية في مكياج العرائس والمناسبات الخاصة",
      "trust.detailDesc":"نهتم بأدق التفاصيل في كل جلسة لضمان إطلالة متكاملة ومثالية من كل زاوية",
      "trust.personalizedDesc":"كل بشرة وملامح مختلفة، لذلك تصمم أميرة مكياجًا يبرز جمالكِ الفريد وحدكِ",
      "about.trustEyebrow":"لماذا تثقين بأميرة","about.trustTitle":"معايير لا نتنازل عنها",
      "svc.makeup":"مكياج احترافي","svc.makeup.desc":"تحضير بشرة ومكياج أنيق يدوم طوال اليوم","svc.makeupOpt":"مكياج احترافي — 350 ريال",
      "svc.makeupBlowdry":"مكياج + سشوار وكيرلي ناعم","svc.makeupBlowdry.desc":"مكياج احترافي مع سشوار وتموجات ناعمة لإطلالة سهرة أنيقة","svc.makeupBlowdryOpt":"مكياج + سشوار وكيرلي ناعم — 550 ريال",
      "svc.makeupHair":"مكياج + تسريحة شعر كاملة","svc.makeupHair.desc":"مكياج مع تسريحة مصممة حسب إطلالتكِ","svc.makeupHairOpt":"مكياج + تسريحة شعر كاملة — 650 ريال",
      "svc.bridal":"باقة العروس","svc.bridal.desc":"مكياج احترافي + رموش فاخرة + تسريحة شعر كاملة + هايلايتر للجسم","svc.bridalOpt":"باقة العروس — 2500 ريال",
      "svc.training":"جلسة تدريب فردية","svc.training.desc":"جلسة خاصة فردية لتعلّمي أساسيات المكياج أو تطوير مهاراتكِ خطوة بخطوة","svc.trainingOpt":"تدريب مكياج خاص 1:1 — السعر عند التواصل",
      "common.sar":"ريال",
      "contact.formName":"الاسم الكامل","contact.formPhone":"رقم الجوال","contact.formService":"الخدمة","contact.formEventType":"نوع المناسبة","contact.formDate":"التاريخ","contact.formTime":"وقت الجاهزية",
      "event.wedding":"حفل زفاف","event.engagement":"خطوبة","event.party":"حفلة / سهرة","event.graduation":"تخرج","event.other":"أخرى",
      "contact.formLocation":"المكان","contact.locStudio":"في الاستوديو (جدة)","contact.locHome":"في موقعي","contact.formAddress":"تفاصيل الموقع / العنوان",
      "contact.formNotes":"ملاحظات إضافية (اختياري)","contact.submitBtn":"تأكيد الحجز عبر واتساب","contact.privateHint":"تنبيه: الخدمة في موقعكِ الخاص متاحة للعرائس فقط",
      "contact.lockedHintStudio":"هذه الخدمة متاحة في الاستوديو فقط","contact.lockedHintHome":"هذه الخدمة متاحة في موقعكِ فقط",
      "contact.dateBlocked":"هذا التاريخ محجوز بالكامل، يرجى اختيار تاريخ آخر",
      "contact.selectDate":"اختاري التاريخ",
      "calendar.available":"متاح","calendar.fullyBooked":"محجوز بالكامل",
      "bookingPreview.eyebrow":"معاينة قبل الإطلاق","bookingPreview.title":"نظام الحجز الجديد بالتقويم",
      "bookingPreview.sub":"جرّبي الحجز في الأسفل بنفسكِ — هذه الصفحة للمعاينة فقط ولن تُنشر للزوار",
      "bookingPreview.howTitle":"كيف يعمل نظام الحجز؟",
      "bookingPreview.step1":"<strong style=\"color:var(--text)\">١. اختيار الخدمة ونوع المناسبة —</strong> تختار العميلة الخدمة المناسبة من القائمة (مكياج سهرة، مكياج عروس، أو تدريب خاص)، ثم تحدد نوع المناسبة.",
      "bookingPreview.step2":"<strong style=\"color:var(--text)\">٢. اختيار التاريخ من التقويم —</strong> بدل كتابة التاريخ يدويًا، تفتح العميلة تقويمًا حقيقيًا يشبه Google Calendar، وتضغط على اليوم المناسب مباشرة.",
      "bookingPreview.step3":"<strong style=\"color:var(--text)\">٣. الأيام المحجوزة بالكامل تظهر باللون الأحمر ولا يمكن الضغط عليها —</strong> عندما تخبريننا بيوم معيّن أنكِ لا تستقبلين حجوزات فيه (إجازة، مناسبة خاصة، يوم ممتلئ)، نضيفه من ملف الموقع خلال دقيقة، ويظهر فورًا \"محجوز بالكامل\" لكل الزوار.",
      "bookingPreview.step4":"<strong style=\"color:var(--text)\">٤. تأكيد فوري عبر واتساب —</strong> بعد تعبئة النموذج، تُرسل كل التفاصيل (الاسم، الخدمة، التاريخ) إليكِ مباشرة عبر واتساب لتأكيدي الحجز يدويًا كما هو معتاد — لا حاجة لأي نظام دفع أو حساب إضافي حاليًا.",
      "bookingV2.title":"الحجز والدفع بالكامل","bookingV2.sub":"اختاري يومًا من التقويم بالأسفل لتجربة الخطوات كاملة — هذه الصفحة للمعاينة فقط",
      "bookingV2.pickDate":"اختاري تاريخ الحجز","bookingV2.whereQuestion":"أين تودّين الخدمة؟",
      "bookingV2.next":"التالي","bookingV2.prev":"السابق","bookingV2.nextPrice":"التالي: السعر",
      "bookingV2.serviceQuestion":"ما هي الخدمة المطلوبة؟","bookingV2.reviewTitle":"مراجعة الحجز","bookingV2.confirmBtn":"تأكيد ومتابعة",
      "bookingV2.paymentTitle":"الدفع","bookingV2.paymentNote":"هذا رابط دفع تجريبي للمعاينة — لن يتم خصم أي مبلغ حقيقي إلا بعد ربط حساب Moyasar الفعلي.",
      "bookingV2.quoteTitle":"تأكيد عبر واتساب","bookingV2.quoteNote":"سيتم إرسال كل تفاصيل حجزكِ مباشرة إلى أميرة عبر واتساب لتأكيد الموعد.",
      "bookingV2.sendWhatsapp":"إرسال عبر واتساب","bookingV2.successTitle":"تم استلام حجزكِ!","bookingV2.successBody":"سنتواصل معكِ قريبًا لتأكيد كل التفاصيل.",
      "bookingV2.labelName":"الاسم","bookingV2.labelPhone":"الجوال","bookingV2.labelService":"الخدمة","bookingV2.labelLocation":"المكان","bookingV2.labelEventType":"نوع المناسبة",
      "bookingV2.labelDate":"التاريخ","bookingV2.labelTime":"الوقت","bookingV2.labelPrice":"السعر","bookingV2.priceOnRequest":"السعر عند التواصل",
      "bookingV2.choiceTitle":"كيف تودّين إتمام الحجز؟","bookingV2.choosePay":"الدفع أونلاين","bookingV2.choosePaySub":"بطاقة أو Apple Pay",
      "bookingV2.chooseWa":"تأكيد عبر واتساب","bookingV2.chooseWaSub":"إرسال التفاصيل مباشرة",
      "contact.serviceOptGroupStudio":"في الاستوديو","contact.serviceOptGroupPrivate":"الخدمة الخارجية للعروس",
      "contact.successMsg":"تم تجهيز طلبكِ! اضغطي لإتمام الإرسال عبر واتساب",
      "contact.trustBadge":"موثوقة — استوديو أميرة خالد","contact.infoLocationTitle":"الموقع","contact.infoLocation":"حي الرحاب، جدة — عرض على خرائط جوجل",
      "contact.infoLocation2":"حي الرحاب، جدة، المملكة العربية السعودية",
      "contact.infoHoursTitle":"ساعات العمل","contact.infoHours":"الأحد–الأربعاء: 11:00 ص – 10:00 م، الخميس–السبت: 9:00 ص – 11:00 م","contact.infoInstagramTitle":"إنستغرام","contact.infoTiktokTitle":"تيك توك",
      "contact.infoEmailTitle":"البريد الإلكتروني",
      "contact.infoWhatsapp":"تواصلي مباشرة عبر واتساب",
      "footer.tagline":"إبراز جمالكِ الطبيعي بلمسة فنية احترافية، في كل مناسبة تستحق التميز.","footer.quickLinks":"روابط سريعة","footer.services":"الخدمات","footer.getInTouch":"تواصلي معنا",
      "nav.bookingPolicy":"سياسة الحجز",
      "contact.policyNote":"بتأكيد الحجز، أنتِ توافقين على <a href=\"booking-policy\">سياسة الحجز</a>",
      "policy.eyebrow":"قبل الحجز","policy.title":"قبل الحجز","policy.sub":"كل ما تحتاجين معرفته قبل حجز موعدكِ مع أميرة",
      "policy.groupBooking":"سياسة الحجز","policy.groupPrep":"تحضيرات الموعد","policy.groupInfo":"معلومات مهمة",
      "policy.waTitle":"الحجز عبر واتساب","policy.waDesc":"تتم جميع الحجوزات عبر واتساب مباشرة، حيث نؤكد معكِ الخدمة والتاريخ والوقت.",
      "policy.depositTitle":"سياسة العربون","policy.depositDesc":"يتطلب تأكيد كل حجز دفع عربون. في حال عدم استلام العربون خلال 24 ساعة من وقت الحجز، يُلغى الحجز تلقائيًا. العربون غير قابل للاسترداد في حال الإلغاء.",
      "policy.rescheduleTitle":"تأجيل الموعد","policy.rescheduleDesc":"إذا احتجتِ لتأجيل موعدكِ، تواصلي معنا عبر واتساب بأقرب وقت ممكن وسنعمل معكِ لإيجاد موعد بديل مناسب.",
      "policy.homeStudioTitle":"استوديو خاص بموعد مسبق","policy.homeStudioDesc":"تُقدَّم جميع الخدمات حصريًا بموعد مسبق في استوديو أميرة الخاص المجهز بالكامل في جدة.",
      "policy.arrivalTitle":"وقت الحضور","policy.arrivalDesc":"يُرجى الحضور في الموعد المحدد تمامًا. التأخير لأكثر من 15 دقيقة دون إشعار مسبق قد يؤدي لتقليص وقت الجلسة أو إلغائها للحفاظ على مواعيد بقية العميلات.",
      "policy.prepTitle":"تجهيزات الشعر قبل الجلسة","policy.prepDesc":"يُفضّل الحضور بشعر نظيف وجاف تمامًا (مغسول في اليوم السابق للجلسة وليس في نفس اليوم)، بدون كريمات أو زيوت على فروة الرأس، لضمان أفضل نتيجة للتسريحة.",
      "policy.skinTitle":"تجهيز البشرة قبل المكياج",
      "policy.skinDesc":"رطّبي بشرتكِ جيدًا في الأيام التي تسبق الجلسة، وتجنبي التقشير القوي أو أي منتج جديد قبل يوم أو يومين من الموعد. <a href=\"journal-skin-prep\">اقرئي دليلنا الكامل لتجهيز البشرة →</a>",
      "policy.termsTitle":"الشروط العامة للحجز","policy.termsDesc":"الأسعار المعلنة قابلة للتغيير حسب تعقيد الطلب. قد يُطلب دفع كامل المبلغ مقدمًا في بعض الحالات الخاصة (مثل مواسم الأعياد). باقة العروس تشمل جلسة تجربة اختيارية بسعر منفصل عند الطلب.",
      "policy.faqTitle":"لديكِ سؤال؟",
      "policy.faqDesc":"راجعي <a href=\"pricing#faq\">الأسئلة الشائعة</a> حول الحجز، الأسعار، والخدمات، أو تواصلي معنا مباشرة عبر واتساب.",
      "policy.footnote":"* لأي استفسار حول هذه السياسات، لا تترددي في التواصل معنا مباشرة عبر واتساب قبل تأكيد حجزكِ.",
      "nav.journal":"مدونة الجمال",
      "journal.eyebrow":"مدونة الجمال","journal.title":"مدونة الجمال","journal.sub":"نصائح وخبرات حقيقية من أميرة لمساعدتكِ على إطلالة مثالية في كل مناسبة",
      "journal.readMore":"اقرئي المزيد ←","journal.readTime":"قراءة 3 دقائق","journal.moreArticles":"مقالات أخرى قد تهمكِ","journal.viewAll":"تصفّحي كل المقالات",
      "journal.ctaTitle":"جاهزة لحجز موعدكِ؟","journal.ctaBody":"تواصلي معنا اليوم واحجزي موعدكِ بسهولة عبر واتساب.",
      "journal.art1.tag":"دليل العروس","journal.art1.title":"كيف تختارين خبيرة المكياج المناسبة ليومكِ المميز",
      "journal.art1.excerpt":"من الخبرة إلى نظافة الأدوات — إليكِ أهم النقاط التي تساعدكِ على اختيار خبيرة المكياج المناسبة لعرسكِ أو مناسبتكِ الخاصة.",
      "journal.art1.body":"<p>اختيار خبيرة المكياج المناسبة ليس قرارًا بسيطًا، خاصة عندما يتعلق الأمر بيوم لا يتكرر مثل يوم زفافكِ. إليكِ أهم النقاط التي تساعدكِ على اتخاذ القرار الصحيح.</p><h2>انظري إلى الأعمال الحقيقية، لا الصور المنسقة فقط</h2><p>لا تكتفي بمشاهدة الصور النهائية المثالية على إنستغرام. اطلبي رؤية فيديوهات حقيقية من الجلسات، وصور \"قبل وبعد\" لعميلات سابقات، لتتكوّن لديكِ صورة واقعية عن مستوى الخبيرة ونتائجها الفعلية على أنواع بشرة مختلفة.</p><h2>اسألي عن سنوات الخبرة ونوع المناسبات</h2><p>خبيرة المكياج التي تعمل منذ سنوات في مكياج العرائس تحديدًا تفهم تفاصيل دقيقة لا يدركها من يعمل في المكياج العام فقط — مثل اختيار تركيبة تدوم لساعات التصوير الطويلة، ومقاومة الدموع والعناق خلال حفل الزفاف.</p><h2>لا تتنازلي عن معايير النظافة</h2><p>تأكدي أن الأدوات والفرش تُعقّم بالكامل بين كل عميلة وأخرى، وأن هناك أدوات مخصصة لكِ وحدكِ (خاصة أدوات العين والشفاه). هذا ليس تفصيلًا ثانويًا، بل معيار أساسي لصحة بشرتكِ.</p><h2>اسألي عن المنتجات المستخدمة</h2><p>المنتجات العالمية المعتمدة تدوم لساعات أطول وتناسب أنواع بشرة متعددة، بعكس المنتجات الرخيصة التي قد تسبب حساسية أو تنسدل خلال اليوم. لا تترددي في السؤال عن الماركات المستخدمة قبل الحجز.</p><h2>لا تستغني عن جلسة التجربة</h2><p>جلسة التجربة قبل يوم الزفاف بفترة كافية تمنحكِ فرصة لرؤية اللوك النهائي، وتعديل أي تفصيلة قبل اليوم الفعلي — بدلًا من اكتشاف أن اللوك لا يعجبكِ في صباح الزفاف نفسه.</p><p>اختيار خبيرة المكياج المناسبة هو استثمار في راحة بالكِ يوم الزفاف بقدر ما هو استثمار في إطلالتكِ. خذي وقتكِ في البحث، واسألي بلا تردد — فالخبيرة الواثقة من عملها لن تمانع الإجابة عن كل أسئلتكِ.</p>",
      "journal.art2.tag":"مكياج العروس","journal.art2.title":"أهم نصائح مكياج العروس لإطلالة زفاف مثالية",
      "journal.art2.excerpt":"من جلسة التجربة إلى اللمسات الأخيرة — نصائح عملية تضمن لكِ إطلالة عروس تدوم من التصوير حتى آخر رقصة.",
      "journal.art2.body":"<p>يوم الزفاف طويل وحافل بالمشاعر والحركة، لذا يحتاج مكياج العروس إلى تخطيط أدق من أي مكياج آخر. إليكِ أهم النصائح لإطلالة تدوم من التحضيرات وحتى آخر لحظة في الحفل.</p><h2>احجزي جلسة تجربة قبل الموعد بوقت كافٍ</h2><p>لا تتركي التجربة لآخر أسبوع. احجزيها قبل شهر على الأقل من الزفاف، لتتمكني من تعديل أي تفصيلة بهدوء دون ضغط الوقت.</p><h2>اختاري لوكًا يشبهكِ لا يشبه صورة رأيتها فقط</h2><p>أجمل مكياج عروس هو الذي يبرز ملامحكِ الطبيعية بلمسة أكثر إشراقًا، وليس مكياجًا مختلفًا تمامًا عن شكلكِ المعتاد. ناقشي مع خبيرة المكياج ملامح وجهكِ وما يناسبها تحديدًا.</p><h2>فكّري في التصوير قبل اختيار درجة الألوان</h2><p>الإضاءة والفلاش يظهران بعض الألوان بشكل مختلف عن الواقع. خبيرة مكياج متمرسة في تصوير الأعراس تعرف كيف تختار درجات تبدو طبيعية وجذابة في الصور كما في الواقع تمامًا.</p><h2>لا تهملي تثبيت المكياج</h2><p>اطلبي استخدام بخاخ تثبيت (setting spray) عالي الجودة، خاصة إذا كان حفل زفافكِ في الخارج أو في أجواء حارة. هذه الخطوة الصغيرة تصنع فرقًا كبيرًا بحلول ساعات المساء.</p><h2>احجزي وقتًا كافيًا لجلسة يوم الزفاف نفسه</h2><p>لا تحاولي ضغط موعد المكياج والتسريحة في وقت قصير بين المواعيد الأخرى. امنحي نفسكِ وقتًا كافيًا لجلسة هادئة بلا توتر، فهذا ينعكس على النتيجة النهائية وعلى مزاجكِ طوال اليوم.</p><p>مكياج العروس المثالي لا يعتمد فقط على مهارة الخبيرة، بل على التخطيط الجيد والتواصل الواضح معها. كلما بدأتِ التحضير مبكرًا، كانت النتيجة أقرب لما تحلمين به.</p>",
      "journal.art3.tag":"العناية بالبشرة","journal.art3.title":"كيف تجهزين بشرتكِ قبل جلسة المكياج",
      "journal.art3.excerpt":"نتيجة المكياج تبدأ من قبل الجلسة بأيام. إليكِ خطوات بسيطة لتحضير بشرتكِ لأفضل نتيجة ممكنة.",
      "journal.art3.body":"<p>نتيجة المكياج النهائية لا تعتمد فقط على مهارة الخبيرة، بل تبدأ من حالة بشرتكِ قبل الجلسة بأيام. إليكِ خطوات بسيطة تصنع فرقًا حقيقيًا في ثبات المكياج ومظهره.</p><h2>رطّبي بشرتكِ يوميًا في الأسبوع الذي يسبق الجلسة</h2><p>البشرة الجافة تجعل المكياج يظهر متكسرًا وغير متساوٍ. التزمي بروتين ترطيب يومي بسيط بمرطب يناسب نوع بشرتكِ، صباحًا ومساءً.</p><h2>تجنبي التقشير القوي أو أي علاج جديد قبل المناسبة مباشرة</h2><p>لا تجربي منتجًا جديدًا أو جلسة تقشير قوية قبل يوم أو يومين من المناسبة. أي احمرار أو تهيج غير متوقع سيصعّب مهمة المكياج ويؤثر على النتيجة.</p><h2>اشربي كمية كافية من الماء</h2><p>الترطيب من الداخل لا يقل أهمية عن الترطيب الخارجي. حاولي زيادة كمية الماء التي تشربينها في الأيام التي تسبق المناسبة، فهذا ينعكس مباشرة على إشراقة بشرتكِ.</p><h2>نامي جيدًا قبل يوم المناسبة</h2><p>قلة النوم تظهر على البشرة بانتفاخ وشحوب يصعب إخفاؤهما بالكونسيلر وحده. حاولي الحصول على نوم كافٍ في الليالي التي تسبق المناسبة، خاصة الليلة الأخيرة.</p><h2>احضري بوجه نظيف تمامًا يوم الجلسة</h2><p>تجنبي وضع أي كريمات ثقيلة أو زيوت قبل الجلسة مباشرة، فهذا قد يمنع المكياج من الثبات جيدًا. اغسلي وجهكِ جيدًا واحضري ببشرة نظيفة، وستتولى خبيرة المكياج الباقي.</p><p>بشرة صحية ومرطبة هي الأساس الحقيقي لأي مكياج ناجح. اهتمامكِ بهذه الخطوات البسيطة قبل الجلسة سينعكس مباشرة على جمال النتيجة النهائية وثباتها طوال اليوم.</p>",
      "journal.art4.tag":"نصائح احترافية","journal.art4.title":"كيف تجعلين مكياجكِ يدوم طوال اليوم والسهرة",
      "journal.art4.excerpt":"من التحضير إلى منتجات التثبيت — أسرار احترافية لإطلالة تصمد أمام الحرارة والرطوبة وساعات الاحتفال الطويلة.",
      "journal.art4.body":"<p>المناسبات الطويلة، من حفلات الزفاف إلى السهرات الممتدة، تحتاج إلى مكياج مصمم خصيصًا ليصمد أمام الحرارة والرطوبة والحركة المستمرة. إليكِ أهم الأسرار الاحترافية لثبات يدوم.</p><h2>التحضير الجيد للبشرة هو نصف الطريق</h2><p>البشرة المرطبة والمُجهّزة جيدًا تحتفظ بالمكياج لوقت أطول من البشرة الجافة أو غير المُعتنى بها. لا تتجاهلي خطوات العناية بالبشرة في الأيام التي تسبق المناسبة.</p><h2>طبقات خفيفة أفضل من طبقة واحدة سميكة</h2><p>المكياج المصنوع من طبقات خفيفة ومتتالية يثبت بشكل أفضل ويبدو طبيعيًا أكثر من طبقة واحدة سميكة، والتي غالبًا ما \"تنسدل\" أسرع مع الحرارة.</p><h2>البودرة الشفافة صديقتكِ الحقيقية</h2><p>تثبيت الكونسيلر وأماكن التلألؤ الطبيعي (مثل جانبي الأنف والجبهة) ببودرة شفافة ناعمة يمنع ظهور اللمعان غير المرغوب فيه خلال الساعات الطويلة.</p><h2>بخاخ التثبيت خطوة لا يجب تخطيها</h2><p>بخاخ التثبيت عالي الجودة هو اللمسة الأخيرة التي \"تُقفل\" المكياج وتحميه من التأثر بالحرارة والتعرق والدموع خلال المناسبة.</p><h2>احملي معكِ أدوات تجديد سريعة</h2><p>ورق امتصاص الزيوت (blotting paper) وأحمر شفاه بلون مناسب في حقيبتكِ يساعدانكِ على تجديد الإطلالة بسرعة في أي وقت خلال السهرة دون الحاجة لإعادة المكياج بالكامل.</p><p>ثبات المكياج ليس صدفة، بل نتيجة تحضير جيد واختيارات صحيحة من البداية. اتباع هذه الخطوات يمنحكِ إطلالة واثقة تدوم من أول لحظة حتى آخر صورة تذكارية.</p>",
      "journal.art5.tag":"تجنبي هذا","journal.art5.title":"5 أخطاء شائعة في مكياج العروس يجب تجنبها",
      "journal.art5.excerpt":"من التجربة المتأخرة إلى اختيار الألوان الخاطئة — تعرّفي على الأخطاء الأكثر شيوعًا وكيف تتجنبينها في يوم زفافكِ.",
      "journal.art6.tag":"فلسفتي","journal.art6.title":"فلسفتي في المكياج وأسلوبي المميز",
      "journal.art6.excerpt":"كل خبيرة مكياج لها بصمة خاصة. إليكِ نظرتي الشخصية للمكياج وما يميز أسلوبي في كل جلسة.",
      "journal.art6.body":"<p>بالنسبة لي، المكياج ليس مجرد تغطية للبشرة أو إضافة ألوان، بل هو وسيلة لإبراز جمال كل امرأة بطريقتها الخاصة.</p><h2>أؤمن بالجمال الطبيعي المعزز، لا المخفي</h2><p>أسلوبي يعتمد على إبراز ملامحكِ الحقيقية بلمسة أكثر إشراقًا وثقة، وليس إخفاءها خلف طبقات كثيفة من المكياج. الهدف دائمًا أن تنظري في المرآة وترَي نفسكِ في أجمل حالاتها، لا شخصًا آخر.</p><h2>كل بشرة ووجه لهما احتياجات مختلفة</h2><p>لا يوجد \"لوك واحد يناسب الجميع\". أستمع لكِ في بداية كل جلسة، وأدرس ملامح وجهكِ ولون بشرتكِ واحتياجاتها، قبل أن أختار المنتجات والتقنيات المناسبة لكِ تحديدًا.</p><h2>التفاصيل الصغيرة تصنع الفرق الكبير</h2><p>من اختيار درجة الكونتور المناسبة لشكل وجهكِ، إلى تحديد الطبقات الصحيحة لضمان ثبات يدوم، أهتم بكل تفصيلة مهما بدت صغيرة، لأن مجموع هذه التفاصيل هو ما يصنع إطلالة استثنائية.</p><h2>الراحة والثقة جزء من التجربة</h2><p>جلسة المكياج يجب أن تكون تجربة ممتعة ومريحة، لا مصدر توتر. أحرص دائمًا على أجواء هادئة ومرحّبة، لتخرجي من الجلسة وأنتِ تشعرين بالجمال والثقة معًا.</p><p>هذه هي فلسفتي التي أحملها في كل جلسة: مكياج يعزز جمالكِ الحقيقي، بلمسة احترافية تليق بكِ في كل مناسبة.</p>",
      "journal.art7.tag":"قبل الحجز","journal.art7.title":"لماذا أنصح دائمًا بمراجعة معرض أعمالي قبل الحجز",
      "journal.art7.excerpt":"قبل أن تحجزي موعدكِ، خذي بضع دقائق لتصفح أعمالي السابقة. إليكِ لماذا هذه الخطوة البسيطة توفر عليكِ الكثير.",
      "journal.art7.body":"<p>من أكثر النصائح التي أكررها لعميلاتي الجديدات: لا تحجزي قبل أن تشاهدي معرض أعمالي بالكامل. وإليكِ الأسباب الحقيقية وراء هذه النصيحة.</p><h2>الصور تُظهر أسلوبي الفعلي، لا الوصف فقط</h2><p>كلمات مثل \"مكياج طبيعي\" أو \"لوك فخم\" قد تعني أشياء مختلفة لأشخاص مختلفين. مشاهدة أعمال حقيقية تمنحكِ فكرة دقيقة وواضحة عن أسلوبي تحديدًا، بعيدًا عن أي لبس في التوقعات.</p><h2>يساعدكِ على معرفة إن كان أسلوبي يناسب رؤيتكِ</h2><p>كل عميلة لديها تصوّر مختلف لإطلالتها المثالية. تصفح أعمالي يساعدكِ على التأكد من أن أسلوبي في الألوان والتقنيات يتماشى مع الذوق الذي تبحثين عنه، قبل الالتزام بالحجز.</p><h2>يقلل من أي مفاجآت أو سوء تفاهم يوم المناسبة</h2><p>عندما تأتين للجلسة وأنتِ تعرفين بالضبط نوعية النتيجة المتوقعة، تكون التجربة أكثر سلاسة وراحة للطرفين، ونتجنب معًا أي فجوة بين التوقع والواقع.</p><h2>يفتح بابًا للنقاش قبل يوم الجلسة</h2><p>إذا أعجبكِ لوك معيّن من أعمالي، يمكنكِ إخباري به مسبقًا لنناقش كيف يمكن تطويعه ليناسب ملامحكِ ومناسبتكِ الخاصة — بدلًا من محاولة الشرح بالكلمات فقط.</p><p>مراجعة معرض الأعمال ليست مجرد خطوة إضافية، بل استثمار بسيط في راحة بالكِ ووضوح توقعاتكِ، لضمان تجربة مكياج تليق بيومكِ المميز.</p>",
      "journal.art8.tag":"دليل الاختيار","journal.art8.title":"كيف تعرفين أن أسلوبي في المكياج يناسبكِ",
      "journal.art8.excerpt":"اختيار خبيرة المكياج المناسبة يعتمد على مدى توافق أسلوبها مع ذوقكِ. إليكِ علامات تساعدكِ على معرفة أن أسلوبي هو ما تبحثين عنه.",
      "journal.art8.body":"<p>كثيرًا ما تسألني العميلات: \"كيف أعرف أن أسلوبكِ يناسبني؟\" إليكِ بعض العلامات التي تساعدكِ على الإجابة عن هذا السؤال بنفسكِ.</p><h2>تفضّلين المكياج الذي يبرز ملامحكِ لا يغيّرها</h2><p>إذا كنتِ تبحثين عن إطلالة تجعلكِ تبدين كأجمل نسخة من نفسكِ، وليس شخصًا مختلفًا تمامًا، فأسلوبي في إبراز الجمال الطبيعي بلمسة أكثر إشراقًا سيناسبكِ تمامًا.</p><h2>تقدّرين الاهتمام بالتفاصيل الدقيقة</h2><p>إذا كانت التفاصيل الصغيرة — مثل تناسق درجات الكونتور، أو دقة رسمة العين — تهمكِ بقدر النتيجة الإجمالية، فستلاحظين هذا الاهتمام بوضوح في أسلوب عملي.</p><h2>تبحثين عن مكياج يدوم دون الحاجة لتعديل مستمر</h2><p>سواء كان يوم زفافكِ أو سهرة طويلة، إذا كانت أولويتكِ إطلالة تصمد لساعات دون الحاجة لتصليحات متكررة، فهذا بالضبط ما أركّز عليه في كل جلسة.</p><h2>تفضّلين تجربة هادئة ومريحة قبل أي شيء</h2><p>إذا كنتِ تقدّرين الشعور بالراحة والاستماع لاحتياجاتكِ خلال الجلسة بقدر ما تقدّرين النتيجة النهائية، فستجدين في أسلوبي التوازن الذي تبحثين عنه بين الاحترافية والدفء الإنساني.</p><p>أفضل طريقة للتأكد بنفسكِ هي دائمًا: تصفحي معرض أعمالي، واسأليني عن أي شيء يخطر ببالكِ قبل الحجز. سأكون سعيدة بمساعدتكِ على اتخاذ القرار الصحيح لكِ.</p>",
      "journal.art5.body":"<p>مع كل التفاصيل التي تحتاج العروس للتفكير فيها، من السهل الوقوع في بعض الأخطاء الشائعة التي تؤثر على الإطلالة النهائية. إليكِ أبرزها وكيف تتجنبينها.</p><h2>1. تأجيل جلسة التجربة لوقت متأخر جدًا</h2><p>حجز التجربة قبل أسبوع واحد فقط من الزفاف لا يترك وقتًا كافيًا لتعديل أي تفصيلة. احجزيها قبل شهر على الأقل لضمان راحة البال.</p><h2>2. اختيار لوك مختلف تمامًا عن شكلكِ المعتاد</h2><p>الرغبة في \"الظهور بشكل مختلف تمامًا\" في يوم الزفاف قد تؤدي لمكياج لا يشبهكِ فعلًا في الصور. أفضل مكياج عروس هو الذي يعزز جمالكِ الطبيعي بثقة أكبر.</p><h2>3. إهمال تجهيز البشرة قبل الجلسة</h2><p>الوصول للجلسة ببشرة جافة أو غير مُعتنى بها يصعّب مهمة خبيرة المكياج ويؤثر على النتيجة النهائية، مهما كانت مهارتها. ابدئي روتين العناية ببشرتكِ قبل أسابيع من الموعد.</p><h2>4. عدم إخبار خبيرة المكياج بحساسية البشرة أو أي مشاكل جلدية</h2><p>إذا كانت بشرتكِ حساسة أو لديكِ أي حالة جلدية، أخبري خبيرة المكياج مسبقًا حتى تختار المنتجات المناسبة، بدلًا من اكتشاف المشكلة في يوم الزفاف نفسه.</p><h2>5. عدم الاهتمام بتثبيت المكياج لساعات طويلة</h2><p>يوم الزفاف يمتد لساعات طويلة من التصوير إلى الحفل. تأكدي أن خبيرة المكياج تستخدم منتجات تثبيت مناسبة، واسأليها عن خطوات تجديد الإطلالة إذا لزم الأمر خلال اليوم.</p><p>تجنّب هذه الأخطاء البسيطة يبدأ من التخطيط المبكر والتواصل الواضح مع خبيرة المكياج. النتيجة: إطلالة واثقة وطبيعية تدوم من الصباح وحتى آخر لحظة في حفلكِ.</p>",
      "footer.maroof":"ترخيص إعلامي معتمد — 522836",
      "footer.rights":"© <span id=\"yearNow\">2026</span> استوديو أميرة خالد. جميع الحقوق محفوظة.","footer.credit":"صُمم بواسطة DevMenta"
    },
    en: {
      "brand.name":"Amira Khalid","brand.tag":"Makeup Studio · Jeddah",
      "nav.home":"Home","nav.about":"About","nav.portfolio":"Portfolio","nav.pricing":"Pricing","nav.contact":"Contact","nav.bookNow":"Book Now",
      "hero.eyebrow":"Certified Makeup Artist","hero.title":"Your Most Beautiful Look ","hero.titleAccent":"Starts Here",
      "hero.subtitle":"Professional makeup & elegant hairstyling at Amira Khalid Studio in Jeddah — or wherever you are.",
      "hero.ctaBook":"Book Your Appointment","hero.ctaPortfolio":"View My Work",
      "hero.badge1":"500+ Brides & Clients","hero.badge2":"100% Tool Sterilization","hero.badge3":"Studio or At Your Location",
      "hero.chip1Num":"SAR 2500","hero.chip1Label":"Full Bridal Package","hero.chip2Num":"4.9 ★","hero.chip2Label":"Client Rating",
      "hero.scroll":"Scroll down",
      "cta.badge":"Instant WhatsApp Confirmation","cta.title":"Don't Wait to Book Your Perfect Look",
      "cta.body":"Book your appointment today and get instant confirmation via WhatsApp — no complicated commitments, clear pricing from the start.",
      "cta.check1":"Fast WhatsApp confirmation","cta.check2":"Studio or at your location","cta.check3":"Genuine international products","cta.check4":"100% tool sterilization",
      "cta.panelBadge":"Instant Confirm","cta.panelTitle":"Ready to Book?","cta.panelBody":"Choose your service and preferred date, and we'll confirm every detail with you directly.",
      "cta.panelBtn1":"Book Your Appointment","cta.panelBtn2":"Message on WhatsApp",
      "portfolio.videosEyebrow":"From the Studio","portfolio.videosTitle":"Watch My Work Live","portfolio.videosSub":"Real clips from makeup sessions and quick tips",
      "ba.eyebrow":"Before & After","ba.title":"See the Difference","ba.sub":"Real transformations from actual makeup sessions","ba.before":"Before","ba.after":"After",
      "home.reelsEyebrow":"Videos","home.reelsTitle":"Live Clips From the Studio","home.reelsSub":"Watch real makeup sessions and quick tips","home.reelsMore":"Watch More Reels",
      "home.journalEyebrow":"Beauty Journal","home.journalTitle":"Tips & Insights From Amira","home.journalSub":"Articles to help you prepare for your perfect day","home.journalMore":"Browse All Articles",
      "portfolio.instaFollow":"Follow the latest reels on Instagram",
      "reel3.caption":"Behind the Scenes",
      "reel8.caption":"Professional Makeup Touches","reel9.caption":"Details That Make the Difference",
      "reel10.caption":"No Filters — the Real Result","reel11.caption":"Beauty Expert in Jeddah","reel12.caption":"Glamorous Evening Look",
      "reel17.caption":"A Touch of Mystery and Elegance","reel18.caption":"Bride in a Pearl Crown","reel19.caption":"Unforgettable Bridal Details",
      "reel20.caption":"A Moment of Calm Beauty","reel21.caption":"Soft Waves, Timeless Elegance","reel22.caption":"A Bride's Genuine Smile","reel23.caption":"Regal Bridal Details","reel24.caption":"A Touch of Classic Elegance",
      "reel13.caption":"Precision in Every Touch","reel14.caption":"Bridal Beauty in Every Detail","reel15.caption":"Captivating Evening Glam","reel16.caption":"Glow With Confidence",
      "about.journeyEyebrow":"My Journey","about.journeyTitle":"How the Story Began",
      "journey.step1Title":"The Beginning","journey.step1Desc":"Amira's passion for makeup began early, developing her skills through certified professional courses.",
      "journey.step2Title":"Going Professional","journey.step2Desc":"10+ years of experience in bridal and special-occasion makeup across Jeddah and beyond, since 2016.",
      "journey.step3Title":"Earning Trust","journey.step3Desc":"500+ brides and clients have trusted Amira to bring out their beauty on their most important days.",
      "journey.step4Title":"Today","journey.step4Desc":"Amira Khalid Studio is now a trusted destination for every bride seeking an exceptional look in Jeddah.",
      "pricing.faqEyebrow":"FAQ","pricing.faqTitle":"Got a Question?",
      "faq.q1":"Does the price include a bridal trial session?","faq.a1":"Yes, the Bridal Package includes a trial session before the wedding day to make sure your look is perfect.",
      "faq.q2":"How much advance notice do you need?","faq.a2":"We recommend booking at least 2 weeks ahead for regular occasions, and at least a month ahead for the Bridal Package to guarantee availability.",
      "faq.q3":"Can I cancel or reschedule my appointment?","faq.a3":"You can reschedule or cancel free of charge up to 48 hours before your appointment.",
      "faq.q4":"Is there an extra fee for service outside the studio?","faq.a4":"Listed private-service prices include travel within Jeddah. Locations outside Jeddah may involve an additional travel fee, confirmed when you reach out.",
      "faq.q5":"What payment methods do you accept?","faq.a5":"Cash or direct bank transfer on the day of the appointment — we confirm all details in advance via WhatsApp.",
      "faq.q7":"Does the makeup service include hairstyling too?","faq.a7":"Professional Makeup alone doesn't include hairstyling. If you'd like hairstyling as well, choose the \"Makeup + Full Hairstyling\" or \"Makeup + Blow Dry & Soft Waves\" package from the services list.",
      "faq.q8":"What exactly is included in the Bridal Package?","faq.a8":"The Bridal Package includes: professional makeup, premium lashes, full hairstyling, and a body glow session. Similar outdoor bridal packages are available with different inclusions — see the pricing section above for full details.",
      "faq.q6":"Do you require a deposit to confirm booking?","faq.a6":"Bookings are confirmed directly via WhatsApp. For the Bridal Package, a deposit may be requested to lock in your date — we'll share the details when you reach out.",
      "contact.mapEyebrow":"Our Location","contact.mapTitle":"Find Us on the Map",
      "marquee.m1":"Bridal Makeup","marquee.m2":"Elegant Hairstyling","marquee.m3":"Serving Jeddah","marquee.m4":"Book via WhatsApp","marquee.m5":"International Brands",
      "page.about.eyebrow":"About","page.about.title":"Meet Amira","page.about.sub":"The story, expertise, and care behind every look",
      "page.portfolio.eyebrow":"Gallery","page.portfolio.title":"My Work","page.portfolio.sub":"A curated collection of bridal, evening & hairstyling looks",
      "page.pricing.eyebrow":"Pricing","page.pricing.title":"Pricing & Packages","page.pricing.sub":"Clear pricing, no surprises — choose what suits your occasion",
      "page.contact.eyebrow":"Book Now","page.contact.title":"Book Your Appointment","page.contact.sub":"Fill in your details and we'll confirm your appointment via WhatsApp",
      "about.eyebrow":"About","about.title":"Meet Amira",
      "about.body":"Amira Khalid is a professional makeup artist based in Jeddah, passionate about enhancing your natural beauty with an elegant artistic touch fit for your special occasions — from your wedding day to your finest evenings out. Amira uses professional international brands and follows the highest hygiene standards with dedicated tools for every client.",
      "about.feat1":"Professional international brands","about.feat2":"Full sterilization & single-use tools per client","about.feat3":"Service at the studio or at your location","about.feat4":"A refined experience from booking to execution",
      "about.floatYears":"Years of Experience","about.floatRating":"Client Rating",
      "about.stat1":"Years of Experience","about.stat2":"Bridal & Evening Clients","about.stat3":"Founded","about.stat4":"Client Rating ★",
      "portfolio.filterAll":"All","portfolio.filterBridal":"Bridal Makeup","portfolio.filterEvening":"Evening Makeup","portfolio.filterHair":"Hairstyles","portfolio.filterBA":"Before & After",
      "portfolio.note":"* Real photos from Amira's work — more will be added once the site's official account is live",
      "pf.item1.title":"Veiled Bridal Look","pf.item2.title":"Soft Bridal Makeup","pf.item3.title":"Dramatic Velvet Evening","pf.item4.title":"Elegant Evening Makeup",
      "pf.item5.title":"Elegant Bridal Updo","pf.item6.title":"Natural Day Makeup","pf.item7.title":"Professional Skin Prep",
      "pf.item8.title":"Finishing Lip Touch","pf.item9.title":"Tulle Bridal Look","pf.item10.title":"Pearl Bridal Crown","pf.item11.title":"Smoky Eye Evening","pf.item12.title":"Elegant Profile Look","pf.item13.title":"Bride with Bouquet",
      "pf.item14.title":"Bride in Floral Lace Gown","pf.item15.title":"Captivating Bronze Eye Evening Look","pf.item16.title":"Elegant High Updo","pf.item17.title":"Elegance With Golden Details",
      "testi.eyebrow":"Google Reviews","testi.title":"What Our Clients Say","testi.googleLink":"4.9 — See All Reviews on Google Maps",
      "testi.q1":"“My wedding day makeup was better than I dreamed — Amira understood exactly the look I wanted from the very first session.”","testi.n1":"Sarah","testi.r1":"Bride",
      "testi.q2":"“Blow-dry and curls stayed perfect all night, and so professional from the first minute. Highly recommend.”","testi.n2":"Noura","testi.r2":"Evening Client",
      "testi.q3":"“Elegant service and spotless tools — I felt cared for from the very first minute.”","testi.n3":"Lama","testi.r3":"Bride",
      "testi.a1":"S","testi.a2":"N","testi.a3":"L",
      "pricing.groupEvening":"Evening Makeup","pricing.groupBridal":"Bridal Makeup","pricing.groupTraining":"Private 1:1 Makeup Training","pricing.featured":"Most Popular","pricing.bookBtn":"Book Now",
      "pricing.homeStudioNote":"* All services are provided exclusively by appointment at Amira's private studio in Jeddah","pricing.priceOnRequest":"Price on request",
      "pricing.onRequest":"Price on request",
      "pricing.durationRegular":"<strong>35–45</strong> min — depending on skin type","pricing.durationBride":"<strong>60–75</strong> min — bride session",
      "trust.brands":"Professional international brands","trust.sterile":"Full tool sterilization","trust.single":"Single-use tools per client",
      "trust.brandsDesc":"We use only trusted international makeup brands that last all day and suit every skin type",
      "trust.sterileDesc":"Every tool is fully sterilized before each session, following the highest hygiene standards",
      "trust.singleDesc":"Brushes and tools dedicated to you alone, for your complete comfort and safety",
      "trust.since2016":"Professional Makeup Artist Since 2016","trust.detail":"Attention to Every Detail","trust.personalized":"Personalized for Every Face",
      "trust.since2016Desc":"Over 10 years of professional experience in bridal and special-occasion makeup",
      "trust.detailDesc":"Every session is finished with meticulous care, ensuring a flawless look from every angle",
      "trust.personalizedDesc":"Every face is unique — Amira tailors each look to highlight your individual beauty",
      "about.trustEyebrow":"Why Trust Amira","about.trustTitle":"Standards We Never Compromise On",
      "svc.makeup":"Professional Makeup","svc.makeup.desc":"Skin prep & elegant makeup that lasts all day","svc.makeupOpt":"Professional Makeup — SAR 350",
      "svc.makeupBlowdry":"Makeup + Blow Dry & Soft Waves","svc.makeupBlowdry.desc":"Professional makeup with a blow dry and soft waves for an elegant evening look","svc.makeupBlowdryOpt":"Makeup + Blow Dry & Soft Waves — SAR 550",
      "svc.makeupHair":"Makeup + Full Hairstyling","svc.makeupHair.desc":"Makeup with a hairstyle designed for your look","svc.makeupHairOpt":"Makeup + Full Hairstyling — SAR 650",
      "svc.bridal":"Bridal Package","svc.bridal.desc":"Professional Makeup + Premium Lashes + Full Hairstyling + Body Glow","svc.bridalOpt":"Bridal Package — SAR 2500",
      "svc.training":"Private 1:1 Session","svc.training.desc":"A private one-on-one session to learn makeup basics or refine your skills step by step","svc.trainingOpt":"Private 1:1 Makeup Training — Price on request",
      "common.sar":"SAR",
      "contact.formName":"Full Name","contact.formPhone":"Phone Number","contact.formService":"Service","contact.formEventType":"Event Type","contact.formDate":"Date","contact.formTime":"Ready-by Time",
      "event.wedding":"Wedding","event.engagement":"Engagement","event.party":"Party / Evening","event.graduation":"Graduation","event.other":"Other",
      "contact.formLocation":"Location","contact.locStudio":"At the Studio (Jeddah)","contact.locHome":"At My Location","contact.formAddress":"Location Details / Address",
      "contact.formNotes":"Additional Notes (optional)","contact.submitBtn":"Confirm Booking via WhatsApp","contact.privateHint":"Note: private location service is for brides only",
      "contact.lockedHintStudio":"This service is available at the studio only","contact.lockedHintHome":"This service is available at your location only",
      "contact.dateBlocked":"This date is fully booked — please choose another date",
      "contact.selectDate":"Select a date",
      "calendar.available":"Available","calendar.fullyBooked":"Fully Booked",
      "bookingPreview.eyebrow":"Pre-Launch Preview","bookingPreview.title":"New Calendar Booking System",
      "bookingPreview.sub":"Try booking yourself below — this page is for preview only and will not be published to visitors",
      "bookingPreview.howTitle":"How does the booking system work?",
      "bookingPreview.step1":"<strong style=\"color:var(--text)\">1. Service Selection & Event Type —</strong> The client picks the right service from the list (Evening Makeup, Bridal Makeup, or Private Training), then selects the event type.",
      "bookingPreview.step2":"<strong style=\"color:var(--text)\">2. Selecting the date from the calendar —</strong> Instead of manually typing the date, the client opens a real calendar similar to Google Calendar and clicks directly on the right day.",
      "bookingPreview.step3":"<strong style=\"color:var(--text)\">3. Fully booked days appear in red and can't be clicked —</strong> When you tell us you're not accepting bookings on a specific day (holiday, special occasion, full day), we add it to the site file within a minute, and it instantly shows \"Fully Booked\" to every visitor.",
      "bookingPreview.step4":"<strong style=\"color:var(--text)\">4. Instant confirmation via WhatsApp —</strong> After filling out the form, all details (name, service, date) are sent to you directly via WhatsApp so you can confirm the booking manually as usual — no payment system or extra account needed right now.",
      "bookingV2.title":"Full Booking & Payment Flow","bookingV2.sub":"Pick a day from the calendar below to try the whole flow — this page is for preview only",
      "bookingV2.pickDate":"Choose a booking date","bookingV2.whereQuestion":"Where would you like the service?",
      "bookingV2.next":"Next","bookingV2.prev":"Back","bookingV2.nextPrice":"Next: Price",
      "bookingV2.serviceQuestion":"What service do you need?","bookingV2.reviewTitle":"Review Your Booking","bookingV2.confirmBtn":"Confirm & Continue",
      "bookingV2.paymentTitle":"Payment","bookingV2.paymentNote":"This is a test payment link for preview only — no real charge will happen until a real Moyasar account is connected.",
      "bookingV2.quoteTitle":"Confirm via WhatsApp","bookingV2.quoteNote":"All your booking details will be sent directly to Amira via WhatsApp to confirm your appointment.",
      "bookingV2.sendWhatsapp":"Send via WhatsApp","bookingV2.successTitle":"Your booking has been received!","bookingV2.successBody":"We'll be in touch soon to confirm every detail.",
      "bookingV2.labelName":"Name","bookingV2.labelPhone":"Phone","bookingV2.labelService":"Service","bookingV2.labelLocation":"Location","bookingV2.labelEventType":"Event Type",
      "bookingV2.choiceTitle":"How would you like to confirm?","bookingV2.choosePay":"Pay Online","bookingV2.choosePaySub":"Card or Apple Pay",
      "bookingV2.chooseWa":"Confirm via WhatsApp","bookingV2.chooseWaSub":"Send details directly",
      "bookingV2.labelDate":"Date","bookingV2.labelTime":"Time","bookingV2.labelPrice":"Price","bookingV2.priceOnRequest":"Price on request",
      "contact.serviceOptGroupStudio":"At the Studio","contact.serviceOptGroupPrivate":"Outdoor Bridal Service",
      "contact.successMsg":"Your request is ready! Click to complete sending via WhatsApp",
      "contact.trustBadge":"Trusted — Amira Khalid Studio","contact.infoLocationTitle":"Location","contact.infoLocation":"Al-Rehab District, Jeddah — View on Google Maps",
      "contact.infoLocation2":"Al-Rehab District, Jeddah, Saudi Arabia",
      "contact.infoHoursTitle":"Working Hours","contact.infoHours":"Sun–Wed: 11:00 AM – 10:00 PM, Thu–Sat: 9:00 AM – 11:00 PM","contact.infoInstagramTitle":"Instagram","contact.infoTiktokTitle":"TikTok",
      "contact.infoEmailTitle":"Email",
      "contact.infoWhatsapp":"Chat with us on WhatsApp",
      "footer.tagline":"Enhancing your natural beauty with a professional artistic touch, for every occasion that deserves the best.","footer.quickLinks":"Quick Links","footer.services":"Services","footer.getInTouch":"Get in Touch",
      "nav.bookingPolicy":"Booking Policy",
      "contact.policyNote":"By confirming your booking, you agree to our <a href=\"booking-policy\">Booking Policy</a>",
      "policy.eyebrow":"Before You Book","policy.title":"Before Booking","policy.sub":"Everything you need to know before booking your appointment with Amira",
      "policy.groupBooking":"Booking Policy","policy.groupPrep":"Appointment Preparation","policy.groupInfo":"Important Information",
      "policy.waTitle":"Booking via WhatsApp","policy.waDesc":"All bookings are made directly via WhatsApp, where we confirm the service, date, and time with you.",
      "policy.depositTitle":"Deposit Policy","policy.depositDesc":"Confirming any booking requires a deposit. If the deposit isn't received within 24 hours of booking, the appointment is automatically cancelled. Deposits are non-refundable in case of cancellation.",
      "policy.rescheduleTitle":"Rescheduling","policy.rescheduleDesc":"If you need to reschedule your appointment, reach out via WhatsApp as soon as possible and we'll work with you to find a suitable alternative time.",
      "policy.homeStudioTitle":"Private Studio, By Appointment","policy.homeStudioDesc":"All services are provided exclusively by appointment at Amira's fully equipped private studio in Jeddah.",
      "policy.arrivalTitle":"Arrival Time","policy.arrivalDesc":"Please arrive exactly at your scheduled time. Arriving more than 15 minutes late without prior notice may shorten your session or result in cancellation, to protect other clients' appointments.",
      "policy.prepTitle":"Hair Prep Before Your Session","policy.prepDesc":"Please arrive with clean, fully dry hair (washed the day before your session, not the same day), free of creams or oils on the scalp, to ensure the best hairstyling result.",
      "policy.skinTitle":"Skin Prep Before Makeup",
      "policy.skinDesc":"Moisturize your skin well in the days before your session, and avoid strong exfoliation or any new product a day or two before your appointment. <a href=\"journal-skin-prep\">Read our full skin prep guide →</a>",
      "policy.termsTitle":"General Appointment Terms","policy.termsDesc":"Listed prices may vary depending on request complexity. Full advance payment may be required in special cases (such as holiday seasons). The bridal package includes an optional trial session at a separate price upon request.",
      "policy.faqTitle":"Have a Question?",
      "policy.faqDesc":"Check our <a href=\"pricing#faq\">Frequently Asked Questions</a> about booking, pricing, and services, or reach out to us directly via WhatsApp.",
      "policy.footnote":"* For any questions about these policies, feel free to reach out via WhatsApp before confirming your booking.",
      "nav.journal":"Beauty Journal",
      "journal.eyebrow":"Beauty Journal","journal.title":"Beauty Journal","journal.sub":"Real tips and expertise from Amira to help you achieve the perfect look for every occasion",
      "journal.readMore":"Read More →","journal.readTime":"3 min read","journal.moreArticles":"More Articles You'll Like","journal.viewAll":"Browse All Articles",
      "journal.ctaTitle":"Ready to Book Your Appointment?","journal.ctaBody":"Reach out today and book your appointment easily via WhatsApp.",
      "journal.art1.tag":"Bridal Guide","journal.art1.title":"How to Choose the Right Makeup Artist for Your Big Day",
      "journal.art1.excerpt":"From experience to hygiene standards — here's what really matters when choosing the makeup artist for your wedding or special occasion.",
      "journal.art1.body":"<p>Choosing the right makeup artist is never a small decision — especially for a day as unique as your wedding. Here are the key things to look for before you book.</p><h2>Look at Real Work, Not Just Polished Photos</h2><p>Don't rely only on perfectly curated Instagram photos. Ask to see real session videos and genuine before-and-after shots from past clients, so you get an honest sense of the artist's skill and results across different skin types.</p><h2>Ask About Experience With Bridal Work Specifically</h2><p>A makeup artist who has spent years specializing in bridal makeup understands details that a general makeup artist might miss — like choosing a formula that lasts through hours of photography, and holds up against tears and hugs on the wedding day.</p><h2>Never Compromise on Hygiene Standards</h2><p>Make sure tools and brushes are fully sterilized between clients, and that dedicated tools are used just for you (especially for eyes and lips). This isn't a minor detail — it's essential for your skin's health.</p><h2>Ask What Products They Use</h2><p>Trusted international brands last longer and suit a wider range of skin types, unlike cheaper products that can trigger sensitivity or fade throughout the day. Don't hesitate to ask which brands are used before booking.</p><h2>Don't Skip the Trial Session</h2><p>A trial session held with enough time before the wedding gives you the chance to see the final look and adjust any detail beforehand — instead of discovering you don't love the look on the morning of the wedding itself.</p><p>Choosing the right makeup artist is an investment in your peace of mind on the big day, just as much as it is in your look. Take your time researching, and don't hesitate to ask questions — an artist confident in her craft will always be happy to answer them.</p>",
      "journal.art2.tag":"Bridal Makeup","journal.art2.title":"Top Bridal Makeup Tips for a Flawless Wedding Look",
      "journal.art2.excerpt":"From the trial session to the final touches — practical tips to ensure your bridal look lasts from the first photo to the last dance.",
      "journal.art2.body":"<p>Wedding days are long, emotional, and full of movement — which is why bridal makeup needs more careful planning than any other look. Here are the key tips for a look that lasts from getting-ready shots to the very last dance.</p><h2>Book Your Trial With Plenty of Time to Spare</h2><p>Don't leave your trial until the last week. Book it at least a month before the wedding, so you have room to adjust any detail calmly, without time pressure.</p><h2>Choose a Look That Feels Like You</h2><p>The most beautiful bridal makeup enhances your natural features with a more radiant touch — not a completely different look from your everyday self. Talk with your makeup artist about your features and what genuinely suits them.</p><h2>Think About Photography Before Choosing Shades</h2><p>Lighting and camera flash can render certain colors differently than they appear in person. An artist experienced with wedding photography knows how to choose shades that look natural and beautiful both on camera and in real life.</p><h2>Don't Skip Setting Products</h2><p>Ask for a high-quality setting spray, especially for an outdoor wedding or a warm climate. This small step makes a real difference by the time evening festivities roll around.</p><h2>Give Yourself Enough Time on the Day Itself</h2><p>Don't try to squeeze your makeup and hairstyling into a rushed window between other appointments. Give yourself a calm, unhurried session — it shows in the final result and in your mood for the rest of the day.</p><p>The perfect bridal look isn't just about the artist's skill — it's about good planning and clear communication with her. The earlier you start preparing, the closer the result will be to what you've been dreaming of.</p>",
      "journal.art3.tag":"Skincare","journal.art3.title":"How to Prep Your Skin Before Makeup Application",
      "journal.art3.excerpt":"The final result starts days before your session. Here are simple steps to prep your skin for the best possible outcome.",
      "journal.art3.body":"<p>The final makeup result doesn't depend on the artist's skill alone — it starts with the condition of your skin days before the session. Here are simple steps that make a real difference in how your makeup looks and lasts.</p><h2>Moisturize Daily in the Week Before Your Session</h2><p>Dry skin makes makeup look patchy and uneven. Stick to a simple daily moisturizing routine suited to your skin type, morning and night.</p><h2>Avoid Strong Exfoliation or New Treatments Right Before the Event</h2><p>Don't try a new product or an intense exfoliating treatment a day or two before your event. Any unexpected redness or irritation makes makeup application harder and affects the final result.</p><h2>Drink Enough Water</h2><p>Hydrating from within matters just as much as external skincare. Try to increase your water intake in the days leading up to your event — it shows directly in your skin's glow.</p><h2>Get Good Sleep Before the Big Day</h2><p>Lack of sleep shows up as puffiness and dullness that concealer alone can't fully hide. Aim for enough rest in the nights beforehand, especially the night before.</p><h2>Arrive With a Completely Clean Face on the Day</h2><p>Avoid heavy creams or oils right before your session, as they can prevent makeup from setting properly. Wash your face well and arrive with clean skin — your makeup artist will take care of the rest.</p><p>Healthy, hydrated skin is the true foundation of any successful makeup look. Taking care of these simple steps beforehand will show directly in how beautiful — and how long-lasting — your final result is.</p>",
      "journal.art4.tag":"Pro Tips","journal.art4.title":"How to Make Your Makeup Last All Day and Night",
      "journal.art4.excerpt":"From prep to setting products — professional secrets for a look that holds up against heat, humidity, and long hours of celebration.",
      "journal.art4.body":"<p>Long celebrations — from weddings to extended evening events — call for makeup designed to hold up against heat, humidity, and constant movement. Here are the top professional secrets for makeup that truly lasts.</p><h2>Good Skin Prep Is Half the Battle</h2><p>Well-moisturized, properly prepped skin holds makeup far longer than dry or neglected skin. Don't skip your skincare routine in the days leading up to the event.</p><h2>Light Layers Beat One Thick Layer</h2><p>Makeup built from light, successive layers sets better and looks more natural than one thick layer — which tends to break down faster in the heat.</p><h2>Translucent Powder Is Your Best Friend</h2><p>Setting your concealer and natural shine-prone areas (like the sides of your nose and forehead) with a soft translucent powder prevents unwanted shine over long hours.</p><h2>Never Skip the Setting Spray</h2><p>A high-quality setting spray is the final touch that locks everything in place, protecting your makeup against heat, sweat, and tears throughout the event.</p><h2>Carry Quick Touch-Up Essentials</h2><p>Blotting paper and a matching lipstick in your bag let you refresh your look in seconds at any point during the evening, without needing a full makeup redo.</p><p>Long-lasting makeup isn't luck — it's the result of good prep and the right choices from the very start. Following these steps gives you a confident look that lasts from the very first moment to the last photo of the night.</p>",
      "journal.art5.tag":"Avoid This","journal.art5.title":"5 Common Bridal Makeup Mistakes to Avoid",
      "journal.art5.excerpt":"From late trial sessions to choosing the wrong shades — learn the most common mistakes and how to avoid them on your wedding day.",
      "journal.art6.tag":"My Philosophy","journal.art6.title":"My Makeup Philosophy and Signature Style",
      "journal.art6.excerpt":"Every makeup artist has her own signature. Here's my personal philosophy and what makes my approach different in every session.",
      "journal.art6.body":"<p>For me, makeup isn't just about covering the skin or adding color — it's a way to bring out each woman's beauty in her own unique way.</p><h2>I Believe in Enhanced Natural Beauty, Not Hidden Beauty</h2><p>My approach focuses on highlighting your true features with a more radiant, confident touch — not hiding them under heavy layers of makeup. The goal is always for you to look in the mirror and see yourself at your most beautiful, not someone else.</p><h2>Every Face and Skin Has Different Needs</h2><p>There's no such thing as \"one look fits all.\" I listen to you at the start of every session and study your features, skin tone, and needs before choosing the right products and techniques specifically for you.</p><h2>Small Details Make the Biggest Difference</h2><p>From choosing the right contour shade for your face shape to layering products correctly for lasting wear, I pay attention to every detail, no matter how small — because it's the sum of these details that creates an exceptional look.</p><h2>Comfort and Confidence Are Part of the Experience</h2><p>A makeup session should be an enjoyable, relaxed experience, not a source of stress. I always make sure the atmosphere is calm and welcoming, so you leave feeling both beautiful and confident.</p><p>This is the philosophy I bring to every session: makeup that enhances your true beauty, with a professional touch fit for every occasion.</p>",
      "journal.art7.tag":"Before Booking","journal.art7.title":"Why I Always Recommend Reviewing My Portfolio Before Booking",
      "journal.art7.excerpt":"Before you book your appointment, take a few minutes to browse my past work. Here's why this simple step saves you so much down the line.",
      "journal.art7.body":"<p>One of the pieces of advice I repeat most to new clients: don't book before you've browsed through my full portfolio. Here are the real reasons behind that advice.</p><h2>Photos Show My Actual Style, Not Just a Description</h2><p>Words like \"natural makeup\" or \"glam look\" can mean different things to different people. Seeing real work gives you a clear, accurate sense of my specific style, without any mismatch in expectations.</p><h2>It Helps You Know If My Style Matches Your Vision</h2><p>Every client has a different vision for her perfect look. Browsing my portfolio helps you confirm that my approach to color and technique aligns with the aesthetic you're after, before committing to a booking.</p><h2>It Reduces Surprises or Misunderstandings on the Day</h2><p>When you come to your session already knowing exactly what kind of result to expect, the experience is smoother and more comfortable for both of us, and we avoid any gap between expectation and reality.</p><h2>It Opens the Door for Discussion Before Your Session</h2><p>If you love a particular look from my portfolio, you can tell me about it in advance so we can discuss how to adapt it to your features and your specific occasion — instead of trying to explain it in words alone.</p><p>Reviewing the portfolio isn't just an extra step — it's a simple investment in your peace of mind and clarity of expectations, to make sure your makeup experience does justice to your special day.</p>",
      "journal.art8.tag":"Choosing Right","journal.art8.title":"How to Know If My Makeup Style Is the Right Fit for You",
      "journal.art8.excerpt":"Choosing the right makeup artist comes down to how well her style matches your taste. Here are signs that tell you my approach is exactly what you're looking for.",
      "journal.art8.body":"<p>Clients often ask me: \"How do I know if your style is right for me?\" Here are a few signs to help you answer that question for yourself.</p><h2>You Prefer Makeup That Enhances Your Features, Not Changes Them</h2><p>If you're looking for a look that makes you feel like the most beautiful version of yourself — not a completely different person — my approach to enhancing natural beauty with a more radiant touch will suit you perfectly.</p><h2>You Appreciate Attention to Fine Detail</h2><p>If small details — like well-blended contour shades or precise eye definition — matter to you as much as the overall result, you'll notice that same care clearly reflected in my work.</p><h2>You Want Makeup That Lasts Without Constant Touch-Ups</h2><p>Whether it's your wedding day or a long evening event, if your priority is a look that holds up for hours without repeated fixing, that's exactly what I focus on in every session.</p><h2>You Prefer a Calm, Comfortable Experience Above All</h2><p>If you value feeling comfortable and having your needs heard during the session as much as you value the final result, you'll find that balance between professionalism and warmth in my approach.</p><p>The best way to find out for yourself is always this: browse my portfolio, and ask me anything on your mind before booking. I'm always happy to help you make the right decision for you.</p>",
      "journal.art5.body":"<p>With so many details to think about, it's easy for brides to fall into a few common traps that affect the final look. Here are the most frequent ones — and how to avoid them.</p><h2>1. Booking the Trial Session Too Late</h2><p>Booking your trial just one week before the wedding doesn't leave enough time to adjust any detail. Book it at least a month ahead for real peace of mind.</p><h2>2. Choosing a Look That's Completely Different From Your Usual Self</h2><p>Wanting to look \"completely different\" on your wedding day can result in makeup that doesn't actually look like you in photos. The best bridal makeup enhances your natural beauty with extra confidence.</p><h2>3. Neglecting Skin Prep Before the Session</h2><p>Arriving with dry or neglected skin makes the artist's job harder and affects the final result, no matter how skilled she is. Start your skincare routine weeks before the appointment.</p><h2>4. Not Mentioning Skin Sensitivities or Conditions</h2><p>If you have sensitive skin or any skin condition, tell your makeup artist in advance so she can choose suitable products — rather than discovering the issue on the wedding day itself.</p><h2>5. Not Planning for Long-Lasting Wear</h2><p>Wedding days stretch across many hours, from photos to the reception. Make sure your artist uses proper setting products, and ask about touch-up steps in case you need them later in the day.</p><p>Avoiding these simple mistakes starts with early planning and clear communication with your makeup artist. The result: a confident, natural look that lasts from morning until the very last moment of your celebration.</p>",
      "footer.maroof":"Licensed Content Creator — No. 522836",
      "footer.rights":"© <span id=\"yearNow\">2026</span> Amira Khalid Studio. All rights reserved.","footer.credit":"Crafted by DevMenta"
    }
  };

  var htmlKeys = {"pricing.durationRegular":1,"pricing.durationBride":1,"footer.rights":1,"bookingPreview.step1":1,"bookingPreview.step2":1,"bookingPreview.step3":1,"bookingPreview.step4":1,"contact.policyNote":1,
    "journal.art1.body":1,"journal.art2.body":1,"journal.art3.body":1,"journal.art4.body":1,"journal.art5.body":1,
    "journal.art6.body":1,"journal.art7.body":1,"journal.art8.body":1,
    "policy.skinDesc":1,"policy.faqDesc":1};

  var heroTitle = null; // assigned lazily below, since header/content order varies by page

  function splitHeroWords(){
    if(!heroTitle) return;
    heroTitle.classList.remove('words-in');
    var globalIndex = 0;
    Array.from(heroTitle.children).forEach(function(span){
      if(!span.hasAttribute('data-i18n')) return;
      var words = span.textContent.split(' ').filter(function(w){ return w !== ''; });
      span.innerHTML = '';
      words.forEach(function(word){
        var outer = document.createElement('span');
        outer.className = 'word';
        var inner = document.createElement('span');
        inner.className = 'word-inner';
        inner.textContent = word;
        inner.style.transitionDelay = (globalIndex * 60) + 'ms';
        globalIndex++;
        outer.appendChild(inner);
        span.appendChild(outer);
        span.appendChild(document.createTextNode(' '));
      });
    });
    if(reduceMotion){ heroTitle.classList.add('words-in'); return; }
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ heroTitle.classList.add('words-in'); });
    });
  }

  function applyLanguage(lang){
    var dict = translations[lang];
    var app = document.getElementById('app');
    app.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    app.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if(!dict[key]) return;
      if(htmlKeys[key]){ el.innerHTML = dict[key]; }
      else { el.textContent = dict[key]; }
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function(el){
      var key = el.getAttribute('data-i18n-label');
      if(dict[key]) el.label = dict[key];
    });
    var langArBtn = document.getElementById('langArBtn');
    var langEnBtn = document.getElementById('langEnBtn');
    if(langArBtn) langArBtn.classList.toggle('active', lang === 'ar');
    if(langEnBtn) langEnBtn.classList.toggle('active', lang === 'en');
    var yearEl = document.getElementById('yearNow');
    if(yearEl) yearEl.textContent = String(new Date().getFullYear());
    try{ localStorage.setItem('akl_lang', lang); }catch(e){}
    splitHeroWords();
    setDirectWaLinks();
  }

  function initLang(){
    var saved = 'ar';
    try{ saved = localStorage.getItem('akl_lang') || 'ar'; }catch(e){}
    applyLanguage(saved);
    runLangChangeListeners();
  }
  var langArBtnInit = document.getElementById('langArBtn');
  var langEnBtnInit = document.getElementById('langEnBtn');
  function refreshLocationHintLanguage(){
    var svc = document.getElementById('fService');
    if(svc) svc.dispatchEvent(new Event('change'));
  }
  function runLangChangeListeners(){ langChangeListeners.forEach(function(fn){ fn(); }); }
  if(langArBtnInit) langArBtnInit.addEventListener('click', function(){ applyLanguage('ar'); refreshLocationHintLanguage(); runLangChangeListeners(); });
  if(langEnBtnInit) langEnBtnInit.addEventListener('click', function(){ applyLanguage('en'); refreshLocationHintLanguage(); runLangChangeListeners(); });

  /* ---------- DARK / LIGHT THEME TOGGLE ---------- */
  function systemPrefersDark(){
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    try{ localStorage.setItem('akl_theme', theme); }catch(e){}
  }
  function initTheme(){
    var saved = null;
    try{ saved = localStorage.getItem('akl_theme'); }catch(e){}
    applyTheme(saved || (systemPrefersDark() ? 'dark' : 'light'));
  }
  initTheme();
  var themeToggleBtn = document.getElementById('themeToggle');
  if(themeToggleBtn){
    themeToggleBtn.addEventListener('click', function(){
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- HEADER SCROLL + PROGRESS + PARALLAX ---------- */
  var header = document.getElementById('siteHeader');
  var fabTop = document.getElementById('fabTop');
  var progressBar = document.getElementById('scrollProgressBar');
  var heroSection = document.getElementById('home');
  var heroGrid = heroSection ? heroSection.querySelector('.hero-grid') : null;
  var heroFrameEl = document.getElementById('heroFrame');
  var blobEls = document.querySelectorAll('.blob');
  var scrollTicking = false;

  function updateScrollEffects(){
    var y = window.scrollY || document.documentElement.scrollTop;
    if(header) header.classList.toggle('scrolled', y > 40);
    if(fabTop) fabTop.classList.toggle('show', y > 600);

    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? Math.min(100, Math.max(0, (y / docH) * 100)) : 0;
    if(progressBar) progressBar.style.setProperty('--progress', pct + '%');

    if(!reduceMotion){
      if(heroSection){
        var heroH = heroSection.offsetHeight || 1;
        var heroProgress = Math.min(1, Math.max(0, y / heroH));
        if(heroGrid){
          heroGrid.style.transform = 'translateY(' + (heroProgress * 60) + 'px)';
        }
        if(heroFrameEl){
          heroFrameEl.style.transform = 'translateY(' + (heroProgress * -30) + 'px)';
        }
      }
      blobEls.forEach(function(b, i){
        var depth = 0.08 + (i * 0.05);
        b.style.setProperty('--py', (y * depth * -1) + 'px');
      });
    }
    scrollTicking = false;
  }
  function onScroll(){
    if(!scrollTicking){
      requestAnimationFrame(updateScrollEffects);
      scrollTicking = true;
    }
  }
  document.addEventListener('scroll', onScroll, {passive:true});

  /* ---------- MOBILE NAV ---------- */
  var mobileNav = document.getElementById('mobileNav');
  var scrim = document.getElementById('scrim');
  function openNav(){ if(mobileNav) mobileNav.classList.add('open'); if(scrim) scrim.classList.add('open'); }
  function closeNav(){ if(mobileNav) mobileNav.classList.remove('open'); if(scrim) scrim.classList.remove('open'); }
  var openNavBtn = document.getElementById('openMobileNav');
  var closeNavBtn = document.getElementById('closeMobileNav');
  if(openNavBtn) openNavBtn.addEventListener('click', openNav);
  if(closeNavBtn) closeNavBtn.addEventListener('click', closeNav);
  if(scrim) scrim.addEventListener('click', closeNav);
  document.querySelectorAll('.mnav-link').forEach(function(a){ a.addEventListener('click', closeNav); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeNav(); });

  /* ---------- SMOOTH SCROLL FOR IN-PAGE ANCHORS ---------- */
  function scrollToId(id){
    var el = document.getElementById(id);
    if(!el) return;
    var offset = (header ? header.offsetHeight : 0) + 12;
    var y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top:y, behavior: reduceMotion ? 'auto' : 'smooth'});
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      if(!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
    });
  });

  /* ---------- PARTICLES (home hero only) ---------- */
  var particleWrap = document.getElementById('particles');
  if(particleWrap){
    for(var i=0;i<7;i++){
      var p = document.createElement('span');
      p.className = 'particle';
      p.style.top = (Math.floor((i*37)%100)) + '%';
      p.style.left = (Math.floor((i*53)%100)) + '%';
      p.style.animationDelay = (-(i*0.7)) + 's';
      p.style.opacity = String(0.16 + (i%5)*0.05);
      particleWrap.appendChild(p);
    }
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry, idx){
        if(entry.isIntersecting){
          setTimeout(function(){ entry.target.classList.add('in-view'); }, (idx % 4) * 90);
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* ---------- COUNTERS (about only) ---------- */
  var counters = document.querySelectorAll('.stat-num');
  function animateCounter(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var decimal = parseInt(el.getAttribute('data-decimal') || '0', 10);
    var divisor = decimal ? Math.pow(10, decimal) : 1;
    var displayTarget = target / divisor;
    var duration = 1400, startTime = null;
    function step(ts){
      if(startTime === null) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = displayTarget * eased;
      el.textContent = decimal ? val.toFixed(decimal) : Math.round(val).toString();
      if(progress < 1) requestAnimationFrame(step);
    }
    if(reduceMotion){ el.textContent = decimal ? displayTarget.toFixed(decimal) : String(displayTarget); return; }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var counterIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ animateCounter(entry.target); counterIo.unobserve(entry.target); }
      });
    }, {threshold:0.6});
    counters.forEach(function(c){ counterIo.observe(c); });
  }

  /* ---------- PORTFOLIO FILTER (portfolio page only) ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var filter = btn.getAttribute('data-filter');
      if(filter === 'ba'){
        var baSection = document.getElementById('beforeAfterSection');
        if(baSection) baSection.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'});
        return;
      }
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      portfolioItems.forEach(function(item){
        var match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------- BEFORE/AFTER SLIDER ---------- */
  document.querySelectorAll('.ba-slider').forEach(function(slider){
    var range = slider.querySelector('.ba-slider-range');
    var before = slider.querySelector('.ba-img-before');
    var line = slider.querySelector('.ba-slider-line');
    var grip = slider.querySelector('.ba-slider-grip');
    if(!range || !before) return;
    function update(){
      var val = Number(range.value);
      before.style.clipPath = 'inset(0 ' + (100 - val) + '% 0 0)';
      if(line) line.style.left = val + '%';
      if(grip) grip.style.left = val + '%';
    }
    range.addEventListener('input', update);
    update();
  });

  /* ---------- PORTFOLIO / PRICING -> BOOKING (cross-page) ---------- */
  function goToBooking(serviceValue){
    var url = 'contact' + (serviceValue ? ('?service=' + encodeURIComponent(serviceValue)) : '');
    window.location.href = url;
  }
  portfolioItems.forEach(function(item){
    item.addEventListener('click', function(){ goToBooking(item.getAttribute('data-service')); });
  });
  document.querySelectorAll('.book-btn').forEach(function(btn){
    btn.addEventListener('click', function(e){ e.preventDefault(); goToBooking(btn.getAttribute('data-service')); });
  });

  /* ---------- TESTIMONIAL SLIDER (home only) ---------- */
  var testiPrevBtn = document.getElementById('testiPrev');
  var testiNextBtn = document.getElementById('testiNext');
  if(testiPrevBtn && testiNextBtn){
    var slides = document.querySelectorAll('.testi-slide');
    var dots = document.querySelectorAll('.testi-dot');
    var current = 0, testiTimer;
    var showSlide = function(idx){
      current = (idx + slides.length) % slides.length;
      slides.forEach(function(s,i){ s.classList.toggle('active', i === current); });
      dots.forEach(function(d,i){ d.classList.toggle('active', i === current); });
    };
    var nextSlide = function(){ showSlide(current+1); };
    var startAuto = function(){ testiTimer = setInterval(nextSlide, 5000); };
    var stopAuto = function(){ clearInterval(testiTimer); };
    testiPrevBtn.addEventListener('click', function(){ showSlide(current-1); stopAuto(); startAuto(); });
    testiNextBtn.addEventListener('click', function(){ showSlide(current+1); stopAuto(); startAuto(); });
    dots.forEach(function(d,i){ d.addEventListener('click', function(){ showSlide(i); stopAuto(); startAuto(); }); });
    var testiWrap = document.querySelector('.testi-wrap');
    if(testiWrap){
      testiWrap.addEventListener('mouseenter', stopAuto);
      testiWrap.addEventListener('mouseleave', startAuto);
    }
    if(!reduceMotion) startAuto();
  }

  /* ---------- HOME JOURNAL CAROUSEL (drag + auto-scroll) ---------- */
  var journalTrack = document.getElementById('homeJournalTrack');
  if(journalTrack){
    var jCards = Array.prototype.slice.call(journalTrack.querySelectorAll('.journal-card'));
    var jIdx = 0, jAutoTimer, jResumeTimer, jIsDown = false, jStartX = 0, jScrollStart = 0, jDragDist = 0;

    function jClosestIndex(){
      var trackRect = journalTrack.getBoundingClientRect();
      var best = 0, bestDist = Infinity;
      jCards.forEach(function(c, i){
        var dist = Math.abs(c.getBoundingClientRect().left - trackRect.left);
        if(dist < bestDist){ bestDist = dist; best = i; }
      });
      return best;
    }
    function jGoTo(i){
      jIdx = (i + jCards.length) % jCards.length;
      jCards[jIdx].scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', inline:'start', block:'nearest'});
    }
    function jNext(){ jIdx = jClosestIndex(); jGoTo(jIdx + 1); }
    function jStartAuto(){ jStopAuto(); jAutoTimer = setInterval(jNext, 4200); }
    function jStopAuto(){ clearInterval(jAutoTimer); }
    function jPauseAndResume(){ jStopAuto(); clearTimeout(jResumeTimer); jResumeTimer = setTimeout(jStartAuto, 5000); }

    function jDetectScrollSign(){
      if(getComputedStyle(journalTrack).direction !== 'rtl') return 1;
      var original = journalTrack.scrollLeft;
      journalTrack.scrollLeft = 999999;
      var maxPositive = journalTrack.scrollLeft;
      journalTrack.scrollLeft = original;
      return maxPositive > 0 ? 1 : -1;
    }
    var jScrollSign = jDetectScrollSign();

    journalTrack.addEventListener('mousedown', function(e){
      jIsDown = true; jDragDist = 0;
      journalTrack.classList.add('dragging');
      jScrollSign = jDetectScrollSign();
      jStartX = e.pageX; jScrollStart = journalTrack.scrollLeft;
      jStopAuto(); clearTimeout(jResumeTimer);
    });
    window.addEventListener('mousemove', function(e){
      if(!jIsDown) return;
      e.preventDefault();
      var dx = e.pageX - jStartX;
      jDragDist = Math.abs(dx);
      journalTrack.scrollLeft = jScrollStart - (jScrollSign * dx);
    });
    window.addEventListener('mouseup', function(){
      if(!jIsDown) return;
      jIsDown = false;
      journalTrack.classList.remove('dragging');
      jResumeTimer = setTimeout(jStartAuto, 5000);
    });
    jCards.forEach(function(card){
      card.addEventListener('click', function(e){ if(jDragDist > 6) e.preventDefault(); });
    });
    journalTrack.addEventListener('touchstart', jPauseAndResume, {passive:true});
    journalTrack.addEventListener('wheel', jPauseAndResume, {passive:true});
    journalTrack.addEventListener('mouseenter', jStopAuto);
    journalTrack.addEventListener('mouseleave', function(){ if(!jIsDown) jStartAuto(); });

    if(!reduceMotion) jStartAuto();
  }

  /* ---------- WHATSAPP LINKS ---------- */
  function waLink(number, text){
    return 'https://wa.me/' + number + (text ? ('?text=' + encodeURIComponent(text)) : '');
  }
  function currentLang(){ var app = document.getElementById('app'); return (app && app.getAttribute('lang')) || 'ar'; }

  var directGreeting = {
    ar: 'مرحبًا أميرة، أرغب أعرف أكثر عن خدماتكِ ✨',
    en: "Hello Amira, I'd like to know more about your services ✨"
  };
  function setDirectWaLinks(){
    var lang = currentLang();
    var href = waLink(WHATSAPP_NUMBER, directGreeting[lang] || directGreeting.ar);
    ['waDirectBtn','fabWaBtn','footerWaBtn','darkCtaWaBtn'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.setAttribute('href', href);
    });
  }

  /* ---------- BOOKING FORM SUBMIT (contact only) ---------- */
  var form = document.getElementById('bookingForm');
  if(form){
    var resultPanel = document.getElementById('resultPanel');
    var waConfirmLink = document.getElementById('waConfirmLink');
    var serviceSelect = document.getElementById('fService');

    var serviceLabelKey = {
      'makeup':'svc.makeup','makeup-blowdry':'svc.makeupBlowdry','makeup-hair':'svc.makeupHair',
      'bridal-package':'svc.bridal','private-training':'svc.training'
    };
    var eventTypeLabelKey = {
      wedding:'event.wedding', engagement:'event.engagement', party:'event.party',
      graduation:'event.graduation', other:'event.other'
    };

    /* preselect service from ?service= query param (arriving from portfolio/pricing pages) */
    try{
      var requestedService = new URLSearchParams(window.location.search).get('service');
      if(requestedService && serviceSelect){
        var optionExists = Array.from(serviceSelect.options).some(function(o){ return o.value === requestedService; });
        if(optionExists){
          serviceSelect.value = requestedService;
          var field = serviceSelect.closest('.field');
          if(field){ field.classList.add('pulse'); setTimeout(function(){ field.classList.remove('pulse'); }, 1200); }
        }
      }
    }catch(e){}

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var dateFieldInput = document.getElementById('fDate');
      var dateTriggerBtn = document.getElementById('dateTrigger');
      if(dateFieldInput && !dateFieldInput.value){
        if(dateTriggerBtn){
          dateTriggerBtn.classList.add('invalid-date');
          dateTriggerBtn.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'center'});
        }
        return;
      }
      if(dateTriggerBtn) dateTriggerBtn.classList.remove('invalid-date');
      if(!form.reportValidity()) return;

      var lang = currentLang();
      var dict = translations[lang];
      var data = new FormData(form);
      var service = data.get('service');
      var serviceText = dict[serviceLabelKey[service]] || service;
      var eventType = data.get('eventType');
      var eventTypeText = dict[eventTypeLabelKey[eventType]] || eventType;

      var lines = lang === 'ar' ? [
        'مرحبًا أميرة، أرغب في حجز موعد ✨',
        'الاسم: ' + data.get('name'),
        'الجوال: ' + data.get('phone'),
        'الخدمة: ' + serviceText,
        eventType ? ('نوع المناسبة: ' + eventTypeText) : null,
        'التاريخ: ' + data.get('date'),
        'وقت الجاهزية: ' + data.get('time'),
        data.get('notes') ? ('ملاحظات: ' + data.get('notes')) : null
      ] : [
        "Hello Amira, I'd like to book an appointment ✨",
        'Name: ' + data.get('name'),
        'Phone: ' + data.get('phone'),
        'Service: ' + serviceText,
        eventType ? ('Event Type: ' + eventTypeText) : null,
        'Date: ' + data.get('date'),
        'Ready-by time: ' + data.get('time'),
        data.get('notes') ? ('Notes: ' + data.get('notes')) : null
      ];
      var message = lines.filter(Boolean).join('\n');
      var href = waLink(WHATSAPP_NUMBER, message);
      if(waConfirmLink) waConfirmLink.setAttribute('href', href);
      if(resultPanel){
        resultPanel.classList.add('show');
        resultPanel.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'nearest'});
      }
      try{ window.open(href, '_blank', 'noopener'); }catch(err){}
    });

    /* ---------- CALENDAR DATE PICKER ---------- */
    var dateInput = document.getElementById('fDate');
    var dateTrigger = document.getElementById('dateTrigger');
    var dateDisplayText = document.getElementById('dateDisplayText');
    var calendarPopup = document.getElementById('calendarPopup');
    if(dateInput && dateTrigger && calendarPopup){
      var calMonthLabel = document.getElementById('calMonthLabel');
      var calWeekdays = document.getElementById('calWeekdays');
      var calGrid = document.getElementById('calGrid');
      var calPrev = document.getElementById('calPrev');
      var calNext = document.getElementById('calNext');

      var today = new Date();
      today.setHours(0,0,0,0);
      var view = new Date(today.getFullYear(), today.getMonth(), 1);
      var selectedDate = null;

      function isoOf(d){
        return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
      }
      function locale(){ return currentLang() === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US'; }

      function renderWeekdays(){
        calWeekdays.innerHTML = '';
        var base = new Date(2024,0,7); /* a Sunday */
        for(var i=0;i<7;i++){
          var d = new Date(base); d.setDate(base.getDate()+i);
          var span = document.createElement('span');
          span.textContent = d.toLocaleDateString(locale(), {weekday:'narrow'});
          calWeekdays.appendChild(span);
        }
      }

      function renderCalendar(){
        calMonthLabel.textContent = view.toLocaleDateString(locale(), {month:'long', year:'numeric'});
        renderWeekdays();
        calGrid.innerHTML = '';
        var firstDay = new Date(view.getFullYear(), view.getMonth(), 1);
        var startOffset = firstDay.getDay();
        var daysInMonth = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();

        for(var i=0;i<startOffset;i++){
          var empty = document.createElement('span');
          empty.className = 'cal-day cal-empty';
          calGrid.appendChild(empty);
        }
        for(var day=1; day<=daysInMonth; day++){
          var d = new Date(view.getFullYear(), view.getMonth(), day);
          var iso = isoOf(d);
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'cal-day';
          btn.textContent = String(day);
          var isPast = d < today;
          var isBlocked = BLOCKED_DATES.indexOf(iso) !== -1;
          if(isPast){ btn.disabled = true; }
          else if(isBlocked){ btn.disabled = true; btn.classList.add('cal-blocked'); }
          else{
            btn.addEventListener('click', (function(iso, d){
              return function(){
                selectedDate = iso;
                dateInput.value = iso;
                dateDisplayText.textContent = d.toLocaleDateString(locale(), {day:'numeric', month:'long', year:'numeric'});
                dateTrigger.classList.add('has-value');
                dateTrigger.classList.remove('invalid-date');
                calendarPopup.classList.remove('open');
                dateTrigger.classList.remove('open');
              };
            })(iso, d));
          }
          if(selectedDate === iso) btn.classList.add('selected');
          calGrid.appendChild(btn);
        }
        calPrev.disabled = (view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth());
      }

      dateTrigger.addEventListener('click', function(e){
        e.stopPropagation();
        var willOpen = !calendarPopup.classList.contains('open');
        calendarPopup.classList.toggle('open', willOpen);
        dateTrigger.classList.toggle('open', willOpen);
        if(willOpen) renderCalendar();
      });
      calPrev.addEventListener('click', function(){
        view.setMonth(view.getMonth()-1);
        renderCalendar();
      });
      calNext.addEventListener('click', function(){
        view.setMonth(view.getMonth()+1);
        renderCalendar();
      });
      document.addEventListener('click', function(e){
        if(!calendarPopup.contains(e.target) && e.target !== dateTrigger && !dateTrigger.contains(e.target)){
          calendarPopup.classList.remove('open');
          dateTrigger.classList.remove('open');
        }
      });
      renderCalendar();
    }
  }

  /* ---------- SCROLL TO TOP ---------- */
  if(fabTop){
    fabTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior: reduceMotion ? 'auto' : 'smooth'});
    });
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  var pointerFine = window.matchMedia('(pointer:fine)').matches;
  if(pointerFine && !reduceMotion){
    document.querySelectorAll('.btn-primary, .fab-wa').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var rect = el.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width/2;
        var relY = e.clientY - rect.top - rect.height/2;
        el.style.transform = 'translate(' + (relX*0.28) + 'px,' + (relY*0.28 - 2) + 'px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform = ''; });
    });
  }

  /* ---------- TILT CARDS ---------- */
  if(pointerFine && !reduceMotion){
    document.querySelectorAll('.price-card, .portfolio-item').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var rx = (py - 0.5) * -10;
        var ry = (px - 0.5) * 10;
        card.classList.add('tilting');
        card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function(){
        card.classList.remove('tilting');
        card.style.transform = '';
      });
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  if(pointerFine && window.innerWidth > 960 && !reduceMotion){
    var cursorDot = document.getElementById('cursorDot');
    var cursorRing = document.getElementById('cursorRing');
    if(cursorDot && cursorRing){
      document.body.classList.add('cursor-enabled');
      var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, cursorSeen = false;
      document.addEventListener('mousemove', function(e){
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%,-50%)';
        if(!cursorSeen){ cursorSeen = true; document.body.classList.add('cursor-ready'); }
      });
      (function raf(){
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
        requestAnimationFrame(raf);
      })();
      document.querySelectorAll('.btn, .price-card, .portfolio-item, input, select, textarea, .icon-btn, .filter-btn, .testi-arrow, .lang-toggle button').forEach(function(el){
        el.addEventListener('mouseenter', function(){ document.body.classList.add('cursor-hover'); });
        el.addEventListener('mouseleave', function(){ document.body.classList.remove('cursor-hover'); });
      });
    }
  }

  /* ---------- VIDEO REELS ---------- */
  document.querySelectorAll('.reel-item, .portfolio-video').forEach(function(item){
    var video = item.querySelector('video');
    var playBtn = item.querySelector('.reel-play');
    if(!video || !playBtn) return;
    playBtn.addEventListener('click', function(e){
      e.stopPropagation();
      video.play();
      item.classList.add('playing');
    });
    video.addEventListener('click', function(e){
      e.stopPropagation();
      if(!video.paused){ video.pause(); item.classList.remove('playing'); }
    });
    video.addEventListener('ended', function(){ item.classList.remove('playing'); });
    video.addEventListener('pause', function(){ item.classList.remove('playing'); });
  });

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-question').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      if(!item) return;
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
      if(!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- ADVANCED BOOKING WIZARD (preview-booking-v2 only) ---------- */
  var advCalGrid = document.getElementById('advCalGrid');
  if(advCalGrid){
    var advToday = new Date(); advToday.setHours(0,0,0,0);
    var advView = new Date(advToday.getFullYear(), advToday.getMonth(), 1);
    var advSelectedDate = null;
    var advCalMonthLabel = document.getElementById('advCalMonthLabel');
    var advCalWeekdays = document.getElementById('advCalWeekdays');
    var advCalPrev = document.getElementById('advCalPrev');
    var advCalNext = document.getElementById('advCalNext');
    var wizardOverlay = document.getElementById('wizardOverlay');

    function escHtml(s){
      return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
    }
    function advIsoOf(d){
      return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    }
    function advLocale(){ return currentLang() === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US'; }

    function advRenderWeekdays(){
      advCalWeekdays.innerHTML = '';
      var base = new Date(2024,0,7);
      for(var i=0;i<7;i++){
        var d = new Date(base); d.setDate(base.getDate()+i);
        var span = document.createElement('span');
        span.textContent = d.toLocaleDateString(advLocale(), {weekday:'narrow'});
        advCalWeekdays.appendChild(span);
      }
    }

    function advRenderCalendar(){
      advCalMonthLabel.textContent = advView.toLocaleDateString(advLocale(), {month:'long', year:'numeric'});
      advRenderWeekdays();
      advCalGrid.innerHTML = '';
      var firstDay = new Date(advView.getFullYear(), advView.getMonth(), 1);
      var startOffset = firstDay.getDay();
      var daysInMonth = new Date(advView.getFullYear(), advView.getMonth()+1, 0).getDate();
      for(var i=0;i<startOffset;i++){
        var empty = document.createElement('span');
        empty.className = 'cal-day cal-empty';
        advCalGrid.appendChild(empty);
      }
      for(var day=1; day<=daysInMonth; day++){
        var d = new Date(advView.getFullYear(), advView.getMonth(), day);
        var iso = advIsoOf(d);
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cal-day';
        btn.textContent = String(day);
        var isPast = d < advToday;
        var isBlocked = BLOCKED_DATES.indexOf(iso) !== -1;
        if(isPast){ btn.disabled = true; }
        else if(isBlocked){ btn.disabled = true; btn.classList.add('cal-blocked'); }
        else{
          btn.addEventListener('click', (function(iso){
            return function(){ advSelectedDate = iso; openWizard(); };
          })(iso));
        }
        if(advSelectedDate === iso) btn.classList.add('selected');
        advCalGrid.appendChild(btn);
      }
      advCalPrev.disabled = (advView.getFullYear() === advToday.getFullYear() && advView.getMonth() === advToday.getMonth());
    }
    advCalPrev.addEventListener('click', function(){ advView.setMonth(advView.getMonth()-1); advRenderCalendar(); });
    advCalNext.addEventListener('click', function(){ advView.setMonth(advView.getMonth()+1); advRenderCalendar(); });
    advRenderCalendar();
    onLangChange(advRenderCalendar);

    var SERVICE_PRICES = {
      'makeup':350,'makeup-blowdry':550,'makeup-hair':650,'bridal-package':2500,'private-training':null
    };
    var SERVICE_LABEL_KEYS = {
      'makeup':'svc.makeup','makeup-blowdry':'svc.makeupBlowdry','makeup-hair':'svc.makeupHair',
      'bridal-package':'svc.bridal','private-training':'svc.training'
    };
    var EVENT_TYPE_LABEL_KEYS = {
      wedding:'event.wedding', engagement:'event.engagement', party:'event.party',
      graduation:'event.graduation', other:'event.other'
    };
    function dict(){ return translations[currentLang()]; }
    function serviceLabel(service){ return dict()[SERVICE_LABEL_KEYS[service]] || service; }
    function eventTypeLabel(eventType){ return dict()[EVENT_TYPE_LABEL_KEYS[eventType]] || eventType; }

    var wizardSteps = document.querySelectorAll('.wizard-step');
    var wizardDots = document.querySelectorAll('.wizard-step-dot');

    function renderWizardSummary(){
      var service = document.getElementById('advService').value;
      var price = SERVICE_PRICES[service];
      var priceText = price != null ? (price + ' ' + dict()['common.sar']) : dict()['bookingV2.priceOnRequest'];
      var name = document.getElementById('advName').value || '—';
      var phone = document.getElementById('advPhone').value || '—';
      var time = document.getElementById('advTime').value || '—';
      var eventType = document.getElementById('advEventType').value;
      document.getElementById('wizardSummary').innerHTML =
        '<div class="wizard-summary-row"><span>' + dict()['bookingV2.labelName'] + '</span><strong>' + escHtml(name) + '</strong></div>' +
        '<div class="wizard-summary-row"><span>' + dict()['bookingV2.labelPhone'] + '</span><strong>' + escHtml(phone) + '</strong></div>' +
        '<div class="wizard-summary-row"><span>' + dict()['bookingV2.labelService'] + '</span><strong>' + escHtml(serviceLabel(service)) + '</strong></div>' +
        '<div class="wizard-summary-row"><span>' + dict()['bookingV2.labelEventType'] + '</span><strong>' + escHtml(eventTypeLabel(eventType)) + '</strong></div>' +
        '<div class="wizard-summary-row"><span>' + dict()['bookingV2.labelDate'] + '</span><strong>' + escHtml(advSelectedDate||'—') + '</strong></div>' +
        '<div class="wizard-summary-row"><span>' + dict()['bookingV2.labelTime'] + '</span><strong>' + escHtml(time) + '</strong></div>' +
        '<div class="wizard-summary-row wizard-summary-price"><span>' + dict()['bookingV2.labelPrice'] + '</span><strong>' + priceText + '</strong></div>';
    }

    function showWizardStep(n){
      n = String(n);
      wizardSteps.forEach(function(s){ s.style.display = (s.getAttribute('data-step') === n) ? '' : 'none'; });
      wizardDots.forEach(function(d){ d.classList.toggle('active', d.getAttribute('data-step') === n); });
      if(n === '2') renderWizardSummary();
    }
    function showChoiceBlock(){
      var service = document.getElementById('advService').value;
      var choosePayBtn = document.getElementById('choosePayBtn');
      if(choosePayBtn) choosePayBtn.style.display = (SERVICE_PRICES[service] != null) ? '' : 'none';
      document.getElementById('wizardChoiceBlock').style.display = '';
      document.getElementById('wizardPaymentBlock').style.display = 'none';
      document.getElementById('wizardQuoteBlock').style.display = 'none';
      document.getElementById('wizardSuccess').style.display = 'none';
    }
    function openWizard(){
      showWizardStep(1);
      showChoiceBlock();
      wizardOverlay.classList.add('open');
    }
    function closeWizard(){ wizardOverlay.classList.remove('open'); }
    document.getElementById('wizardClose').addEventListener('click', closeWizard);
    wizardOverlay.addEventListener('click', function(e){ if(e.target === wizardOverlay) closeWizard(); });
    document.querySelectorAll('[data-goto]').forEach(function(btn){
      btn.addEventListener('click', function(){ showWizardStep(btn.getAttribute('data-goto')); });
    });
    function submitBookingToSheet(data){
      if(!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.indexOf('REPLACE_WITH') === 0) return;
      try{
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST', mode: 'no-cors',
          headers: {'Content-Type': 'text/plain;charset=utf-8'},
          body: JSON.stringify(data)
        });
      }catch(e){}
    }

    function collectBookingData(){
      var service = document.getElementById('advService').value;
      var price = SERVICE_PRICES[service];
      return {
        name: document.getElementById('advName').value,
        phone: document.getElementById('advPhone').value,
        service: serviceLabel(service),
        eventType: eventTypeLabel(document.getElementById('advEventType').value),
        date: advSelectedDate,
        time: document.getElementById('advTime').value,
        priceText: price != null ? (price + ' ' + dict()['common.sar']) : dict()['bookingV2.priceOnRequest'],
        notes: ''
      };
    }
    function buildWaLines(data, paymentStatus, bold){
      var b = bold ? function(s){ return '*' + s + '*'; } : function(s){ return s; };
      return [
        'مرحبًا أميرة، لدي حجز جديد ✨',
        '',
        b(dict()['bookingV2.labelName'] + ':') + ' ' + data.name,
        b(dict()['bookingV2.labelPhone'] + ':') + ' ' + data.phone,
        b(dict()['bookingV2.labelService'] + ':') + ' ' + data.service,
        b(dict()['bookingV2.labelEventType'] + ':') + ' ' + data.eventType,
        b(dict()['bookingV2.labelDate'] + ':') + ' ' + data.date,
        b(dict()['bookingV2.labelTime'] + ':') + ' ' + (data.time || '—'),
        b(dict()['bookingV2.labelPrice'] + ':') + ' ' + data.priceText,
        '',
        paymentStatus === 'paid' ? '✅ ' + b('تم الدفع أونلاين') : '💬 ' + b('بانتظار التأكيد')
      ].filter(function(l){ return l !== null; }).join('\n');
    }
    function renderWaPreview(){
      var data = collectBookingData();
      document.getElementById('wizardWaPreview').innerHTML = buildWaLines(data, 'quote-requested', false)
        .split('\n').map(function(line){
          if(!line) return '<br>';
          var parts = line.split(':');
          return parts.length > 1 ? ('<div><b>' + escHtml(parts[0]) + ':</b>' + escHtml(parts.slice(1).join(':')) + '</div>') : ('<div>' + escHtml(line) + '</div>');
        }).join('');
    }
    function handleBookingComplete(paymentStatus){
      var data = collectBookingData();
      data.paymentStatus = paymentStatus;
      submitBookingToSheet(data);
      document.getElementById('wizardChoiceBlock').style.display = 'none';
      document.getElementById('wizardPaymentBlock').style.display = 'none';
      document.getElementById('wizardQuoteBlock').style.display = 'none';
      document.getElementById('wizardSuccess').style.display = '';
      var message = buildWaLines(data, paymentStatus, true);
      var href = waLink(WHATSAPP_NUMBER, message);
      setTimeout(function(){ try{ window.open(href, '_blank', 'noopener'); }catch(e){} }, 800);
    }

    function initMoyasarForm(priceSar){
      var container = document.getElementById('moyasarForm');
      container.innerHTML = '';
      if(typeof Moyasar === 'undefined'){
        container.innerHTML = '<p class="wizard-note">تعذر تحميل نموذج الدفع (Moyasar). تأكدي من الاتصال بالإنترنت، أو أن مفتاح Moyasar لم يُضَف بعد.</p>';
        return;
      }
      Moyasar.init({
        element: '.mysr-form',
        amount: Math.round(priceSar * 100),
        currency: 'SAR',
        description: 'حجز - استوديو أميرة خالد',
        publishable_api_key: MOYASAR_PUBLISHABLE_KEY,
        callback_url: window.location.href,
        methods: ['creditcard', 'applepay'],
        apple_pay: {
          country: 'SA',
          label: 'Amira Khalid Studio',
          validate_merchant_url: 'https://api.moyasar.com/v1/applepay/initiate'
        },
        on_completed: function(){ handleBookingComplete('paid'); }
      });
    }

    var wizardConfirmBtn = document.getElementById('wizardConfirmBtn');
    if(wizardConfirmBtn) wizardConfirmBtn.addEventListener('click', function(){
      showWizardStep(3);
      showChoiceBlock();
    });
    var choosePayBtn = document.getElementById('choosePayBtn');
    if(choosePayBtn) choosePayBtn.addEventListener('click', function(){
      var service = document.getElementById('advService').value;
      var price = SERVICE_PRICES[service];
      document.getElementById('wizardChoiceBlock').style.display = 'none';
      document.getElementById('wizardPaymentBlock').style.display = '';
      initMoyasarForm(price);
    });
    var chooseWaBtn = document.getElementById('chooseWaBtn');
    if(chooseWaBtn) chooseWaBtn.addEventListener('click', function(){
      document.getElementById('wizardChoiceBlock').style.display = 'none';
      document.getElementById('wizardQuoteBlock').style.display = '';
      renderWaPreview();
    });
    var backToChoiceFromPay = document.getElementById('backToChoiceFromPay');
    if(backToChoiceFromPay) backToChoiceFromPay.addEventListener('click', showChoiceBlock);
    var backToChoiceFromWa = document.getElementById('backToChoiceFromWa');
    if(backToChoiceFromWa) backToChoiceFromWa.addEventListener('click', showChoiceBlock);
    var wizardWaBtn = document.getElementById('wizardWaBtn');
    if(wizardWaBtn) wizardWaBtn.addEventListener('click', function(){ handleBookingComplete('quote-requested'); });
  }

  /* ---------- INIT ---------- */
  heroTitle = document.getElementById('heroTitle');
  initLang();
  onScroll();
})();
