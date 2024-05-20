function randInt(min: number, max: number): number {
  return Math.floor( Math.random() * (max - min + 1) + min)
}

function roll2d6(logging: boolean = true): number {
  const result = [randInt(1, 6), randInt(1, 6)]
  const sum =  result[0] + result[1]
  if(logging) {
    result.push(sum)
    console.table(result)
  }
  return sum
}

type Counter = {
  value:number, count:number
}

function stats2d6(): void {
  let start = 0, end = 0, t = 0
  const qty = 10000
  const results: number[] = new Array(qty)
  // Roll Dice
  for(let i = 0; i < qty; i++) {
    results[i] = roll2d6(false)
  }
  // Build Results (Brute Force)
  const statsBruteForce: Counter[] = []
  t = 0
  start = performance.now()
  for(let d = 2; d <= 12; d++) {
    t++
    let count = 0
    t++
    for(let i = 0; i < qty; i++) {
      t++
      if(results[i] === d) {
        count++
        t++
      }
      t++
    }
    statsBruteForce.push({ value: d, count })
  }
  end = performance.now()
  const timeBruteForce = end - start
  const opsBruteForce = t
  console.table(statsBruteForce)
  // Build Results (Count)
  const statsCount: Counter[] = new Array(12+1)
  t = 0
  start = performance.now()
  for(let i = 2; i <= 12; i++) {
    t++
    statsCount[i] = {value:i, count:0}
    t++
  }
  results.forEach(value => {
    statsCount[value].count++
    t++
  })
  end = performance.now()
  const timeCount = end - start
  const opsCount = t
  console.table(statsCount)
  // Build Results (Reduce)
  t = 0
  start = performance.now()
  const statsReduce = results.reduce((acc: Counter[], n: number) => {
    if(!acc[n]) {
      acc[n] = {value:n, count: 1}
      t++
    } else {
      acc[n].count++
      t++
    }
    t++
    return acc
  }, [])

  // const statsReduce: Counter[] = new Array(12+1)
  // t = 0
  // start = performance.now()
  // for(let i = 2; i <= 12; i++) {
  //   t++
  //   statsReduce[i] = {value:i, count:0}
  // }
  // results.reduce((acc: Counter[], n: number) => {
  //   t++
  //   acc[n].count++
  //   return acc
  // }, statsReduce)

  end = performance.now()
  const timeReduce = end - start
  const opsReduce = t
  console.table(statsReduce) 
  // Display Performance
  console.log('Brute Force', opsBruteForce, timeBruteForce.toFixed(3) + 'ms', memorySizeOf(statsBruteForce))
  console.log('Simple Count', opsCount, timeCount.toFixed(3) + 'ms', memorySizeOf(statsCount))
  console.log('Reduce', opsReduce, timeReduce.toFixed(3) + 'ms', memorySizeOf(statsReduce))
}

// Copied from https://gist.github.com/rajinwonderland/36887887b8a8f12063f1d672e318e12e
function memorySizeOf(obj) {
  var bytes = 0;

  function sizeOf(obj) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case "number":
          bytes += 8;
          break;
        case "string":
          bytes += obj.length * 2;
          break;
        case "boolean":
          bytes += 4;
          break;
        case "object":
          var objClass = Object.prototype.toString.call(obj).slice(8, -1);
          if (objClass === "Object" || objClass === "Array") {
            for (var key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else bytes += obj.toString().length * 2;
          break;
      }
    }
    return bytes;
  }

  function formatByteSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GiB";
  }

  return formatByteSize(sizeOf(obj));
}