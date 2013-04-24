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

  // ember-object-classes

  (function() {

    var Task = Ember.Object.extend({
      done: false,
      init: function() {
        this.createdAt = new Date();
      },
      createdSince: function() {
        //return moment(this.get('createdAt')).since();
        return 'just now';
      }.property('createdAt'),
      summary: function(what) {
        return '[' + (this.get('done') ? 'X' : ' ') + '] ' + this.get('title') + ' (created ' + this.get('createdSince') + ')';
      }.property('done', 'title')
    });

    var User = Ember.Object.extend({
      remainingTasks: function() {
        return this.get('tasks').filterProperty('done', false).get('length');
      }.property('tasks.@each.done')
    });

    var task1 = Task.create({title: 'Go to Mix-IT'});
    task1.set('done', true);
    console.log(task1.get('summary'));

    var task2 = Task.create({title: 'Enjoy the party!'});
    console.log(task2.get('summary'));

    var user = User.create();
    user.set('tasks', [task1, task2]);
    console.log('Remaining tasks: ' + user.get('remainingTasks'));
  })();

})();
