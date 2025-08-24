const terminal = document.getElementById('term');
const cursor = document.getElementById('cursor');
const specialKeys = [
  'Backspace', 'Delete',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'Shift', 'Control', 'Alt', 'Meta',
  'CapsLock', 'Tab', 'Escape', 'Enter', 'Home', 'End',
  'PageUp', 'PageDown', 'Insert', 'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'
];


let trmContent = "WebTerm BETA RELEASE\nMore> ";
let usrContent = "";
let blinkState = true;
let typing = false;
let cursorPos = 0; // Position of the cursor in usrContent

let history = [];
let historyIndex = -1;

let tmpTrm = document.createTextNode('');
terminal.insertBefore(tmpTrm, cursor);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let trim = usrContent.trim();
        if (trim !== '' && (history.length === 0 || trim !== history[history.length - 1])) {
            history.push(usrContent);
            historyIndex = history.length;
        }
        trmContent += usrContent + "\n";
        usrContent = "";
    }
    else if (event.key === 'Backspace') {
        usrContent = usrContent.slice(0, -1);
    }
    else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            usrContent = history[historyIndex];
        }
    }
    else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < history.length - 1) {
            historyIndex++;
            usrContent = history[historyIndex];
        }
        else {
            historyIndex = history.length;
            usrContent = "";
        }
    }
    else if (specialKeys.includes(event.key)) {
        // Ignore special keys
        return;
    }
    else {
        usrContent += event.key;
    }
    updateTerminal();
});

setInterval(() => {
    blinkState = !blinkState;
    if (!typing) {
        cursor.style.opacity = blinkState ? '1' : '0'; // Blink effect
    }
    else {
        cursor.style.opacity = '1'; // Keep cursor visible while typing
    }
}, 500); // Blink every half-second

let typeTimeout;

updateTerminal();

function updateTerminal() {
    tmpTrm.nodeValue = trmContent + usrContent;
    terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to the bottom
    typing = true; // Reset blink state on input
    clearTimeout(typeTimeout); // Clear previous timeout if typing continues
    cursor.scrollIntoView({ behavior: 'auto', block: 'end' });
    typeTimeout = setTimeout(() => {
        typing = false;
        blinkState = true; // Blink immediately after typing
    }, 250); // Reset typing state after 250ms
}