const logo404 = new Proxy({"src":"/_astro/logo404.DRr0yUpz.png","width":561,"height":310,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/IT-Friends main/public/logo404.png";
							}
							
							return target[name];
						}
					});

export { logo404 as default };
