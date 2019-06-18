var Extractor = (function(){

    var obj = {
        debug: false,
        debugParams: false
    };

    var local = {
        debug: false,
        debugParams: false
    };

    obj.extract = function(selector)
    {
        if(obj.debug) console.log('Extractor.ExtractEvents()');
        if(obj.debugParams) console.log(selector);

        var element = $(selector);
        var result = local.getElementsWithEvents([], element);

        return result;
    };

    local.getElementsWithEvents = function(result, element)
    {
        if(local.debug) console.log('Extractor.getElementsWithEvents()');
        if(local.debugParams) console.log(result, element);

        return local.processElement(result, element);
    };

    local.processElement = function(result, element)
    {
        if(local.debug) console.log('Extractor.processElement()');
        if(local.debugParams) console.log(result, element);

        var children = element.children();

        if(element[0].EventListeners != undefined)
        {
            result.push({
                element: element,
                selector: element.getPath(),
                events: element[0].EventListeners
            });
        }

        if(children != undefined && children.length > 0)
        {
            element.children().each(function(index, element)
            {
                result = local.processElement(result, $(element));
            });
        }
        
        return result;
    };

    jQuery.fn.getPath = function () {
        if (this.length != 1) throw 'Requires one element.';
    
        var path, node = this;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();
    
            var parent = node.parent();
    
            var siblings = parent.children(name);
            if (siblings.length > 1) { 
                name += ':eq(' + siblings.index(realNode) + ')';
            }
    
            path = name + (path ? '>' + path : '');
            node = parent;
        }
    
        return path;
    };

    return obj;

}());