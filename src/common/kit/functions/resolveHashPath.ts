export default function resolveHashPath(): string[] {
  const i = window.location.href.indexOf("#/");
  if (i === -1) return [];
  const uri = window.location.href.substring(i + 1);
  const path = uri
    .split("/")
    .map(x => x.replace(/\//g, ""))
    .filter(x => !!x);
  return path;
}