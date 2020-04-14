//colors
const c1 = '#F37D7F', c2= '#FFCD6B', c3='#54C5EF', c4='#11B7A4';
const bc1 = '151B26', bc2 = '24273B';
c1

function d_healthScoreGen() {
  return [{
    name: 'Health Score',
    value: Math.floor(Math.random()*100),
    range: 100
  }]
}


function d_quarterlyRevenueGen() {
  return [  
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
}

function d_yearlyRevenueGen() {
  return [
  {
    year: 2017,
    value: Math.floor(Math.random()*1000+10000)
  },
  {
    year: 2018,
    value: Math.floor(Math.random()*1000+10000)
  },
  {
    year: 2019,
    value: Math.floor(Math.random()*5000+10000)
  }
]
}

let d_healthScore = d_healthScoreGen();
let d_quarterlyRevenue = d_quarterlyRevenueGen();
let d_yearlyRevenue = d_yearlyRevenueGen();


