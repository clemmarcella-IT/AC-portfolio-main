(() => {
  function addProfileActions(info) {
    const memberName = info.querySelector('.team-3d-name')?.textContent?.trim();
    if (!memberName) return;

    let actions = info.querySelector('.team-profile-actions');
    if (actions?.dataset.memberName === memberName) {
      const isTransitioning = info.querySelector('.team-3d-name')?.style.opacity === '0';
      actions.classList.toggle('is-transitioning', isTransitioning);
      actions.setAttribute('aria-hidden', String(isTransitioning));
      actions.querySelectorAll('a').forEach((anchor) => {
        anchor.tabIndex = isTransitioning ? -1 : 0;
      });
      return;
    }

    if (!actions) {
      info.querySelector('button')?.closest('div')?.remove();
      actions = document.createElement('nav');
      actions.className = 'team-profile-actions';
      actions.setAttribute('aria-label', `Links for ${memberName}`);
      info.append(actions);
    }

    actions.replaceChildren();
    actions.dataset.memberName = memberName;
    actions.setAttribute('aria-label', `Links for ${memberName}`);

    const links = [
      {
        label: 'GitHub',
        href: `https://github.com/search?q=${encodeURIComponent(memberName)}&type=users`,
        ariaLabel: `Search GitHub for ${memberName}`,
        external: true,
      },
      {
        label: 'LinkedIn',
        href: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(memberName)}`,
        ariaLabel: `Search LinkedIn for ${memberName}`,
        external: true,
      },
      {
        label: 'Portfolio',
        href: '#projects',
        ariaLabel: 'View the AC project portfolio',
        external: false,
      },
    ];

    for (const link of links) {
      const anchor = document.createElement('a');
      anchor.className = 'team-profile-action';
      anchor.href = link.href;
      anchor.textContent = link.label;
      anchor.setAttribute('aria-label', link.ariaLabel);
      if (link.external) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
      anchor.tabIndex = info.querySelector('.team-3d-name')?.style.opacity === '0' ? -1 : 0;
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.setAttribute('viewBox', '0 0 24 24');
      arrow.setAttribute('width', '16');
      arrow.setAttribute('height', '16');
      arrow.setAttribute('fill', 'none');
      arrow.setAttribute('stroke', 'currentColor');
      arrow.setAttribute('stroke-width', '2');
      arrow.setAttribute('stroke-linecap', 'round');
      arrow.setAttribute('stroke-linejoin', 'round');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.classList.add('team-profile-action-arrow');
      const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      arrowPath.setAttribute('d', 'M7 17 17 7M7 7h10v10');
      arrow.append(arrowPath);
      anchor.append(arrow);
      anchor.addEventListener('click', (event) => {
        const href = anchor.href;
        const opensNewTab = anchor.target === '_blank';
        const destination = opensNewTab ? window.open('about:blank', '_blank') : null;
        if (destination) destination.opener = null;

        anchor.classList.add('is-launching');
        if (opensNewTab && !destination) return;

        event.preventDefault();
        window.setTimeout(() => {
          anchor.classList.remove('is-launching');
          if (destination) destination.location.href = href;
          else window.location.assign(href);
        }, 420);
      });
      actions.append(anchor);
    }

    const isTransitioning = info.querySelector('.team-3d-name')?.style.opacity === '0';
    actions.classList.toggle('is-transitioning', isTransitioning);
    actions.setAttribute('aria-hidden', String(isTransitioning));
  }

  const observer = new MutationObserver(() => {
    document.querySelectorAll('.team-3d-info').forEach(addProfileActions);
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['style'],
    childList: true,
    subtree: true,
    characterData: true,
  });
  document.querySelectorAll('.team-3d-info').forEach(addProfileActions);
})();