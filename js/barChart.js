class BarChart {
    constructor(){
        this.size = {
            "padding": 10
        }
        this.data;
        this.mainChart;

        this.xScale;
        this.barScale;
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

        this.xScale = d3.scaleLinear()
            .domain([0,100])
            .range([0, this.mainChart.node().getBoundingClientRect().width - this.size.padding])

        let dom = new Array()
        this.data.forEach(e => { dom.push(e.episode_num) });

        this.barScale = d3.scaleOrdinal()
            .domain(dom)
            .range(Array.apply(undefined, Array(this.data.length)).map((d, i) => i*35))

        let bars = d3.select("#bars")
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .classed("combined", true)

        bars.attr("height", 30)
            .attr("x", 0)
            .attr("rx", 5)
            .attr("ry", 5)

        bars.transition()
            .duration(200)
            .attr("y", d => this.barScale(d.episode_num))
            .attr("width", d => this.xScale(d.score.combined))
    }

    updateChart(key = "episode_num"){
        let sign = document.getElementById('descending').checked ? 1 : -1;

        let sortedData = this.data.sort((a, b) => {return sign * b[key] + a[key]})
        let dom = new Array()
        sortedData.forEach(e => { dom.push(e.episode_num) });

        this.barScale.domain(dom)

        let bars = d3.select("#bars")
            .selectAll("rect")
            .join("rect")
            .transition()
            .duration(200)
            .attr("y", d => this.barScale(d.episode_num))
    }

    addText(){
        // TODO:
    }
}