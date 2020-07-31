//setting height width and padding of the svg
let width = 800
let height = 600
let padding = 40
//url to call api and request insatnce 
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
let req = new XMLHttpRequest()

//values rrturned after request
let data
let values = []

//scales
let heightScale
let xScale
let xAxisScale
let yAxisScale

let svg = d3.select('svg')

//functions

//1.toCreate  canvas
let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}
//2.toGenerate scale
let generateScales = () =>{
    xScale= d3.scaleLinear()
              .domain([0,values.length-1])
              .range([padding , width-padding])

    heightScale = d3.scaleLinear()
                    .domain([0,d3.max(values , item=> item[1])])
                    // .range([height-padding , padding])
                    .range([0, height - (2*padding)])  
    
    let dateArr = values.map(item=>{
        return new Date(item[0])
    })

    xAxisScale = d3.scaleTime()
                   .domain([d3.min(dateArr) , d3.max(dateArr)])
                   .range([padding , width - padding])

    yAxisScale = d3.scaleLinear()
                   .domain([0, d3.max(values , item=> item[1])])
                   .range([height-padding , padding])
}
//3.to draw bars in the graph
let drawBars =() => {
    let tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('visibility', 'hidden')
    .style('width', 'auto')
    .style('height', 'auto')


    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr("class","bar")
        .attr("width" , (width - (2 * padding))/values.length)
        .attr("data-date" , item=> item[0])
        .attr("data-gdp" , item=> item[1])
        .attr("height", item=> heightScale(item[1]))
        .attr("x", (item,index)=> xScale(index))
        .attr('y', item=> (height - padding) - heightScale(item[1]))
        
        

        .on('mouseover', (item) => {
            tooltip.transition()
                .style('visibility', 'visible')

            tooltip.text(item[0]+" " + item[1])

            document.querySelector('#tooltip').setAttribute('data-date', item[0])
        })
        .on('mouseout', (item) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })   
        
}
//4. to generate the graphs
let generateAxes = () => {
    let xAxis = d3.axisBottom(xAxisScale)
    let yAxis = d3.axisLeft(yAxisScale)

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform' , 'translate(0, '+(height-padding)+')');

        svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
}



//MAIN BODY
req.open('GET', url, true)
req.onload = () => {
    data = JSON.parse(req.responseText)
    values = data.data
    console.log(values)
    drawCanvas()
    generateScales()
    drawBars()
    generateAxes()
}
req.send()