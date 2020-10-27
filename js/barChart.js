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
            .attr("transform", `translate(${this.size.padding}, ${this.size.padding})`)

        let xScale = d3.scaleLinear()
            .domain([0,100])
            .range([0, this.mainChart.node().getBoundingClientRect().width - this.size.padding])

        let bars = d3.select("#bars")
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .classed("combined", true)

        bars.attr("height", 30)
            .attr("x", 0)
            .attr("y", (d,i) => i*35)
            .attr("rx", 5)
            .attr("ry", 5)

        bars.transition()
            .duration(200)
            .attr()
            .attr("width", d => xScale(d.score.combined))
    }

    addText(){
        // TODO:
    }
}