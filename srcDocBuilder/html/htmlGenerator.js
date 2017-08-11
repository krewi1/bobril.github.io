const menuWidth = 190;

function generateHtmlPage(menuNodes, sortedHtmlFragments) {
    return `
export const html =\`
    <style>${getCssStyles()}</style>
    <div class="markdown">
        <div class='doc-menu' style='float: left; width: ${menuWidth}px'>
            ${generateMenu(menuNodes)}
        </div>
        <div class='doc-content'
             style='padding-left: 16px; border-left: 1px solid #bdbdbd; margin-left: ${menuWidth + 16}px'>
            ${generateContent(sortedHtmlFragments)}
        </div>
    </div>
    \`
`;
}

function generateMenu(nodes) {
    let output = '';
    nodes.forEach((node) => {
        output += generateMenuFromNode(node);
    });
    return output;
}

function generateMenuFromNode(node) {
    if (node.children !== undefined && node.children.length > 0) {
        let output = `<ul style="padding-left: 10px; margin-top: 0">
            <li>
                <a 
                   style='text-decoration: none; color: #0097a7; font-size:18px'  
                   onMouseOver="this.style.color='rgb(0, 188, 212)'"
                   onMouseOut="this.style.color='#0097a7'" 
                   href='#${node.children[0].metadata.menuAnchor}'>
                        ${node.children[0].metadata.label}
                </a>
            </li>
            <ul style="padding-left: 16px">
        `;
        for (let i = 1; i < node.children.length; i++) {
            output += `${generateMenuFromNode(node.children[i])}`;
        }
        output += `</ul></ul>`;
        return output;
    }

    return `
        <li>
            <a 
               style='text-decoration: none; color: rgba(0,0,0,0.870)'  
               onMouseOver="this.style.color='rgb(0, 188, 212)'"
               onMouseOut="this.style.color='#000'" 
               href='#${node.metadata.menuAnchor}'>
                    ${node.metadata.label}
            </a>
        </li>`;
}

function generateContent(sortedHtmlFragments) {
    let output = '';
    for (let i = 0; i < sortedHtmlFragments.length; i++) {
        output += `${sortedHtmlFragments[i].content}`;
    }
    return output;
}

function getCssStyles() {
    return `.markdown h1 {
    font-size: 24px;
    font-weight: 400;
}

.markdown h2 {
    font-size: 20px;
    font-weight: 500;
}

.markdown h3 {
    font-size: 15x;
    font-weight: 400;
}

.markdown h4 {
    font-size: 13px;
    font-weight: 500;
}

.markdown h5 {
    font-size: 13px;
    font-weight: 400;
}

.markdown h6 {
    font-size: 12px;
    font-weight: 400;
}

.markdown a {
    color: rgb(0, 188, 212)
}

.markdown li {
    list-style: none;
}

.markdown doc-menu {

}

.markdown doc-content {

}`
}

module.exports.generateHtmlPage = generateHtmlPage;