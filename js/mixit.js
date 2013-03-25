(function() {

  window.presentation = new Presentation();

  // backbone-binding

  (function() {

    var PromptView = Backbone.View.extend({
      events: { keyup: 'change' },
      render: function() {
        this.$el.html('<input id="name" type="text" placeholder="Name..." />');
        return this;
      },
      change: function() {
        this.model.set('name', this.$('#name').val());
      }
    });

    var HelloView = Backbone.View.extend({
      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
      },
      render: function() {
        this.$el.html('Hello ' + (this.model.get('name') || '') + '!');
        return this;
      }
    });

    var user = new Backbone.Model();
    var promptView = new PromptView({model: user});
    var helloView = new HelloView({model: user});
    $('#backbone-binding .app').append(promptView.render().el)
                               .append(helloView.render().el);

  })();

  // ember-binding

  (function() {

    var AppView = Ember.View.extend({
      template: Ember.Handlebars.compile(
        '<div>{{view Ember.TextField valueBinding="name" placeholder="Name..."}}</div>' +
        '<div>Hello {{name}}!</div>'
      )
    });

    var user = Ember.Object.create();
    var appView = AppView.create({controller: user});
    appView.appendTo('#ember-binding .app');

    Ember.EventDispatcher.create({
      rootElement: '#ember-binding .app'
    }).setup();

  })();

})();
