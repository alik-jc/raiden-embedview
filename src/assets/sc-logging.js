document.onkeydown = function(e) { 
        if (e.ctrlKey && (e.keyCode === 67 ||  e.keyCode === 73 ||  e.keyCode === 74 ||  e.keyCode === 75 ||  e.keyCode === 83 ||  e.keyCode === 85 ||  e.keyCode === 123)) { return false; } else { return true; } }; 
      
        // Prevent right click
        document.addEventListener('contextmenu', event => event.preventDefault());
    
        // If open devtools
        function detectDevTool(allow) {
            if(isNaN(+allow)) allow = 100;
            var start = +new Date();
            debugger;
            var end = +new Date();
            if(isNaN(start) || isNaN(end) || end - start > allow) {
                window.location.href = "https://aniyae.net/404";
            }
        }
        if(window.attachEvent) {
            if (document.readyState === "complete" || document.readyState === "interactive") {
                detectDevTool();
                window.attachEvent('onresize', detectDevTool);
                window.attachEvent('onmousemove', detectDevTool);
                window.attachEvent('onfocus', detectDevTool);
                window.attachEvent('onblur', detectDevTool);
            } else {
                setTimeout(argument.callee, 0);
            }
        } else {
            window.addEventListener('load', detectDevTool);
            window.addEventListener('resize', detectDevTool);
            window.addEventListener('mousemove', detectDevTool);
            window.addEventListener('focus', detectDevTool);
            window.addEventListener('blur', detectDevTool);
        }
    
        // Prevenir que el script se cargue fuera de un iframe
        if (window.self !== window.top) {
            
        }
        else {
            window.location.href = "https://aniyae.net/404";
        }