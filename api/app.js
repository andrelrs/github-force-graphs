var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../' + 'client'));

app.get('/:user/repos', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*");
  var user_api = require('./user-api')({
    user: req.params.user,
  });
  user_api.get_repos(req.params.user,function(json){
    //console.log(json);
    res.json(json);
  });
});

app.get('/followers-graph', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*");
  var followers_api = require('./followers-api')({
    user: req.query.user,
  });
  followers_api.graph_gh_followers(req.query.user,function(json){
    res.json(json);
  });
});

app.get('/repo-graph', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*");
  var repos_api = require('./repos-api')({
    user: req.query.user,
    repo: req.query.repo
  });
  repos_api.graph_gh_repo(req.query.user, req.query.repo, function(json){
    res.json(json);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
