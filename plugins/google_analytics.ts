import { Plugin } from "$fresh/server.ts";

export default function googleAnalyticsPlugin(tag: string): Plugin {
  const googleAnalyticsScript = `data:application/javascript,

  function ga() {
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = "https://www.googletagmanager.com/gtag/js?id=${tag}";
    
    const s2 = document.createElement('script');
    s2.innerHTML = \`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', '${tag}');
    \`;
    
    const head = document.getElementsByTagName('head').item(0);
    head?.prepend(s1,s2);
  }
  export default ga`;

  return {
    name: "google_analytics",
    entrypoints: { "ga": googleAnalyticsScript },
    render(ctx) {
      ctx.render();
      return {
        scripts: [{ entrypoint: "ga", state: [] }],
        styles: [],
      };
    },
  };
}
