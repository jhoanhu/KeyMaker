function generatePasswords() {
    const keyword = document.getElementById('keyword').value;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const passwordsContainer = document.getElementById('passwords');
    passwordsContainer.innerHTML = '';

    const length = 12; // Longitud de la contraseña
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()';

    let validCharacters = characters;
    if (includeNumbers) validCharacters += numbers;
    if (includeSymbols) validCharacters += symbols;

    if (!validCharacters) {
        alert('Por favor selecciona al menos una opción (números o símbolos)');
        return;
    }

    for (let i = 0; i < 5; i++) {
        const password = generatePassword(keyword, validCharacters, length);
        const passwordDiv = document.createElement('div');
        passwordDiv.className = 'password';
        passwordDiv.innerHTML = `<span>${password}</span> <button class="copy-btn" onclick="copyToClipboard('${password}')">Copiar</button>`;
        passwordsContainer.appendChild(passwordDiv);
    }
}

function generatePassword(keyword, characters, length) {
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    if (keyword) {
        const insertPosition = Math.floor(Math.random() * (password.length + 1));
        password = password.slice(0, insertPosition) + keyword + password.slice(insertPosition);
    }

    return password;
}

function copyToClipboard(password) {
    navigator.clipboard.writeText(password);
    alert('Contraseña copiada: ' + password);
}

