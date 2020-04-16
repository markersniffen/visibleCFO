triData = [
  { 
    value: -10,
    name: '# of Clients'
  },
  {
    value: -25000,
    name: 'Avg. Project Size'
  }

]

function chartLine1(_svg) {

  svg = d3.select(`#svg_${_svg}`);

  // variables 
  data = d_yearlyRevenue;
  
  width = +svg.style('width').slice(0, -2),
  height = +svg.style('height').slice(0, -2),
  padLeft = 20,
  padRight = 70,
  padBottom = 150,
  padTop = 70;

  innerWidth = width - padLeft - padRight;
  innerHeight = height - padTop - padBottom;

  // setup non-padded group
  let g = svg.selectAll('#main').data([null])
    .join('g')
    .attr('id', 'main')

  // setup padded group
  let pad = g.selectAll('#pad').data([null])
    .join('g')
    .attr('id', 'pad')
    .attr('transform', `translate(${padLeft}, ${padTop})`)

  // setup layers
  let layers = pad.selectAll('.layers').data(['bg', 'layer1'])
    .join('g')
    .attr('id', d => d)
    .attr('class', 'layers')

  const bg = svg.select('#bg')
  const layer1 = svg.select('#layer1')

  // define scales
  const x = d3.scalePoint()
    .domain(data.map(d => d.value))
    .range([0, innerWidth])
    .padding(.5)

  const xV = d3.scalePoint()
    .domain(data.map(d => d.year))
    .range([0, innerWidth])
    .padding(.5)
    
  const y = d3.scaleLinear()
    .domain([d3.min(data.map(d => d.value)) - 400, d3.max(data.map(d => d.value)) + 400])
    .range([innerHeight, 0])

  // define line function
  mainLine = d3.line()
    .x(d => x(d.value))
    .y(d => y(d.value))

  // deal wih axis and ticks
  const format = d3.format(',');

  const xAxisTop = d3.axisTop()
    .scale(x)
    .tickFormat(d => '$' + format(d))

  const xAxisBottom = d3.axisBottom()
    .scale(xV)

  const yAxis = d3.axisRight()
    .scale(y)

  // add bg elements

  // add title
  svg.selectAll('.title').data([null])
    .join('text')
    .attr('class', 'title')
    .text('Yearly Revenue')
    .attr('x', width/2)
    .attr('y', padTop/2)

  // my tick lines
  let lines = bg.selectAll('.vLines').data(data)
    .join('path')
    .attr('class', 'vLines')
    .attr('d', d => myTicks(x(d.value), innerHeight))
    .style('stroke', 'white')
    .style('stroke-width', 2)
    .style('fill', 'none')

  // top axis
  let xTicksTop = bg.selectAll('.tickTop').data([null])
    .join('g')
    .attr('class', 'tickTop')
    .call(xAxisTop)
    .selectAll('.tick line, .domain')
    .remove()

  // bottom axis
  let xTicksBottom = bg.selectAll('.tickBottom').data([null])
    .attr('class', 'tickBottom')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(xAxisBottom)
    .selectAll('.tick line, .domain')
    .remove()

  // right axis
  let yTicks = bg.selectAll('.tickRight').data([null])
    .join('g')
    .attr('class', 'tickRight')
    .attr('transform', `translate(${innerWidth}, 0)`)
    .call(yAxis)
    .selectAll('.tick line, .domain')
    .remove()



  triD = "M-3.54,19.32l-27.19-34.09c-2.33-2.92-0.25-7.23,3.48-7.23h54.38c3.73,0,5.81,4.31,3.48,7.23L3.43,19.32	C1.64,21.56-1.75,21.56-3.54,19.32z"

 
  // add triangles
  // g.selectAll('.triangles').data(triData)
  //   .join( enter => enter.append('path')
  //     .attr('d', triD)
  //     .attr('transform', (d, i) => `translate(${width/2 + 50 - (100 * i)},${height - padTop})`)
  //     )
  //   .attr('fill', c1)


  // add data line
  let dataLine = bg.selectAll('.dataLine').data([data])
    .join(
      enter => enter
      .append('path')
      .attr('class', 'dataLine')
      .attr('d', mainLine[ {value: 0 }, {value: 0 }, {value: 0 } ])
      .style('fill', 'none')
      .style('stroke', c1)
      .style('stroke-width', 0)
      .call( enter => enter
        .transition(t)
        .attr('d', mainLine)
        .style('stroke-width', 4)
      ),
      update => update
      .call( update => update
        .transition(t)
        .attr('d', mainLine)  
      )
    )

  // add circles
  let circles = layer1.selectAll('.circle')
    .data(data)
    .join(enter => enter
          .append('circle')
          .attr('class', 'circle')
          .attr('cx', d => x(d.value))
          .attr('cy', y.range[1])
          .attr('fill', bc1)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .attr('r', 10)
          .style('opacity', 0)
          .call(enter => enter
            .transition(t)
            .attr('r', 20)
            .attr('cy', d => y(d.value))
            .style('opacity', 100)
          ),
          update => update
          .call(update => update
            .transition(t)
            .attr('cy', d => y(d.value))
          )
    )


  // add text in circles
  let text = layer1.selectAll('.label1')
    .data(data)

    .join(
      enter => enter
        .append('text')
        .text(d => d.year)
        .attr('class', 'label1')
        .style('text-align', 'center')
        .attr('x', d => x(d.value))
        .attr('y', y.range[0])
      .call( enter => enter
        .transition(t)
        .attr('y', d => y(d.value))
        ),
      update => update
        .call( update => update
          .transition(t)
          .attr('y', d => y(d.value))  
        )
    )

}

// my line ticks function
function myTicks(x, len) {
  const tw = 10;
  return `M ${x},0 L ${x},${len} M ${x-tw/2},0 L ${x+tw/2},0 M ${x-tw/2},${len} L ${x+tw/2}, ${len}`
}

function triangle(x, y, width, height) {
  const p1 = `M ${x - width/2},${y - height/2} L ${x + width/2}, ${y - height/2}`;
  const p2 = `L ${x}, ${y + height/2}`;
  const p3 = `L ${x - width/2},${y - height/2}`;
  return p1 + p2 + p3;
}
