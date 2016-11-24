var Entry = require('../lib/entry');

exports.list = function(req, res, next){
  var page = req.page;
  console.log(page);
  Entry.getRange(page.from, page.to, function(err, entries) {
    if (err) return next(err);

    res.render('entries', {
      title: 'Entries',
      entries: entries,
    });
  });
};

exports.form = function(req, res){
  res.render('post', { title: 'Post' });
};

exports.submit = function(req, res, next){
  var data = req.body.entry;
  var time = ''+ new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + (new Date().getMinutes() > 9 ? new Date().getMinutes() : '0'+ new Date().getMinutes()) + ':' + (new Date().getSeconds() > 9 ? new Date().getSeconds() : '0'+ new Date().getSeconds());
console.log(time);
  var entry = new Entry({
    "username": res.locals.user.name,
    "title": data.title,
    "body": data.body,
    "time": time
  });

  entry.save(function(err) {
    if (err) return next(err);
    if (req.remoteUser) {
      res.json({message: 'Entry added.'});
    } else {
      res.redirect('/');
    }
  });
};
