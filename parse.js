$('#submit').click(function() {
  var blankFields=[];
    $("input[type=file]").parse({
        config: {
            delimiter: ",",
            header: true,
            dynamicTyping: true,
            skipEmptyLines: false,
            complete: function(result, file) {
                console.log("This file done:", file);
                
                //......................................................        
                //console.log(result.data[0]["Size"]); //Printing the JSON stringified data
                //console.log(emp);
                //THIS CODE BELOW HAS TO BE USED FOR VALIDATION ON EMPLOYEE CSV FILE
                for (var i = 0; i < result.data.length; i++) {
                    if (result.data[i]["Corp_ID"] == "" && result.data[i]["Start_date"] == "" && result.data[i]["End_date"] == "") {
                        blankFields.push(i+2);
                    }
                }
                for(var i = 0; i <= result.data.length; i++) {
                  if(result.data.length==0){
                    alert("Empty File bro");
                  }
                  else if(result.data[i]["Corp_ID"] == "" && result.data[i]["Start_date"] == "" && result.data[i]["End_date"] == "") {
                    result.data.splice(i, 1);
                  }
                }
                var emp = (JSON.stringify(result.data, null, 4));
                console.log(emp);
                console.log("Caught blank element at " + blankFields + " rows in the excel sheet");

                //......................................................   
                //AJAX QUERY TO POST DATA
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:8100/employee/v1",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": emp
                }

                $.ajax(settings).done(function(response) {
                    console.log(response);
                });
            }
        }
    });

});