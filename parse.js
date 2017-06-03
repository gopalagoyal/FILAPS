
$('#submit').click(function()
{
	$("input[type=file]").parse({
		config: 
		{
			delimiter:",",
			header: true,
			dynamicTyping: true,
			skipEmptyLines: false,
			complete: function(result, file) 
			{
				console.log("This file done:", file);
				var emp=(JSON.stringify(result.data, null, 4));
//......................................................        
		  //console.log(result.data[0]["Size"]); //Printing the JSON stringified data
     // console.log(emp);
     //THIS CODE BELOW HAS TO BE USED FOR VALIDATION ON EMPLOYEE CSV FILE
       for (var i = 0; i < result.data.length; i++) {
         if(result.data[i]["Corp_ID"]=="" && result.data[i]["Start_date"]=="" && result.data[i]["End_date"]==""){
          console.log("Caught blank elemnt at " + (i+1) + "th position");
         }
       }
//......................................................       

        $.ajax( {
         url: 'http://localhost:8100/department/v1',
         data: result.data,
         datatype : "application/json",
         type: 'POST',
         dataType: 'JSON',
         success: function( returnObj ) {
          //FunctionDefinitionHere
          console.log(result.data);
         }
       });
   }
 }
});

});
