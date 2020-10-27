async function loadData() {
    let data = await d3.json("data/jf-data.json");
    barchart.setData(data)
    barchart.drawChart()
}

let barchart = new BarChart();

loadData()
