class BarChart {
    constructor(){
        this.size = {
            "padding": 10
        }
        this.data;
        this.mainChart;
    }

    setData(data){ this.data = data; }

    drawChart(){
        let chartWrapper = d3.select("#chart-wrapper");

        this.mainChart = chartWrapper
            .append('svg')
            .classed('main', true);

        this.addBars();
        this.addText();
    }

    addBars(){
        this.mainChart
            .append("g")
            .attr("id", "bars")

        let xScale = d3.scaleLinear()
            .domain([0,100])
            .range([0, this.mainChart.node().getBoundingClientRect().width - this.size.padding])

        let bars = d3.select("#bars")
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .classed("combined", true)

        bars.attr("height", 30)
            .attr("width", d => xScale(d.score.combined))
            .attr("x", this.size.padding)
            .attr("y", (d,i) => i*35 + this.size.padding)
    }

    addText(){
        // TODO:
    }
}