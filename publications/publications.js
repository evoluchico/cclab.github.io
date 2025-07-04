// Dynamically load and render publications
$(document).ready(function() {
  $.getJSON('publications/publications.json', function(data) {
    // Containers for each section
    var peerReviewed = $('#publications-list');
    var underReview = $('#publications-under-review');
    var publicWriting = $('#publications-public-writing');
    var videoSeries = $('#publications-video-series');
    if (!peerReviewed.length) return;

    data.forEach(function(pub) {
      var links = pub.links.map(function(link) {
        return '<a href="' + link.url + '">' + link.label + '</a>';
      }).join(' | ');
      var authors = pub.authors.join(', ');
      var coverage = '';
      if (pub.coverage && pub.coverage.length) {
        coverage = '<p class="paper-p">Coverage: ' + pub.coverage.map(function(c) {
          return '<a href="' + c.url + '">' + c.label + '</a>';
        }).join(' | ') + '</p>';
      }
      var html = `
        <div class="publication-card">
          <div class="publication-img">
            <img class="paperfig" src="${pub.img}" width="100px" alt="${pub.alt}">
          </div>
          <div class="publication-info">
            <h4 class="paper-h"><b>${pub.title}</b></h4>
            <p class="paper-p">${authors}</p>
            ${pub.journal ? `<p class="paper-p"><em>${pub.journal}</em>${pub.year ? ` (${pub.year})` : ''}</p>` : ''}
            <p class="paper-p">${links}</p>
            ${coverage}
          </div>
        </div>
      `;
      // Route to correct section
      if (pub.type === 'peer-reviewed') {
        peerReviewed.append(html);
      } else if (pub.type === 'under-review') {
        underReview.append(html);
      } else if (pub.type === 'public-writing') {
        publicWriting.append(html);
      } else if (pub.type === 'video-series') {
        videoSeries.append(html);
      }
    });
  });
});
