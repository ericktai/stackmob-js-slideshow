(function() {
  var root = this;
  var SMDebug = window.SMDebug = root.SMDebug = {};

  if (!JSONFormatter) {
    var script = document.createElement('script');
    script.setAttribute('src','http://static.stackmob.com/resources/js/jsonFormatter-0.1.0-min.js');
    script.setAttribute('type','text/javascript');
    var loaded = false;
    var loadFunction = function() {
      if (loaded) return;
      loaded=true;
    };
    script.onload = loadFunction;
    script.onreadystatechange = loadFunction;
    
    var headID = document.getElementsByTagName("head")[0];         
    if (headID) headID.appendChild(script);  
  }
  
  SMDebug['defaults'] = function(defaultTarget) {
    options = options || {};
    this.target = defaultTarget;
  }
  
  SMDebug['callbacks'] = function(txt, options) {
      options = options || {};
      var isOptions = typeof(options) != 'string';
      var target = (!isOptions ? options : options['target']) || this.target;
      var s = isOptions ? options['success'] : function() {};
      var f = isOptions ? options['error'] : function() {};
      
      return {
        success: function(result) {
          txt = txt || '';
          console.debug('------- ' + txt + ' success start-----');
          
          if (target) {
            if (result) {
              var jf = new JSONFormatter((result.toJSON ? result.toJSON() : result), 'pre');
              
              $('#' + target).val(result.toJSON || _.isObject(result) ? jf.formatJSON() : result);
              
            } else $('#' + target).text('No response body. Check your Firebug/Developer Tools Javascript Console.');
          }
          if (s) s(result);
          return result;
        },
        error: function(model, response) {
          txt = txt || '';
          console.debug('------- ' + txt + ' error start-----');
          if (target) {
            if (response) {
              var jf = new JSONFormatter(response, 'pre');
              $('#' + target).val(jf.formatJSON());
            } else $('#' + target).val('No response body. Check your Firebug/Developer Tools Javascript Console.');
          }
  
          if (f) f(response);
          return response;
        }
      };
    };

}).call(this);
