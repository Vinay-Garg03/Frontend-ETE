function display()
{
    //for stopping page from reloading
    event.preventDefault();
    var country=document.getElementById('country').value;
    var startDate=document.getElementById('start').value;
    var endDate=document.getElementById('end').value;
    if(country!=""&&startDate!=""&&endDate!="")
    {
        var url="https://api.covid19api.com/country/" + country + "?from=" +startDate + "T00:00:00Z&to=" + endDate + "T00:00:00Z";
        getApiData(url);
    }
    else
        alert("All fields are required");
}
//for getting data from api
async function getApiData(url)
{
    console.log("yes");
    // Storing response
    const response = await fetch(url);
        // Storing data
    if(response.status==200) {
        var data = await response.json();
        console.log(data);
        show(data);
    }
    else
        alert("!!! Enter Correct Details !!!");
}
//for showing data on web page
function show(data)
{
    var result="";
    var startDate=document.getElementById('start').value + "T00:00:00Z";
    var endDate=document.getElementById('end').value + "T00:00:00Z";
    var flag=0;
    for(var info of data)
    {
        if(info.Date>=startDate&&info.Date<=endDate)
        {
            result+="<table>" +
                    "<tr><th>Confirmed Cases</th><td>:" + info.Confirmed + "</td></tr>" +
                    "<tr><th>Active Cases</th><td>:" + info.Active + "</td></tr>" +
                    "<tr><th>Death Cases</th><td>:" + info.Deaths + "</td></tr>" +
                    "</table>";
            flag=1;
        }
    }
    if(flag==0)
        alert("!!! Enter Correct Details !!!");
    else
        document.getElementById("output").innerHTML=result;
}