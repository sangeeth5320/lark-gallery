(function(){
Template.body.addContent((function() {
  var view = this;
  return Blaze.View("lookup:renderPage", function() {
    return Spacebars.mustache(view.lookup("renderPage"));
  });
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("defaultLayout");
Template["defaultLayout"] = new Template("Template.defaultLayout", (function() {
  var view = this;
  return HTML.DIV({
    "class": "wrapper"
  }, "\n    ", Spacebars.include(view.lookupTemplate("navbar")), HTML.Raw("\n    <br><br><br><br>\n    "), Spacebars.include(view.lookupTemplate("pageheader")), "\n    ", Spacebars.include(view.lookupTemplate("yield")), "\n    ", Spacebars.include(view.lookupTemplate("footer")), "\n");
}));

}).call(this);
