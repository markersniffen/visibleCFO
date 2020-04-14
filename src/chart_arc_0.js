arcVar = {
  startA: 140, // max angle of arc in degrees
  rad: [ 95, 120, 152, 185, 220 ], // radius of elements
  thick: [ 6, 0, 15, 1 ], // thickness of elements
}

function arcSetup() {
  console.log('inside arcSetup', d_healthScore)
  divVar = {
    width: 400,
    height: 250
  }

  // create d0 svg element
  const svg_arc = d3.select('#d0').append('svg')
    .attr('id', 'd0_svg')
    .attr('width', divVar.width)
    .attr('height', divVar.height)

  // creates translate group to center stuff
  const arc_center = svg_arc.append('g')
    .attr('transform', `translate(${divVar.width/2},${divVar.height/2})`)
    .attr('id', 'arc_center');

  // add bg circle
  arc_center.append('circle')
    .attr('r', 120)
    .style('fill', bc2)

  // empty arc
  arc_center.append('path')
  .attr('d', d3.arc()
    .innerRadius(arcVar.rad[0] - arcVar.thick[0])
    .outerRadius(arcVar.rad[0] + arcVar.thick[0])
    .cornerRadius(10,)
    .startAngle(-arcVar.startA * (Math.PI/180))
    .endAngle(arcVar.startA * (Math.PI/180))
  )
  .style('fill', bc1)

  
}

function arcDraw() {

  let data = d_healthScore;
    
  let arcScale = d3.scaleLinear()
    .domain([0, data[0].range])
    .range ([-arcVar.startA, arcVar.startA]);

  let arc = d3.arc()
    .innerRadius(arcVar.rad[0] - arcVar.thick[0])
    .outerRadius(arcVar.rad[0] + arcVar.thick[0])
    .cornerRadius(10)
    .startAngle(-arcVar.startA * (Math.PI/180)) //converting from degs to radians
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
    let i = d3.interpolate( -arcVar.startA, d );
    return function(t) { return arc(i(t)); };
  }

  // create random data
  
  data.value = Math.random()*100;

  let mainPathGroup = d3.select('#arc_center').selectAll('g').data([null])
    .join('g')
    .attr('id', 'mainPathGroup')

  mainPath = mainPathGroup.selectAll('path')
    .data([arcScale(data.value)])
    .join(
      enter => enter
        .append('path')   
        .style('fill', bc2)
      .call(enter => enter.transition().duration(500)
        .attrTween('d', arcTween2) // if I use arcTween2 this works
        .style('fill', c1)
        .each(function(d) { this._current = d }) // at the end of the animation set this._current to the data(???)
      ),
      update => update
        .transition()
        .duration(300)
        .attrTween('d', arcTween)
        .style('fill', c1)     
      )

  console.log(mainPath)
}



