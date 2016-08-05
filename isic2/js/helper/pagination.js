/** Pagination helper.
 *
 *  Example:
 *
 *    var pagination = new Pagination(100, params);
 *    document.body.appendChild(pagination.render());
 *
 * Copyright 2015  Kota Yamaguchi
 */
define(["./util"],
function (util) {
  function Pagination(count, params) {
    var i, anchor,
        page = parseInt(params.page || 0, 10),
        perPage = parseInt(params.per_page || 30, 10),
        neighbors = parseInt(params.page_neighbors || 2, 10),
        pages = Math.ceil(count / perPage),
        startIndex = Math.min(Math.max(page * perPage, 0), count),
        endIndex = Math.min(Math.max((page + 1) * perPage, 0), count);
    this.begin = function () { return startIndex; };
    this.end = function () { return endIndex; };
    this.render = function (options) {
      options = options || {};
      var index = [];
      for (i = 0; i < pages; ++i) {
        if (i <=  ((page <= neighbors) ? 2 : 1) * neighbors ||
            (page - neighbors <= i && i <= page + neighbors) ||
            pages - ((page >= pages - neighbors - 1) ? 2 : 1) * neighbors <= i)
          index.push(i);
      }
      var container = document.createElement(options.nodeType || "p");
      var container = document.createElement('ul');
      {
        //anchor = document.createElement("a");
        anchor = document.createElement("li");
        a = document.createElement("a");
        if (page > 0)
          a.href = util.makeQueryParams(params, { page: page - 1 });
        a.appendChild(document.createTextNode("Prev"));
        anchor.appendChild(a);
        container.appendChild(anchor);
        container.appendChild(document.createTextNode(" "));
      }
      for (i = 0; i < index.length; ++i) {
        //anchor = document.createElement("a");
        anchor = document.createElement("li");
        a = document.createElement("a");
        if (index[i] !== page)
          a.href = util.makeQueryParams(params, { page: index[i] });
        a.appendChild(document.createTextNode(index[i]));
        anchor.appendChild(a);
        container.appendChild(anchor);
        container.appendChild(document.createTextNode(" "));
        if (i < index.length - 1 && index[i] + 1 != index[i+1])
          container.appendChild(document.createTextNode("... "));
      }
      {
        
        //ul.appendChild(topnav);
        //anchor = document.createElement("a");
        anchor = document.createElement("li");
        a = document.createElement("a");
        if (page < pages - 1)
          a.href = util.makeQueryParams(params, { page: page + 1 });
        
        a.appendChild(document.createTextNode("Next"));
        anchor.appendChild(a);
        container.appendChild(anchor);
        //container.appendChild(ul);
      }
      return container;
    };
  }

  return Pagination;
});
