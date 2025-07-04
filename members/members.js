fetch('/members/data/members.json')
  .then(response => response.json())
  .then(members => {
    const iconMap = {
      linkedin: '<i class="fab fa-linkedin fa-1x"></i>',
      twitter: '<i class="fab fa-twitter fa-1x"></i>',
      academia: '<i class="fas fa-university"></i>',
      website: '<i class="fas fa-globe"></i>',
      github: '<i class="fab fa-github fa-1x"></i>'
    };
    const container = document.getElementById('members-container');
    const groups = ["Faculty", "Current Members", "Alumni"];
    let html = '';
    groups.forEach(group => {
      const groupMembers = members.filter(m => m.group === group);
      if (groupMembers.length) {
        html += `<h3 class="margin-30px"><b>${group}</b></h3>`;
        html += '<div class="row">';
        for (let i = 0; i < groupMembers.length; i += 2) {
          html += '<div class="col-md-6">';
          [groupMembers[i], groupMembers[i+1]].forEach(member => {
            if (!member) return;
            let linksHTML = '';
            if (member.links && Array.isArray(member.links)) {
              linksHTML = member.links.map(link =>
                `<a href="${link.url}" class="is-icon" target="_blank">${iconMap[link.type] || ''}</a>`
              ).join(' ');
            }
            html += `
              <div class="member-card">
                <img src="${member.image}" alt="${member.name}" class="profilepic">
                <div class="member-card-content">
                  <h4><b>${member.name}</b>${linksHTML ? ' ' + linksHTML : ''}</h4>
                  <p class="psmall">${member.role || ''}</p>
                  ${member.interests ? `<p class="psmall">Interests: ${member.interests}</p>` : ''}
                </div>
              </div>
            `;
          });
          html += '</div>';
        }
        html += '</div>';
      }
    });
    container.innerHTML = html;
  })
  .catch(error => {
    document.getElementById('members-container').innerHTML = '<p>Could not load members.</p>';
    console.error(error);
  });
