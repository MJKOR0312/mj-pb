document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const refreshBtn = document.getElementById('refresh-btn');
  const body = document.body;
  const dateElement = document.getElementById('today-date');
  const countrySelector = document.getElementById('country-selector');
  
  const lunchHeader = document.getElementById('lunch-header');
  const lunchCard = document.getElementById('lunch-card');
  const dinnerHeader = document.getElementById('dinner-header');
  const dinnerCard = document.getElementById('dinner-card');
  const infoHeader = document.getElementById('info-header');
  const statsCard = document.getElementById('stats-card');

  // Basic Configuration Data (Headers & Stats)
  const countryConfig = {
    kr: {
      name: "South Korea",
      lang: "ko",
      headers: { lunch: "☀️ 점심 메뉴 추천", dinner: "🌙 저녁 메뉴 추천", info: "📊 결정 피로도 & 문화", btn: "🔄 클릭해서 메뉴변경" },
      stats: "'결정 피로의 본고장'. 압도적인 배달 앱(배민, 쿠팡이츠) 인프라와 24시간 외식 문화가 결합해 매 끼니가 선택의 연속임."
    },
    us: {
      name: "USA",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "'Paradox of Choice'. High stress due to endless customization options on apps like DoorDash."
    },
    uk: {
      name: "UK",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Ranking #1 for most stressful daily decision: 'What to eat?'. High mobile dependency."
    },
    cn: {
      name: "China",
      lang: "zh-CN",
      headers: { lunch: "☀️ 午餐推荐", dinner: "🌙 晚餐推荐", info: "📊 决策疲劳与文化", btn: "🔄 换个菜单" },
      stats: "'超级应用的统治'. 虽然美团(Meituan)解决了所有饮食问题，但选择过多导致认知过载."
    },
    au: {
      name: "Australia",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "66% of households feel fatigue daily. Struggle between health and taste with high mobile usage."
    },
    ph: {
      name: "Philippines",
      lang: "tl",
      headers: { lunch: "☀️ Rekomendasyon sa Tanghalian", dinner: "🌙 Rekomendasyon sa Hapunan", info: "📊 Pagod sa Pagpapasya", btn: "🔄 Iba Pang Menu" },
      stats: "Highest screen time globally. Social media food culture creates conflict between 'craving' and 'trending'."
    },
    br: {
      name: "Brazil",
      lang: "pt",
      headers: { lunch: "☀️ Almoço Recomendado", dinner: "🌙 Jantar Recomendado", info: "📊 Fadiga de Decisão", btn: "🔄 Outro Menu" },
      stats: "Largest delivery market in LatAm (iFood). Long mobile usage leads to endless scrolling for menus."
    },
    tw: {
      name: "Taiwan",
      lang: "zh-TW",
      headers: { lunch: "☀️ 午餐推薦", dinner: "🌙 晚餐推薦", info: "📊 決策疲勞與文化", btn: "🔄 換個菜單" },
      stats: "High reliance on convenience stores and dining out. Overwhelmed by mobile search for dense restaurant options."
    },
    jp: {
      name: "Japan",
      lang: "ja",
      headers: { lunch: "☀️ ラン치のおすすめ", dinner: "🌙 ディナーのおすすめ", info: "📊 決定疲労と文化", btn: "🔄 別のメニュー" },
      stats: "Traditional 'indecisiveness' mixed with sophisticated review apps (Tabelog) deepens the dilemma."
    },
    in: {
      name: "India",
      lang: "hi",
      headers: { lunch: "☀️ दोपहर के भोजन का सुझाव", dinner: "🌙 रात के खाने का सुझाव", info: "📊 निर्णय थकान", btn: "🔄 दूसरा मेनू" },
      stats: "Explosion of Zomato/Swiggy usage. Digital dilemma amidst countless spices and side dish combinations."
    },
    ca: {
      name: "Canada",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Similar delivery culture to USA. Cold weather leads to longer app browsing times instead of going out."
    },
    th: {
      name: "Thailand",
      lang: "th",
      headers: { lunch: "☀️ แนะนำมื้อกลางวัน", dinner: "🌙 แนะนำมื้อเย็น", info: "📊 ความเหนื่อยล้าในการตัดสินใจ", btn: "🔄 เมนูอื่น" },
      stats: "Grab delivery culture. Variety of street food moving to digital platforms creates too many choices."
    },
    sg: {
      name: "Singapore",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Too many hawker centers in a small area. 'Foodie' culture leads to time spent finding the best value/taste."
    },
    ae: {
      name: "UAE",
      lang: "ar",
      headers: { lunch: "☀️ توصية الغداء", dinner: "🌙 توصية العشاء", info: "📊 إرهاق القرار والثقافة", btn: "🔄 قائمة أخرى" },
      stats: "High smartphone penetration + mix of global cuisines. Ability to order anything makes choosing harder."
    },
    de: {
      name: "Germany",
      lang: "de",
      headers: { lunch: "☀️ Mittagessen Empfehlung", dinner: "🌙 Abendessen Empfehlung", info: "📊 Entscheidungsmüdigkeit", btn: "🔄 Anderes Menü" },
      stats: "Surging delivery trend. Efficiency valued, but increasing variety causes fatigue among the youth."
    }
  };

  // Helper: Parse menu string "Name|Description"
  const parseMenu = (menuStr) => {
    const [name, desc] = menuStr.split('|');
    // Use Bing Image Search Thumbnail for high relevance
    // This fetches a search result thumbnail matching the menu name
    const encodedName = encodeURIComponent(name);
    // w=400, h=400 forces a square thumbnail, c=7 extracts the main subject
    const imageUrl = `https://tse2.mm.bing.net/th?q=${encodedName} food&w=400&h=400&c=7&rs=1&p=0`;
    return { name, desc, imageUrl };
  };

  // Helper: Get Random Item from Array (Generic)
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Helper: Get distinct random items for lunch and dinner from the large list
  const getRandomMenuPair = (countryCode) => {
    const rawList = window.MENU_DATA[countryCode] || [];
    
    // Fallback if data is missing
    if (rawList.length === 0) {
      return {
        lunch: { name: "N/A", desc: "No menu data available.", imageUrl: "https://placehold.co/600x400?text=No+Data" },
        dinner: { name: "N/A", desc: "No menu data available.", imageUrl: "https://placehold.co/600x400?text=No+Data" }
      };
    }

    // Pick two distinct random indices
    let idx1 = Math.floor(Math.random() * rawList.length);
    let idx2 = Math.floor(Math.random() * rawList.length);
    
    // Ensure they are different if possible
    while (idx1 === idx2 && rawList.length > 1) {
      idx2 = Math.floor(Math.random() * rawList.length);
    }

    return {
      lunch: parseMenu(rawList[idx1]),
      dinner: parseMenu(rawList[idx2])
    };
  };


  // Populate Selector
  Object.keys(countryConfig).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = countryConfig[key].name;
    countrySelector.appendChild(option);
  });

  // Display Today's Date
  const updateDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateElement.textContent = today.toLocaleDateString(undefined, options);
  };
  updateDate();

  let currentCountry = 'kr';

  // Function to Update Content
  const updateContent = (countryCode) => {
    currentCountry = countryCode;
    const config = countryConfig[countryCode];
    
    // Update Headers
    lunchHeader.textContent = config.headers.lunch;
    dinnerHeader.textContent = config.headers.dinner;
    infoHeader.textContent = config.headers.info;
    refreshBtn.textContent = config.headers.btn;

    // Get Random Menus from the Massive Data File
    const { lunch, dinner } = getRandomMenuPair(countryCode);

    // Update Content
    lunchCard.innerHTML = `
      <img src="${lunch.imageUrl}" alt="${lunch.name}" class="menu-image">
      <h3>${lunch.name}</h3>
      <p>${lunch.desc}</p>
    `;
    dinnerCard.innerHTML = `
      <img src="${dinner.imageUrl}" alt="${dinner.name}" class="menu-image">
      <h3>${dinner.name}</h3>
      <p>${dinner.desc}</p>
    `;
    statsCard.innerHTML = `<p>${config.stats}</p>`;

    // Update Language Attribute
    document.documentElement.lang = config.lang;
    const contentArea = document.getElementById('content-area');
    contentArea.className = `lang-${config.lang}`;
  };

  // Initial Load
  updateContent('kr');

  // Country Selection Event
  countrySelector.addEventListener('change', (e) => {
    updateContent(e.target.value);
  });

  // Refresh Button Event
  refreshBtn.addEventListener('click', () => {
    const { lunch, dinner } = getRandomMenuPair(currentCountry);
    
    // Simple animation effect
    lunchCard.style.opacity = '0';
    dinnerCard.style.opacity = '0';
    
    setTimeout(() => {
        lunchCard.innerHTML = `
          <img src="${lunch.imageUrl}" alt="${lunch.name}" class="menu-image">
          <h3>${lunch.name}</h3>
          <p>${lunch.desc}</p>
        `;
        dinnerCard.innerHTML = `
          <img src="${dinner.imageUrl}" alt="${dinner.name}" class="menu-image">
          <h3>${dinner.name}</h3>
          <p>${dinner.desc}</p>
        `;
        lunchCard.style.opacity = '1';
        dinnerCard.style.opacity = '1';
    }, 200);
  });

  // Theme Toggle Logic
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
});
