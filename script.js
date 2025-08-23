function initActivities(activities) {
    const list = document.getElementById('activity-list');
    activities.forEach(act => {
        const item = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = `Book ${act.name}`;
        btn.addEventListener('click', () => openBooking(act));
        item.textContent = act.name + ' ';
        item.appendChild(btn);
        list.appendChild(item);
    });
}

function openBooking(activity) {
    document.getElementById('booking-activity').textContent = activity.name;
    document.getElementById('booking-modal').classList.remove('hidden');
    document.getElementById('booking-form').onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        alert(`Thanks, ${name}! Your booking for ${activity.name} is received. We will contact you at ${email}.`);
        closeBooking();
    };
}

function closeBooking() {
    document.getElementById('booking-modal').classList.add('hidden');
    document.getElementById('booking-form').reset();
}

document.getElementById('close-modal').addEventListener('click', closeBooking);

function initMap(activities) {
    const map = L.map('map').setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    activities.forEach(act => {
        L.marker([act.lat, act.lng]).addTo(map).bindPopup(act.name);
    });
}

async function loadActivities() {
    const response = await fetch('activities.json');
    return await response.json();
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const activities = await loadActivities();
        initActivities(activities);
        initMap(activities);
    } catch (err) {
        console.error('Failed to load activities:', err);
    }
});
