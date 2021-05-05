export function safeHref (url, options, type = 'link') {
  const blacklist = options.blocked_uri;
  if (Array.isArray(blacklist)) {
    for (let i = 0; i < blacklist.length; i++) {
      if (url.startsWith(blacklist[i] + ':')) {
        return '';
      }
    }
  }
  return url;
}
