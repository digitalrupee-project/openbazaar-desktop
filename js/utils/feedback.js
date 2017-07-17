import app from '../app';

/*
 * Adds the feedback tool to the page.
 */
export function addFeedback() {
  window.doorbellOptions = {
    appKey: 'lscnduocsmcCDtvh4DCZ4iQhGuCXZy4iexy7bIRa6wa5MFocLkSSutFU3zOii5k8',
    name: app.profile.get('name'),
    email: app.profile.get('contactInfo').email,
    properties: {
      peerID: app.profile.id,
      vendor: app.profile.get('vendor'),
      contactInfo: app.profile.get('contactInfo'),
    },
  };
  (function (w, d, t) {
    let hasLoaded = false;
    function l() {
      if (hasLoaded) {
        return;
      }
      hasLoaded = true;
      window.doorbellOptions.windowLoaded = true;
      const g = d.createElement(t);
      g.id = 'doorbellScript';
      g.type = 'text/javascript';
      g.async = true;
      g.src = `https://embed.doorbell.io/button/4990?t='${(new Date().getTime())}`;
      (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(g);
    }
    if (w.attachEvent) {
      w.attachEvent('onload', l);
    } else if (w.addEventListener) {
      w.addEventListener('load', l, false);
    } else {
      l();
    }
    if (d.readyState === 'complete') {
      l();
    }
  }(window, document, 'script'));
}
