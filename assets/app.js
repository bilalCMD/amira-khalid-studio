(function(){
  "use strict";

  /* ---------- CONFIG ---------- */
  var WHATSAPP_NUMBER = "966530005384";
  // Dates Amira is fully booked / unavailable — add more "YYYY-MM-DD" strings as needed.
  var BLOCKED_DATES = [];

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
      "ba.eyebrow":"قبل وبعد","ba.title":"شاهدي الفرق","ba.sub":"تحوّلات حقيقية من جلسات مكياج فعلية","ba.before":"قبل","ba.after":"بعد","ba.comingSoon":"الصور قريبًا",
      "home.reelsEyebrow":"فيديوهات","home.reelsTitle":"لقطات حية من الاستوديو","home.reelsSub":"شاهدي جلسات مكياج حقيقية ونصائح سريعة","home.reelsMore":"شاهدي المزيد من الريلز",
      "portfolio.instaFollow":"تابعي أحدث الريلز على إنستغرام",
      "reel1.caption":"لوك يومي ناعم","reel2.caption":"أسهل طريقة لرفع الخد","reel3.caption":"لحظات من كواليس التصوير",
      "reel4.caption":"لوك مكياج متكامل","reel5.caption":"أجمل اللقطات تكون عفوية","reel6.caption":"سر رفع الخدود بالبلاشر",
      "reel7.caption":"مكياج ناعم وأنيق","reel8.caption":"لمسات مكياج احترافية","reel9.caption":"تفاصيل تصنع الفرق",
      "reel10.caption":"بدون فلاتر... النتيجة الحقيقية","reel11.caption":"خبيرة تجميل في جدة","reel12.caption":"لوك سهرة فاخر",
      "about.journeyEyebrow":"رحلتي","about.journeyTitle":"كيف بدأت القصة",
      "journey.step1Title":"البداية","journey.step1Desc":"بدأت أميرة شغفها بالمكياج من سن مبكر، وطورت مهاراتها عبر دورات احترافية معتمدة.",
      "journey.step2Title":"الاحتراف","journey.step2Desc":"أكثر من 5 سنوات من الخبرة في مكياج العرائس والمناسبات الخاصة داخل جدة وخارجها.",
      "journey.step3Title":"الثقة","journey.step3Desc":"أكثر من 500 عروس وعميلة وثقن بأميرة لإبراز جمالهن في أهم لحظاتهن.",
      "journey.step4Title":"اليوم","journey.step4Desc":"استوديو أميرة خالد اليوم وجهة موثوقة لكل عروس تبحث عن إطلالة استثنائية في جدة.",
      "pricing.faqEyebrow":"الأسئلة الشائعة","pricing.faqTitle":"عندكِ سؤال؟",
      "faq.q1":"هل يشمل السعر تجربة مسبقة للعروس؟","faq.a1":"نعم، باقة العروس تشمل جلسة تجربة قبل يوم الزفاف للتأكد من اللوك المثالي لكِ.",
      "faq.q2":"كم المدة اللازمة لتأكيد الحجز؟","faq.a2":"ننصح بالحجز قبل أسبوعين على الأقل للمناسبات العادية، وقبل شهر على الأقل لباقة العروس لضمان توفر الموعد.",
      "faq.q3":"هل يمكن إلغاء أو تعديل الموعد؟","faq.a3":"يمكنكِ تعديل أو إلغاء الموعد قبل 48 ساعة على الأقل من الموعد المحدد بدون أي رسوم.",
      "faq.q4":"هل هناك رسوم إضافية للخدمة خارج الاستوديو؟","faq.a4":"الأسعار المعلنة للخدمة الخاصة تشمل التنقل داخل جدة. للمواقع خارج جدة قد تُضاف رسوم تنقل تُحدد عند التواصل.",
      "faq.q5":"ما هي طريقة الدفع؟","faq.a5":"الدفع نقدًا أو تحويل بنكي مباشر في يوم الموعد، ونؤكد كافة التفاصيل مسبقًا عبر واتساب.",
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
      "about.stat1":"سنوات خبرة","about.stat2":"عروس وعميلة","about.stat3":"% تعقيم الأدوات","about.stat4":"تقييم العميلات ★",
      "portfolio.filterAll":"الكل","portfolio.filterBridal":"عرايس","portfolio.filterEvening":"سهرة","portfolio.filterMakeup":"مكياج","portfolio.filterHair":"تسريحات",
      "portfolio.note":"* صور حقيقية من أعمال أميرة — سيتم إضافة المزيد بعد إطلاق الحساب الرسمي للموقع",
      "pf.item1.title":"إطلالة عروس بالطرحة","pf.item2.title":"مكياج عروس ناعم","pf.item3.title":"سهرة درامية بالمخمل","pf.item4.title":"مكياج سهرة أنيق",
      "pf.item5.title":"تسريحة كيرلي فاخرة","pf.item6.title":"مكياج نهاري طبيعي","pf.item7.title":"تحضير بشرة احترافي",
      "pf.item8.title":"لمسة روج نهائية","pf.item9.title":"لوك عروس بالتول","pf.item10.title":"تاج لؤلؤي للعروس","pf.item11.title":"سهرة بعيون دخانية","pf.item12.title":"لوك جانبي أنيق","pf.item13.title":"عروس بباقة الورد",
      "testi.eyebrow":"آراء العميلات","testi.title":"ماذا قالت عميلاتنا",
      "testi.q1":"“مكياجي يوم زفافي كان أحلى من الحلم، أميرة فهمت اللوك اللي أبيه بالضبط من أول جلسة”","testi.n1":"سارة","testi.r1":"عروس",
      "testi.q2":"“سشوار وكيرلي ثابت طول السهرة، والاحترافية من أول لحظة. أنصح فيها بشدة”","testi.n2":"نورة","testi.r2":"عميلة سهرة",
      "testi.q3":"“خدمة راقية ونظافة تامة في الأدوات، حسيت بالراحة والاهتمام من أول دقيقة”","testi.n3":"لمى","testi.r3":"عروس",
      "testi.a1":"س","testi.a2":"ن","testi.a3":"ل",
      "pricing.groupStudio":"في الاستوديو","pricing.groupPrivate":"خدمة خاصة — للعروس في موقعها","pricing.featured":"الأكثر طلبًا","pricing.bookBtn":"احجزي الآن",
      "pricing.privateNote":"* الخدمة الخاصة متاحة للعرائس فقط، في الموقع الذي تحددنه العميلة",
      "pricing.onRequest":"السعر عند التواصل","pricing.nailsNote":"* خدمة الأظافر متاحة بطلب مسبق فقط — يُرجى التواصل قبل الموعد بوقت كافٍ",
      "pricing.durationRegular":"<strong>35–45</strong> دقيقة — حسب نوع البشرة","pricing.durationBride":"<strong>60–75</strong> دقيقة — جلسة العروس",
      "trust.brands":"منتجات عالمية احترافية","trust.sterile":"تعقيم كامل للأدوات","trust.single":"أدوات فردية لكل عميلة",
      "trust.brandsDesc":"نستخدم فقط ماركات مكياج عالمية معتمدة تدوم طويلًا وتناسب جميع أنواع البشرة",
      "trust.sterileDesc":"جميع الأدوات تُعقّم بالكامل قبل كل جلسة وفق أعلى معايير النظافة",
      "trust.singleDesc":"فرش وأدوات مخصصة لكل عميلة وحدها، لراحتكِ وأمانكِ الكامل",
      "about.trustEyebrow":"لماذا تثقين بأميرة","about.trustTitle":"معايير لا نتنازل عنها",
      "svc.makeup":"مكياج احترافي","svc.makeup.desc":"تحضير بشرة ومكياج أنيق يدوم طوال اليوم","svc.makeupOpt":"مكياج احترافي — 350 ريال",
      "svc.makeupHair":"مكياج + تسريحة شعر كاملة","svc.makeupHair.desc":"مكياج مع تسريحة مصممة حسب إطلالتكِ","svc.makeupHairOpt":"مكياج + تسريحة شعر كاملة — 650 ريال",
      "svc.bridalMakeup":"مكياج عروس","svc.bridalMakeup.desc":"مكياج العروس فقط، في الاستوديو أو في موقعكِ حسب توفر الموعد","svc.bridalMakeupOpt":"مكياج عروس — السعر عند التواصل",
      "svc.bridal":"باقة العروس","svc.bridal.desc":"مكياج + رموش + هايلايتر للجسم + تسريحة شعر","svc.bridalOpt":"باقة العروس — 2500 ريال",
      "svc.hairExt":"وصلات شعر","svc.hairExt.desc":"إضافة كثافة وطول لإطلالة أكثر فخامة","svc.hairExtOpt":"وصلات شعر — 100 ريال",
      "svc.nails":"خدمة الأظافر","svc.nails.desc":"عناية وتجميل أظافر، بطلب مسبق فقط","svc.nailsOpt":"خدمة الأظافر — بطلب مسبق",
      "svc.privateBasic":"مكياج + رموش + هايلايتر","svc.privateBasic.desc":"خدمة خاصة في مكان راحتكِ يوم الزفاف","svc.privateBasicOpt":"مكياج + رموش + هايلايتر — 2100 ريال",
      "svc.privateFull":"مكياج + رموش + هايلايتر + تسريحة شعر","svc.privateFull.desc":"الباقة الكاملة، في موقعكِ الخاص","svc.privateFullOpt":"مكياج + رموش + هايلايتر + تسريحة — 3000 ريال",
      "common.sar":"ريال",
      "contact.formName":"الاسم الكامل","contact.formPhone":"رقم الجوال","contact.formService":"الخدمة","contact.formDate":"التاريخ","contact.formTime":"وقت الجاهزية",
      "contact.formLocation":"المكان","contact.locStudio":"في الاستوديو (جدة)","contact.locHome":"في موقعي","contact.formAddress":"تفاصيل الموقع / العنوان",
      "contact.formNotes":"ملاحظات إضافية (اختياري)","contact.submitBtn":"تأكيد الحجز عبر واتساب","contact.privateHint":"تنبيه: الخدمة في موقعكِ الخاص متاحة للعرائس فقط",
      "contact.lockedHintStudio":"هذه الخدمة متاحة في الاستوديو فقط","contact.lockedHintHome":"هذه الخدمة متاحة في موقعكِ فقط",
      "contact.dateBlocked":"هذا التاريخ محجوز بالكامل، يرجى اختيار تاريخ آخر",
      "contact.selectDate":"اختاري التاريخ",
      "calendar.available":"متاح","calendar.fullyBooked":"محجوز بالكامل",
      "contact.serviceOptGroupStudio":"في الاستوديو","contact.serviceOptGroupPrivate":"خدمة خاصة",
      "contact.successMsg":"تم تجهيز طلبكِ! اضغطي لإتمام الإرسال عبر واتساب",
      "contact.trustBadge":"موثوقة — استوديو أميرة خالد","contact.infoLocationTitle":"الموقع","contact.infoLocation":"حي الريان، جدة — عرض على خرائط جوجل",
      "contact.infoLocation2":"حي الريان، جدة، المملكة العربية السعودية",
      "contact.infoHoursTitle":"ساعات العمل","contact.infoHours":"الأحد–الأربعاء: 11:00 ص – 10:00 م، الخميس–السبت: 9:00 ص – 11:00 م","contact.infoInstagramTitle":"إنستغرام","contact.infoTiktokTitle":"تيك توك",
      "contact.infoEmailTitle":"البريد الإلكتروني",
      "contact.infoWhatsapp":"تواصلي مباشرة عبر واتساب",
      "footer.tagline":"إبراز جمالكِ الطبيعي بلمسة فنية احترافية، في كل مناسبة تستحق التميز.","footer.quickLinks":"روابط سريعة","footer.services":"الخدمات","footer.getInTouch":"تواصلي معنا",
      "footer.maroof":"موثّقة عبر معروف",
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
      "ba.eyebrow":"Before & After","ba.title":"See the Difference","ba.sub":"Real transformations from actual makeup sessions","ba.before":"Before","ba.after":"After","ba.comingSoon":"Photos coming soon",
      "home.reelsEyebrow":"Videos","home.reelsTitle":"Live Clips From the Studio","home.reelsSub":"Watch real makeup sessions and quick tips","home.reelsMore":"Watch More Reels",
      "portfolio.instaFollow":"Follow the latest reels on Instagram",
      "reel1.caption":"Soft Everyday Look","reel2.caption":"Easiest Way to Lift the Cheek","reel3.caption":"Behind the Scenes",
      "reel4.caption":"Complete Makeup Look","reel5.caption":"The Best Shots Are Candid","reel6.caption":"The Secret to Lifted Cheeks",
      "reel7.caption":"Soft & Elegant Makeup","reel8.caption":"Professional Makeup Touches","reel9.caption":"Details That Make the Difference",
      "reel10.caption":"No Filters — the Real Result","reel11.caption":"Beauty Expert in Jeddah","reel12.caption":"Glamorous Evening Look",
      "about.journeyEyebrow":"My Journey","about.journeyTitle":"How the Story Began",
      "journey.step1Title":"The Beginning","journey.step1Desc":"Amira's passion for makeup began early, developing her skills through certified professional courses.",
      "journey.step2Title":"Going Professional","journey.step2Desc":"5+ years of experience in bridal and special-occasion makeup across Jeddah and beyond.",
      "journey.step3Title":"Earning Trust","journey.step3Desc":"500+ brides and clients have trusted Amira to bring out their beauty on their most important days.",
      "journey.step4Title":"Today","journey.step4Desc":"Amira Khalid Studio is now a trusted destination for every bride seeking an exceptional look in Jeddah.",
      "pricing.faqEyebrow":"FAQ","pricing.faqTitle":"Got a Question?",
      "faq.q1":"Does the price include a bridal trial session?","faq.a1":"Yes, the Bridal Package includes a trial session before the wedding day to make sure your look is perfect.",
      "faq.q2":"How much advance notice do you need?","faq.a2":"We recommend booking at least 2 weeks ahead for regular occasions, and at least a month ahead for the Bridal Package to guarantee availability.",
      "faq.q3":"Can I cancel or reschedule my appointment?","faq.a3":"You can reschedule or cancel free of charge up to 48 hours before your appointment.",
      "faq.q4":"Is there an extra fee for service outside the studio?","faq.a4":"Listed private-service prices include travel within Jeddah. Locations outside Jeddah may involve an additional travel fee, confirmed when you reach out.",
      "faq.q5":"What payment methods do you accept?","faq.a5":"Cash or direct bank transfer on the day of the appointment — we confirm all details in advance via WhatsApp.",
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
      "about.stat1":"Years of Experience","about.stat2":"Brides & Clients","about.stat3":"% Tool Sterilization","about.stat4":"Client Rating ★",
      "portfolio.filterAll":"All","portfolio.filterBridal":"Bridal","portfolio.filterEvening":"Evening","portfolio.filterMakeup":"Makeup","portfolio.filterHair":"Hairstyling",
      "portfolio.note":"* Real photos from Amira's work — more will be added once the site's official account is live",
      "pf.item1.title":"Veiled Bridal Look","pf.item2.title":"Soft Bridal Makeup","pf.item3.title":"Dramatic Velvet Evening","pf.item4.title":"Elegant Evening Makeup",
      "pf.item5.title":"Luxe Curls Hairstyle","pf.item6.title":"Natural Day Makeup","pf.item7.title":"Professional Skin Prep",
      "pf.item8.title":"Finishing Lip Touch","pf.item9.title":"Tulle Bridal Look","pf.item10.title":"Pearl Bridal Crown","pf.item11.title":"Smoky Eye Evening","pf.item12.title":"Elegant Profile Look","pf.item13.title":"Bride with Bouquet",
      "testi.eyebrow":"Testimonials","testi.title":"What Our Clients Say",
      "testi.q1":"“My wedding day makeup was better than I dreamed — Amira understood exactly the look I wanted from the very first session.”","testi.n1":"Sarah","testi.r1":"Bride",
      "testi.q2":"“Blow-dry and curls stayed perfect all night, and so professional from the first minute. Highly recommend.”","testi.n2":"Noura","testi.r2":"Evening Client",
      "testi.q3":"“Elegant service and spotless tools — I felt cared for from the very first minute.”","testi.n3":"Lama","testi.r3":"Bride",
      "testi.a1":"S","testi.a2":"N","testi.a3":"L",
      "pricing.groupStudio":"At the Studio","pricing.groupPrivate":"Private Service — Bride's Location","pricing.featured":"Most Popular","pricing.bookBtn":"Book Now",
      "pricing.privateNote":"* Private service is for brides only, at the location of the client's choice",
      "pricing.onRequest":"Price on request","pricing.nailsNote":"* Nail service is available by advance request only — please reach out well ahead of your appointment",
      "pricing.durationRegular":"<strong>35–45</strong> min — depending on skin type","pricing.durationBride":"<strong>60–75</strong> min — bride session",
      "trust.brands":"Professional international brands","trust.sterile":"Full tool sterilization","trust.single":"Single-use tools per client",
      "trust.brandsDesc":"We use only trusted international makeup brands that last all day and suit every skin type",
      "trust.sterileDesc":"Every tool is fully sterilized before each session, following the highest hygiene standards",
      "trust.singleDesc":"Brushes and tools dedicated to you alone, for your complete comfort and safety",
      "about.trustEyebrow":"Why Trust Amira","about.trustTitle":"Standards We Never Compromise On",
      "svc.makeup":"Professional Makeup","svc.makeup.desc":"Skin prep & elegant makeup that lasts all day","svc.makeupOpt":"Professional Makeup — SAR 350",
      "svc.makeupHair":"Makeup + Complete Hairstyle","svc.makeupHair.desc":"Makeup with a hairstyle designed for your look","svc.makeupHairOpt":"Makeup + Complete Hairstyle — SAR 650",
      "svc.bridalMakeup":"Bridal Makeup","svc.bridalMakeup.desc":"Makeup only for the bride, at the studio or your location depending on availability","svc.bridalMakeupOpt":"Bridal Makeup — price on request",
      "svc.bridal":"Bridal Package","svc.bridal.desc":"Makeup + Lashes + Body Highlighter + Hair Styling","svc.bridalOpt":"Bridal Package — SAR 2500",
      "svc.hairExt":"Hair Extensions","svc.hairExt.desc":"Add volume and length for a more glamorous look","svc.hairExtOpt":"Hair Extensions — SAR 100",
      "svc.nails":"Nail Service","svc.nails.desc":"Nail care & polish, by advance request only","svc.nailsOpt":"Nail Service — by advance request",
      "svc.privateBasic":"Makeup + Lashes + Highlighter","svc.privateBasic.desc":"Private service at your location on your wedding day","svc.privateBasicOpt":"Makeup + Lashes + Highlighter — SAR 2100",
      "svc.privateFull":"Makeup + Lashes + Highlighter + Hairstyle","svc.privateFull.desc":"The complete package, at your own location","svc.privateFullOpt":"Makeup + Lashes + Highlighter + Hairstyle — SAR 3000",
      "common.sar":"SAR",
      "contact.formName":"Full Name","contact.formPhone":"Phone Number","contact.formService":"Service","contact.formDate":"Date","contact.formTime":"Ready-by Time",
      "contact.formLocation":"Location","contact.locStudio":"At the Studio (Jeddah)","contact.locHome":"At My Location","contact.formAddress":"Location Details / Address",
      "contact.formNotes":"Additional Notes (optional)","contact.submitBtn":"Confirm Booking via WhatsApp","contact.privateHint":"Note: private location service is for brides only",
      "contact.lockedHintStudio":"This service is available at the studio only","contact.lockedHintHome":"This service is available at your location only",
      "contact.dateBlocked":"This date is fully booked — please choose another date",
      "contact.selectDate":"Select a date",
      "calendar.available":"Available","calendar.fullyBooked":"Fully Booked",
      "contact.serviceOptGroupStudio":"At the Studio","contact.serviceOptGroupPrivate":"Private Service",
      "contact.successMsg":"Your request is ready! Click to complete sending via WhatsApp",
      "contact.trustBadge":"Trusted — Amira Khalid Studio","contact.infoLocationTitle":"Location","contact.infoLocation":"Al Rayyan District, Jeddah — View on Google Maps",
      "contact.infoLocation2":"Al Rayyan District, Jeddah, Saudi Arabia",
      "contact.infoHoursTitle":"Working Hours","contact.infoHours":"Sun–Wed: 11:00 AM – 10:00 PM, Thu–Sat: 9:00 AM – 11:00 PM","contact.infoInstagramTitle":"Instagram","contact.infoTiktokTitle":"TikTok",
      "contact.infoEmailTitle":"Email",
      "contact.infoWhatsapp":"Chat with us on WhatsApp",
      "footer.tagline":"Enhancing your natural beauty with a professional artistic touch, for every occasion that deserves the best.","footer.quickLinks":"Quick Links","footer.services":"Services","footer.getInTouch":"Get in Touch",
      "footer.maroof":"Verified via Maroof",
      "footer.rights":"© <span id=\"yearNow\">2026</span> Amira Khalid Studio. All rights reserved.","footer.credit":"Crafted by DevMenta"
    }
  };

  var htmlKeys = {"pricing.durationRegular":1,"pricing.durationBride":1,"footer.rights":1};

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
  }
  var langArBtnInit = document.getElementById('langArBtn');
  var langEnBtnInit = document.getElementById('langEnBtn');
  if(langArBtnInit) langArBtnInit.addEventListener('click', function(){ applyLanguage('ar'); });
  if(langEnBtnInit) langEnBtnInit.addEventListener('click', function(){ applyLanguage('en'); });

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
          heroGrid.style.opacity = String(Math.max(0, 1 - heroProgress * 1.1));
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
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(function(item){
        var match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('hide', !match);
      });
    });
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

  /* ---------- LOCATION TOGGLE (contact only) ---------- */
  var addrField = document.getElementById('addrField');
  var addrTextarea = document.getElementById('fAddress');
  var privateHint = document.getElementById('privateHint');
  document.querySelectorAll('input[name="location"]').forEach(function(radio){
    radio.addEventListener('change', function(){
      if(radio.checked && addrField && addrTextarea && privateHint){
        addrField.classList.toggle('show', radio.value === 'home');
        addrTextarea.required = radio.value === 'home';
        privateHint.classList.toggle('show', radio.value === 'home');
      }
    });
  });

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
      'makeup':'svc.makeup','makeup-hair':'svc.makeupHair','bridal-makeup':'svc.bridalMakeup',
      'bridal-package':'svc.bridal','hair-extensions':'svc.hairExt','nails':'svc.nails',
      'private-basic':'svc.privateBasic','private-full':'svc.privateFull'
    };

    /* ---------- STUDIO-ONLY / HOME-ONLY / FLEXIBLE LOCATION RULES ---------- */
    var studioOnlyServices = ['makeup','makeup-hair','hair-extensions','nails'];
    var homeOnlyServices = ['private-basic','private-full'];
    var locToggle = document.getElementById('locToggle');
    var lockedHint = document.getElementById('lockedHint');
    var studioRadio = document.querySelector('input[name="location"][value="studio"]');
    var homeRadio = document.querySelector('input[name="location"][value="home"]');
    function updateLocationOptions(){
      if(!serviceSelect || !locToggle) return;
      var service = serviceSelect.value;
      var dict = translations[currentLang()];
      var studioLabel = locToggle.querySelector('.loc-option-studio');
      var homeLabel = locToggle.querySelector('.loc-option-home');
      if(studioOnlyServices.indexOf(service) !== -1){
        homeLabel.style.display = 'none';
        studioLabel.style.display = '';
        studioRadio.checked = true;
        lockedHint.textContent = dict['contact.lockedHintStudio'];
        lockedHint.classList.add('show');
        privateHint.classList.remove('show');
        addrField.classList.remove('show');
        addrTextarea.required = false;
      } else if(homeOnlyServices.indexOf(service) !== -1){
        studioLabel.style.display = 'none';
        homeLabel.style.display = '';
        homeRadio.checked = true;
        lockedHint.textContent = dict['contact.lockedHintHome'];
        lockedHint.classList.add('show');
        addrField.classList.add('show');
        addrTextarea.required = true;
        privateHint.classList.remove('show');
      } else {
        studioLabel.style.display = '';
        homeLabel.style.display = '';
        lockedHint.classList.remove('show');
        var checkedRadio = document.querySelector('input[name="location"]:checked');
        if(checkedRadio && checkedRadio.value === 'home'){
          addrField.classList.add('show');
          addrTextarea.required = true;
          privateHint.classList.add('show');
        }
      }
    }
    if(serviceSelect){ serviceSelect.addEventListener('change', updateLocationOptions); }

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
    updateLocationOptions();

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
      var location = data.get('location');
      var serviceText = dict[serviceLabelKey[service]] || service;
      var locationText = location === 'home' ? dict['contact.locHome'] : dict['contact.locStudio'];

      var lines = lang === 'ar' ? [
        'مرحبًا أميرة، أرغب في حجز موعد ✨',
        'الاسم: ' + data.get('name'),
        'الجوال: ' + data.get('phone'),
        'الخدمة: ' + serviceText,
        'التاريخ: ' + data.get('date'),
        'وقت الجاهزية: ' + data.get('time'),
        'المكان: ' + locationText,
        data.get('address') ? ('العنوان: ' + data.get('address')) : null,
        data.get('notes') ? ('ملاحظات: ' + data.get('notes')) : null
      ] : [
        "Hello Amira, I'd like to book an appointment ✨",
        'Name: ' + data.get('name'),
        'Phone: ' + data.get('phone'),
        'Service: ' + serviceText,
        'Date: ' + data.get('date'),
        'Ready-by time: ' + data.get('time'),
        'Location: ' + locationText,
        data.get('address') ? ('Address: ' + data.get('address')) : null,
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

  /* ---------- INIT ---------- */
  heroTitle = document.getElementById('heroTitle');
  initLang();
  onScroll();
})();
