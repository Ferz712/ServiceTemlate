// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
// var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
var url = 'download';
// var nPages = null;
// var pdfDoc = null,
// window.getPDF = getPDF;

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null;
    // scale = 1.25;


function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
async function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var pageWidth = page.view[2];
    var availableWidth = getWidth() / 2;
    var viewport = page.getViewport({scale: availableWidth / pageWidth - 0.025});
    canvas = document.getElementById('canvas-' + num);
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: canvas.getContext('2d'),
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
  return 'Done';
}

function getPDF() {
  pdfjsLib.getDocument(url).promise.then(async function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    document.getElementById('pdf-container').innerHTML = '';
    for (var i = 1; i <= pdfDoc.numPages; i++) {
      var canvas = document.getElementById('canvas-' + i);
      canvas = document.createElement("canvas");
      canvas.id = 'canvas-' + i;
      var element = document.getElementById("pdf-container");
      element.appendChild(canvas);
    }

    for (var i = 1; i <= pdfDoc.numPages; i++) {
      await renderPage(i);
    }
  });
}