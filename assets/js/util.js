export function getYoutubeId (url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return 'error';
  }
}

export function getSerieObj (serie) {
  const tmp = {
    uuid: serie.uuid,
    nid: serie.nid,
    title: serie.title,
    poster: serie.field_poster[0].url,
    path: serie.path.alias,
    score: 0
  }
  return tmp
}