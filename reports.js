async function loadReports() {
    let res = await fetch("http://localhost:5000/items");
    let items = await res.json();

    let men=0, women=0, kids=0;
    let inStock=0, low=0, out=0;

    items.forEach(i => {
        if(i.category==="Men") men++;
        else if(i.category==="Women") women++;
        else if(i.category==="Kids") kids++;

        if(i.qty>10) inStock++;
        else if(i.qty>0) low++;
        else out++;
    });

    document.getElementById("categoryTable").innerHTML = `
    <tr><td>Men</td><td>${men}</td></tr>
    <tr><td>Women</td><td>${women}</td></tr>
    <tr><td>Kids</td><td>${kids}</td></tr>
    `;

    new Chart(barChart, {
        type:'bar',
        data:{ labels:['Men','Women','Kids'], datasets:[{data:[men,women,kids]}]}
    });

    new Chart(pieChart, {
        type:'pie',
        data:{ labels:['In','Low','Out'], datasets:[{data:[inStock,low,out]}]}
    });
}

loadReports();