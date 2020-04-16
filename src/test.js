let data = { value: 40, };

function dataGenerator() {
  return { value: Math.floor(Math.random() * 100) }
}

function arcChart() {



  data = dataGenerator();

  width = 400, height = 400;
  startA = 140; // max angle of arc in degrees
  rad = [ 95, 120, 152, 185, 220 ]; // radius of elements
  thick = [ 6, 0, 15, 1 ]; // thickness of elements

  // setup svg
  let svg = d3.select('#main')
    .style('background-color', '#999999')

  // setup centered group
  let center = svg.selectAll('.center').data([null])
    .join('g')
    .attr('class', 'center')
    .attr('transform', `translate(${width/2},${height/2})`)

  // setup layers
  let bg = center.selectAll('.bg').data([null])
    .join('g')
    .attr('class', 'bg')

  let layer1 = center.selectAll('.layer1').data([null])
    .join('g')
    .attr('class', 'layer1')

  // // add bg circle
  bg.selectAll('circle').data([null]).join('circle')
    .attr('r', 120)
    .style('fill', 'white')

  let arcScale = d3.scaleLinear()
    .domain([0, 100])
    .range ([-startA, startA]);

  let arc = d3.arc()
    .innerRadius(rad[0] - thick[0])
    .outerRadius(rad[0] + thick[0])
    .cornerRadius(10)
    .startAngle(-startA * (Math.PI/180)) //converting from degs to radians
    .endAngle(d => d * (Math.PI/180))// * (Math.PI/180)) //just radians

  // tween between this._current and current data arc
  let arcTween = d => {
    let current = this.mainPath._groups[0][0]._current;  // is there a more elegant way to do this?
    console.log('>>>',current);
    let i = d3.interpolate( current, d );
    this.mainPath._groups[0][0]._current = d;
    return function(t) { return arc(i(t)); };
  }

  // manually tween between an 'empty' arc and current data arc
  let arcTween2 = d => {
    let i = d3.interpolate( -startA, d );
    return function(t) { return arc(i(t)); };
  } 

  mainPath = layer1.selectAll('.mainPath')
    .data([arcScale(data.value)])
    .join(
      enter => enter
        .append('path')   
        .attr('d', arc)
        .attr('id','mainPath')
        .style('fill', 'white')
      .call(enter => enter.transition().duration(500)
        .attrTween('d', arcTween2) // if I use arcTween2 this works
        .style('fill', 'steelblue')
        .each(function(d) { this._current = d }) // at the end of the animation set this._current to the data(???)
      ),
      update => update
        .transition()
        .duration(200)
        .attrTween('d', arcTween)
        .style('fill', 'steelblue')     
      )

}

function update() {
  let arc = d3.select('#mainPath');
  
  let arcScale = d3.scaleLinear()
  .domain([0, 100])
  .range ([-startA, startA]);

  arc.data([arcScale( { value: Math.random()*100 } )])
    .join()
    .transition()
    .duration(200)
    .style('fill', 'red')

}

arcChart();