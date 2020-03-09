const express = require('express');

const app = express();
let arr;
const fs = require('fs');
let text;
let canvasSize={
  width:0,
  height:0,
}

function createCanvas(width,height){
  if(width <0) return 0;
  canvasSize.width=width;
  canvasSize.height=height;
  arr=new Array(height+2);
  for(let i=0;i<height+2;i++) {arr[i]=new Array(width+2);
    arr[i].fill(' ');
  }
  arr[0].fill('-');
  arr[arr.length-1].fill('-');
  for(let i=1;i<height+1;i++){
    arr[i][0]='|';
    arr[i][width+1]='|'
  }
}
function drawLine(x1,y1,x2,y2){
  if(canvasSize.width>=Math.max(x1,x2) && canvasSize.height>=Math.max(y1,y2) && x1 && x2 && y1 && y2){
  if(x1===x2){ 
    for(let i=Math.min(y1,y2);i<Math.max(y1,y2)+1;i++){
      arr[i][x2]='X';
    }
  }
  else if(y1===y2)for(let i=Math.min(x1,x2);i<Math.max(x1,x2)+1;i++)arr[y1][i]='X';
}
else return 0;
}

function fillBucket(x,y,targetC,c){
  if(canvasSize.width>=x && canvasSize.height>=y && x && y){
  if(arr[x][y]==='|' || arr[x][y]==='-' || arr[x][y]===c)
    return;
    if(arr[x][y]!==targetC)
      return;
    arr[x][y]=c;
    fillBucket(x+1,y,targetC,c);
    fillBucket(x-1,y,targetC,c);
    fillBucket(x,y+1,targetC,c);
    fillBucket(x,y-1,targetC,c);
  }
  else return 0;
}

function drawRectangle(x1,y1,x2,y2){
  if(canvasSize.width>=Math.max(x1,x2) && canvasSize.height>=Math.max(y1,y2)&& x1 && x2 && y1 && y2){
  drawLine(x1,y1,x1,y2,false);
  drawLine(x1,y1,x2,y1,false);
  drawLine(x1,y2,x2,y2,false);
  drawLine(x2,y2,x2,y1,false);
  }
  else return 0;
}

async function appendToFile(){
  let temp=new Array(arr.length);
  for(let i=0;i<arr.length;i++){
    temp[i]=arr[i].join('')+'\n';
  }
  fs.appendFile('output.txt',temp.join(''),(err)=>{
    if(err){
      throw err;
    }
  })
}
fs.readFile('input.txt','utf8',(err, contents)=>{
  text=contents;
  fs.writeFile('output.txt','',(err)=>{
    if(err) throw err;
  })
  text=text.split('\r\n');
 
  let canvasIndex;
  text.forEach((el,index)=>{
    text[index]=el.split(' ');
    if(text[index][0]==='C') {
      createCanvas(+text[index][1],+text[index][2]);
      canvasIndex=index;
    }
  })
  
  for(let i=canvasIndex+1;i<text.length;i++){
    switch(text[i][0]){
      case 'L': {drawLine(+text[i][1], +text[i][2], +text[i][3], +text[i][4]); appendToFile();  break;}
      case 'R':{drawRectangle(+text[i][1], +text[i][2], +text[i][3], +text[i][4]); appendToFile();    break;}
      case 'B':{fillBucket(+text[i][2], +text[i][1],' ', text[i][3]); appendToFile();   break;}
      default: break;
    }
  }
})

app.get('/api/canvasdata', (req, res) => {
  res.send(arr.join('\n'));
});
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);

module.exports = createCanvas;
module.exports = drawLine;