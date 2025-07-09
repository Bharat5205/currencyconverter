const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');

async function populateCurrencies() {
  const res = await fetch('https://api.frankfurter.app/currencies');
  const data = await res.json();
  for (const code in data) {
    fromSelect.innerHTML += `<option value="${code}">${code} - ${data[code]}</option>`;
    toSelect.innerHTML += `<option value="${code}">${code} - ${data[code]}</option>`;
  }
  fromSelect.value = 'USD';
  toSelect.value = 'INR';
}

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = fromSelect.value;
  const to = toSelect.value;

  if (from === to) {
    document.getElementById('result').textContent = `Result: ${amount}`;
    return;
  }

  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
  const data = await res.json();
  document.getElementById('result').textContent = `Result: ${data.rates[to]} ${to}`;
}

populateCurrencies();
