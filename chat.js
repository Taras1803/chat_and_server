function jsonPost(url, data) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
    ajax.open("POST", url, true);
    // ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let res = JSON.stringify(data);
    ajax.send(res);

    ajax.onreadystatechange = () => {
        if (ajax.readyState == XMLHttpRequest.DONE && ajax.status == 200) {
            var data = JSON.parse(ajax.responseText);
            resolve(data);
        } else if (ajax.status != 200) {
            reject(new Error("status is not 200"))
        }
    }
})
}
var button = document.getElementById('button');

button.onclick =  async function insertmessage() {
    var message = document.getElementById('message').value;
    var data = await
    jsonPost("server.php", {func: 'addMessage', name: "Taras", mess: message});
    document.getElementById('message').value = null;
}

async function readmessage() {
    var data = await jsonPost("server.php", {func: "getMessages", messageId: 0});
    //console.log(data);
    var mesid = data.nextMessageId-15;
    var data1 = await jsonPost("server.php", {func: "getMessages", messageId: 85 });
    console.log(data1,mesid);
    var data2 = data1;
    var table = document.getElementById('sms');
    table.innerHTML = '';
    var row = document.createElement('tr');
    table.appendChild(row);
    for (var item in data2[1]){
        var name = document.createElement('th');
        name.className = 't1 t3';
        name.innerText = item;
        row.appendChild(name);
    }
    for (var i=(data2.length)-1; i>=0; i--){
        var row = document.createElement('tr');
        table.appendChild(row);
        for (var item in data2[i]){
            let cell = document.createElement('td');
            cell.className = 't3';
            cell.innerHTML = data2[i][item];
            row.appendChild(cell);
        }

        var count = document.createElement('td');
        count.className = 't3';
        count.innerText = data2[i].nick;
        row.appendChild(count);
        var count1 = document.createElement('td');
        count1.className = 't3';
        count1.innerText = data2[i].message;
        row.appendChild(count1);
        var count2 = document.createElement('td');
        count2.className = 't3';
        var todate=new Date(data2[i].timestamp).getDate();
        var tomonth=new Date(data2[i].timestamp).getMonth()+1;
        var toyear=new Date(data2[i].timestamp).getFullYear();
        var tohour=new Date(data2[i].timestamp).getHours();
        var tominute=new Date(data2[i].timestamp).getMinutes();
        var original_date=todate+'/'+tomonth+'/'+toyear+'  '+tohour+':'+tominute;
        count2.innerText = original_date;
        row.appendChild(count2);
    }
}
readmessage();
setInterval(readmessage,10000);
