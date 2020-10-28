class BarChart {
    constructor(){
        this.size = {
            "padding": 10
        }
        this.data;
        this.mainChart;

        this.xScale;
        this.yScale;
    }

    setData(data){ this.data = data; }

    drawChart(){
        let chartWrapper = d3.select("#chart-wrapper");

        this.mainChart = d3.select("svg.main");

        this.addBars();
        this.addText();
        this.mainChart
            .append("g")
            .attr("id", "circles")
            .attr("transform", `translate(${this.size.padding}, ${this.size.padding})`);
    }

    addBars(){
        this.mainChart
            .append("g")
            .attr("id", "bars")
            .attr("transform", `translate(${this.size.padding}, ${this.size.padding})`);

        this.xScale = d3.scaleLinear()
            .domain([0,100])
            .range([0, this.mainChart.node().getBoundingClientRect().width - 2*this.size.padding])

        let dom = new Array()
        this.data.forEach(e => { dom.push(e.episode_num) });

        this.yScale = d3.scaleOrdinal()
            .domain(dom)
            .range(Array.apply(undefined, Array(this.data.length)).map((d, i) => i*35));

        let bars = d3.select("#bars")
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .classed("combined", true);

        let that = this;
        bars.attr("height", 30)
            .attr("x", 0)
            .attr("rx", 5)
            .attr("ry", 5)
            .on("mouseover", function (d) {
                //TODO: Figure out why this isn't working with 'd'
                that.drawCircles(this.__data__);
                that.drawTooltip(this)
            })
            // .on("mousemove", function (d) {
            //     d3.select('div.tooltip')
            //         .style("left", (d3.event.pageX + 20) + "px")     
            //         .style("top", (d3.event.pageY - 20) + "px"); 
            // })
            .on("mouseout", function (d) {
                //TODO: Figure out why this isn't working with 'd'
                that.removeCircles(this.__data__);
                that.removeTooltip(this);
            });

        bars.transition()
            .duration(200)
            .attr("y", d => this.yScale(d.episode_num))
            .attr("width", d => this.xScale(d.score.combined))

        
    }

    updateChart(){
        let sign = document.getElementById('ascending').checked ? -1 : 1;
        let key = document.getElementById('sort-select').value;

        let sortedData;
        if(key == "episode_num"){
            sortedData = this.data.sort((a, b) => {return sign*(a[key] - b[key]) });
        }
        else{
            sortedData = this.data.sort((a, b) => {return sign*(a.score[key] - b.score[key]) });
        }
        
        let dom = new Array();
        sortedData.forEach(e => { dom.push(e.episode_num) });

        this.yScale.domain(dom);

        let bars = d3.select("#bars")
            .selectAll("rect")
            .join("rect")
            .transition()
            .duration(200)
            .attr("y", d => this.yScale(d.episode_num));

        let text = d3.select("#text")
            .selectAll("text")
            .join("text")
            .transition()
            .duration(200)
            .attr("y", d => this.yScale(d.episode_num) + 20);
    }

    addText(){
        this.mainChart
            .append("g")
            .attr("id", "text")
            .attr("transform", `translate(${this.size.padding}, ${this.size.padding})`);

        let text = d3.select("#text")
            .selectAll("text")
            .data(this.data)
            .join("text")
            .classed("chart-text", true)
            .transition()
            .duration(200)
            .attr("x", d => this.xScale(d.score.combined) - 5)
            .attr("y", d => this.yScale(d.episode_num) + 20)
            .text(d => `${d.score.combined} ${d.emoji}`);
    }

    drawCircles(data) {
        let circles = d3.select("#circles")
            .selectAll("circle")
            .data([data.score.michael, data.score.jordan])
            .join('circle')
            .attr('cy', this.yScale(data.episode_num) + 15)
            .attr('cx', this.xScale(data.score.combined))
            .attr('r', 10)
            .classed('michael', (d, i) => i == 0)
            .classed('jordan', (d, i) => i == 1)

        circles
            .transition()
            .duration(200)
            .attr("opacity", 1)
            .attr('cx', d => this.xScale(d))

        let text = d3.select("#circles")
            .selectAll("text")
            .data([data.score.michael, data.score.jordan])
            .join('text')
            .attr('y', this.yScale(data.episode_num) + 20)
            .attr('x', this.xScale(data.score.combined))
            .text((d, i) => i == 0 ? "M" : "J")
            .classed('michael', (d, i) => i == 0)
            .classed('jordan', (d, i) => i == 1)

        text
            .transition()
            .duration(200)
            .attr("opacity", 1)
            .attr('x', d => this.xScale(d))
    }

    drawTooltip(data){
        // console.log(`${data.__data__.restaurant} ${data.__data__.food}`)
        d3.select("div.tooltip")
            .transition()
            .duration(200)
            .style("opacity", 0.9)

        d3.select('#tooltip-episode')
            .text(`Episode: ${data.__data__.episode}`)

        d3.select('#tooltip-title')
            .text(`${data.__data__.restaurant} ${data.__data__.food}`)

        d3.select('#tooltip-scores')
            .text(`Combined: ${data.__data__.score.combined}, Michael: ${data.__data__.score.michael}, Jordan: ${data.__data__.score.jordan}`)
    }

    moveTooltip(data){
        
    }

    removeCircles(data){
        d3.select("#circles")
            .selectAll("circle")
            .data([data.score.michael, data.score.jordan])
            .join('circle')
            .transition()
            .duration(200)
            .attr('cx', this.xScale(data.score.combined))
            .attr("opacity", 0)

        d3.select("#circles")
            .selectAll("text")
            .data([data.score.michael, data.score.jordan])
            .join('text')
            .transition()
            .duration(200)
            .attr('x', this.xScale(data.score.combined))
            .attr("opacity", 0)
    }

    removeTooltip(data){
    d3.select("div.tooltip")
        .transition()
        .duration(200)
        .style("opacity", 0)
    }
}