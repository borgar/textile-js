export function safeHref (url, options) {
  const blacklist = options.blocked_uri;
  if (url && Array.isArray(blacklist)) {
    for (let i = 0; i < blacklist.length; i++) {
      if (url.toLowerCase().startsWith(blacklist[i] + ':')) {
        return '';
      }
    }
  }
  return url;
}
