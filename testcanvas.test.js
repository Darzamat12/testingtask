const createCanvas = require('./server');
test('returns 0 when using wrong coords',()=>{
    expect(createCanvas(-5,2)).toBe(0)
}
)

const drawLine= require('./server');

test('returns 0 when using wrong coords',()=>{
    expect(drawLine(-1,2-10,5)).toBe(0)
})