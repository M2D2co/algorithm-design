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
  const measure = { randomNumber: [], randomInt: [], arrayPushInt: [], arrayPushNum: [], fixedArrayNum: [] }
  const min = 10, max = 100
  for(let k = 0; k < ITER; k++) {
    console.log('Iteration', k)
    let a = [], start, end
    // Number
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      a.push( Math.random() )
    }
    end = performance.now()
    measure.randomNumber.push(end - start)
    // Int
    a = []
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      a.push( Math.floor( Math.random() * (max - min) ) + min )
    }
    end = performance.now()
    measure.randomInt.push(end - start)
    // arrayPushNum
    a = []
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      a.push( 0.1 )
    }
    end = performance.now()
    measure.arrayPushNum.push(end - start)
    // arrayPushInt
    a = []
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      a.push( 123 )
    }
    end = performance.now()
    measure.arrayPushInt.push(end - start)
    // FixedArrayNum
    const b = new Array(MAX_DATA)
    start = performance.now()
    for(let i = 0; i < MAX_DATA; i++) {
      b[i] = 0.1
    }
    end = performance.now()
    measure.fixedArrayNum.push(end - start)
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
    arrayPushNum: {
      min: printMillis( Math.min(...measure.arrayPushNum) ),
      max: printMillis( Math.max(...measure.arrayPushNum) ),
      avg: printMillis( avg(measure.arrayPushNum) ),
    },
    arrayPushInt: {
      min: printMillis( Math.min(...measure.arrayPushInt) ),
      max: printMillis( Math.max(...measure.arrayPushInt) ),
      avg: printMillis( avg(measure.arrayPushInt) ),
    },
    randNumMinusPushNum: {
      min: printMillis( Math.min(...measure.randomNumber) -  Math.min(...measure.arrayPushNum)),
      max: printMillis( Math.max(...measure.randomNumber) - Math.max(...measure.arrayPushNum)),
      avg: printMillis( avg(measure.randomNumber) - avg(measure.arrayPushNum)),
    },
    randNumMinusPushInt: {
      min: printMillis( Math.min(...measure.randomInt) - Math.min(...measure.arrayPushInt)),
      max: printMillis( Math.max(...measure.randomInt) - Math.max(...measure.arrayPushInt)),
      avg: printMillis( avg(measure.randomNumber) - avg(measure.arrayPushInt)),
    },
    fixedArrayNum: {
      min: printMillis( Math.min(...measure.fixedArrayNum) ),
      max: printMillis( Math.max(...measure.fixedArrayNum) ),
      avg: printMillis( avg(measure.fixedArrayNum) ),
    }
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
