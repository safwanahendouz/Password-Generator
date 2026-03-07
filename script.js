const inputSlider  = document.getElementById("inputSlider");
const sliderValue  = document.getElementById("sliderValue");
const passBox      = document.getElementById("passBox");
const lowercase    = document.getElementById("lowercase");
const Uppercase    = document.getElementById("Uppercase");
const numbers      = document.getElementById("numbers");
const symbols      = document.getElementById("symbols");
const genBtn       = document.getElementById("genBtn");
const copyBtn      = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");
const segs         = [1, 2, 3, 4].map(i => document.getElementById("seg" + i));
const toast        = document.getElementById("toast");

const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allNumbers = '0123456789';
const allSymbols = '&#%@!$*^+=?';

// --- Slider ---
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
    if (passBox.value) {
        passBox.value = generatePassword();
        updateStrength();
    }
});

// --- Generate button ---
genBtn.addEventListener('click', () => {
    const pwd = generatePassword();
    if (!pwd) return;
    passBox.value = pwd;
    updateStrength();
    // Shimmer flash animation
    genBtn.classList.remove('flash');
    void genBtn.offsetWidth; // reflow
    genBtn.classList.add('flash');
});

// --- Copy button ---
copyBtn.addEventListener('click', () => {
    if (!passBox.value) return;
    navigator.clipboard.writeText(passBox.value).then(() => {
        showToast('Copied to clipboard!');
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 2000);
    });
});

// --- Generate Password ---
function generatePassword() {
    let allChars = "";
    allChars += lowercase.checked ? lowerChars : "";
    allChars += Uppercase.checked ? upperChars : "";
    allChars += numbers.checked   ? allNumbers : "";
    allChars += symbols.checked   ? allSymbols : "";

    if (!allChars) {
        showToast('Select at least one option!', true);
        return "";
    }

    // Guarantee at least one character from each selected type
    let pwd = "";
    if (lowercase.checked) pwd += lowerChars[Math.floor(Math.random() * lowerChars.length)];
    if (Uppercase.checked) pwd += upperChars[Math.floor(Math.random() * upperChars.length)];
    if (numbers.checked)   pwd += allNumbers[Math.floor(Math.random() * allNumbers.length)];
    if (symbols.checked)   pwd += allSymbols[Math.floor(Math.random() * allSymbols.length)];

    const len = parseInt(inputSlider.value);
    for (let i = pwd.length; i < len; i++) {
        pwd += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle to avoid predictable prefix order
    return pwd.split('').sort(() => Math.random() - 0.5).join('');
}

// --- Strength Meter ---
function updateStrength() {
    const pwd = passBox.value;
    if (!pwd) { resetStrength(); return; }

    let score = 0;
    if (pwd.length >= 8)  score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    let level = 1;
    if (score <= 2) level = 1;
    else if (score <= 3) level = 2;
    else if (score <= 4) level = 3;
    else level = 4;

    const labels = ['', 'Weak', 'Fair', 'Strong', 'Excellent'];
    const colors = ['', '#ff4466', '#ffaa00', '#00c8ff', '#00ff88'];

    strengthText.textContent = labels[level];
    strengthText.style.color = colors[level];
    segs.forEach((seg, i) => {
        seg.style.background = i < level ? colors[level] : 'var(--border)';
    });
}

function resetStrength() {
    strengthText.textContent = '—';
    strengthText.style.color = 'var(--muted)';
    segs.forEach(s => s.style.background = 'var(--border)');
}

// --- Toast Notification ---
function showToast(msg, isError = false) {
    toast.textContent = msg;
    toast.style.color = isError ? '#ff4466' : '#00ff88';
    toast.style.borderColor = isError ? 'rgba(255,68,102,0.3)' : 'rgba(0,255,136,0.3)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
}