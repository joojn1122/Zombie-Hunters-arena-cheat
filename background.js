const codeInjectors = [
  {
    targetCode: "ft.localPlayer=e",
    injectCode: `,loadGame(ft),classes={
      Le,
      L,
      Ft
    }`,
    injectBefore: false
  },
  /*
  {
    targetCode: "this.scene=d.Z.currentScene",
    injectCode: "ENTITIES.push(this);",
    injectBefore: true
  }
  */
];

browser.webRequest.onBeforeRequest.addListener(
  async function(details) {
    // escape inf loop
    if(this.skip) {
      this.skip = false;
      return;
    }

    this.skip = true;

    let resp = await fetch(details.url, {
      method: "GET"
    });

    let code = await resp.text();
    
    // code = "let INSTANCE;" + code.replace("this.level=0,", "this.level=0,INSTANCE=this,");

    for(let injector of codeInjectors) {
      code = code.replace(injector.targetCode, injector.injectBefore ?
         (injector.injectCode + injector.targetCode) : (injector.targetCode + injector.injectCode));
    }

    return { redirectUrl: 'data:text/javascript;charset=utf-8,' + encodeURIComponent(code) };
  },
  { urls: ['https://pixel-cave.com/games/zh/release43/bundle.js'] },
  ['blocking']
);
