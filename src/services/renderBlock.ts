import Block from "./Block";

export function render(pageTemplate: Block) {
  const root = document.getElementById('root');
    root!.innerHTML = '';
    root!.appendChild(pageTemplate.getContent()!);
}
