document.getElementById('app').onchange = debounce(refresh, 200);

function refresh() {
  // console.log('HI');
  if (app.auto_refresh) {
    app.updatePDF();
  }
}

// Close notification
document.getElementById('pdf-container').addEventListener('DOMSubtreeModified', debounce(app.closeUpdateAlarm, 500));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Control') {
    app.updatePDF();
    return;
  }
}, false);