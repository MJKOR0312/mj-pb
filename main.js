document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const refreshBtn = document.getElementById('refresh-btn');
  const refreshBtnBottom = document.getElementById('refresh-btn-bottom');
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
      stats: "'결정 피로의 본고장'. 압도적인 배달 앱(배민, 쿠팡이츠) 인프라와 24시간 외식 문화가 결합해 매 끼니가 선택의 연속임.",
      labels: { kcal: "🔥 칼로리", carbs: "🍚 탄", protein: "🥩 단", fat: "🧈 지" }
    },
    us: {
      name: "USA",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "'Paradox of Choice'. High stress due to endless customization options on apps like DoorDash.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat" }
    },
    uk: {
      name: "UK",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Ranking #1 for most stressful daily decision: 'What to eat?'. High mobile dependency.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat" }
    },
    cn: {
      name: "China",
      lang: "zh-CN",
      headers: { lunch: "☀️ 午餐推荐", dinner: "🌙 晚餐推荐", info: "📊 决策疲劳与文化", btn: "🔄 换个菜单" },
      stats: "'超级应用的统治'. 虽然美团(Meituan)解决了所有饮食问题，但选择过多导致认知过载.",
      labels: { kcal: "🔥 卡路里", carbs: "🍚 碳水", protein: "🥩 蛋白", fat: "🧈 脂肪" }
    },
    au: {
      name: "Australia",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "66% of households feel fatigue daily. Struggle between health and taste with high mobile usage.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat" }
    },
    ph: {
      name: "Philippines",
      lang: "tl",
      headers: { lunch: "☀️ Rekomendasyon sa Tanghalian", dinner: "🌙 Rekomendasyon sa Hapunan", info: "📊 Pagod sa Pagpapasya", btn: "🔄 Iba Pang Menu" },
      stats: "Highest screen time globally. Social media food culture creates conflict between 'craving' and 'trending'.",
      labels: { kcal: "🔥 Kalorya", carbs: "🍚 Carbs", protein: "🥩 Protina", fat: "🧈 Taba" }
    },
    br: {
      name: "Brazil",
      lang: "pt",
      headers: { lunch: "☀️ Almoço Recomendado", dinner: "🌙 Jantar Recomendado", info: "📊 Fadiga de Decisão", btn: "🔄 Outro Menu" },
      stats: "Largest delivery market in LatAm (iFood). Long mobile usage leads to endless scrolling for menus.",
      labels: { kcal: "🔥 Calorias", carbs: "🍚 Carbs", protein: "🥩 Prot", fat: "🧈 Gord" }
    },
    tw: {
      name: "Taiwan",
      lang: "zh-TW",
      headers: { lunch: "☀️ 午餐推薦", dinner: "🌙 晚餐推薦", info: "📊 決策疲勞與文化", btn: "🔄 換個菜單" },
      stats: "High reliance on convenience stores and dining out. Overwhelmed by mobile search for dense restaurant options.",
      labels: { kcal: "🔥 卡路里", carbs: "🍚 碳水", protein: "🥩 蛋白", fat: "🧈 脂肪" }
    },
    jp: {
      name: "Japan",
      lang: "ja",
      headers: { lunch: "☀️ ラン치のおすすめ", dinner: "🌙 ディナーのおすすめ", info: "📊 決定疲労と文化", btn: "🔄 別のメニュー" },
      stats: "Traditional 'indecisiveness' mixed with sophisticated review apps (Tabelog) deepens the dilemma.",
      labels: { kcal: "🔥 カロリー", carbs: "🍚 炭水", protein: "🥩 蛋白", fat: "🧈 脂質" }
    },
    in: {
      name: "India",
      lang: "hi",
      headers: { lunch: "☀️ दोपहर के भोजन का सुझाव", dinner: "🌙 रात के खाने का सुझाव", info: "📊 निर्णय थकान", btn: "🔄 दूसरा मेनू" },
      stats: "Explosion of Zomato/Swiggy usage. Digital dilemma amidst countless spices and side dish combinations.",
      labels: { kcal: "🔥 कैलोरी", carbs: "🍚 कार्ब्स", protein: "🥩 प्रोटीन", fat: "🧈 वसा" }
    },
    ca: {
      name: "Canada",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Similar delivery culture to USA. Cold weather leads to longer app browsing times instead of going out.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat" }
    },
    th: {
      name: "Thailand",
      lang: "th",
      headers: { lunch: "☀️ แนะนำมื้อกลางวัน", dinner: "🌙 แนะนำมื้อเย็น", info: "📊 ความเหนื่อยล้าในการตัดสินใจ", btn: "🔄 เมนูอื่น" },
      stats: "Grab delivery culture. Variety of street food moving to digital platforms creates too many choices.",
      labels: { kcal: "🔥 แคลอรี่", carbs: "🍚 คาร์บ", protein: "🥩 โปรตีน", fat: "🧈 ไขมัน" }
    },
    sg: {
      name: "Singapore",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Too many hawker centers in a small area. 'Foodie' culture leads to time spent finding the best value/taste.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat" }
    },
    ae: {
      name: "UAE",
      lang: "ar",
      headers: { lunch: "☀️ توصية الغداء", dinner: "🌙 توصية العشاء", info: "📊 إرهاق القرار والثقافة", btn: "🔄 قائمة أخرى" },
      stats: "High smartphone penetration + mix of global cuisines. Ability to order anything makes choosing harder.",
      labels: { kcal: "🔥 سعرات", carbs: "🍚 كربوهيدرات", protein: "🥩 بروتين", fat: "🧈 دهون" }
    },
    de: {
      name: "Germany",
      lang: "de",
      headers: { lunch: "☀️ Mittagessen Empfehlung", dinner: "🌙 Abendessen Empfehlung", info: "📊 Entscheidungsmüdigkeit", btn: "🔄 Anderes Menü" },
      stats: "Surging delivery trend. Efficiency valued, but increasing variety causes fatigue among the youth.",
      labels: { kcal: "🔥 Kalorien", carbs: "🍚 Kohlen", protein: "🥩 Protein", fat: "🧈 Fett" }
    }
  };

  // Helper: Generate Random Estimated Nutrition
  const generateNutrition = () => {
    // Generate random values within a realistic meal range
    const kcal = Math.floor(Math.random() * (950 - 400 + 1)) + 400;
    const carbs = Math.floor(Math.random() * (120 - 30 + 1)) + 30;
    const protein = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    const fat = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    return { kcal, carbs, protein, fat };
  };

  // Helper: Parse menu string "Name|Description"
  const parseMenu = (menuStr) => {
    const [name, desc] = menuStr.split('|');
    // Use Bing Image Search Thumbnail for high relevance
    const encodedName = encodeURIComponent(name);
    // w=400, h=400 forces a square thumbnail, c=7 extracts the main subject
    const imageUrl = `https://tse2.mm.bing.net/th?q=${encodedName} food&w=400&h=400&c=7&rs=1&p=0`;
    
    // Add estimated nutrition
    const nutr = generateNutrition();
    
    return { name, desc, imageUrl, nutr };
  };

  // Helper: Get Random Item from Array (Generic)
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Helper: Get distinct random items for lunch and dinner from the large list
  const getRandomMenuPair = (countryCode) => {
    const rawList = window.MENU_DATA[countryCode] || [];
    
    // Fallback if data is missing
    if (rawList.length === 0) {
      return {
        lunch: { name: "N/A", desc: "No menu data available.", imageUrl: "https://placehold.co/600x400?text=No+Data", nutr: { kcal: 0, carbs: 0, protein: 0, fat: 0 } },
        dinner: { name: "N/A", desc: "No menu data available.", imageUrl: "https://placehold.co/600x400?text=No+Data", nutr: { kcal: 0, carbs: 0, protein: 0, fat: 0 } }
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

  // Helper to generate HTML for nutrition info
  const getNutrHtml = (nutr, labels) => `
    <div class="nutrition-info">
      <span>${labels.kcal}: ${nutr.kcal}</span>
      <span>${labels.carbs}: ${nutr.carbs}g</span>
      <span>${labels.protein}: ${nutr.protein}g</span>
      <span>${labels.fat}: ${nutr.fat}g</span>
    </div>
  `;

  // Function to Update Content
  const updateContent = (countryCode) => {
    currentCountry = countryCode;
    const config = countryConfig[countryCode];
    
    // Update Headers
    lunchHeader.textContent = config.headers.lunch;
    dinnerHeader.textContent = config.headers.dinner;
    infoHeader.textContent = config.headers.info;
    refreshBtn.textContent = config.headers.btn;
    if (refreshBtnBottom) refreshBtnBottom.textContent = config.headers.btn;

    // Get Random Menus from the Massive Data File
    const { lunch, dinner } = getRandomMenuPair(countryCode);

    // Update Content
    lunchCard.innerHTML = `
      <img src="${lunch.imageUrl}" alt="${lunch.name}" class="menu-image">
      <h3>${lunch.name}</h3>
      <p>${lunch.desc}</p>
      ${getNutrHtml(lunch.nutr, config.labels)}
    `;
    dinnerCard.innerHTML = `
      <img src="${dinner.imageUrl}" alt="${dinner.name}" class="menu-image">
      <h3>${dinner.name}</h3>
      <p>${dinner.desc}</p>
      ${getNutrHtml(dinner.nutr, config.labels)}
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

  // Common Refresh Function
  const handleRefresh = () => {
    const config = countryConfig[currentCountry];
    const { lunch, dinner } = getRandomMenuPair(currentCountry);
    
    // Simple animation effect
    lunchCard.style.opacity = '0';
    dinnerCard.style.opacity = '0';
    
    setTimeout(() => {
        lunchCard.innerHTML = `
          <img src="${lunch.imageUrl}" alt="${lunch.name}" class="menu-image">
          <h3>${lunch.name}</h3>
          <p>${lunch.desc}</p>
          ${getNutrHtml(lunch.nutr, config.labels)}
        `;
        dinnerCard.innerHTML = `
          <img src="${dinner.imageUrl}" alt="${dinner.name}" class="menu-image">
          <h3>${dinner.name}</h3>
          <p>${dinner.desc}</p>
          ${getNutrHtml(dinner.nutr, config.labels)}
        `;
        lunchCard.style.opacity = '1';
        dinnerCard.style.opacity = '1';
    }, 200);
  };

  // Refresh Button Events
  refreshBtn.addEventListener('click', handleRefresh);
  if (refreshBtnBottom) refreshBtnBottom.addEventListener('click', handleRefresh);

  // Theme Toggle Logic
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
});
