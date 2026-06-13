const statusSteps = [
  {
    label: 'Order Placed',
    note: 'Your order is confirmed and payment has been received.',
    eta: 'Confirmation sent'
  },
  {
    label: 'Packed',
    note: 'The seller has packed your item and it is ready for dispatch.',
    eta: 'Packing completed'
  },
  {
    label: 'Shipped',
    note: 'Your package has left the warehouse and is on its way.',
    eta: 'Arriving in 2 days'
  },
  {
    label: 'Out for Delivery',
    note: 'The courier is on its way to your delivery address.',
    eta: 'Today, between 4 PM and 8 PM'
  },
  {
    label: 'Delivered',
    note: 'Your order has been delivered successfully.',
    eta: 'Delivered'
  }
];

function getStatusIndex(orderId) {
  const value = String(orderId || '')
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return value % statusSteps.length;
}

function renderTimeline(currentIndex) {
  const timeline = document.getElementById('timeline');
  const statusCard = document.getElementById('status-card');

  if (!timeline || !statusCard) {
    return;
  }

  const currentStatus = statusSteps[currentIndex];

  statusCard.innerHTML = `
    <p class="status-label">Current status</p>
    <h3>${currentStatus.label}</h3>
    <p>${currentStatus.note}</p>
    <span class="eta-tag">ETA: ${currentStatus.eta}</span>
  `;

  timeline.innerHTML = statusSteps
    .map((step, index) => {
      const isActive = index <= currentIndex;
      const isCurrent = index === currentIndex;

      return `
        <div class="timeline-row">
          <div class="step ${isActive ? 'done' : ''}">
            <div class="circle ${isActive ? 'active' : ''}"></div>
            <div class="status-text">
              <strong>${step.label}</strong>
              <span>${isCurrent ? 'Current step' : isActive ? 'Completed' : 'Upcoming'}</span>
            </div>
          </div>
          ${index < statusSteps.length - 1 ? '<div class="line"></div>' : ''}
        </div>
      `;
    })
    .join('');

  timeline.style.display = 'block';
}

function trackOrder() {
  const orderId = document.getElementById('orderId').value.trim();

  if (!orderId) {
    alert('Please enter Order ID');
    return;
  }

  const currentIndex = getStatusIndex(orderId);
  renderTimeline(currentIndex);
}
