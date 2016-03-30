// ==UserScript==
// @id             iitc-plugin-highlight-portals-rare-items@bmez
// @name           IITC plugin: highlight portals by mod rarity
// @category       Highlighter
// @version        0.0.1.20131020.1445
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      http://realitysmiths.com/media/iitc-highlighter-rare-mods.tamper.js
// @downloadURL    http://realitysmiths.com/media/iitc-highlighter-rare-mods.tamper.js
// @description    [temp-20131020.1445] 
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighligherPortalsRareMods = function() {};

window.plugin.portalHighligherPortalsRareMods.hasRareMods = function(data) {
    window.plugin.portalHighligherPortalsRareMods.doRareMods(data, true);
}

window.plugin.portalHighligherPortalsRareMods.hasVeryRareMods = function(data) {
    window.plugin.portalHighligherPortalsRareMods.doRareMods(data, false);
}

window.plugin.portalHighligherPortalsRareMods.doRareMods = function(data, showRare) {
	var mods = data.portal.options.details.portalV2.linkedModArray;
	var opacity = 0;
	for (var i=1;i<4;i++)
    {
		if (mods[i] != null)
        {
            if (showRare && mods[i].rarity == 'RARE')
            {
                opacity += 0.125;
            }
            else if (mods[i].rarity == 'VERY_RARE')
            {
                opacity += 0.25;
            }
         }
	}
    
    data.portal.setStyle({fillColor: 'red', fillOpacity: opacity});
    
    if (opacity == 0)
	{
		data.portal.setStyle({opacity: 0});
	}
}

var setup =  function() {
  window.addPortalHighlighter('Rare and Very Rare Mods', window.plugin.portalHighligherPortalsRareMods.hasRareMods);
  window.addPortalHighlighter('Very Rare Mods', window.plugin.portalHighligherPortalsRareMods.hasVeryRareMods);
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
