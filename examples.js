const MAX_DATA = 1 * 1000 * 1000
const ITER = 100

function avg(a) {
  return a.reduce((sum, val) => sum + val, 0) / a.length
}

function printMillis(n) {
  return n.toFixed(3) + " ms"
}

function randomNumber() {
  console.log('Starting randomNumber...', MAX_DATA)
  const a = []
  console.time("randomNumber")
  for(let i = 0; i < MAX_DATA; i++) {
    a.push(Math.random())
  }
  console.timeEnd("randomNumber")
  console.log('randomNumber Output', a)
}

function randomInt() {
  console.log('Starting randomInt...', MAX_DATA)
  const min = 10, max = 100
  const a = []
  console.time("randomInt")
  for(let i = 0; i < MAX_DATA; i++) {
    a.push( Math.floor( Math.random() * (max - min) ) + min )
  }
  console.timeEnd("randomInt")
  console.log('randomInt Output', a)
}

function arrayPush() {
  console.log('Starting arrayPush...'), MAX_DATA
  const a = []
  console.time("arrayPush")
  for(let i = 0; i < MAX_DATA; i++) {
    a.push( i )
  }
  console.timeEnd("arrayPush")
  console.log('arrayPush Output', a)
}

function consoleLog() {
  console.log('Starting consoleLog...', MAX_DATA)
  const a = []
  for(let i = 0; i < MAX_DATA; i++) {
    a.push(Math.random())
  }
  console.time("consoleLog")
  console.log('consoleLog Output', a)
  console.timeEnd("consoleLog")
}

function bulkMeasure() {
  console.log('Starting bulkMeasure...', ITER, MAX_DATA)
  const measure = { randomNumber: [], randomInt: [], arrayPush: [] }
  const min = 10, max = 100
  for(let k = 0; k < ITER; k++) {
    console.log('Iteration', k)
    let a = [], start, end
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      a.push( Math.random() )
    }
    end = performance.now()
    measure.randomNumber.push(end - start)
    a = []
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      a.push( Math.floor( Math.random() * (max - min) ) + min )
    }
    end = performance.now()
    measure.randomInt.push(end - start)
    a = []
    const rnd = Math.random()
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      a.push( i )
      // a.push( rnd )
    }
    end = performance.now()
    measure.arrayPush.push(end - start)
  }
  const summary = {
    randomNumber: {
      min: printMillis( Math.min(...measure.randomNumber) ),
      max: printMillis( Math.max(...measure.randomNumber) ),
      avg: printMillis( avg(measure.randomNumber) ),
    },
    randomInt: {
      min: printMillis( Math.min(...measure.randomInt) ),
      max: printMillis( Math.max(...measure.randomInt) ),
      avg: printMillis( avg(measure.randomInt) ),
    },
    arrayPush: {
      min: printMillis( Math.min(...measure.arrayPush) ),
      max: printMillis( Math.max(...measure.arrayPush) ),
      avg: printMillis( avg(measure.arrayPush) ),
    },
  }
  console.table(summary)
}

function bulkCondition() {
  console.log('Starting bulkCondition...', ITER, MAX_DATA)
  const a = [], measure = []
  const min = 10, max = 100
  for(let i = 0; i < MAX_DATA; i++) {
    a.push( Math.floor( Math.random() * (max - min) ) + min )
  }

  for(let k = 0; k < ITER; k++) {
    let less = 0, more = 0
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      if(a[i] <= 50) {
        less++
      } else {
        more++
      }
    }
    end = performance.now()
    measure.push({less, more, time: end - start})
 }
 const summary = {
   min: printMillis( Math.min(...measure.map(m => m.time)) ),
   max: printMillis( Math.max(...measure.map(m => m.time)) ),
   avg: printMillis( avg(measure.map(m => m.time)) ),
 }
 console.table(summary)
}
