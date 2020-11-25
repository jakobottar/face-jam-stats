async function loadData() {
    let data = await d3.json("data/fj-data.json");
    barchart.setData(data)
    barchart.drawChart()
}

let barchart = new BarChart();

loadData()
