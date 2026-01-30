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

  // Country Data (Multiple options per meal including local, western, asian, trendy)
  const countryData = {
    kr: {
      name: "한국 (South Korea)",
      lang: "ko",
      headers: { lunch: "☀️ 점심 메뉴 추천", dinner: "🌙 저녁 메뉴 추천", info: "📊 결정 피로도 & 문화", btn: "🔄 다른 메뉴 추천" },
      lunchOptions: [
        { name: "김치찌개 (Kimchi-jjigae)", desc: "한국인의 소울 푸드. 얼큰한 국물과 돼지고기의 환상적인 조화." },
        { name: "돈까스 (Pork Cutlet)", desc: "바삭한 튀김과 달콤한 소스. 직장인 점심 메뉴 부동의 1위." },
        { name: "마라탕 (Malatang)", desc: "요즘 대세! 원하는 재료를 넣어 얼큰하고 알싸하게 즐기는 탕요리." },
        { name: "햄버거 (Burger)", desc: "빠르고 간편하게 즐기는 든든한 한 끼." },
        { name: "칼국수 (Kalguksu)", desc: "뜨끈한 국물과 쫄깃한 면발, 비 오는 날 생각나는 맛." }
      ],
      dinnerOptions: [
        { name: "삼겹살 (Samgyeopsal)", desc: "하루의 피로를 씻어주는 고소한 삼겹살과 소주 한 잔." },
        { name: "치킨 (Fried Chicken)", desc: "바삭한 후라이드, 매콤한 양념. 오늘 밤은 치맥 어떠신가요?" },
        { name: "초밥 (Sushi)", desc: "신선한 해산물의 풍미를 느낄 수 있는 깔끔하고 고급스러운 저녁." },
        { name: "족발/보쌈 (Jokbal/Bossam)", desc: "야식의 제왕, 쫄깃한 콜라겐과 부드러운 수육." },
        { name: "파스타 & 스테이크", desc: "분위기 있는 저녁을 위한 이탈리안 요리." }
      ],
      stats: "'결정 피로의 본고장'. 압도적인 배달 앱(배민, 쿠팡이츠) 인프라와 24시간 외식 문화가 결합해 매 끼니가 선택의 연속임."
    },
    us: {
      name: "미국 (USA)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Another Menu" },
      lunchOptions: [
        { name: "Cheeseburger & Fries", desc: "A classic American staple. Juicy beef patty with melted cheese." },
        { name: "Chipotle Bowl", desc: "Customizable Mexican grill bowl. Popular for a quick, hearty lunch." },
        { name: "Caesar Salad", desc: "Crisp romaine lettuce, croutons, and parmesan. A lighter option." },
        { name: "Poke Bowl", desc: "Fresh Hawaiian raw fish salad, trendy and healthy." }
      ],
      dinnerOptions: [
        { name: "Pepperoni Pizza", desc: "The go-to comfort food. Crispy crust with savory pepperoni slices." },
        { name: "Steak & Potatoes", desc: "Hearty ribeye or sirloin with mashed potatoes." },
        { name: "Tacos", desc: "Taco Tuesday everyday! Varied fillings from carne asada to fish." },
        { name: "Sushi Roll", desc: "California rolls or Spicy Tuna rolls are dinner favorites." },
        { name: "Pad Thai", desc: "Sweet and savory Thai noodles, a very popular takeout choice." }
      ],
      stats: "'Paradox of Choice'. High stress due to endless customization options on apps like DoorDash."
    },
    uk: {
      name: "영국 (UK)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Another Menu" },
      lunchOptions: [
        { name: "Fish and Chips", desc: "Crispy battered fish with thick-cut chips and mushy peas." },
        { name: "Meal Deal", desc: "Supermarket combo: Sandwich, snack, and drink. The office worker's staple." },
        { name: "Cornish Pasty", desc: "Savory pastry filled with meat and vegetables." }
      ],
      dinnerOptions: [
        { name: "Sunday Roast", desc: "Roast beef, Yorkshire pudding, and roasted vegetables." },
        { name: "Chicken Tikka Masala", desc: "Britain's national dish. Creamy, spiced curry." },
        { name: "Shepherd's Pie", desc: "Minced lamb topped with a layer of mashed potato." },
        { name: "Nando's Peri-Peri Chicken", desc: "Spicy flame-grilled chicken, very popular among youth." }
      ],
      stats: "Ranking #1 for most stressful daily decision: 'What to eat?'. High mobile dependency."
    },
    cn: {
      name: "중국 (China)",
      lang: "zh-CN",
      headers: { lunch: "☀️ 午餐推荐", dinner: "🌙 晚餐推荐", info: "📊 决策疲劳与文化", btn: "🔄 换个菜单" },
      lunchOptions: [
        { name: "牛肉面 (Niu Rou Mian)", desc: "香浓的牛肉汤配上劲道的面条，午餐的最佳选择。" },
        { name: "盖浇饭 (Rice Bowl)", desc: "方便快捷，各种炒菜浇在米饭上。" },
        { name: "麻辣烫 (Ma La Tang)", desc: "自选食材，麻辣鲜香，深受年轻人喜爱。" }
      ],
      dinnerOptions: [
        { name: "火锅 (Hot Pot)", desc: "适合聚餐的社交美食，涮煮各种新鲜食材。" },
        { name: "烤串 (BBQ Skewers)", desc: "羊肉串配啤酒，夜宵的完美搭配。" },
        { name: "北京烤鸭 (Peking Duck)", desc: "皮酥肉嫩，搭配薄饼和甜面酱。" },
        { name: "肯德基 (KFC)", desc: "本土化最成功的快餐，粥和油条也能在晚餐吃到。" }
      ],
      stats: "'超级应用的统治'. 虽然美团(Meituan)解决了所有饮食问题，但选择过多导致认知过载。"
    },
    au: {
      name: "호주 (Australia)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Another Menu" },
      lunchOptions: [
        { name: "Meat Pie", desc: "Iconic flaky pastry filled with minced meat and gravy." },
        { name: "Smashed Avo on Toast", desc: "Cafe culture staple. Avocado, feta, and poached eggs." },
        { name: "Sushi Roll", desc: "Hand rolls are a very common grab-and-go lunch." }
      ],
      dinnerOptions: [
        { name: "Chicken Parmigiana", desc: "Breaded chicken topped with tomato sauce and melted cheese." },
        { name: "Barbie (BBQ)", desc: "Grilled sausages, steaks, and seafood outdoors." },
        { name: "Thai Curry", desc: "Australia loves Thai food. Green or Red curry is a dinner staple." },
        { name: "Fish and Chips", desc: "Fresh local fish, often eaten by the beach." }
      ],
      stats: "66% of households feel fatigue daily. Struggle between health and taste with high mobile usage."
    },
    ph: {
      name: "필리핀 (Philippines)",
      lang: "tl",
      headers: { lunch: "☀️ Rekomendasyon sa Tanghalian", dinner: "🌙 Rekomendasyon sa Hapunan", info: "📊 Pagod sa Pagpapasya", btn: "🔄 Iba Pang Menu" },
      lunchOptions: [
        { name: "Adobo", desc: "Manok o baboy na niluto sa toyo at suka. Paborito ng bayan." },
        { name: "Silog Meals", desc: "Garlic rice with egg and meat (Tapa, Tocino, Longganisa)." },
        { name: "Jollibee Chickenjoy", desc: "The most famous fried chicken in the Philippines." }
      ],
      dinnerOptions: [
        { name: "Sinigang", desc: "Maasim na sabaw na pampagana, perpekto para sa hapunan." },
        { name: "Lechon Kawali", desc: "Crispy deep-fried pork belly." },
        { name: "Sisig", desc: "Sizzling chopped pork face/belly, best with beer." },
        { name: "Samgyeopsal", desc: "Korean BBQ is extremely trendy in the Philippines right now." }
      ],
      stats: "Highest screen time globally. Social media food culture creates conflict between 'craving' and 'trending'."
    },
    br: {
      name: "브라질 (Brazil)",
      lang: "pt",
      headers: { lunch: "☀️ Almoço Recomendado", dinner: "🌙 Jantar Recomendado", info: "📊 Fadiga de Decisão", btn: "🔄 Outro Menu" },
      lunchOptions: [
        { name: "Prato Feito", desc: "Rice, beans, steak, and fries. The standard daily lunch." },
        { name: "Feijoada", desc: "Black bean and pork stew, traditionally for Wednesdays or Saturdays." },
        { name: "Buffet a Quilo", desc: "Pay-by-weight buffets offering salads, meats, and sushi." }
      ],
      dinnerOptions: [
        { name: "Churrasco", desc: "Grilled meats. Picanha is the star of the show." },
        { name: "Pizza", desc: "Sao Paulo pizza is world-class, often eaten with fork and knife." },
        { name: "Hamburguer Artesanal", desc: "Gourmet burgers are very popular for dinner." },
        { name: "Sushi", desc: "Brazil has the largest Japanese population outside Japan." }
      ],
      stats: "Largest delivery market in LatAm (iFood). Long mobile usage leads to endless scrolling for menus."
    },
    tw: {
      name: "대만 (Taiwan)",
      lang: "zh-TW",
      headers: { lunch: "☀️ 午餐推薦", dinner: "🌙 晚餐推薦", info: "📊 決策疲勞與文化", btn: "🔄 換個菜單" },
      lunchOptions: [
        { name: "魯肉飯 (Braised Pork Rice)", desc: "台灣國民美食，鹹香入味，經濟實惠。" },
        { name: "排骨便當 (Pork Chop Bento)", desc: "炸排骨配上幾樣小菜，上班族的最愛。" },
        { name: "水餃 (Dumplings)", desc: "方便又好吃的午餐選擇。" }
      ],
      dinnerOptions: [
        { name: "牛肉麵 (Beef Noodle Soup)", desc: "濃郁湯頭與軟嫩牛肉，晚餐的溫暖選擇。" },
        { name: "夜市牛排 (Night Market Steak)", desc: "鐵板麵加牛排，淋上黑胡椒醬。" },
        { name: "火鍋 (Hot Pot)", desc: "台灣人超愛吃火鍋，一年四季都適合。" },
        { name: "鹽酥雞 (Popcorn Chicken)", desc: "晚餐或宵夜的經典炸物。" }
      ],
      stats: "High reliance on convenience stores and dining out. Overwhelmed by mobile search for dense restaurant options."
    },
    jp: {
      name: "일본 (Japan)",
      lang: "ja",
      headers: { lunch: "☀️ ランチのおすすめ", dinner: "🌙 ディナーのおすすめ", info: "📊 決定疲労と文化", btn: "🔄 別のメニュー" },
      lunchOptions: [
        { name: "豚骨ラーメン (Tonkotsu Ramen)", desc: "濃厚なスープと細麺。手軽で美味しいランチの定番。" },
        { name: "牛丼 (Gyudon)", desc: "甘辛く煮た牛肉をご飯に乗せて。早くて安い。" },
        { name: "唐揚げ定食 (Karaage Set)", desc: "ジューシーな鶏の唐揚げとご飯、味噌汁。" },
        { name: "コンビニおにぎり (Konbini Onigiri)", desc: "忙しい時の味方。種類も豊富。" }
      ],
      dinnerOptions: [
        { name: "お寿司 (Sushi)", desc: "新鮮なネタと職人の技。一日の疲れを癒やす贅沢。" },
        { name: "焼肉 (Yakiniku)", desc: "家族や友人と網を囲んで肉を焼く楽しみ。" },
        { name: "居酒屋メニュー (Izakaya)", desc: "焼き鳥、刺身、枝豆など、お酒に合う料理。" },
        { name: "カレーライス (Curry Rice)", desc: "家庭の味。国民食とも言える人気メニュー。" }
      ],
      stats: "Traditional 'indecisiveness' mixed with sophisticated review apps (Tabelog) deepens the dilemma."
    },
    in: {
      name: "인도 (India)",
      lang: "hi",
      headers: { lunch: "☀️ दोपहर के भोजन का सुझाव", dinner: "🌙 रात के खाने का सुझाव", info: "📊 निर्णय थकान", btn: "🔄 दूसरा मेनू" },
      lunchOptions: [
        { name: "Thali (थाली)", desc: "विभिन्न व्यंजनों का एक संपूर्ण भोजन, स्वाद और पोषण से भरपूर।" },
        { name: "Masala Dosa", desc: "South Indian crispy crepe filled with spiced potatoes." },
        { name: "Rajma Chawal", desc: "Kidney beans in gravy with rice. North Indian comfort food." }
      ],
      dinnerOptions: [
        { name: "Biryani (बिरयानी)", desc: "सुगंधित चावल और मसालों के साथ पकाया गया शाही व्यंजन।" },
        { name: "Butter Chicken & Naan", desc: "Creamy tomato curry with tandoori bread." },
        { name: "Paneer Tikka", desc: "Grilled cottage cheese cubes, a favorite for vegetarians." },
        { name: "Chinese (Indo-Chinese)", desc: "Hakka Noodles and Manchurian are huge dinner favorites." }
      ],
      stats: "Explosion of Zomato/Swiggy usage. Digital dilemma amidst countless spices and side dish combinations."
    },
    ca: {
      name: "캐나다 (Canada)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Another Menu" },
      lunchOptions: [
        { name: "Poutine", desc: "Fries topped with cheese curds and hot gravy." },
        { name: "Tim Hortons Sandwich", desc: "Quick lunch with a coffee and donut on the side." },
        { name: "Shawarma", desc: "Extremely popular street food lunch, especially in Ottawa/Toronto." }
      ],
      dinnerOptions: [
        { name: "Maple Glazed Salmon", desc: "Fresh salmon with a sweet and savory maple syrup glaze." },
        { name: "Kraft Mac & Cheese", desc: "Actually the 'national dish' for many families." },
        { name: "Pierogies", desc: "Dumplings, popular due to Eastern European influence." },
        { name: "Butter Chicken", desc: "Very popular due to the large South Asian community." }
      ],
      stats: "Similar delivery culture to USA. Cold weather leads to longer app browsing times instead of going out."
    },
    th: {
      name: "태국 (Thailand)",
      lang: "th",
      headers: { lunch: "☀️ แนะนำมื้อกลางวัน", dinner: "🌙 แนะนำมื้อเย็น", info: "📊 ความเหนื่อยล้าในการตัดสินใจ", btn: "🔄 เมนูอื่น" },
      lunchOptions: [
        { name: "ผัดกะเพรา (Pad Kra Pao)", desc: "เมนูสิ้นคิดยอดนิยม รสชาติจัดจ้าน หอมใบกะเพรา." },
        { name: "ข้าวมันไก่ (Khao Man Gai)", desc: "ไก่ต้มเนื้อนุ่มกับข้าวมันหอมๆ พร้อมน้ำจิ้มรสเด็ด." },
        { name: "ก๋วยเตี๋ยว (Noodles)", desc: "ก๋วยเตี๋ยวเรือ หรือ ต้มยำ ร้อนๆ มื้อเที่ยง." }
      ],
      dinnerOptions: [
        { name: "ต้มยำกุ้ง (Tom Yum Goong)", desc: "ซุปรสเปรี้ยวเผ็ดร้อน เอกลักษณ์ของอาหารไทย." },
        { name: "ส้มตำ & ไก่ย่าง (Som Tum)", desc: "ส้มตำรสจัดจ้านคู่กับไก่ย่างและข้าวเหนียว." },
        { name: "หมูกระทะ (Mookata)", desc: "ปิ้งย่างและสุกี้ในเวลาเดียวกัน เหมาะสำหรับสังสรรค์." },
        { name: "แกงเขียวหวาน (Green Curry)", desc: "แกงกะทิรสชาติกลมกล่อม ทานกับข้าวสวย." }
      ],
      stats: "Grab delivery culture. Variety of street food moving to digital platforms creates too many choices."
    },
    sg: {
      name: "싱가포르 (Singapore)",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Another Menu" },
      lunchOptions: [
        { name: "Hainanese Chicken Rice", desc: "Poached chicken and seasoned rice. The national dish." },
        { name: "Laksa", desc: "Spicy coconut noodle soup with shrimp and fish cakes." },
        { name: "Char Kway Teow", desc: "Stir-fried flat rice noodles with cockles and sausage." }
      ],
      dinnerOptions: [
        { name: "Chilli Crab", desc: "Iconic seafood dish. Stir-fried crab in a savory, sweet and spicy sauce." },
        { name: "Satay", desc: "Grilled meat skewers with peanut sauce." },
        { name: "Bak Kut Teh", desc: "Pork rib dish cooked in broth. Comfort food." },
        { name: "McSpicy", desc: "McDonald's spicy chicken burger, a local cult favorite." }
      ],
      stats: "Too many hawker centers in a small area. 'Foodie' culture leads to time spent finding the best value/taste."
    },
    ae: {
      name: "아랍에미리트 (UAE)",
      lang: "ar",
      headers: { lunch: "☀️ توصية الغداء", dinner: "🌙 توصية العشاء", info: "📊 إرهاق القرار والثقافة", btn: "🔄 قائمة أخرى" },
      lunchOptions: [
        { name: "شاورما (Shawarma)", desc: "وجبة سريعة ومحبوبة. شرائح لحم أو دجاج متبلة." },
        { name: "Falafel Wrap", desc: "Deep-fried chickpea balls in a wrap. Vegetarian favorite." },
        { name: "Manakish", desc: "Levantine dough topped with thyme, cheese, or ground meat." }
      ],
      dinnerOptions: [
        { name: "مجبوس (Machboos)", desc: "أرز متبل مع اللحم، وجبة تقليدية غنية بالنكهات." },
        { name: "Biryani", desc: "Extremely popular due to the large expat population." },
        { name: "Grilled Mix Grill", desc: "Assortment of kebabs and lamb chops." },
        { name: "Burger", desc: "Dubai has a massive gourmet burger scene." }
      ],
      stats: "High smartphone penetration + mix of global cuisines. Ability to order anything makes choosing harder."
    },
    de: {
      name: "독일 (Germany)",
      lang: "de",
      headers: { lunch: "☀️ Mittagessen Empfehlung", dinner: "🌙 Abendessen Empfehlung", info: "📊 Entscheidungsmüdigkeit", btn: "🔄 Anderes Menü" },
      lunchOptions: [
        { name: "Currywurst", desc: "Gebratene Wurst mit Curryketchup. Ein deutscher Klassiker." },
        { name: "Döner Kebab", desc: "Berlin style kebab. Meat, salad, and sauce in bread. Very popular." },
        { name: "Schnitzel", desc: "Breaded and fried meat cutlet." }
      ],
      dinnerOptions: [
        { name: "Schweinshaxe", desc: "Knusprige Schweinshaxe mit Sauerkraut und Kartoffeln." },
        { name: "Bratwurst & Potato Salad", desc: "Simple and hearty dinner." },
        { name: "Abendbrot", desc: "Traditional 'evening bread' with cheese, cold cuts, and pickles." },
        { name: "Pizza/Pasta", desc: "Italian food is the most popular foreign cuisine in Germany." }
      ],
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
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateElement.textContent = today.toLocaleDateString(undefined, options);
  };
  updateDate();

  // State to hold current selection
  let currentCountry = 'kr';

  // Helper: Get Random Item from Array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Function to Update Content
  const updateContent = (countryCode) => {
    currentCountry = countryCode;
    const data = countryData[countryCode];
    
    // Update Headers
    lunchHeader.textContent = data.headers.lunch;
    dinnerHeader.textContent = data.headers.dinner;
    infoHeader.textContent = data.headers.info;
    refreshBtn.textContent = data.headers.btn;

    // Pick Random Menu Initially
    const randomLunch = getRandomItem(data.lunchOptions);
    const randomDinner = getRandomItem(data.dinnerOptions);

    // Update Content
    lunchCard.innerHTML = `<h3>${randomLunch.name}</h3><p>${randomLunch.desc}</p>`;
    dinnerCard.innerHTML = `<h3>${randomDinner.name}</h3><p>${randomDinner.desc}</p>`;
    statsCard.innerHTML = `<p>${data.stats}</p>`;

    // Update Language Attribute
    document.documentElement.lang = data.lang;
    const contentArea = document.getElementById('content-area');
    contentArea.className = `lang-${data.lang}`;
  };

  // Initial Load
  updateContent('kr');

  // Country Selection Event
  countrySelector.addEventListener('change', (e) => {
    updateContent(e.target.value);
  });

  // Refresh Button Event
  refreshBtn.addEventListener('click', () => {
    // Re-run updateContent with current country to trigger random selection
    // Or just update the cards to avoid flickering headers
    const data = countryData[currentCountry];
    const randomLunch = getRandomItem(data.lunchOptions);
    const randomDinner = getRandomItem(data.dinnerOptions);
    
    // Simple animation effect
    lunchCard.style.opacity = '0';
    dinnerCard.style.opacity = '0';
    
    setTimeout(() => {
        lunchCard.innerHTML = `<h3>${randomLunch.name}</h3><p>${randomLunch.desc}</p>`;
        dinnerCard.innerHTML = `<h3>${randomDinner.name}</h3><p>${randomDinner.desc}</p>`;
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
