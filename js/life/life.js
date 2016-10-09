life = (e,r,c,p) =>                                                             // life :: dom elem -> rows -> cols -> living cells probality -> ()
( a = 0                                                                         // animation request's id
, d = r*c                                                                       // state's dimension
, i = [...Array(d)].map(_=>+(Math.random()<p))                                  // initial state
, y = (i,s) => (i+s)%d                                                          // computes neighbor's index @ index + shiftY
, x = (i,s) => (i+s)%c + c*(i/c>>0)                                             // computes neighbor's index @ index + shiftX
, h = (acc,cell,i) => acc + (!(i%c)?'<br/>':'') + cell                          // html reducer
, α = state => state.map( (cell,i) =>                                           // updates given state
      (l  => +(!cell && l==3 || cell && l>=2 && l<=3))                          //   game's rules
      ([ y(i,-c), x(y(i,-c), 1)                                                 //     retrieves neighbors' indices: N, NE
       , x(i,-1), x(y(i,-c),-1)                                                 //                                   W, NW
       , x(i, 1), x(y(i, c), 1)                                                 //                                   E, SE
       , y(i, c), x(y(i, c),-1)                                                 //                                   S, SW
       ].filter(n => state[n]).length))                                         //     and counts those living
, β = state => (e.innerHTML = state.reduce(h),state)                            // renders given state
, λ = state => a=requestAnimationFrame(_=>λ(α(β(state))))                       // main
, e.onclick = _ => a=a?cancelAnimationFrame(a):λ(i))                            //


