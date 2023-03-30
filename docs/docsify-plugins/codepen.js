/**
 * This plugin embeds a codepen instead of linking to it
 * 
 * Usage:
 * 
 * {% ptc-codepen src="https://codepen.io/s/charming-cdn-57lm0" %}
 */

const codepenBlockRegex = new RegExp('{% ptc-codepen([^(%})])*%}', 'gm');
const codepenLinkRegex = new RegExp('.*src="([^"]*)".*');

window.DocsifyPTCCodepenPlugin = {
    create: () => {
        return function (hook) {
            hook.beforeEach(function (content) {
                const convertedContent = content.replace(codepenBlockRegex, (codepenBlock) => {
                    const link = codepenBlock.match(codepenLinkRegex)[1];

                    return `[codepen embed](${link} ':include :type=iframe width=100% height=400px')\n[open in new tab](${link})`;
                });

                return convertedContent;
            })
        }
    }
}