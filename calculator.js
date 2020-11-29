    "use strict";

    const el = function(element) {
      if (element.charAt(0) === "#") { 
        return document.querySelector(element); 
      }
      return document.querySelectorAll(element); 
    };
  
    
    let viewer = el("#viewer"), 
      equals = el("#equals"), 
      nums = el(".num"), 
      ops = el(".ops"), 
      theNum = "", 
      oldNum = "", 
      resultNum, 
      operator; 
  
     const setNum = function() {
      if (resultNum) { 
        theNum = this.getAttribute("data-num");
        resultNum = "";
      } else { 
        theNum += this.getAttribute("data-num");
      }
        viewer.innerHTML = theNum; 
    };
  
     const moveNum = function() {
      oldNum = theNum;
      theNum = "";
      operator = this.getAttribute("data-ops");
  
      equals.setAttribute("data-result", ""); 
      viewer.innerHTML = oldNum+operator; 
    };
  
    
    const displayNum = function() {
  
      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);
  
      switch (operator) {
        case "+":
          resultNum = oldNum + theNum;
          break;
  
        case "-":
          resultNum = oldNum - theNum;
          break;
  
        case "*":
          resultNum = oldNum * theNum;
          break;
  
        case "/":
          resultNum = oldNum / theNum;
          break;
  
        default:
          resultNum = theNum;
      };
  
       if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) { 
          resultNum = "error";
        } else { 
          resultNum = "Nem lesz jó";
          el('#calculator').classList.add("broken"); 
        }
      }
  
      viewer.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);
  
      oldNum = 0;
      theNum = resultNum;
     
    };
  
    const clearAll = function() {
      oldNum = "";
      theNum = "";
      viewer.innerHTML = "0";
      equals.setAttribute("data-result", resultNum);
    };
  
   
    for (let i = 0, l = nums.length; i < l; i++) {
      nums[i].onclick = setNum;
    };
  
    for (let i = 0, l = ops.length; i < l; i++) {
      ops[i].onclick = moveNum;
    };
  
    equals.onclick = displayNum;
  
    el("#clear").onclick = clearAll;
  
   