
const exercises = [
    'Name 5 things you can see right now.',
    'Place your feet on the ground and notice the pressure.',
    'Slowly describe one object around you.',
    'Notice 3 sounds you can hear in this moment.',
    'Gently touch a nearby surface and focus on its texture.'
];

const exerciseBtn = document.getElementById('exerciseBtn');
const exerciseBox = document.getElementById('exerciseBox');

if (exerciseBtn && exerciseBox) {
    exerciseBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * exercises.length);
        exerciseBox.textContent = exercises[randomIndex];
        exerciseBox.classList.remove('text-muted');
    });
}

const breathBtn = document.getElementById('breathBtn');
const breathCircle = document.getElementById('breathCircle');
let breathInterval = null;

function startBreathing() {
    if (!breathCircle) return;
    let phase = 'inhale';
    let size = 140;

    breathCircle.style.transform = 'scale(1.2)';
    breathCircle.textContent = 'Inhale';
    phase = 'exhale';

    breathInterval = setInterval(() => {
        if (phase === 'inhale') {
            size = 170;
            breathCircle.style.transform = 'scale(1.2)';
            breathCircle.textContent = 'Inhale';
            phase = 'exhale';
        } else {
            size = 140;
            breathCircle.style.transform = 'scale(1)';
            breathCircle.textContent = 'Exhale';
            phase = 'inhale';
        }
    }, 4000);
}

function stopBreathing() {
    clearInterval(breathInterval);
    breathInterval = null;
    if (breathCircle) {
        breathCircle.style.transform = 'scale(1)';
        breathCircle.textContent = 'Ready';
    }
}

if (breathBtn) {
    breathBtn.addEventListener('click', () => {
        if (breathInterval) {
            stopBreathing();
            breathBtn.textContent = 'Start 4–4 breathing';
        } else {
            startBreathing();
            breathBtn.textContent = 'Stop';
        }
    });
}

const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

function hasCookieConsent() {
    return document.cookie.split(';').some(c => c.trim().startsWith('safeMindConsent='));
}

function showCookieBanner() {
    if (!hasCookieConsent() && cookieBanner) {
        cookieBanner.style.display = 'block';
        console.log("test");
    }
}

function acceptCookies() {
    const oneYear = 365 * 24 * 60 * 60;

    document.cookie =
        'safeMindConsent=1; max-age=' +
        oneYear +
        '; path=/; SameSite=Lax';

    if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }
}


if (cookieAccept) {
    cookieAccept.addEventListener('click', acceptCookies);
}

window.addEventListener('load', () => {
    setTimeout(showCookieBanner, 1500);
});
