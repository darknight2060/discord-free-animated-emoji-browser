
///////////////////////
// Settings
///////////////////////

const settings = {
  developerMode: false,
  language: "tr",
  emojiSize: 48
  //TODO: stickerSize: 80,
};

var lang = settings.language.toLowerCase() === "tr" ? tr : en;

///////////////////////
// On Page Loaded
///////////////////////

if (settings.developerMode) log("Started");

const success = document.createElement("div");

success.setAttribute("id", "datkSuccess");
success.innerHTML = lang[0];

var style = document.createElement('style');
    style.innerHTML = `
      #datkSuccess {
        width: 140px;
        color: #ccc;
        font-size: 14px;
        font-family: system-ui;
        font-weight: 500;
        background: #202225;
        padding: 10px 15px;
        border-radius: 10px;
        position: fixed;
        right: calc(50% - 70px);
        bottom: -80px;
        text-align: center;
        z-index: 999;
        user-select: none;
        transition: 1s;
        box-shadow: 0 2px 10px #2f3136;
      }
    `;

document.querySelector(`html`).appendChild(success);
document.querySelector(`html`).append(style);

///////////////////////
// Functions
///////////////////////

async function copyTextToClipboard(text, type) {
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  document.body.removeChild(textArea);

  if (type === "emoji")
    document.querySelector('.emojiButton-3FRTuj').click();
  else
    document.querySelector('.stickerButton-1-nFh2').click();

  setTimeout(() => {
    success.style.bottom = "80px";

    setTimeout(() => {
      success.style.bottom = "-80px";
    }, 2000);
  }, 150);
}

function clicked(type) {
  var selectedItem = document.querySelector(`button.emojiItemSelected-2Lg50V img.image-3tDi44`);

  if (type === "sticker") 
    selectedItem = document.querySelector(`.stickerInspected-mwnU6w .stickerAsset-4c7Oqy`);
  else {
    var replacedURL = new URL(selectedItem.src);
        replacedURL.searchParams.set('size', settings.emojiSize);

    if (settings.developerMode) log(`Clicked: ${selectedItem.src}`);

    if (settings.emojiSize) copyTextToClipboard(replacedURL, type);
    else copyTextToClipboard(selectedItem.src, type);

    return;
  }

  copyTextToClipboard(selectedItem.src, type);
}

///////////////////////
// Loop
///////////////////////

setInterval(() => {
  const contentWrapper = document.querySelector(`div[class="contentWrapper-3vHNP2"]`);
  const nitroPromo = document.querySelector(".premiumPromo-1eKAIB");
  const nitroPromo2 = document.querySelector(".upsellWrapper-3KE9GX");

  if (!contentWrapper) return;
  if (nitroPromo) nitroPromo.style.display = "none";
  if (nitroPromo2) nitroPromo2.style.display = "none";

  const emojis = document.querySelectorAll(`.emojiItemDisabled-3VVnwp`);

  for (i = 0; i < emojis.length; i++) {
    emojis[i].addEventListener('click', (e) => {
      //TODO: Emojiyi favorilere ekleyebilmek için Alt + Click kısayolunda çalışmasın.
      //if (e.altKey) return;

      clicked("emoji");
    });

    emojis[i].style.filter = "none";
    emojis[i].style.webkitFilter = "none";
  }

  const stickers = document.querySelectorAll(`.stickerNode-3aUBs4`);

  for (i = 0; i < stickers.length; i++) {
    if (stickers[i].role) stickers[i].style.opacity = ".2";

    stickers[i].addEventListener('click', (e) => {
      clicked("sticker");
    });

    stickers[i].style.filter = "none";
    stickers[i].style.webkitFilter = "none";
  }
}, 1000);