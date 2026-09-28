// List of all IANA timezone identifiers
const ALL_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Moscow',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Bangkok',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Asia/Singapore',
  'Asia/Hong_Kong',
  'Australia/Sydney',
  'Pacific/Auckland',
  'America/Toronto',
  'America/Mexico_City',
  'America/Argentina/Buenos_Aires',
  'America/Sao_Paulo',
  'Africa/Cairo',
  'Africa/Johannesburg',
  'Asia/Jakarta',
  'Asia/Manila',
];

const DEFAULT_TIMEZONES = [
  { timezone: 'UTC', label: 'UTC' },
  { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, label: 'Local Time' },
  { timezone: 'America/New_York', label: 'New York' },
  { timezone: 'Europe/London', label: 'London' },
  { timezone: 'Asia/Tokyo', label: 'Tokyo' },
  { timezone: 'Asia/Singapore', label: 'Singapore' },
];

let displayedTimezones = [];

const clockGrid = document.getElementById('clock-grid');
const addBtn = document.getElementById('add-timezone-btn');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const timezoneSearch = document.getElementById('timezone-search');
const timezoneList = document.getElementById('timezone-list');

// Initialize
function init() {
  loadFromStorage();
  if (displayedTimezones.length === 0) {
    displayedTimezones = [...DEFAULT_TIMEZONES];
  }
  render();
  updateClocks();
  setInterval(updateClocks, 1000);
}

// Save to localStorage
function saveToStorage() {
  localStorage.setItem('timezones', JSON.stringify(displayedTimezones));
}

// Load from localStorage
function loadFromStorage() {
  const saved = localStorage.getItem('timezones');
  if (saved) {
    try {
      displayedTimezones = JSON.parse(saved);
    } catch (e) {
      displayedTimezones = [];
    }
  }
}

// Format time for a given timezone
function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

// Format date for a given timezone
function formatDate(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

// Get UTC offset for a timezone
function getUTCOffset(date, timeZone) {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
  const diff = (tzDate - utcDate) / (1000 * 60 * 60);
  const sign = diff >= 0 ? '+' : '';
  return `UTC${sign}${diff.toFixed(1)}`;
}

// Update all clock displays
function updateClocks() {
  const now = new Date();
  displayedTimezones.forEach((item, index) => {
    const timeEl = document.getElementById(`time-${index}`);
    const dateEl = document.getElementById(`date-${index}`);
    const offsetEl = document.getElementById(`offset-${index}`);

    if (timeEl && dateEl) {
      timeEl.textContent = formatTime(now, item.timezone);
      dateEl.textContent = formatDate(now, item.timezone);
      if (offsetEl) {
        offsetEl.textContent = getUTCOffset(now, item.timezone);
      }
    }
  });
}

// Render clock cards
function render() {
  clockGrid.innerHTML = '';
  displayedTimezones.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'clock-card';

    const header = document.createElement('div');
    header.className = 'clock-card-header';

    const title = document.createElement('h2');
    title.textContent = item.label;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '✕';
    removeBtn.onclick = () => removeTimezone(index);

    header.appendChild(title);
    header.appendChild(removeBtn);

    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'time-display';
    timeDisplay.id = `time-${index}`;
    timeDisplay.textContent = '00:00:00';

    const dateDisplay = document.createElement('div');
    dateDisplay.className = 'time-date';
    dateDisplay.id = `date-${index}`;
    dateDisplay.textContent = 'Loading...';

    const offsetDisplay = document.createElement('div');
    offsetDisplay.className = 'time-offset';
    offsetDisplay.id = `offset-${index}`;
    offsetDisplay.textContent = 'UTC';

    card.appendChild(header);
    card.appendChild(timeDisplay);
    card.appendChild(dateDisplay);
    card.appendChild(offsetDisplay);

    clockGrid.appendChild(card);
  });
}

// Remove a timezone from display
function removeTimezone(index) {
  displayedTimezones.splice(index, 1);
  saveToStorage();
  render();
}

// Add a timezone
function addTimezone(timezone, label) {
  const exists = displayedTimezones.some((item) => item.timezone === timezone);
  if (!exists) {
    displayedTimezones.push({ timezone, label });
    saveToStorage();
    render();
  }
  closeModal();
}

// Show modal
function openModal() {
  modal.classList.remove('hidden');
  timezoneSearch.focus();
  renderTimezoneOptions('');
}

// Close modal
function closeModal() {
  modal.classList.add('hidden');
  timezoneSearch.value = '';
}

// Render timezone options in modal
function renderTimezoneOptions(filter) {
  timezoneList.innerHTML = '';
  const filtered = ALL_TIMEZONES.filter((tz) =>
    tz.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    timezoneList.innerHTML = '<div style="color: var(--muted); padding: 20px; text-align: center;">No timezones found</div>';
    return;
  }

  filtered.forEach((tz) => {
    const option = document.createElement('div');
    option.className = 'timezone-option';
    option.textContent = tz;
    option.onclick = () => addTimezone(tz, tz.split('/').pop().replace(/_/g, ' '));
    timezoneList.appendChild(option);
  });
}

// Reset to defaults
function resetToDefaults() {
  displayedTimezones = [...DEFAULT_TIMEZONES];
  saveToStorage();
  render();
}

// Event listeners
addBtn.addEventListener('click', openModal);
resetBtn.addEventListener('click', resetToDefaults);
modalClose.addEventListener('click', closeModal);
timezoneSearch.addEventListener('input', (e) => {
  renderTimezoneOptions(e.target.value);
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Initialize app
init();
