import Block from "./Block";

type RenderBlockProps = Block | string

function render(pageTemplate: RenderBlockProps) {
  const root = document.getElementById('root')

  if (pageTemplate instanceof Block) {
    root!.innerHTML = '';
    root!.appendChild(pageTemplate.getContent());

  }
  else {
    root!.innerHTML = pageTemplate;
  }
}
