const d_quarterlyRevenue = [
  {
    year: 'Q1 17',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q2 17',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q3 17',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q4 17',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q1 18',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q2 18',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q3 18',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q4 18',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q1 19',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q2 19',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q3 19',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q4 19',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  },
  {
    year: 'Q1 20',
    value: Math.floor(Math.random()*1000),
    income: Math.floor(Math.random()*250)
  }
]


function chartLine2(svg) {

  // variables 
  data = d_quarterlyRevenue;

  width = +svg.style('width').slice(0, -2),
  height = +svg.style('height').slice(0, -2),
  padLeft = 0,
  padRight = 0,
  padBottom = 10,
  padTop = 70;

  innerWidth = width - padLeft - padRight;
  innerHeight = height - padTop - padBottom;

  // setup non-padded group
  let g = svg.selectAll('g').data([null])
    .join('g')
    .attr('class', 'g')

  // setup padded group
  let pad = g.selectAll('g').data([null])
    .join('g')
    .attr('class', 'pad')
    .attr('transform', `translate(${padLeft}, ${padTop})`)

  // setup layers
  let layers = pad.selectAll('g').data(['bg', 'layer1', 'layer2'])
    .join('g')
    .attr('class', d => d)

  const bg = svg.selectAll('.bg')
  const layer1 = svg.selectAll('.layer1')
  const layer2 = svg.selectAll('.layer2')

  // define scales
  const x = d3.scalePoint()
    .domain(data.map(d => d.year))
    .range([0, innerWidth])
    .padding(0)
    
  const y = d3.scaleLinear()
    .domain([d3.min(data.map(d => d.value)), d3.max(data.map(d => d.value))])
    .range([innerHeight*.5, 0])

  const y2 = d3.scaleLinear()
    .domain([d3.min(data.map(d => d.income)), d3.max(data.map(d => d.income))])
    .range([innerHeight, innerHeight*.8])

  // define line function
  mainLine = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value))

  secondLine = d3.line()
    .x(d => x(d.year))
    .y(d => y2(d.income))

  // deal wih axis and ticks
  const format = d3.format(',');

  const xAxisBottom = d3.axisBottom()
    .scale(x)
    .tickFormat((d, i) => {
      if (i == 0 || i == data.length-1 ) {
        return d = '';
      } else {
        return d = d;
      }
    })

  // add bg elements

  // add title
  svg.selectAll('.title').data([null])
    .join('text')
    .attr('class', 'title')
    .text('Quarterly Revenue Trends')
    .attr('x', width/2)
    .attr('y', padTop/2)

  // bottom axis
  let xTicksBottom = bg.append('g')
    .attr('class', 'tickBottom')
    .attr('transform', `translate(0,${innerHeight* .5})`)
    .call(xAxisBottom)
    .selectAll('.tick line, .domain')
    .remove()



  // triD = "M-3.54,19.32l-27.19-34.09c-2.33-2.92-0.25-7.23,3.48-7.23h54.38c3.73,0,5.81,4.31,3.48,7.23L3.43,19.32	C1.64,21.56-1.75,21.56-3.54,19.32z"

  // // add triangles
  // g.selectAll('.triangles').data(triData)
  //   .join( enter => enter.append('path')
  //     .attr('d', triD)
  //     .attr('transform', (d, i) => `translate(${width/2 + 50 - (100 * i)},${height - padTop})`)
  //     )
  //   .attr('fill', c1)

  // add data line
  let dataLine = bg.selectAll('.dataLine')
    .data([data])
    .join('path')
    .attr('class', 'dataLine')
    .attr('d', mainLine)
    .style('fill', 'none')
    .style('stroke', c3)
    .style('stroke-width', 2)

  // add data line
  let income1 = bg.selectAll('.clip-path')
  .data([data])
  .join('clip-path')
  .attr('id', 'incomeLine1')
  .join('path')
  .attr('d', secondLine)
  .style('fill', 'red')
  .style('stroke', 'white')
  .style('stroke-width', 2)

  let incomeMask1 = bg.selectAll('incomeLine1')
    .data([null])
    .join('rect')
    .attr('y', 0)
    .attr('clip-path', 'url(#incomeLine1)')
    .attr('width', width)
    .attr('height', y2(175))
    .style('fill', 'green')
    


  // add circles
  let circles = layer1.selectAll('circle')
    .data(data.filter(d => d.value > 500))
    .join('circle')
    .attr('cx', d => x(d.year))
    .attr('cy', d => y(d.value))
    .attr('r', 5)
    .attr('fill', bc1)
    .attr('stroke', 'white')
    .attr('stroke-width', 2)

  // add text in circles
  let text = layer1.selectAll('.label2')
    .data(data.filter(d => d.value > 500))
    .join('text')
    .text(d => d.value)
    .attr('class', 'label2')
    .attr('x', d => x(d.year))
    .attr('y', d => y(d.value) + 15)
    .style('text-align', 'center')

  // add text in circles
let text2 = layer2.selectAll('.label2')
    .data(data)
    .join('text')
    .text(d => d.income)
    .attr('class', 'label2')
    .attr('x', d => x(d.year))
    .attr('y', d => y2(d.income) - 13)
    .style('text-align', 'center')

}
