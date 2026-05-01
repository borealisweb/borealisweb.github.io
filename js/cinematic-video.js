document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.cinematic-video-section');
    const titulo = document.querySelector('.video-text');

    if (!section || !titulo) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'cinematic-pin-wrapper';
    section.parentNode.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    wrapper.style.position = 'relative';
    section.style.position = 'sticky';

    const startOffset = 250;
    let extraScroll = startOffset;
    let stickTop = 0;

    function updatePinParams() {
        wrapper.style.height = `${section.offsetHeight + extraScroll}px`;
        stickTop = (window.innerHeight / 2) - (section.offsetHeight / 2);
        stickTop = Math.min(stickTop, 0);

        section.style.top = `${stickTop}px`;
    }

    updatePinParams();
    window.addEventListener('resize', updatePinParams);

    titulo.style = '';

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const windowHeight = window.innerHeight;

                const titleRect = titulo.getBoundingClientRect();
                if (titleRect.top <= windowHeight && titleRect.bottom >= 0) {
                    let scrollDistanceRequired = windowHeight / 2;
                    let progressTitle = (windowHeight - titleRect.top) / scrollDistanceRequired;
                    progressTitle = Math.max(0, Math.min(1, progressTitle));
                    const bgPos = 100 - (progressTitle * 100);
                    titulo.style.backgroundPosition = `${bgPos}% 0%`;
                }

                const wrapRect = wrapper.getBoundingClientRect();

                if (wrapRect.top <= windowHeight && wrapRect.bottom >= 0) {
                    const fadeIn = (windowHeight - wrapRect.top) / (windowHeight * 0.5);
                    const fadeOut = wrapRect.bottom / (windowHeight * 0.7);

                    let focusProgress = Math.min(1, fadeIn, fadeOut);
                    focusProgress = Math.max(0, focusProgress);

                    section.style.setProperty('--darken-progress', focusProgress);

                    const contentScale = 0.85 + (0.15 * focusProgress);
                    section.style.setProperty('--parallax-scale', contentScale);

                    const videoWrap = section.querySelector('.video-parallax-wrapper');
                    if (videoWrap) {
                        const vRect = videoWrap.getBoundingClientRect();
                        let rawFadeIn = (windowHeight - vRect.top) / (windowHeight * 0.5);
                        let rawFadeOut = vRect.bottom / (windowHeight * 0.5);
                        let vFadeIn = (rawFadeIn - 0.2) * 2;
                        let vFadeOut = (rawFadeOut - 0.2) * 2;
                        let vFade = Math.min(1, vFadeIn, vFadeOut);
                        videoWrap.style.setProperty('--video-fade', Math.max(0, vFade));
                    }

                    const footerBtn = section.querySelector('.video-footer');
                    if (footerBtn) {
                        let pauseProgress = 0;
                        if (wrapRect.top <= stickTop) {
                            const scrolledPastStick = Math.abs(wrapRect.top - stickTop);
                            pauseProgress = Math.min(1, scrolledPastStick / extraScroll);
                        }
                        const diffMultiplier = 1 - pauseProgress;
                        const parallaxY = startOffset * diffMultiplier;

                        footerBtn.style.setProperty('--btn-parallax-y', `${parallaxY}px`);
                        footerBtn.style.setProperty('--btn-fade', pauseProgress);
                    }

                } else {
                    section.style.setProperty('--darken-progress', 0);
                    section.style.setProperty('--parallax-scale', 0.85);
                    const videoWrap = section.querySelector('.video-parallax-wrapper');
                    if (videoWrap) videoWrap.style.setProperty('--video-fade', 0);
                }

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});