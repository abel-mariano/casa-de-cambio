import Swal from 'sweetalert2';
import './style.css';

// Elements
const searchButton = document.querySelector('.search-btn');
const coinInput = document.querySelector('#coin-input');
const coinTitle = document.querySelector('.coins-title');
const coinUlList = document.querySelector('.coins');

// Functions
const renderCoins = (coins) => {
  coinUlList.innerHTML = '';
  const numberFixed = 3;
  const coinArray = Object.entries(coins);

  coinArray.forEach((coin) => {
    const [coinName, value] = coin;

    const li = document.createElement('li');
    li.classList.add('coin');
    const img = document.createElement('img');
    img.classList.add('image-icon');
    img.src = '/src/images/coins.png';
    li.appendChild(img);
    const spanCoin = document.createElement('span');
    spanCoin.innerHTML = `<span class="color-coin">${coinName}</span>`;
    li.appendChild(spanCoin);
    const spanValue = document.createElement('span');
    spanValue.innerHTML = `
      <span class="color-coin-gold">${value.toFixed(numberFixed)}</span>`;
    li.appendChild(spanValue);
    coinUlList.append(li);
  });
};

const handleSearch = () => {
  coinTitle.innerHTML = '';

  const coin = coinInput.value;
  if (!coin) {
    Swal.fire({
      title: 'Ops...',
      text: 'Você precisa passar uma moeda',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  const url = `https://api.exchangerate.host/latest?base=${coin}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.base !== coin.toUpperCase()) {
        throw new Error('Moeda não existente!');
      }
      renderCoins(data.rates);
    })
    .catch((error) => {
      Swal.fire({
        title: 'Ops...',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });

  coinTitle.innerHTML = `Valores referentes a 1 ${coin.toUpperCase()}`;
};

// Events
searchButton.addEventListener('click', handleSearch);
