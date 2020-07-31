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

}
//3.to draw bars in the graph
let drawBars =() => {

}
//4. to generate the graphs
let generateAxes = () => {

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