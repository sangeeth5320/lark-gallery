(function(){
Template.__checkName("navbar");
Template["navbar"] = new Template("Template.navbar", (function() {
  var view = this;
  return [ HTML.Raw("<!--=== Header v6 ===-->\n"), HTML.DIV({
    "class": "header-v6 header-classic-white header-sticky"
  }, "\n    ", HTML.Raw("<!-- Navbar -->"), "\n    ", HTML.DIV({
    "class": "navbar mega-menu",
    role: "navigation"
  }, "\n        ", HTML.DIV({
    "class": "container container-space"
  }, "\n            ", HTML.Raw("<!-- Brand and toggle get grouped for better mobile display -->"), "\n            ", HTML.DIV({
    "class": "menu-container"
  }, "\n                ", HTML.Raw('<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">\n                    <span class="sr-only">Toggle navigation</span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                </button>'), "\n\n                ", HTML.Raw("<!-- Navbar Brand -->"), "\n                ", HTML.DIV({
    "class": "navbar-brand"
  }, "\n                    ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "home");
    }
  }, "\n                        ", HTML.Raw('<img class="shrink-logo" src="/img/logo1-default.png" alt="Logo">'), "\n                    "), "\n                "), "\n                ", HTML.Raw("<!-- ENd Navbar Brand -->"), "\n\n            "), "\n\n            ", HTML.Raw("<!-- Collect the nav links, forms, and other content for toggling -->"), "\n            ", HTML.DIV({
    "class": "collapse navbar-collapse navbar-responsive-collapse"
  }, "\n                ", HTML.DIV({
    "class": "menu-container"
  }, "\n                    ", HTML.UL({
    "class": "nav navbar-nav"
  }, "\n                        ", HTML.Raw("<!-- Home -->"), "\n                        ", HTML.LI({
    "class": "active"
  }, "\n                            ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "home");
    }
  }, "\n                                About\n                            "), "\n                        "), "\n\n                        ", HTML.LI("\n                            ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "gallery");
    }
  }, "\n                                Gallery\n                            "), "\n                        "), "\n                        ", HTML.Raw("<!-- End Home -->"), "\n                    "), "\n                "), "\n            "), HTML.Raw("<!--/navbar-collapse-->"), "\n        "), "\n    "), "\n    ", HTML.Raw("<!-- End Navbar -->"), "\n"), HTML.Raw("\n<!--=== End Header v6 ===-->") ];
}));

}).call(this);
