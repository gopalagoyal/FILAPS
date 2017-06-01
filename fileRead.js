var CallBackFunction = function(content)
{
    alert(content);
}
ReadFileAllBrowsers(document.getElementById("addFile"), CallBackFunction); 

//Tested in Mozilla Firefox browser, Chrome
function ReadFileAllBrowsers(FileElement, CallBackFunction)
{
try
{
    var file = FileElement.files[0];
    var contents_ = "";

     if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt)
        {
            CallBackFunction(evt.target.result);
        }
        reader.onerror = function (evt) {
            alert("Error reading file");
        }
    }
}
catch (Exception)
 {
    var fall_back =  ieReadFile(FileElement.value);
    if(fall_back != false)
    {
        CallBackFunction(fall_back);
    }
 }
}

///Reading files with Internet Explorer
function ieReadFile(filename)
{
 try
 {
    var fso  = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile(filename, 1);
    var contents = fh.ReadAll();
    fh.Close();
    return contents;
 }
 catch (Exception)
  {
    alert(Exception);
    return false;
  }
 }