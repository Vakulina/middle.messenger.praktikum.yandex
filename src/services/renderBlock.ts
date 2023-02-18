import Block from "./Block";

export function render(pageTemplate: Block, rootQuery:string) {
  const root = document.getElementById(rootQuery);
    root!.innerHTML = '';
    root!.appendChild(pageTemplate.getContent()!);
}
