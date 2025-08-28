export default function getScreenType() {
  const ids = ['default', 'sm', 'md', 'lg', 'xl', '2xl'];
  for (const id of ids) {
    const el = document.getElementById('bp-' + id);
    if (el && el.offsetParent !== null) return id;
  }
  return 'unknown';
}
