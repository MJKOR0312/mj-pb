document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const gameScreen = document.getElementById('game-screen');
  const winnerScreen = document.getElementById('winner-screen');
  const countrySelect = document.getElementById('country-select');
  const roundSelect = document.getElementById('round-select');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const shareWinnerBtn = document.getElementById('share-winner-btn');

  const roundIndicator = document.getElementById('round-indicator');
  const progressFill = document.getElementById('progress-fill');

  const cardLeft = document.getElementById('card-left');
  const cardRight = document.getElementById('card-right');
  const imgLeft = document.getElementById('img-left');
  const imgRight = document.getElementById('img-right');
  const nameLeft = document.getElementById('name-left');
  const nameRight = document.getElementById('name-right');
  const winnerImg = document.getElementById('winner-img');
  const winnerName = document.getElementById('winner-name');
  const titleElement = document.querySelector('#intro-screen h1');
  const startBtnText = document.getElementById('start-btn');

  // Translations for "Food World Cup"
  const translations = {
    kr: { title: "🏆 음식 월드컵", start: "게임 시작", rounds: "강", winner: "나의 최종 선택!", share: "결과 공유하기" },
    us: { title: "🏆 Food World Cup", start: "Start Game", rounds: " Round", winner: "Your Ultimate Choice!", share: "Share Winner" },
    uk: { title: "🏆 Food World Cup", start: "Start Game", rounds: " Round", winner: "Your Ultimate Choice!", share: "Share Winner" },
    jp: { title: "🏆 食べ物ワールドカップ", start: "ゲーム開始", rounds: "強", winner: "あなたの究극の選択！", share: "結果を共有" },
    cn: { title: "🏆 美食世界杯", start: "开始游戏", rounds: "强", winner: "你的最终选择！", share: "分享结果" },
    tw: { title: "🏆 美食世界盃", start: "開始遊戲", rounds: "強", winner: "你的最終選擇！", share: "分享結果" },
    th: { title: "🏆 ฟู้드 월드컵", start: "เริ่มเกม", rounds: "รอบ", winner: "ทางเลือกสุดท้ายของคุณ!", share: "แชร์ผลลัพธ์" },
    ph: { title: "🏆 Food World Cup", start: "Simulan ang Laro", rounds: " Round", winner: "Ang Iyong Piniling Pagkain!", share: "Ibahagi ang Resulta" },
    br: { title: "🏆 Copa do Mundo de Comida", start: "Começar Jogo", rounds: " Rodada", winner: "Sua Escolha Suprema!", share: "Compartilhar Vencedor" },
    in: { title: "🏆 फूड वर्ल्ड कप", start: "गेम शुरू करें", rounds: " राउंड", winner: "आपकी अंतिम पसंद!", share: "विजेता साझा करें" },
    ae: { title: "🏆 كأس العالم للطعام", start: "ابدأ اللعبة", rounds: " جولة", winner: "خيارك النهائي!", share: "شارك الفائز" },
    de: { title: "🏆 Food World Cup", start: "Spiel starten", rounds: " Runde", winner: "Deine ultimative Wahl!", share: "Gewinner teilen" }
  };

  const updateLanguage = (lang) => {
    const t = translations[lang] || translations.us;
    titleElement.textContent = t.title;
    startBtnText.textContent = t.start;
    // Update labels in the document
    document.querySelector('label[for="country-select"]').textContent = (lang === 'kr' ? "국가 선택:" : "Select Cuisine:");
    document.querySelector('label[for="round-select"]').textContent = (lang === 'kr' ? "라운드:" : "Rounds:");
  };

  // Country Config
  const countryNames = {
    kr: "South Korea 🇰🇷",
    us: "USA 🇺🇸",
    jp: "Japan 🇯🇵",
    cn: "China 🇨🇳",
    uk: "UK 🇬🇧",
    in: "India 🇮🇳",
    th: "Thailand 🇹🇭",
    au: "Australia 🇦🇺",
    ph: "Philippines 🇵🇭",
    br: "Brazil 🇧🇷",
    tw: "Taiwan 🇹🇼",
    ca: "Canada 🇨🇦",
    sg: "Singapore 🇸🇬",
    ae: "UAE 🇦🇪",
    de: "Germany 🇩🇪"
  };

  // Populate Country Select
  Object.keys(countryNames).forEach(code => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = countryNames[code];
    countrySelect.appendChild(opt);
  });

  // Initial language update based on default select value
  updateLanguage(countrySelect.value);
  
  countrySelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
  });

  // Game State
  let currentRound = [];
  let nextRound = [];
  let currentMatchIndex = 0;
  let totalMatchesInRound = 0;
  let selectedLang = 'kr';

  // Helper: Get Image URL
  const getImageUrl = (name) => {
    const encodedName = encodeURIComponent(name);
    return `https://tse2.mm.bing.net/th?q=${encodedName} food&w=400&h=400&c=7&rs=1&p=0`;
  };

  // Helper: Shuffle Array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Start Game
  startBtn.addEventListener('click', () => {
    const country = countrySelect.value;
    selectedLang = country;
    const targetRoundCount = parseInt(roundSelect.value, 10);
    const rawData = window.MENU_DATA[country];

    if (!rawData || rawData.length < targetRoundCount) {
      alert(`Not enough menu data! (Only ${rawData ? rawData.length : 0} available)`);
      return;
    }

    // Pick random unique items
    const shuffledData = shuffle([...rawData]);
    currentRound = shuffledData.slice(0, targetRoundCount).map(itemStr => {
      const [name] = itemStr.split('|');
      return { name, img: getImageUrl(name) };
    });

    nextRound = [];
    currentMatchIndex = 0;
    totalMatchesInRound = targetRoundCount / 2;

    introScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    winnerScreen.style.display = 'none';

    renderMatch();
  });

  // Render Current Match
  const renderMatch = () => {
    if (currentMatchIndex >= totalMatchesInRound) {
      proceedToNextRound();
      return;
    }

    const item1 = currentRound[currentMatchIndex * 2];
    const item2 = currentRound[currentMatchIndex * 2 + 1];

    nameLeft.textContent = item1.name;
    imgLeft.src = item1.img;
    
    nameRight.textContent = item2.name;
    imgRight.src = item2.img;

    const t = translations[selectedLang] || translations.us;
    let roundName = "";
    if (totalMatchesInRound === 16) roundName = `32${t.rounds}`;
    else if (totalMatchesInRound === 8) roundName = `16${t.rounds}`;
    else if (totalMatchesInRound === 4) roundName = `8${t.rounds}`;
    else if (totalMatchesInRound === 2) roundName = `4${t.rounds}`;
    else if (totalMatchesInRound === 1) roundName = (selectedLang === 'kr' ? "결승전 🏆" : "Final 🏆");

    roundIndicator.textContent = `${roundName} (${currentMatchIndex + 1}/${totalMatchesInRound})`;
    
    const percent = ((currentMatchIndex) / totalMatchesInRound) * 100;
    progressFill.style.width = `${percent}%`;
  };

  // Handle Selection
  const handleSelect = (winnerIndex) => {
    const winnerItem = currentRound[currentMatchIndex * 2 + winnerIndex];
    nextRound.push(winnerItem);
    currentMatchIndex++;
    
    gameScreen.style.opacity = '0';
    setTimeout(() => {
      renderMatch();
      gameScreen.style.opacity = '1';
    }, 200);
  };

  cardLeft.addEventListener('click', () => handleSelect(0));
  cardRight.addEventListener('click', () => handleSelect(1));

  // Proceed to Next Round
  const proceedToNextRound = () => {
    if (nextRound.length === 1) {
      showWinner(nextRound[0]);
    } else {
      currentRound = [...nextRound];
      nextRound = [];
      currentMatchIndex = 0;
      totalMatchesInRound = currentRound.length / 2;
      renderMatch();
    }
  };

  // Show Winner
  const showWinner = (winner) => {
    gameScreen.style.display = 'none';
    winnerScreen.style.display = 'block';
    
    const t = translations[selectedLang] || translations.us;
    document.querySelector('#winner-screen h1').textContent = t.winner;
    shareWinnerBtn.textContent = (selectedLang === 'kr' ? "📤 결과 공유하기" : "📤 Share Winner");
    
    winnerName.textContent = winner.name;
    winnerImg.src = winner.img;
  };

  // Share Winner Function
  shareWinnerBtn.addEventListener('click', async () => {
    const originalText = shareWinnerBtn.textContent;
    shareWinnerBtn.textContent = '📸 Generating...';
    
    try {
      // Capture the winner card area
      // We'll capture the specific card element to keep it clean
      const target = document.getElementById('winner-card');
      
      // Wait for image to load to ensure capture is complete
      if (!winnerImg.complete) {
          await new Promise(resolve => winnerImg.onload = resolve);
      }

      const canvas = await html2canvas(target, {
        useCORS: true,
        scale: 2, 
        backgroundColor: null
      });

      const winnerNameText = winnerName.textContent;

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([], "winner.png", { type: "image/png" })] })) {
        canvas.toBlob(async (blob) => {
          const file = new File([blob], `MenuGenie_Winner_${winnerNameText}.png`, { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: 'My Food World Cup Winner 🏆',
            text: `I chose ${winnerNameText} as my ultimate menu! What's your choice? #MenuGenie`
          });
        });
      } else {
        // Fallback: Download
        const link = document.createElement('a');
        link.download = `MenuGenie_Winner_${winnerNameText}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        alert('Image downloaded! Share your winner with friends. 🏆');
      }
    } catch (err) {
      console.error('Share failed:', err);
      alert('Failed to generate image. Copied link instead!');
      navigator.clipboard.writeText(window.location.href);
    } finally {
      shareWinnerBtn.textContent = originalText;
    }
  });

  // Restart
  restartBtn.addEventListener('click', () => {
    winnerScreen.style.display = 'none';
    introScreen.style.display = 'block';
  });

});
