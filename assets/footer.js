(function(){
  "use strict";

  var footerHtml =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<div class="brand">' +
              '<span class="brand-mark"><img src="assets/images/logo-mark-bw.png" alt="Amira Khalid"></span>' +
              '<span class="brand-text"><span class="brand-name" data-i18n="brand.name">أميرة خالد</span><span class="brand-tag" data-i18n="brand.tag">Makeup Studio · Jeddah</span></span>' +
            '</div>' +
            '<p data-i18n="footer.tagline">إبراز جمالكِ الطبيعي بلمسة فنية احترافية، في كل مناسبة تستحق التميز.</p>' +
            '<div class="footer-social">' +
              '<a class="icon-btn" href="https://www.instagram.com/amira_khalid89" target="_blank" rel="noopener" aria-label="Instagram"><svg class="icon" style="width:18px;height:18px"><use href="#i-instagram"/></svg></a>' +
              '<a class="icon-btn" href="https://www.tiktok.com/@amira_khalid89" target="_blank" rel="noopener" aria-label="TikTok"><svg class="icon" style="width:18px;height:18px"><use href="#i-tiktok"/></svg></a>' +
              '<a class="icon-btn" href="#" id="footerWaBtn" target="_blank" rel="noopener" aria-label="WhatsApp"><svg class="icon icon-solid" style="width:18px;height:18px"><use href="#i-whatsapp"/></svg></a>' +
            '</div>' +
            '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-block-start:var(--space-4)">' +
              '<a class="maroof-badge" style="margin-block-start:0" href="https://elaam.gmedia.gov.sa/gcam-licenses/gcam-celebrity-check/522836" target="_blank" rel="noopener" id="maroofBadge"><svg class="icon" style="width:16px;height:16px"><use href="#i-badge-check"/></svg><span data-i18n="footer.maroof">ترخيص إعلامي معتمد — 522836</span></a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.quickLinks">روابط سريعة</h4>' +
            '<ul>' +
              '<li><a href="index" data-i18n="nav.home">الرئيسية</a></li>' +
              '<li><a href="about" data-i18n="nav.about">من أنا</a></li>' +
              '<li><a href="portfolio" data-i18n="nav.portfolio">أعمالي</a></li>' +
              '<li><a href="pricing" data-i18n="nav.pricing">الأسعار</a></li>' +
              '<li><a href="contact" data-i18n="nav.contact">تواصل</a></li>' +
              '<li><a href="journal" data-i18n="nav.journal">مدونة الجمال</a></li>' +
              '<li><a href="booking-policy" data-i18n="nav.bookingPolicy">سياسة الحجز</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.services">الخدمات</h4>' +
            '<ul>' +
              '<li><span data-i18n="svc.makeup">مكياج احترافي</span></li>' +
              '<li><span data-i18n="svc.makeupHair">مكياج + تسريحة شعر</span></li>' +
              '<li><span data-i18n="svc.bridal">باقة العروس</span></li>' +
              '<li><span data-i18n="svc.training">جلسة تدريب فردية</span></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.getInTouch">تواصلي معنا</h4>' +
            '<ul>' +
              '<li><span data-i18n="contact.infoLocation2">جدة، المملكة العربية السعودية</span></li>' +
              '<li><span data-i18n="contact.infoHours">يوميًا: 10 صباحًا – 10 مساءً *</span></li>' +
              '<li><a href="contact" data-i18n="nav.bookNow">احجزي الآن</a></li>' +
            '</ul>' +
            '<p class="footer-areas" data-i18n="footer.areasServed" style="font-size:.8rem; color:var(--text-muted); margin-block-start:10px;">نغطي معظم أحياء جدة: الشاطئ، الروضة، النعيم، السلامة، الحمراء، الأندلس وغيرها.</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span data-i18n="footer.rights">© <span id="yearNow">2026</span> استوديو أميرة خالد. جميع الحقوق محفوظة.</span>' +
          '<span class="credit" data-i18n="footer.credit">صُمم بواسطة DevMenta</span>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    '<div class="fab">' +
      '<button class="fab-top" id="fabTop" aria-label="Scroll to top"><svg class="icon" style="width:18px;height:18px"><use href="#i-arrow-up"/></svg></button>' +
      '<a class="fab-wa" href="#" id="fabWaBtn" target="_blank" rel="noopener" aria-label="WhatsApp"><svg class="icon icon-solid"><use href="#i-whatsapp"/></svg></a>' +
    '</div>' +
    '<button class="fab-theme" id="themeToggle" aria-label="Toggle dark/light mode">' +
      '<svg class="icon icon-sun" style="width:18px;height:18px"><use href="#i-sun"/></svg>' +
      '<svg class="icon icon-moon" style="width:18px;height:18px"><use href="#i-moon"/></svg>' +
    '</button>';

  document.write(footerHtml);
})();
