document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const dateElement = document.getElementById('today-date');
  const countrySelector = document.getElementById('country-selector');
  
  const lunchHeader = document.getElementById('lunch-header');
  const lunchCard = document.getElementById('lunch-card');
  const dinnerHeader = document.getElementById('dinner-header');
  const dinnerCard = document.getElementById('dinner-card');
  const infoHeader = document.getElementById('info-header');
  const statsCard = document.getElementById('stats-card');

  // Country Data (Native Language + English Fallback where appropriate)
  const countryData = {
    kr: {
      name: "한국 (South Korea)",
      lang: "ko",
      headers: { lunch: "☀️ 점심 메뉴 추천", dinner: "🌙 저녁 메뉴 추천", info: "📊 결정 피로도 & 문화" },
      lunch: { name: "김치찌개 (Kimchi-jjigae)", desc: "한국인의 소울 푸드. 얼큰한 국물과 돼지고기의 환상적인 조화." },
      dinner: { name: "삼겹살 (Samgyeopsal)", desc: "하루의 피로를 씻어주는 고소한 삼겹살과 소주 한 잔." },
      stats: "'결정 피로의 본고장'. 압도적인 배달 앱(배민, 쿠팡이츠) 인프라와 24시간 외식 문화가 결합해 매 끼니가 선택의 연속임."
    },
    us: {
      name: "미국 (USA)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture" },
      lunch: { name: "Cheeseburger & Fries", desc: "A classic American staple. Juicy beef patty with melted cheese." },
      dinner: { name: "Pepperoni Pizza", desc: "The go-to comfort food. Crispy crust with savory pepperoni slices." },
      stats: "'Paradox of Choice'. High stress due to endless customization options on apps like DoorDash."
    },
    uk: {
      name: "영국 (UK)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture" },
      lunch: { name: "Fish and Chips", desc: "Crispy battered fish with thick-cut chips and mushy peas." },
      dinner: { name: "Sunday Roast", desc: "Roast beef, Yorkshire pudding, and roasted vegetables." },
      stats: "Ranking #1 for most stressful daily decision: 'What to eat?'. High mobile dependency."
    },
    cn: {
      name: "중국 (China)",
      lang: "zh-CN",
      headers: { lunch: "☀️ 午餐推荐", dinner: "🌙 晚餐推荐", info: "📊 决策疲劳与文化" },
      lunch: { name: "牛肉面 (Niu Rou Mian)", desc: "香浓的牛肉汤配上劲道的面条，午餐的最佳选择。" },
      dinner: { name: "火锅 (Hot Pot)", desc: "适合聚餐的社交美食，涮煮各种新鲜食材。" },
      stats: "'超级应用的统治'. 虽然美团(Meituan)解决了所有饮食问题，但选择过多导致认知过载。"
    },
    au: {
      name: "호주 (Australia)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture" },
      lunch: { name: "Meat Pie", desc: "Iconic flaky pastry filled with minced meat and gravy." },
      dinner: { name: "Chicken Parmigiana", desc: "Breaded chicken topped with tomato sauce and melted cheese." },
      stats: "66% of households feel fatigue daily. Struggle between health and taste with high mobile usage."
    },
    ph: {
      name: "필리핀 (Philippines)",
      lang: "tl", // Tagalog
      headers: { lunch: "☀️ Rekomendasyon sa Tanghalian", dinner: "🌙 Rekomendasyon sa Hapunan", info: "📊 Pagod sa Pagpapasya" },
      lunch: { name: "Adobo", desc: "Manok o baboy na niluto sa toyo at suka. Paborito ng bayan." },
      dinner: { name: "Sinigang", desc: "Maasim na sabaw na pampagana, perpekto para sa hapunan." },
      stats: "Highest screen time globally. Social media food culture creates conflict between 'craving' and 'trending'."
    },
    br: {
      name: "브라질 (Brazil)",
      lang: "pt",
      headers: { lunch: "☀️ Almoço Recomendado", dinner: "🌙 Jantar Recomendado", info: "📊 Fadiga de Decisão" },
      lunch: { name: "Feijoada", desc: "O prato nacional. Cozido de feijão preto com carne de porco." },
      dinner: { name: "Churrasco", desc: "Carnes grelhadas variadas, essenciais para a cultura brasileira." },
      stats: "Largest delivery market in LatAm (iFood). Long mobile usage leads to endless scrolling for menus."
    },
    tw: {
      name: "대만 (Taiwan)",
      lang: "zh-TW",
      headers: { lunch: "☀️ 午餐推薦", dinner: "🌙 晚餐推薦", info: "📊 決策疲勞與文化" },
      lunch: { name: "魯肉飯 (Braised Pork Rice)", desc: "台灣國民美食，鹹香入味，經濟實惠。" },
      dinner: { name: "牛肉麵 (Beef Noodle Soup)", desc: "濃郁湯頭與軟嫩牛肉，晚餐的溫暖選擇。" },
      stats: "High reliance on convenience stores and dining out. Overwhelmed by mobile search for dense restaurant options."
    },
    jp: {
      name: "일본 (Japan)",
      lang: "ja",
      headers: { lunch: "☀️ ランチのおすすめ", dinner: "🌙 ディナーのおすすめ", info: "📊 決定疲労と文化" },
      lunch: { name: "豚骨ラーメン (Tonkotsu Ramen)", desc: "濃厚なスープと細麺。手軽で美味しいランチの定番。" },
      dinner: { name: "お寿司 (Sushi)", desc: "新鮮なネタと職人の技。一日の疲れを癒やす贅沢。" },
      stats: "Traditional 'indecisiveness' mixed with sophisticated review apps (Tabelog) deepens the dilemma."
    },
    in: {
      name: "인도 (India)",
      lang: "hi",
      headers: { lunch: "☀️ दोपहर के भोजन का सुझाव", dinner: "🌙 रात के खाने का सुझाव", info: "📊 निर्णय थकान" },
      lunch: { name: "Thali (थाली)", desc: "विभिन्न व्यंजनों का एक संपूर्ण भोजन, स्वाद और पोषण से भरपूर।" },
      dinner: { name: "Biryani (बिरयानी)", desc: "सुगंधित चावल और मसालों के साथ पकाया गया शाही व्यंजन।" },
      stats: "Explosion of Zomato/Swiggy usage. Digital dilemma amidst countless spices and side dish combinations."
    },
    ca: {
      name: "캐나다 (Canada)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture" },
      lunch: { name: "Poutine", desc: "Fries topped with cheese curds and hot gravy." },
      dinner: { name: "Maple Glazed Salmon", desc: "Fresh salmon with a sweet and savory maple syrup glaze." },
      stats: "Similar delivery culture to USA. Cold weather leads to longer app browsing times instead of going out."
    },
    th: {
      name: "태국 (Thailand)",
      lang: "th",
      headers: { lunch: "☀️ แนะนำมื้อกลางวัน", dinner: "🌙 แนะนำมื้อเย็น", info: "📊 ความเหนื่อยล้าในการตัดสินใจ" },
      lunch: { name: "ผัดกะเพรา (Pad Kra Pao)", desc: "เมนูสิ้นคิดยอดนิยม รสชาติจัดจ้าน หอมใบกะเพรา." },
      dinner: { name: "ต้มยำกุ้ง (Tom Yum Goong)", desc: "ซุปรสเปรี้ยวเผ็ดร้อน เอกลักษณ์ของอาหารไทย." },
      stats: "Grab delivery culture. Variety of street food moving to digital platforms creates too many choices."
    },
    sg: {
      name: "싱가포르 (Singapore)",
      lang: "en", // English is one of the official languages and widely used
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture" },
      lunch: { name: "Hainanese Chicken Rice", desc: "Poached chicken and seasoned rice. The national dish." },
      dinner: { name: "Chilli Crab", desc: "Iconic seafood dish. Stir-fried crab in a savory, sweet and spicy sauce." },
      stats: "Too many hawker centers in a small area. 'Foodie' culture leads to time spent finding the best value/taste."
    },
    ae: {
      name: "아랍에미리트 (UAE)",
      lang: "ar",
      headers: { lunch: "☀️ توصية الغداء", dinner: "🌙 توصية العشاء", info: "📊 إرهاق القرار والثقافة" },
      lunch: { name: "شاورما (Shawarma)", desc: "وجبة سريعة ومحبوبة. شرائح لحم أو دجاج متبلة." },
      dinner: { name: "مجبوس (Machboos)", desc: "أرز متبل مع اللحم، وجبة تقليدية غنية بالنكهات." },
      stats: "High smartphone penetration + mix of global cuisines. Ability to order anything makes choosing harder."
    },
    de: {
      name: "독일 (Germany)",
      lang: "de",
      headers: { lunch: "☀️ Mittagessen Empfehlung", dinner: "🌙 Abendessen Empfehlung", info: "📊 Entscheidungsmüdigkeit" },
      lunch: { name: "Currywurst", desc: "Gebratene Wurst mit Curryketchup. Ein deutscher Klassiker." },
      dinner: { name: "Schweinshaxe", desc: "Knusprige Schweinshaxe mit Sauerkraut und Kartoffeln." },
      stats: "Surging delivery trend. Efficiency valued, but increasing variety causes fatigue among the youth."
    }
  };

  // Populate Selector
  Object.keys(countryData).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = countryData[key].name;
    countrySelector.appendChild(option);
  });

  // Display Today's Date
  const updateDate = () => {
    const today = new Date();
    // Format date generally (User locale might vary, but let's keep it clear)
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateElement.textContent = today.toLocaleDateString(undefined, options);
  };
  updateDate();

  // Function to Update Content
  const updateContent = (countryCode) => {
    const data = countryData[countryCode];
    
    // Update Headers
    lunchHeader.textContent = data.headers.lunch;
    dinnerHeader.textContent = data.headers.dinner;
    infoHeader.textContent = data.headers.info;

    // Update Content
    lunchCard.innerHTML = `<h3>${data.lunch.name}</h3><p>${data.lunch.desc}</p>`;
    dinnerCard.innerHTML = `<h3>${data.dinner.name}</h3><p>${data.dinner.desc}</p>`;
    statsCard.innerHTML = `<p>${data.stats}</p>`;

    // Update Language Attribute for Accessibility/Fonts
    document.documentElement.lang = data.lang;
    
    // Set font family based on language for better rendering
    const contentArea = document.getElementById('content-area');
    contentArea.className = `lang-${data.lang}`;
  };

  // Initial Load (Default: Korea)
  updateContent('kr');

  // Event Listener
  countrySelector.addEventListener('change', (e) => {
    updateContent(e.target.value);
  });

  // Theme Toggle Logic
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
});