(function(){
Template.__checkName("pageheader");
Template["pageheader"] = new Template("Template.pageheader", (function() {
  var view = this;
  return [ HTML.Raw("<!--=== Breadcrumbs ===-->\n    "), HTML.DIV({
    "class": "breadcrumbs breadcrumbs-light"
  }, "\n        ", HTML.DIV({
    "class": "container"
  }, "\n            ", HTML.Raw('<h1 class="pull-left">About Me</h1>'), "\n            ", HTML.UL({
    "class": "pull-right breadcrumb"
  }, "\n                ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "home");
    }
  }, "Home")), "\n                ", HTML.Raw('<li class="active">About</li>'), "\n            "), "\n        "), "\n    "), HTML.Raw("\n    <!--=== End Breadcrumbs ===-->") ];
}));

}).call(this);
