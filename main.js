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

  const articleTitle = document.getElementById('article-title');
  const articleContent = document.getElementById('article-content');

  // Fallback Pairing Data (Drinks/Sides) per Country
  const pairingData = {
    kr: ["시원한 물", "보리차", "사이다", "콜라", "김치"],
    us: ["Coke", "Iced Tea", "Water", "Fries"],
    default: ["Water", "Coke", "Tea"]
  };

  // Helper: Smart Pairing Logic based on Menu Name
  const getSmartPairing = (menuName, countryCode) => {
    const name = menuName.toLowerCase();

    // 1. Korean Menu Logic (Specific matches for Korean text)
    if (countryCode === 'kr') {
      if (name.includes('삼겹살') || name.includes('갈비') || name.includes('곱창')) return '소주 & 된장찌개';
      if (name.includes('치킨') || name.includes('닭강정')) return '맥주 & 치킨무';
      if (name.includes('피자') || name.includes('파스타')) return '콜라 & 피클';
      if (name.includes('짜장') || name.includes('짬뽕') || name.includes('탕수육')) return '단무지 & 양파';
      if (name.includes('떡볶이') || name.includes('분식')) return '쿨피스 & 튀김';
      if (name.includes('찌개') || name.includes('탕') || name.includes('국')) return '흰쌀밥 & 계란말이';
      if (name.includes('파전') || name.includes('빈대떡') || name.includes('전')) return '막걸리 & 양파장아찌';
      if (name.includes('회') || name.includes('초밥')) return '소주(청하) & 락교';
      if (name.includes('냉면') || name.includes('밀면')) return '만두 & 무절임';
      if (name.includes('비빔밥') || name.includes('덮밥')) return '콩나물국 & 김치';
      if (name.includes('국수') || name.includes('우동')) return '김밥 & 김치';
      if (name.includes('샌드위치') || name.includes('토스트') || name.includes('빵')) return '아메리카노 & 우유';
      if (name.includes('샐러드') || name.includes('포케')) return '탄산수 & 과일';
      if (name.includes('족발') || name.includes('보쌈')) return '막국수 & 소주';
      if (name.includes('죽')) return '동치미 & 장조림';
    }

    // 2. Global/English Logic
    if (name.includes('burger') || name.includes('hot dog')) return 'Coke & French Fries';
    if (name.includes('pizza')) return 'Beer & Garlic Dip';
    if (name.includes('steak') || name.includes('roast')) return 'Red Wine & Mashed Potatoes';
    if (name.includes('pasta') || name.includes('spaghetti')) return 'White Wine & Garlic Bread';
    if (name.includes('sushi') || name.includes('sashimi')) return 'Green Tea & Miso Soup';
    if (name.includes('ramen') || name.includes('noodle')) return 'Gyoza & Kimchi';
    if (name.includes('rice') || name.includes('curry')) return 'Lassi or Pickle';
    if (name.includes('salad') || name.includes('sandwich')) return 'Iced Coffee & Fruit';
    if (name.includes('taco') || name.includes('burrito')) return 'Margarita & Nachos';
    if (name.includes('chicken') && !name.includes('salad')) return 'Beer & Coleslaw';
    if (name.includes('dim sum') || name.includes('dumpling')) return 'Oolong Tea';
    if (name.includes('pho') || name.includes('bun cha')) return 'Spring Rolls & Lime Soda';
    if (name.includes('fish') && name.includes('chips')) return 'Beer & Tartare Sauce';

    // 3. Fallback to Country Default if no specific keyword matched
    const list = pairingData[countryCode] || pairingData.default;
    return list[Math.floor(Math.random() * list.length)];
  };

  // Basic Configuration Data (Headers & Stats)
  const countryConfig = {
    kr: {
      name: "South Korea",
      lang: "ko",
      headers: { lunch: "☀️ 점심 메뉴 추천", dinner: "🌙 저녁 메뉴 추천", info: "📊 결정 피로도 & 문화", btn: "🔄 클릭해서 메뉴변경" },
      stats: "'결정 피로의 본고장'. 압도적인 배달 앱(배민, 쿠팡이츠) 인프라와 24시간 외식 문화가 결합해 매 끼니가 선택의 연속임.",
      labels: { kcal: "🔥 칼로리", carbs: "🍚 탄", protein: "🥩 단", fat: "🧈 지", pair: "💡 꿀조합" },
      article: {
        title: "왜 우리는 '오늘 뭐 먹지?'를 고민할까요?",
        content: `
          <p>현대 사회에서 "점심에 뭐 먹을까?"라는 질문은 매일 반복되는 스트레스의 원인이 되었습니다. <strong>결정 피로(Decision Fatigue)</strong>라고 불리는 이 현상은, 수많은 선택지 앞에서 우리의 뇌가 에너지를 소모하며 발생합니다. 배달 앱의 등장과 전 세계의 다양한 요리를 쉽게 접할 수 있게 되면서, 역설적으로 선택은 더 어려워졌습니다.</p>
          <h3>메뉴지니(MenuGenie)가 도와드립니다</h3>
          <p>메뉴지니는 식사 메뉴를 고르는 인지적 부담을 덜어드리기 위해 설계되었습니다. 한국의 찌개부터 미국의 버거까지, 각 문화권에 최적화된 랜덤 알고리즘을 통해 즉각적이고 맛있는 제안을 드립니다. 이를 통해 여러분은 아까운 정신 에너지를 더 중요한 일에 쓰고, 평소 생각지 못했던 새로운 요리를 발견하는 즐거움을 누릴 수 있습니다.</p>
          <h3>한눈에 보는 세계 식문화</h3>
          <p>음식은 단순한 연료가 아니라 문화입니다. 저희 데이터베이스는 15개국 이상의 독특한 식습관을 반영합니다. 한국의 함께 나눠 먹는 문화, 일본의 효율적인 식사, 태국의 다채로운 길거리 음식 등, 메뉴지니는 이러한 문화적 뉘앙스를 존중하며 추천해 드립니다.</p>
        `
      }
    },
    us: {
      name: "USA",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "'Paradox of Choice'. High stress due to endless customization options on apps like DoorDash.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat", pair: "💡 Best with" },
      article: {
        title: "Why Do We Struggle with \"What to Eat?\"",
        content: `
          <p>In modern society, the question "What should I eat for lunch?" has become a significant source of daily stress. This phenomenon, known as <strong>Decision Fatigue</strong>, occurs when the sheer volume of choices we face every day depletes our mental energy. With the rise of food delivery apps and global cuisine options, the paradox of choice makes simple decisions harder.</p>
          <h3>How MenuGenie Helps You</h3>
          <p>MenuGenie is designed to bypass the cognitive load of choosing a meal. By utilizing intelligent randomization algorithms tailored to specific cultural contexts (from Korean stews to American burgers), we provide instant, appetizing suggestions. This allows you to save your mental energy for more important tasks while discovering new dishes you might not have considered.</p>
          <h3>Global Food Culture at a Glance</h3>
          <p>Food is not just fuel; it's culture. Our database covers over 15 countries, reflecting the unique dietary habits of each region. Whether it's the communal dining culture of South Korea, the quick-service efficiency of Japan, or the diverse street food of Thailand, MenuGenie respects and highlights these cultural nuances in its recommendations.</p>
        `
      }
    },
    uk: {
      name: "UK",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Ranking #1 for most stressful daily decision: 'What to eat?'. High mobile dependency.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat", pair: "💡 Pair with" },
      article: {
        title: "Why Do We Struggle with \"What to Eat?\"",
        content: `
          <p>In modern society, the question "What should I eat for lunch?" has become a significant source of daily stress. This phenomenon, known as <strong>Decision Fatigue</strong>, occurs when the sheer volume of choices we face every day depletes our mental energy. With the rise of food delivery apps and global cuisine options, the paradox of choice makes simple decisions harder.</p>
          <h3>How MenuGenie Helps You</h3>
          <p>MenuGenie is designed to bypass the cognitive load of choosing a meal. By utilizing intelligent randomization algorithms tailored to specific cultural contexts (from Korean stews to American burgers), we provide instant, appetizing suggestions. This allows you to save your mental energy for more important tasks while discovering new dishes you might not have considered.</p>
          <h3>Global Food Culture at a Glance</h3>
          <p>Food is not just fuel; it's culture. Our database covers over 15 countries, reflecting the unique dietary habits of each region. Whether it's the communal dining culture of South Korea, the quick-service efficiency of Japan, or the diverse street food of Thailand, MenuGenie respects and highlights these cultural nuances in its recommendations.</p>
        `
      }
    },
    cn: {
      name: "China",
      lang: "zh-CN",
      headers: { lunch: "☀️ 午餐推荐", dinner: "🌙 晚餐推荐", info: "📊 决策疲劳与文化", btn: "🔄 换个菜单" },
      stats: "'超级应用的统治'. 虽然美团(Meituan)解决了所有饮食问题，但选择过多导致认知过载.",
      labels: { kcal: "🔥 卡路里", carbs: "🍚 碳水", protein: "🥩 蛋白", fat: "🧈 脂肪", pair: "💡 搭配" },
      article: {
        title: "为什么我们总在纠结“今天吃什么”？",
        content: `
          <p>在现代社会，“午饭吃什么？”已经成为日常压力的重要来源。这种现象被称为<strong>决策疲劳 (Decision Fatigue)</strong>，当我们面对海量选择时，大脑的能量会被迅速耗尽。随着外卖APP的普及和全球美食的触手可及，选择的悖论反而让简单的决定变得更加困难。</p>
          <h3>MenuGenie 如何帮助您</h3>
          <p>MenuGenie 旨在减轻您选择餐点时的认知负担。通过针对特定文化背景（从韩式炖菜到美式汉堡）的智能随机算法，我们为您提供即时且美味的建议。这让您可以将精神精力节省下来用于更重要的任务，同时发现您可能未曾考虑过的新菜肴。</p>
          <h3>全球饮食文化一瞥</h3>
          <p>食物不仅仅是燃料，它更是一种文化。我们的数据库涵盖了超过15个国家，反映了每个地区独特的饮食习惯。无论是韩国的聚餐文化，日本的高效快餐，还是泰国丰富多彩的街头美食，MenuGenie 都在推荐中尊重并突出了这些文化细微差别。</p>
        `
      }
    },
    au: {
      name: "Australia",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "66% of households feel fatigue daily. Struggle between health and taste with high mobile usage.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat", pair: "💡 Best with" },
      article: {
        title: "Why Do We Struggle with \"What to Eat?\"",
        content: `
          <p>In modern society, the question "What should I eat for lunch?" has become a significant source of daily stress. This phenomenon, known as <strong>Decision Fatigue</strong>, occurs when the sheer volume of choices we face every day depletes our mental energy. With the rise of food delivery apps and global cuisine options, the paradox of choice makes simple decisions harder.</p>
          <h3>How MenuGenie Helps You</h3>
          <p>MenuGenie is designed to bypass the cognitive load of choosing a meal. By utilizing intelligent randomization algorithms tailored to specific cultural contexts (from Korean stews to American burgers), we provide instant, appetizing suggestions. This allows you to save your mental energy for more important tasks while discovering new dishes you might not have considered.</p>
          <h3>Global Food Culture at a Glance</h3>
          <p>Food is not just fuel; it's culture. Our database covers over 15 countries, reflecting the unique dietary habits of each region. Whether it's the communal dining culture of South Korea, the quick-service efficiency of Japan, or the diverse street food of Thailand, MenuGenie respects and highlights these cultural nuances in its recommendations.</p>
        `
      }
    },
    ph: {
      name: "Philippines",
      lang: "tl",
      headers: { lunch: "☀️ Rekomendasyon sa Tanghalian", dinner: "🌙 Rekomendasyon sa Hapunan", info: "📊 Pagod sa Pagpapasya", btn: "🔄 Iba Pang Menu" },
      stats: "Highest screen time globally. Social media food culture creates conflict between 'craving' and 'trending'.",
      labels: { kcal: "🔥 Kalorya", carbs: "🍚 Carbs", protein: "🥩 Protina", fat: "🧈 Taba", pair: "💡 Bagay sa" },
      article: {
        title: "Bakit Tayo Nahihirapan sa \"Ano ang Kakainin?\"",
        content: `
          <p>Sa makabagong panahon, ang tanong na "Ano ang kakainin ko?" ay naging sanhi na ng stress araw-araw. Ang tawag dito ay <strong>Decision Fatigue</strong>, kung saan nauubos ang ating lakas ng isip dahil sa dami ng pagpipilian. Dahil sa mga food delivery apps, mas lalong humirap ang pagpili.</p>
          <h3>Paano Nakakatulong ang MenuGenie</h3>
          <p>Ang MenuGenie ay ginawa para hindi ka na mahirapan mag-isip. Gamit ang aming smart system, nagbibigay kami ng mabilis at masasarap na rekomendasyon. Makakatipid ka ng oras at baka makatuklas ka pa ng bagong paborito.</p>
          <h3>Kultura ng Pagkain sa Buong Mundo</h3>
          <p>Ang pagkain ay hindi lang pampabusog; ito ay kultura. Sakop ng aming database ang higit 15 bansa. Mula sa salu-salo ng Korea hanggang sa street food ng Thailand, ipinapakita ng MenuGenie ang ganda ng bawat kultura.</p>
        `
      }
    },
    br: {
      name: "Brazil",
      lang: "pt",
      headers: { lunch: "☀️ Almoço Recomendado", dinner: "🌙 Jantar Recomendado", info: "📊 Fadiga de Decisão", btn: "🔄 Outro Menu" },
      stats: "Largest delivery market in LatAm (iFood). Long mobile usage leads to endless scrolling for menus.",
      labels: { kcal: "🔥 Calorias", carbs: "🍚 Carbs", protein: "🥩 Prot", fat: "🧈 Gord", pair: "💡 Combina com" },
      article: {
        title: "Por que sofremos com \"O que comer?\"",
        content: `
          <p>Na sociedade moderna, a pergunta "O que devo comer no almoço?" tornou-se uma fonte significativa de estresse diário. Esse fenômeno, conhecido como <strong>Fadiga de Decisão</strong>, ocorre quando o grande volume de escolhas que enfrentamos todos os dias esgota nossa energia mental. Com o surgimento de aplicativos de entrega e opções de culinária global, o paradoxo da escolha torna as decisões simples mais difíceis.</p>
          <h3>Como o MenuGenie Ajuda Você</h3>
          <p>O MenuGenie foi projetado para evitar a carga cognitiva de escolher uma refeição. Utilizando algoritmos de randomização inteligentes adaptados a contextos culturais específicos, fornecemos sugestões instantâneas e apetitosas. Isso permite que você economize sua energia mental para tarefas mais importantes enquanto descobre novos pratos.</p>
          <h3>Cultura Alimentar Global em Resumo</h3>
          <p>Comida não é apenas combustível; é cultura. Nosso banco de dados cobre mais de 15 países. Seja a cultura de jantar em grupo da Coreia do Sul ou a comida de rua diversificada da Tailândia, o MenuGenie respeita e destaca essas nuances culturais.</p>
        `
      }
    },
    tw: {
      name: "Taiwan",
      lang: "zh-TW",
      headers: { lunch: "☀️ 午餐推薦", dinner: "🌙 晚餐推薦", info: "📊 決策疲勞與文化", btn: "🔄 換個菜單" },
      stats: "High reliance on convenience stores and dining out. Overwhelmed by mobile search for dense restaurant options.",
      labels: { kcal: "🔥 卡路里", carbs: "🍚 碳水", protein: "🥩 蛋白", fat: "🧈 脂肪", pair: "💡 搭配" },
      article: {
        title: "為什麼我們總在糾結「今天吃什麼」？",
        content: `
          <p>在現代社會，「午餐吃什麼？」已經成為日常壓力的重要來源。這種現象被稱為<strong>決策疲勞 (Decision Fatigue)</strong>，當我們面對海量選擇時，大腦的能量會被迅速耗盡。隨著外送APP的普及和全球美食的觸手可及，選擇的悖論反而讓簡單的決定變得更加困難。</p>
          <h3>MenuGenie 如何幫助您</h3>
          <p>MenuGenie 旨在減輕您選擇餐點時的認知負擔。通過針對特定文化背景（從韓式燉菜到美式漢堡）的智能隨機算法，我們為您提供即時且美味的建議。這讓您可以將精神精力節省下來用於更重要的任務，同時發現您可能未曾考慮過的新菜餚。</p>
          <h3>全球飲食文化一瞥</h3>
          <p>食物不僅僅是燃料，它更是一種文化。我們的數據庫涵蓋了超過15個國家，反映了每個地區獨特的飲食習慣。無論是韓國的聚餐文化，日本的高效快餐，還是泰國豐富多彩的街頭美食，MenuGenie 都在推薦中尊重並突出了這些文化細微差別。</p>
        `
      }
    },
    jp: {
      name: "Japan",
      lang: "ja",
      headers: { lunch: "☀️ ラン치のおすすめ", dinner: "🌙 ディナーのおすすめ", info: "📊 決定疲労と文化", btn: "🔄 別のメニュー" },
      stats: "Traditional 'indecisiveness' mixed with sophisticated review apps (Tabelog) deepens the dilemma.",
      labels: { kcal: "🔥 カロリー", carbs: "🍚 炭水", protein: "🥩 蛋白", fat: "🧈 脂質", pair: "💡 おすすめ" },
      article: {
        title: "なぜ私たちは「今日何を食べよう？」と悩むのか",
        content: `
          <p>現代社会において、「昼食に何を食べようか？」という問いは、日々のストレスの大きな原因となっています。<strong>決定疲労 (Decision Fatigue)</strong> と呼ばれるこの現象は、私たちが毎日直面する膨大な選択肢が精神的エネルギーを消耗させることで起こります。フードデリバリーアプリや世界中の料理が身近になったことで、選択のパラドックスが単純な決断をより難しくしています。</p>
          <h3>MenuGenieがどのように役立つか</h3>
          <p>MenuGenieは、食事を選ぶ際の認知的負荷を回避するために設計されています。特定の文化的背景（韓国のチゲからアメリカのハンバーガーまで）に合わせたインテリジェントなランダムアルゴリズムを使用することで、即座に食欲をそそる提案を行います。これにより、精神的エネルギーをより重要なタスクのために温存し、これまで考えもしなかった新しい料理を発見することができます。</p>
          <h3>世界中の食文化を一目で</h3>
          <p>食事は単なる燃料ではなく、文化です。私たちのデータベースは15カ国以上をカバーしており、各地域のユニークな食習慣を反映しています。韓国の皆で食事を共にする文化や、日本の効率的な食事、タイの多様な屋台料理など、MenuGenieはこれらの文化的なニュアンスを尊重し、推奨事項に反映させています。</p>
        `
      }
    },
    in: {
      name: "India",
      lang: "hi",
      headers: { lunch: "☀️ दोपहर के भोजन का सुझाव", dinner: "🌙 रात के खाने का सुझाव", info: "📊 निर्णय थकान", btn: "🔄 दूसरा मेनू" },
      stats: "Explosion of Zomato/Swiggy usage. Digital dilemma amidst countless spices and side dish combinations.",
      labels: { kcal: "🔥 कैलोरी", carbs: "🍚 कार्ब्स", protein: "🥩 प्रोटीन", fat: "🧈 वसा", pair: "💡 इसके साथ" },
      article: {
        title: "हम \"क्या खाएं?\" को लेकर संघर्ष क्यों करते हैं?",
        content: `
          <p>आधुनिक समाज में, "मुझे दोपहर के भोजन में क्या खाना चाहिए?" यह प्रश्न दैनिक तनाव का एक महत्वपूर्ण स्रोत बन गया है। इस घटना को <strong>निर्णय थकान (Decision Fatigue)</strong> के रूप में जाना जाता है, जो तब होती है जब विकल्पों की भारी मात्रा हमारी मानसिक ऊर्जा को खत्म कर देती है।</p>
          <h3>MenuGenie आपकी मदद कैसे करता है</h3>
          <p>MenuGenie को भोजन चुनने के बोझ को कम करने के लिए डिज़ाइन किया गया है। बुद्धिमान रैंडमाइजेशन एल्गोरिदम का उपयोग करके, हम तुरंत और स्वादिष्ट सुझाव प्रदान करते हैं। यह आपको अधिक महत्वपूर्ण कार्यों के लिए अपनी मानसिक ऊर्जा बचाने की अनुमति देता है।</p>
          <h3>वैश्विक खाद्य संस्कृति</h3>
          <p>भोजन केवल ईंधन नहीं है; यह संस्कृति है। हमारा डेटाबेस 15 से अधिक देशों को कवर करता है। चाहे वह दक्षिण कोरिया की सामुदायिक भोजन संस्कृति हो या थाईलैंड का स्ट्रीट फूड, MenuGenie इन सांस्कृतिक बारीकियों का सम्मान करता है।</p>
        `
      }
    },
    ca: {
      name: "Canada",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Similar delivery culture to USA. Cold weather leads to longer app browsing times instead of going out.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat", pair: "💡 Best with" },
      article: {
        title: "Why Do We Struggle with \"What to Eat?\"",
        content: `
          <p>In modern society, the question "What should I eat for lunch?" has become a significant source of daily stress. This phenomenon, known as <strong>Decision Fatigue</strong>, occurs when the sheer volume of choices we face every day depletes our mental energy. With the rise of food delivery apps and global cuisine options, the paradox of choice makes simple decisions harder.</p>
          <h3>How MenuGenie Helps You</h3>
          <p>MenuGenie is designed to bypass the cognitive load of choosing a meal. By utilizing intelligent randomization algorithms tailored to specific cultural contexts (from Korean stews to American burgers), we provide instant, appetizing suggestions. This allows you to save your mental energy for more important tasks while discovering new dishes you might not have considered.</p>
          <h3>Global Food Culture at a Glance</h3>
          <p>Food is not just fuel; it's culture. Our database covers over 15 countries, reflecting the unique dietary habits of each region. Whether it's the communal dining culture of South Korea, the quick-service efficiency of Japan, or the diverse street food of Thailand, MenuGenie respects and highlights these cultural nuances in its recommendations.</p>
        `
      }
    },
    th: {
      name: "Thailand",
      lang: "th",
      headers: { lunch: "☀️ แนะนำมื้อกลางวัน", dinner: "🌙 แนะนำมื้อเย็น", info: "📊 ความเหนื่อยล้าในการตัดสินใจ", btn: "🔄 เมนูอื่น" },
      stats: "Grab delivery culture. Variety of street food moving to digital platforms creates too many choices.",
      labels: { kcal: "🔥 แคลอรี่", carbs: "🍚 คาร์บ", protein: "🥩 โปรตีน", fat: "🧈 ไขมัน", pair: "💡 กินกับ" },
      article: {
        title: "ทำไมเราถึงลำบากใจกับคำถามว่า \"กินอะไรดี?\"",
        content: `
          <p>ในสังคมสมัยใหม่ คำถามที่ว่า "เที่ยงนี้กินอะไรดี?" กลายเป็นแหล่งความเครียดประจำวัน ปรากฏการณ์นี้เรียกว่า <strong>Decision Fatigue</strong> หรือความเหนื่อยล้าจากการตัดสินใจ ซึ่งเกิดขึ้นเมื่อตัวเลือกที่มีมากมายมหาศาลทำให้พลังงานสมองของเราหมดไป</p>
          <h3>MenuGenie ช่วยคุณได้อย่างไร</h3>
          <p>MenuGenie ถูกออกแบบมาเพื่อลดภาระในการเลือกอาหาร ด้วยการใช้อัลกอริทึมการสุ่มอัจฉริยะที่ปรับให้เข้ากับบริบททางวัฒนธรรม เราให้คำแนะนำที่รวดเร็วและน่ารับประทาน สิ่งนี้ช่วยให้คุณประหยัดพลังงานสมองไว้สำหรับงานที่สำคัญกว่า</p>
          <h3>วัฒนธรรมอาหารทั่วโลก</h3>
          <p>อาหารไม่ใช่แค่เชื้อเพลิง แต่มันคือวัฒนธรรม ฐานข้อมูลของเราครอบคลุมกว่า 15 ประเทศ ไม่ว่าจะเป็นวัฒนธรรมการกินร่วมกันของเกาหลีใต้ หรือสตรีทฟู้ดที่หลากหลายของไทย MenuGenie เคารพและเน้นย้ำถึงความแตกต่างทางวัฒนธรรมเหล่านี้</p>
        `
      }
    },
    sg: {
      name: "Singapore",
      lang: "en",
      headers: { lunch: "☀️ Lunch Recommendation", dinner: "🌙 Dinner Recommendation", info: "📊 Decision Fatigue & Culture", btn: "🔄 Click for Another Menu" },
      stats: "Too many hawker centers in a small area. 'Foodie' culture leads to time spent finding the best value/taste.",
      labels: { kcal: "🔥 Calories", carbs: "🍚 Carbs", protein: "🥩 Protein", fat: "🧈 Fat", pair: "💡 Best with" },
      article: {
        title: "Why Do We Struggle with \"What to Eat?\"",
        content: `
          <p>In modern society, the question "What should I eat for lunch?" has become a significant source of daily stress. This phenomenon, known as <strong>Decision Fatigue</strong>, occurs when the sheer volume of choices we face every day depletes our mental energy. With the rise of food delivery apps and global cuisine options, the paradox of choice makes simple decisions harder.</p>
          <h3>How MenuGenie Helps You</h3>
          <p>MenuGenie is designed to bypass the cognitive load of choosing a meal. By utilizing intelligent randomization algorithms tailored to specific cultural contexts (from Korean stews to American burgers), we provide instant, appetizing suggestions. This allows you to save your mental energy for more important tasks while discovering new dishes you might not have considered.</p>
          <h3>Global Food Culture at a Glance</h3>
          <p>Food is not just fuel; it's culture. Our database covers over 15 countries, reflecting the unique dietary habits of each region. Whether it's the communal dining culture of South Korea, the quick-service efficiency of Japan, or the diverse street food of Thailand, MenuGenie respects and highlights these cultural nuances in its recommendations.</p>
        `
      }
    },
    ae: {
      name: "UAE",
      lang: "ar",
      headers: { lunch: "☀️ توصية الغداء", dinner: "🌙 توصية العشاء", info: "📊 إرهاق القرار والثقافة", btn: "🔄 قائمة أخرى" },
      stats: "High smartphone penetration + mix of global cuisines. Ability to order anything makes choosing harder.",
      labels: { kcal: "🔥 سعرات", carbs: "🍚 كربوهيدرات", protein: "🥩 بروتين", fat: "🧈 دهون", pair: "💡 أفضل مع" },
      article: {
        title: "لماذا نعاني مع سؤال \"ماذا نأكل؟\"",
        content: `
          <p>في المجتمع الحديث، أصبح سؤال "ماذا يجب أن آكل للغداء؟" مصدراً كبيراً للتوتر اليومي. هذه الظاهرة، المعروفة باسم <strong>إرهاق القرار</strong>، تحدث عندما يستنزف حجم الخيارات الهائل طاقتنا العقلية.</p>
          <h3>كيف يساعدك MenuGenie</h3>
          <p>تم تصميم MenuGenie لتجاوز العبء المعرفي لاختيار وجبة. من خلال استخدام خوارزميات عشوائية ذكية مصممة خصيصاً لسياقات ثقافية محددة، نقدم اقتراحات فورية وشهية. يتيح لك ذلك توفير طاقتك الذهنية لمهام أكثر أهمية.</p>
          <h3>لمحة عن ثقافة الطعام العالمية</h3>
          <p>الطعام ليس مجرد وقود؛ إنه ثقافة. تغطي قاعدة بياناتنا أكثر من 15 دولة. سواء كانت ثقافة تناول الطعام الجماعي في كوريا الجنوبية، أو طعام الشارع المتنوع في تايلاند، فإن MenuGenie يحترم ويسلط الضوء على هذه الفروق الثقافية.</p>
        `
      }
    },
    de: {
      name: "Germany",
      lang: "de",
      headers: { lunch: "☀️ Mittagessen Empfehlung", dinner: "🌙 Abendessen Empfehlung", info: "📊 Entscheidungsmüdigkeit", btn: "🔄 Anderes Menü" },
      stats: "Surging delivery trend. Efficiency valued, but increasing variety causes fatigue among the youth.",
      labels: { kcal: "🔥 Kalorien", carbs: "🍚 Kohlen", protein: "🥩 Protein", fat: "🧈 Fett", pair: "💡 Dazu passt" },
      article: {
        title: "Warum fällt uns die Frage \"Was essen wir?\" so schwer?",
        content: `
          <p>In der modernen Gesellschaft ist die Frage "Was soll ich zu Mittag essen?" zu einer bedeutenden Quelle täglichen Stresses geworden. Dieses Phänomen, bekannt als <strong>Entscheidungsmüdigkeit (Decision Fatigue)</strong>, tritt auf, wenn die schiere Menge an Auswahlmöglichkeiten unsere mentale Energie erschöpft. Mit dem Aufstieg von Liefer-Apps und globalen Küchen macht das Paradox der Wahl einfache Entscheidungen schwerer.</p>
          <h3>Wie MenuGenie Ihnen hilft</h3>
          <p>MenuGenie wurde entwickelt, um die kognitive Belastung bei der Essenswahl zu umgehen. Durch intelligente Zufallsalgorithmen, die auf spezifische kulturelle Kontexte zugeschnitten sind (von koreanischen Eintöpfen bis zu amerikanischen Burgern), bieten wir sofortige, appetitliche Vorschläge. So können Sie Ihre mentale Energie für wichtigere Aufgaben sparen und gleichzeitig neue Gerichte entdecken.</p>
          <h3>Globale Esskultur auf einen Blick</h3>
          <p>Essen ist nicht nur Treibstoff; es ist Kultur. Unsere Datenbank deckt über 15 Länder ab und spiegelt die einzigartigen Essgewohnheiten jeder Region wider. Ob es die gemeinschaftliche Esskultur Südkoreas ist, die Schnelligkeit in Japan oder das vielfältige Street Food in Thailand – MenuGenie respektiert und hebt diese kulturellen Nuancen hervor.</p>
        `
      }
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
    
    // Add pairing via Smart Logic
    const currentCountry = document.getElementById('country-selector').value || 'kr';
    const pairing = getSmartPairing(name, currentCountry);
    
    return { name, desc, imageUrl, nutr, pairing };
  };

  // Helper: Get Random Item from Array (Generic)
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Helper: Classify Menu as Lunch (Light) or Dinner (Heavy)
  const classifyMealType = (menuName, countryCode) => {
    const name = menuName.toLowerCase();
    
    // Universal Lunch Keywords (Light, Quick, Single Dish)
    const lunchKeywords = [
      'sandwich', 'toast', 'burger', 'hot dog', 'salad', 'noodle', 'ramen', 'udon', 'soba', 'pasta', 
      'rice bowl', 'bibimbap', 'gimbap', 'donburi', 'curry', 'soup', 'stew', 'jjigae', 'gukbap', 
      'pho', 'pad thai', 'taco', 'burrito', 'wrap', 'dim sum', 'dumpling', 'fried rice', 'congee',
      'lunch', 'bento', 'set', 'meal'
    ];

    // Universal Dinner Keywords (Heavy, Sharing, Premium, Alcohol-pairing)
    const dinnerKeywords = [
      'steak', 'roast', 'bbq', 'ribs', 'grill', 'platter', 'sashimi', 'sushi', 'hot pot', 'jeongol',
      'bossam', 'jokbal', 'samgyeopsal', 'galbi', 'chicken', 'pizza', 'course', 'duck', 'lamb', 
      'crab', 'lobster', 'seafood', 'stew', 'gamjatang', 'mara', 'paella', 'fajitas', 'fondue'
    ];

    // Country Specific Overrides
    if (countryCode === 'kr') {
      if (name.includes('백반') || name.includes('도시락') || name.includes('분식')) return 'lunch';
      if (name.includes('회') || name.includes('곱창') || name.includes('전골') || name.includes('안주')) return 'dinner';
    }

    // Scoring System
    let lunchScore = 0;
    let dinnerScore = 0;

    lunchKeywords.forEach(kw => { if (name.includes(kw)) lunchScore++; });
    dinnerKeywords.forEach(kw => { if (name.includes(kw)) dinnerScore++; });

    // Tie-breaking or ambiguous cases default to 'both' (which means eligible for either, but we prefer distinct)
    if (lunchScore > dinnerScore) return 'lunch';
    if (dinnerScore > lunchScore) return 'dinner';
    
    // Specific logic for common items that fit both but lean one way based on context
    if (name.includes('pizza') || name.includes('pasta')) return 'lunch'; // Leans lunch often but ok for dinner
    if (name.includes('stew') || name.includes('soup')) return 'lunch';
    
    return 'both'; 
  };

  // Helper: Get distinct random items for lunch and dinner from the large list
  const getRandomMenuPair = (countryCode) => {
    const rawList = window.MENU_DATA[countryCode] || [];
    
    // Fallback if data is missing
    if (rawList.length === 0) {
      return {
        lunch: { name: "N/A", desc: "No menu data available.", imageUrl: "https://placehold.co/600x400?text=No+Data", nutr: { kcal: 0, carbs: 0, protein: 0, fat: 0 }, pairing: "N/A" },
        dinner: { name: "N/A", desc: "No menu data available.", imageUrl: "https://placehold.co/600x400?text=No+Data", nutr: { kcal: 0, carbs: 0, protein: 0, fat: 0 }, pairing: "N/A" }
      };
    }

    // Filter Lists
    const lunchOptions = rawList.filter(item => {
      const type = classifyMealType(item.split('|')[0], countryCode);
      return type === 'lunch' || type === 'both';
    });

    const dinnerOptions = rawList.filter(item => {
      const type = classifyMealType(item.split('|')[0], countryCode);
      return type === 'dinner' || type === 'both';
    });

    // Fallback to full list if filtered list is empty
    const finalLunchList = lunchOptions.length > 0 ? lunchOptions : rawList;
    const finalDinnerList = dinnerOptions.length > 0 ? dinnerOptions : rawList;

    // Pick Random
    const lunchItemStr = getRandomItem(finalLunchList);
    let dinnerItemStr = getRandomItem(finalDinnerList);

    // Try to ensure they are different
    let attempts = 0;
    while (lunchItemStr === dinnerItemStr && attempts < 10) {
      dinnerItemStr = getRandomItem(finalDinnerList);
      attempts++;
    }

    return {
      lunch: parseMenu(lunchItemStr),
      dinner: parseMenu(dinnerItemStr)
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

  // Helper to generate HTML for pairing and action buttons
  const getPairingHtml = (menuName, pairing, labels) => {
    const encodedName = encodeURIComponent(menuName);
    // Escaping single quotes for the onclick attribute
    const safeMenuName = menuName.replace(/'/g, "\\'");
    return `
      <div class="pairing-section">
        <p class="pairing-text">${labels.pair}: <strong>${pairing}</strong></p>
        <div class="action-buttons">
          <a href="https://www.google.com/maps/search/${encodedName}" target="_blank" rel="noopener noreferrer" class="action-btn map-btn">📍 식당 찾기</a>
          <a href="https://www.youtube.com/results?search_query=${encodedName}+먹방" target="_blank" rel="noopener noreferrer" class="action-btn youtube-btn">📺 영상 보기</a>
          <button class="action-btn share-btn" data-menu="${menuName}">📤 공유하기</button>
        </div>
      </div>
    `;
  };

  // Global Share Handler using Event Delegation
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('share-btn')) {
      const menuName = e.target.getAttribute('data-menu');
      const shareData = {
        title: '오늘의 메뉴 추천',
        text: `오늘 ${menuName} 어때요? 😋\n추천 메뉴 보러가기:`,
        url: window.location.href
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          // Fallback for PC
          await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          alert('메뉴가 클립보드에 복사되었습니다! 친구에게 붙여넣기 하세요. 📋');
        }
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  });

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
      ${getPairingHtml(lunch.name, lunch.pairing, config.labels)}
    `;
    dinnerCard.innerHTML = `
      <img src="${dinner.imageUrl}" alt="${dinner.name}" class="menu-image">
      <h3>${dinner.name}</h3>
      <p>${dinner.desc}</p>
      ${getNutrHtml(dinner.nutr, config.labels)}
      ${getPairingHtml(dinner.name, dinner.pairing, config.labels)}
    `;
    statsCard.innerHTML = `<p>${config.stats}</p>`;

    // Update SEO Article Content (Localized)
    if (config.article) {
      articleTitle.textContent = config.article.title;
      articleContent.innerHTML = config.article.content;
    }

    // Update Language Attribute
    document.documentElement.lang = config.lang;
    const contentArea = document.getElementById('content-area');
    contentArea.className = `lang-${config.lang}`;
  };

  // Initial Load with IP Geolocation
  const detectUserCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Geo-IP fetch failed');
      const data = await response.json();
      const countryCode = data.country_code.toLowerCase();
      
      // Check if we support this country, otherwise default to 'kr'
      if (countryConfig[countryCode]) {
        countrySelector.value = countryCode;
        updateContent(countryCode);
      } else {
        updateContent('kr');
      }
    } catch (error) {
      console.warn('Geolocation failed, defaulting to KR:', error);
      updateContent('kr');
    }
  };

  detectUserCountry();

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
          ${getPairingHtml(lunch.name, lunch.pairing, config.labels)}
        `;
        dinnerCard.innerHTML = `
          <img src="${dinner.imageUrl}" alt="${dinner.name}" class="menu-image">
          <h3>${dinner.name}</h3>
          <p>${dinner.desc}</p>
          ${getNutrHtml(dinner.nutr, config.labels)}
          ${getPairingHtml(dinner.name, dinner.pairing, config.labels)}
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
