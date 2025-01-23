async function fetchQuote() {
  const response = await fetch('https://your-energy.b.goit.study/api/quote', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

function saveQuoteToLocalStorage(quote) {
  const currentDate = new Date().toISOString().split('T')[0];
  localStorage.setItem(
    'quote',
    JSON.stringify({ date: currentDate, data: quote })
  );
}

function loadQuoteFromLocalStorage() {
  const storedQuote = JSON.parse(localStorage.getItem('quote'));
  if (storedQuote) {
    const currentDate = new Date().toISOString().split('T')[0];
    if (storedQuote.date === currentDate) {
      return storedQuote.data;
    }
  }
  return null;
}

async function displayQuote() {
  let quoteData = loadQuoteFromLocalStorage();
  if (!quoteData) {
    try {
      quoteData = await fetchQuote();
      saveQuoteToLocalStorage(quoteData);
    } catch (error) {
      console.error('Error fetching the quote:', error);
      return;
    }
  }
  document.querySelectorAll('.quote-text').forEach(element => {
    element.textContent = quoteData.quote;
  });
  document.querySelectorAll('.quote-author').forEach(element => {
    element.textContent = quoteData.author;
  });
}

document.addEventListener('DOMContentLoaded', displayQuote);
