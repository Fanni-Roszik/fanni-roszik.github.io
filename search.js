var REGULAR_EXPRESSION_CONTROLS = ['\\', '(', ')', '['];

function escapeTerm(term) {
  var newTerm = term;
  for (index in REGULAR_EXPRESSION_CONTROLS) {
    var control = REGULAR_EXPRESSION_CONTROLS[index];
    newTerm = newTerm.replaceAll(control, '\\' + control);
  }
  return newTerm;
}

function titleMatches(title, searchTerm) {
  if (searchTerm === '') return true;
  var term = escapeTerm(searchTerm);
  var expression = new RegExp(term, 'gi');
  return expression.test(title);
}

$().ready(function() {
  var definitions = [];
  $('.definition')
    .each(function(index, node) {
      var element = $(node);
      var anchor = element.find('a');
      var title = anchor.text().toLowerCase();
      var link = anchor.attr('href');
      var definition = {
        title: title,
        element: element,
        link: link,
      };
      definitions.push(definition);
    });
  $('<input class="searchterm" type="text" value="" />')
    .keyup(function(event) {
      definitions.forEach(function(definition) {
        if (titleMatches(definition.title, event.target.value)) {
          definition.element.removeClass('hidden');
        } else {
          definition.element.addClass('hidden');
        }
      });
    })
    .insertBefore('.definitions');
});
