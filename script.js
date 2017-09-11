  /*
    Spread syntax to create "real" array from NodeList since we need to call
    reduce(). NodeList is iterable but it doesn't get access to the juicy array
    methods, dirty poser.
  */
  const times  = [...document.querySelectorAll('[data-time]')].map( li => li.dataset.time );
  const timer  = times.reduce(function(accumulator, currentValue ) {

    const [minutes,seconds] = currentValue.split(':').map(parseFloat);
    accumulator.minutes    += minutes;
    accumulator.seconds    += seconds;

    accumulator.minutes    += Math.floor(accumulator.seconds / 60);
    accumulator.seconds     = accumulator.seconds % 60;
    return accumulator;
  }, {minutes: 0, seconds: 0});

  const endResult = [Math.floor(timer.minutes / 60), (timer.minutes % 60), timer.seconds];

  document.querySelector('.total-time').innerHTML = `<pre>Total video time is: ${endResult.join(':')}</pre>`;