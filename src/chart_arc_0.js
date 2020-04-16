

function arcChart(_svg) {

  svg = d3.select(`#svg_${_svg}`);
  let data = d_healthScore;

  arcVar = {
    startA: 140, // max angle of arc in degrees
    rad: [ 95, 120, 152, 185, 220 ], // radius of elements
    thick: [ 6, 0, 15, 1 ], // thickness of elements
  }

  width = +svg.style('width').slice(0, -2),
  height = +svg.style('height').slice(0, -2),
  padLeft = 0,
  padRight = 0,
  padBottom = 10,
  padTop = 70;

  innerWidth = width - padLeft - padRight;
  innerHeight = height - padTop - padBottom;

  // setup centered group
  let center = svg.selectAll('#center').data([null])
    .join('g')
    .attr('id', 'center')
    .attr('transform', `translate(${width/2},${height/2})`)

  // setup layers
  let bg = center.selectAll('#bg').data([null])
    .join('g')
    .attr('id', 'bg')

  let layer1 = center.selectAll('#layer1').data([null])
    .join('g')
    .attr('id', 'layer1')

  //const bg = svg.selectAll('.bg')
  //const layer1 = svg.selectAll('.layer1')

  // add bg circle
  bg.selectAll('circle').data([null]).join('circle')
    .attr('r', 120)
    .style('fill', bc2)

  // empty arc
  bg.selectAll('path').data([null]).join('path')
    .attr('d', d3.arc()
        .innerRadius(arcVar.rad[0] - arcVar.thick[0])
        .outerRadius(arcVar.rad[0] + arcVar.thick[0])
        .cornerRadius(10)
        .startAngle(-arcVar.startA * (Math.PI/180))
        .endAngle(arcVar.startA * (Math.PI/180))
      )
    .style('fill', bc1)

    
  let arcScale = d3.scaleLinear()
    .domain([0, data.range])
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

  // add main data text
  mainText = layer1.selectAll('#mainArcData').data([data.value])
    .join(
      enter => enter
      .append('text')
      .attr('id', 'mainArcData')
      .property('_current', data.value)
      .text(Math.floor(data.value))
      .attr('y', 23)
      .style('opacity', 0)
      .call(enter => enter
        .transition(t)
        .style('opacity', 100)
        ),
      update => update
      .call(update => update
        .transition(t)
        .textTween(function(d) {
          const i = d3.interpolate(this._current, d);
          console.log(this._current)
          return function(t) {return this._current = Math.floor(i(t))}
        }
        )
      )
    )
    

  mainArcTitle = layer1.selectAll('.mainArcTitle').data(['Business', 'Potential Soore'])
    .join('text')
    .attr('class', 'mainArcTitle')
    .text(d => d)
    .attr('y', (d, i) => i * 16 - 24 )

  
  // add main arc
  mainPath = layer1.selectAll('#arcMainPath')
    .data([arcScale(data.value)])
    .join(
      enter => enter
        .append('path')   
        .attr('id','arcMainPath')
        .style('fill', bc2)
      .call(enter => enter.transition().duration(500)
        .attrTween('d', arcTween2) // if I use arcTween2 this works
        .style('fill', c1)
        .each(function(d) { this._current = d }) // at the end of the animation set this._current to the data(???)
      ),
      update => update
        .transition()
        .duration(200)
        .attrTween('d', arcTween)
        .style('fill', c1)     
      )
}




