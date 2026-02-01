document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const gameScreen = document.getElementById('game-screen');
  const winnerScreen = document.getElementById('winner-screen');
  const countrySelect = document.getElementById('country-select');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');

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

  // Country Config (Synced with main.js logic ideally, but simplified here)
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

  // Game State
  let currentRound = [];
  let nextRound = [];
  let currentMatchIndex = 0;
  let totalMatchesInRound = 0;

  // Helper: Get Image URL (Same as main.js)
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
    const rawData = window.MENU_DATA[country];

    if (!rawData || rawData.length < 16) {
      alert("Not enough menu data for this country to play World Cup! (Need at least 16)");
      return;
    }

    // Pick 16 random unique items
    const shuffledData = shuffle([...rawData]);
    currentRound = shuffledData.slice(0, 16).map(itemStr => {
      const [name] = itemStr.split('|');
      return { name, img: getImageUrl(name) };
    });

    nextRound = [];
    currentMatchIndex = 0;
    totalMatchesInRound = 8; // 16 items = 8 matches

    introScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    winnerScreen.style.display = 'none';

    renderMatch();
  });

  // Render Current Match
  const renderMatch = () => {
    // Check if round is finished
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

    // Update Round Indicator Text
    let roundName = "";
    if (totalMatchesInRound === 8) roundName = "Round of 16";
    else if (totalMatchesInRound === 4) roundName = "Quarter-Finals";
    else if (totalMatchesInRound === 2) roundName = "Semi-Finals";
    else if (totalMatchesInRound === 1) roundName = "Final 🏆";

    roundIndicator.textContent = `${roundName} (${currentMatchIndex + 1}/${totalMatchesInRound})`;
    
    // Progress Bar
    const percent = ((currentMatchIndex) / totalMatchesInRound) * 100;
    progressFill.style.width = `${percent}%`;
  };

  // Handle Selection
  const handleSelect = (winnerIndex) => {
    const winnerItem = currentRound[currentMatchIndex * 2 + winnerIndex];
    nextRound.push(winnerItem);
    currentMatchIndex++;
    
    // Simple transition effect
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
      // Game Over - We have a winner
      showWinner(nextRound[0]);
    } else {
      // Prepare next round
      currentRound = [...nextRound];
      nextRound = [];
      currentMatchIndex = 0;
      totalMatchesInRound = currentRound.length / 2;
      
      // Shuffle slightly to mix up pairs? No, tournament bracket usually fixed order.
      // But standard shuffling between rounds prevents predictability if needed.
      // We'll keep bracket order (Winner of match 1 vs Winner of match 2).
      
      renderMatch();
    }
  };

  // Show Winner
  const showWinner = (winner) => {
    gameScreen.style.display = 'none';
    winnerScreen.style.display = 'block';
    
    winnerName.textContent = winner.name;
    winnerImg.src = winner.img;
    
    // Fire confetti logic could go here
  };

  // Restart
  restartBtn.addEventListener('click', () => {
    winnerScreen.style.display = 'none';
    introScreen.style.display = 'block';
  });

});
