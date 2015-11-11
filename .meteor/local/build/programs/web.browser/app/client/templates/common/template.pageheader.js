(function(){
Template.__checkName("pageheader");
Template["pageheader"] = new Template("Template.pageheader", (function() {
  var view = this;
  return HTML.Raw('<!--=== Breadcrumbs ===-->\n    <div class="breadcrumbs breadcrumbs-light">\n        <div class="container">\n            <h1 class="pull-left">About Me</h1>\n            <ul class="pull-right breadcrumb">\n                <li><a href="index.html">Home</a></li>\n                <li class="active">About</li>\n            </ul>\n        </div>\n    </div>\n    <!--=== End Breadcrumbs ===-->');
}));

}).call(this);
