(() => {
  function mountLogoCard() {
    const host = document.querySelector('.hero-gallery-layer');
    if (!host) return false;

    host.querySelectorAll('.home-accordion-gallery, .home-3d-image-ring').forEach((gallery) => gallery.remove());

    if (!host.querySelector('.home-logo-card-container')) {
      const container = document.createElement('div');
      container.className = 'home-logo-card-container';
      const canvas = document.createElement('div');
      canvas.className = 'home-logo-card-canvas';
      const face = document.createElement('div');
      face.className = 'home-logo-card-face';
      const logo = document.createElement('img');
      logo.src = './images/favicon.png';
      logo.alt = 'AC: Apex of Champions';
      face.append(logo);
      canvas.append(face);
      container.append(canvas);
      host.append(container);

      canvas.addEventListener('pointermove', (event) => {
        const bounds = canvas.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width;
        const vertical = (event.clientY - bounds.top) / bounds.height;
        face.style.transform = `rotateX(${(0.5 - vertical) * 20}deg) rotateY(${(horizontal - 0.5) * 20}deg)`;
      });
      canvas.addEventListener('pointerleave', () => { face.style.transform = ''; });
    }

    const team = document.querySelector('#team');
    if (team) {
      team.querySelectorAll('.team-3d-card').forEach((card) => {
        const image = card.querySelector('img');
        const isOldProfile = image?.src.includes('nachie.png') || card.getAttribute('aria-label')?.includes('Nachie');
        if (!isOldProfile) return;
        if (image && !image.src.includes('/clem.png')) image.src = './images/clem.png';
        if (image) image.alt = 'Clem Marcella';
        if (card.getAttribute('aria-label') !== 'Clem Marcella, Backend Developer') {
          card.setAttribute('aria-label', 'Clem Marcella, Backend Developer');
          card.setAttribute('title', 'View Clem Marcella');
        }
        card.querySelectorAll('p, span').forEach((label) => {
          if (label.textContent.trim() === 'Nachie') label.textContent = 'Clem Marcella';
        });
      });
      team.querySelectorAll('.team-3d-dot').forEach((dot) => {
        const label = dot.getAttribute('aria-label') || '';
        if (label.includes('Nachie')) dot.setAttribute('aria-label', label.replace('Nachie', 'Clem Marcella'));
      });
      team.querySelectorAll('.team-detail-backdrop').forEach((modal) => {
        if (!modal.textContent.includes('Nachie')) return;
        const image = modal.querySelector('img');
        if (image) {
          image.src = './images/clem.png';
          image.alt = 'Clem Marcella';
        }
        modal.querySelectorAll('h3, p').forEach((label) => {
          if (label.textContent.includes('Nachie')) {
            label.textContent = label.textContent.replace('Nachie', 'Clem Marcella');
          }
        });
        const role = modal.querySelector('.team-detail-header p:last-child');
        if (role) role.textContent = 'Backend Developer';
        const description = modal.querySelector('.team-detail-panel > p');
        if (description) description.textContent = 'Clem Marcella is a backend developer on the team, building and maintaining server-side systems and APIs.';
      });
      const profile = team.querySelector('.team-3d-info');
      const name = profile?.querySelector('.team-3d-name');
      if (profile && name?.textContent.trim() === 'Nachie') {
        name.textContent = 'Clem Marcella';
        const role = profile.querySelector('.team-3d-role');
        if (role) role.textContent = 'Backend Developer';
        const description = profile.querySelector('.team-3d-bio');
        if (description) description.textContent = 'Clem Marcella is a backend developer on the team, building and maintaining server-side systems and APIs.';
      }
      team.querySelectorAll('.text-center.mb-6 > h2').forEach((heading) => heading.remove());
    }

    return true;
  }

  mountLogoCard();
  const observer = new MutationObserver(mountLogoCard);
  observer.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
})();