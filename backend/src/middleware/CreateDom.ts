import {JSDOM} from "jsdom";

async function createDom(element: string) {
    const dom = await new JSDOM(`${element}`).window.document;
    dom.addEventListener('load', () => {
        console.log("DOM CREATED");
        console.log(dom.querySelectorAll(".js-link-item"));
        
    })
    return dom;
}

export default createDom;