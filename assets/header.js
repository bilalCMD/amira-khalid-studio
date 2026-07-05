(function(){
  "use strict";
  var page = window.CURRENT_PAGE || 'home';

  var iconSprite = '<svg style="display:none">' +
    '<symbol id="i-crown" viewBox="0 0 24 24"><path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8z" stroke-linejoin="round" stroke-linecap="round"/><path d="M5 19h14" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke-linejoin="round"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-comb" viewBox="0 0 24 24"><path d="M4 4h16v4H4z" stroke-linejoin="round"/><path d="M6 8v12M10 8v12M14 8v12M18 8v12" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.6-9.3-9C1 7.3 3 4 6.3 4 8.4 4 10.4 5.3 12 7c1.6-1.7 3.6-3 5.7-3C21 4 23 7.3 21.3 11 19 15.4 12 20 12 20z" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M12.001 2C6.478 2 2 6.478 2 12.001c0 1.887.525 3.65 1.436 5.153L2 22l4.964-1.393a9.958 9.958 0 004.984 1.324h.004c5.523 0 10.001-4.478 10.001-10.001C22.001 6.478 17.524 2 12.001 2zm0 18.26h-.003a8.28 8.28 0 01-4.223-1.158l-.303-.18-3.069.86.82-2.988-.198-.307a8.263 8.263 0 01-1.267-4.446c0-4.567 3.716-8.28 8.246-8.28 2.202 0 4.271.858 5.829 2.417a8.187 8.187 0 012.418 5.845c0 4.567-3.716 8.28-8.25 8.28z"/><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></symbol>' +
    '<symbol id="i-tiktok" viewBox="0 0 24 24"><path d="M14 3v10.5a2.7 2.7 0 11-2-2.6" stroke-linecap="round"/><path d="M14 3c.4 2.6 2.2 4.4 5 4.6" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.3 7-11.5A7 7 0 105 9.5C5 14.7 12 21 12 21z" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.4"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-chevron" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4l14 8-14 8V4z" stroke-linejoin="round" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-monogram" viewBox="0 0 100 100"><text x="50" y="65" font-size="46" text-anchor="middle" font-family="Georgia, serif" fill="currentColor">أخ</text></symbol>' +
    '</svg>';

  var navItems = [
    {key:'home', href:'index.html', i18n:'nav.home', text:'الرئيسية'},
    {key:'about', href:'about.html', i18n:'nav.about', text:'من أنا'},
    {key:'portfolio', href:'portfolio.html', i18n:'nav.portfolio', text:'أعمالي'},
    {key:'pricing', href:'pricing.html', i18n:'nav.pricing', text:'الأسعار'},
    {key:'contact', href:'contact.html', i18n:'nav.contact', text:'تواصل'}
  ];

  function navLinks(cls){
    return navItems.map(function(item){
      var current = item.key === page ? ' current' : '';
      var extra = cls ? ' ' + cls : '';
      return '<li><a href="' + item.href + '" class="' + (cls || '') + current + '" data-i18n="' + item.i18n + '">' + item.text + '</a></li>';
    }).join('');
  }

  var headerHtml =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container">' +
        '<a href="index.html" class="brand">' +
          '<span class="brand-mark"><img src="assets/images/logo-mark.png" alt="Amira Khalid"></span>' +
          '<span class="brand-text">' +
            '<span class="brand-name" data-i18n="brand.name">أميرة خالد</span>' +
            '<span class="brand-tag" data-i18n="brand.tag">Makeup Studio · Jeddah</span>' +
          '</span>' +
        '</a>' +
        '<nav class="main-nav"><ul>' + navLinks('') + '</ul></nav>' +
        '<div class="header-actions">' +
          '<div class="lang-toggle" role="group" aria-label="Language">' +
            '<button type="button" data-lang="ar" id="langArBtn">AR</button>' +
            '<button type="button" data-lang="en" id="langEnBtn">EN</button>' +
          '</div>' +
          '<a href="contact.html" class="btn btn-primary btn-sm" data-i18n="nav.bookNow">احجزي الآن</a>' +
          '<button class="hamburger" id="openMobileNav" aria-label="Menu"><svg class="icon"><use href="#i-menu"/></svg></button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div class="scrim" id="scrim"></div>' +
    '<aside class="mobile-nav" id="mobileNav">' +
      '<div class="mobile-nav-top">' +
        '<span class="brand-mark"><img src="assets/images/logo-mark.png" alt="Amira Khalid"></span>' +
        '<button class="icon-btn" id="closeMobileNav" aria-label="Close"><svg class="icon" style="width:18px;height:18px"><use href="#i-close"/></svg></button>' +
      '</div>' +
      '<ul>' + navLinks('mnav-link') + '</ul>' +
      '<div class="mobile-nav-bottom">' +
        '<a href="contact.html" class="btn btn-primary btn-block mnav-link" data-i18n="nav.bookNow">احجزي الآن</a>' +
        '<div class="mobile-social">' +
          '<a class="icon-btn" href="https://www.instagram.com/amira_khalid89" target="_blank" rel="noopener" aria-label="Instagram"><svg class="icon" style="width:18px;height:18px"><use href="#i-instagram"/></svg></a>' +
          '<a class="icon-btn" href="https://www.tiktok.com/@amira_khalid89" target="_blank" rel="noopener" aria-label="TikTok"><svg class="icon" style="width:18px;height:18px"><use href="#i-tiktok"/></svg></a>' +
        '</div>' +
      '</div>' +
    '</aside>';

  document.write(
    '<div class="scroll-progress"><div class="scroll-progress-bar" id="scrollProgressBar"></div></div>' +
    '<div class="cursor-ring" id="cursorRing"></div>' +
    '<div class="cursor-dot" id="cursorDot"></div>' +
    iconSprite +
    headerHtml
  );
})();
