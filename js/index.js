let totalAmount = 5500;
let donationHistory = [];
let currentAmounts = {
    noakhali: 0,
    feni: 600,
    quota: 2400
};

let showModalAfterDonation = false; 

function displayDonation() {
    document.getElementById('donationCards').style.display = 'block';
    document.getElementById('historySection').style.display = 'none';
    updateButtonStyles('donation');
}

function showHistory() {
    document.getElementById('donationCards').style.display = 'none';
    document.getElementById('historySection').style.display = 'block';
    updateHistoryCards();
    updateButtonStyles('history');
}

function donate(campaign) {
    let inputField, currentAmountElement;

    if (campaign === 'noakhali') {
        inputField = document.getElementById('noakhaliInput');
        currentAmountElement = document.getElementById('noakhaliAmount');
    } else if (campaign === 'feni') {
        inputField = document.getElementById('feniInput');
        currentAmountElement = document.getElementById('feniAmount');
    } else if (campaign === 'quota') {
        inputField = document.getElementById('quotaInput');
        currentAmountElement = document.getElementById('quotaAmount');
    }

    const donationAmount = parseFloat(inputField.value);
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }
    if (donationAmount > totalAmount) {
        alert('Insufficient balance for this donation.');
        return;
    }

    totalAmount -= donationAmount;
    document.getElementById('totalAmount').innerText = totalAmount + ' BDT';

    currentAmounts[campaign] += donationAmount;
    currentAmountElement.innerText = currentAmounts[campaign] + ' BDT';

    const donationDate = new Date();
    donationHistory.push({
        amount: donationAmount,
        campaign: campaign,
        date: donationDate
    });

    inputField.value = '';

    
    showModalAfterDonation = true;
    showModal(); 
}

function showModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'flex'; 
}

function closeModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'none'; 
}


window.onload = function() {
  if (showModalAfterDonation) {
      showModal();
      showModalAfterDonation = false; 
  } else {
      closeModal(); 
  }
}

function updateHistoryCards() {
    const historyCards = document.getElementById('historyCards');
    historyCards.innerHTML = ''; 

    donationHistory.forEach(donation => {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-md rounded-md p-4';
        card.innerHTML = `
            <p class="text-gray-700 font-bold">${donation.amount} BDT donated for ${getCampaignName(donation.campaign)}</p>
            <p class="text-gray-500">Date: ${donation.date.toString()}</p>
        `;
        historyCards.appendChild(card);
    });
}

function getCampaignName(campaign) {
    switch (campaign) {
        case 'noakhali':
            return 'Flood at Noakhali, Bangladesh';
        case 'feni':
            return 'Flood Relief in Feni, Bangladesh';
        case 'quota':
            return 'Aid for Injured in the Quota Movement';
        default:
            return '';
    }
}

function updateButtonStyles(active) {
    const donationButton = document.getElementById('donationButton');
    const historyButton = document.getElementById('historyButton');

    if (active === 'donation') {
        donationButton.classList.add('bg-[#B4F461]', 'text-black');
        donationButton.classList.remove('bg-white', 'text-gray-700');
        historyButton.classList.add('bg-white', 'text-gray-700');
        historyButton.classList.remove('bg-[#B4F461]', 'text-black');
    } else {
        donationButton.classList.add('bg-white', 'text-gray-700');
        donationButton.classList.remove('bg-[#B4F461]', 'text-black');
        historyButton.classList.add('bg-[#B4F461]', 'text-black');
        historyButton.classList.remove('bg-white', 'text-gray-700');
    }
}


displayDonation();