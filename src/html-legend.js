/**
## HTML Legend
HTML Legend is an attachable widget that can be added to other dc charts to
render legend labels. Unlike the [Legend](#) mixin, which generated legends
as SVG elements, HTML Legend generated HTML table based legends, which are
easier to manipulate with CSS.

```js
chart.legend(dc.htmlLegend().container('#legend'))
```
**/
dc.htmlLegend = function () {
    var _legend = {},
        _parent,
        _container,
        _horizontal=false;

    var _l;

    _legend.parent = function (p) {
        if (!arguments.length) return _parent;
        _parent = p;
        return _legend;
    };

    _legend.render = function () {
        _legend['render' + (_horizontal ? 'Horizontal' : 'Vertical')]();
    };

    _legend.renderHorizontal = function () {
        _container.select('div.dc-legend').remove();
        _l = _container.append('div')
            .attr('class', 'dc-legend');
        var legendables = _parent.legendables();
        var itemEnter = _l.selectAll('div.dc-legend-item')
            .data(legendables).enter()
            .append('div').attr('class', 'dc-legend-item')
            .on('mouseover', _parent.legendHightlight)
            .on('mouseout', _parent.legendReset)
            .on('click', _parent.legendToggle);
        itemEnter.append('span')
            .attr('class', 'dc-legend-item-color')
            .style('background-color', dc.pluck('color'));
        itemEnter.append('span')
            .attr('class', 'dc-legend-item-label')
            .text(dc.pluck('name'));
    };

    _legend.renderVertical = function () {
        _container.select('table.dc-legend').remove();
        _l = _container.append('table')
            .attr('class', 'dc-legend');
        var legendables = _parent.legendables();
        var itemEnter = _l.selectAll('tr.dc-legend-item')
            .data(legendables).enter()
            .append('tr').attr('class', 'dc-legend-item')
            .on('mouseover', _parent.legendHightlight)
            .on('mouseout', _parent.legendReset)
            .on('click', _parent.legendToggle);
        itemEnter.append('td')
            .attr('class', 'dc-legend-item-color')
            .style('background-color', dc.pluck('color'));
        itemEnter.append('td')
            .attr('class', 'dc-legend-item-label')
            .text(dc.pluck('name'));
    };

    /**
    #### .container([selector])
    Set the container selector for the legend widget. Required.
    **/
    _legend.container = function (c) {
        if (!arguments.length) return _container;
        _container = d3.select(c);
        return _legend;
    };

    /**
    #### .horizontal([boolean])
    Display the legend horizontally instead of horizontally
    **/
    _legend.horizontal = function (b) {
        if (!arguments.length) return _horizontal;
        _horizontal = b;
        return _legend;
    };

    return _legend;
};
