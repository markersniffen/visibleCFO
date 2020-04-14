// select divs
let div = [
  document.getElementById('d1'),
  document.getElementById('d2'),
  document.getElementById('d3'),
  document.getElementById('d4'),
  document.getElementById('d5')
];

// select divs d3 way
let d3div = [
  d3.select('#d1'),
  d3.select('#d2'),
  d3.select('#d3'),
  d3.select('#d4'),
  d3.select('#d5')
];

// I REALIZED THE STUPID ._groups[0][0] THING.....

function myResponsiveComponent(container, props) {
  // add the svg
  let svg = container.selectAll('svg').data([null]);
  svg.enter().append('svg')
      .attr('id', `svg_${container._groups[0][0].id}`)
      .style('background-color', 'none')
      .merge(svg)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewbox', `0 0 ${props.width} ${props.height}`)
}

function prepSVG() {
  // go through each div 
  div.forEach( (d, i) => {
    // draw SVGs for each
    myResponsiveComponent(d3div[i], { width: d.offsetWidth, height: d.offsetHeight } );
  });
}

function setup() {
  arcSetup();
  arcDraw();
  chartLine1(d3.select('#svg_d1'));
  chartLine2(d3.select('#svg_d2'));
}

function render() {
  arcDraw();
  chartLine1(d3.select('#svg_d1'));
  chartLine2(d3.select('#svg_d2'));

}


prepSVG();
setup();
render();



window.addEventListener('resize', render);


