type RenderBlockProps = HTMLElement | string

export function render(pageTemplate: RenderBlockProps) {
  console.log(pageTemplate)
  const root = document.getElementById('root')

  if (typeof pageTemplate === 'string') {
    root!.innerHTML = pageTemplate;
  }
  else {
    root!.innerHTML = '';
    root!.appendChild(pageTemplate);
  }
}
