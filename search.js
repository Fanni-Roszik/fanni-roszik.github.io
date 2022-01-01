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
  var definitionsContainer = $('.container');
  var iframe = $('<iframe src="" />');

  var popup = $('<div class="popup"></div>')
    .append(iframe)
    .append('<span class="close">X</span>');

  var overlay = $('<div class="overlay hidden"></div>')
    .click(function() {
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
    .click(function(event) {
      event.preventDefault();
      var link = $(event.target).attr('href');
      if (link) {
        iframe.attr('src', link);
        definitionsContainer.addClass('blurred');
        overlay.removeClass('hidden');
      }
    });
  
  $('<input class="searchterm" type="text" value="" placeholder="Keresés" />')
    .keyup(function(event) {
      definitions.forEach(function(definition) {
        if (titleMatches(definition.title, event.target.value)) {
          definition.element.removeClass('flat');
        } else {
          definition.element.addClass('flat');
        }
      });
    })
    .insertBefore('.definitions');
});
