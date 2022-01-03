var REGULAR_EXPRESSION_CONTROLS = ['\\', '(', ')', '['];

var fakeExpression = { test: function() { return true; } };

function escapeTerm(term) {
  var newTerm = term;
  for (index in REGULAR_EXPRESSION_CONTROLS) {
    var control = REGULAR_EXPRESSION_CONTROLS[index];
    newTerm = newTerm.replaceAll(control, '\\' + control);
  }
  return newTerm;
}

function buildExpression(searchTerm) {
  if (searchTerm === '') { return fakeExpression; }
  return new RegExp(escapeTerm(searchTerm), 'gi');
}

$(function() {
  var definitions = [];
  var definitionsContainer = $('.container');
  var iframe = $('<iframe src="" />');

  var popup = $('<div class="popup"></div>')
    .append(iframe)
    .append('<span class="close">X</span>');

  var overlay = $('<div class="overlay hidden"></div>')
    .on('click', function() {
      $(this).addClass('hidden');
      definitionsContainer.removeClass('blurred');
      iframe.attr('src', '');
    })
    .append(popup)
    .appendTo(document.body);

  $('.definition')
    .each(function(index, node) {
      var element = $(node);
      var title = element.find('a').text().toLowerCase();
      var definition = {
        title: title,
        element: element,
      };
      definitions.push(definition);
    })
    .on('click', function(event) {
      event.preventDefault();
      var link = $(event.target).attr('href');
      if (link) {
        iframe.attr('src', link);
        definitionsContainer.addClass('blurred');
        overlay.removeClass('hidden');
      }
    });

  $('<input class="searchterm" type="text" value="" placeholder="Keresés" />')
    .on('keyup', function(event) {
      var expression = buildExpression(event.target.value); 
      definitions.forEach(function(definition) {
        if (expression.test(definition.title)) {
          definition.element.removeClass('flat');
        } else {
          definition.element.addClass('flat');
        }
      });
    })
    .insertBefore('.definitions');
});
