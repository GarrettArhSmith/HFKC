let colors = [];

function randClass() {
    let randInt = Math.ceil(Math.random()*3);
    if (colors.length > 7 && !/(?=.*1)(?=.*2)(?=.*3)/g.test(colors)){
        switch (false) {
            case colors.includes(1): 
                colors.push(1);
                return 'div1';
            case colors.includes(2): 
                colors.push(2);
                return 'div2';
            case colors.includes(3): 
                colors.push(3);
                return 'div3';
        }
    }
    colors.push(randInt);
    return `div${randInt}`;
}

for (var i = 0; i < 10; i++) {
    let chunk = document.createElement('div');
    let between = document.createElement('div');

    chunk.setAttribute('class', randClass());
    chunk.setAttribute('id', `${i}`);
    document.getElementById('cake').appendChild(chunk);

    if(i < 9) {
        between.setAttribute('class', 'between');
        between.setAttribute('onClick', 'onSlice(event)');
        document.getElementById(`${i}`).appendChild(between);
    }
}

class Slice {
    constructor(total,col1,col2,col3) {
        this.total = total;
        this.col1 = col1;
        this.col2 = col2;
        this.col3 = col3;
    }
}

let total;
let col1;
let col2;
let col3;
function objectValues(arr) {
    let array = arr.toString();
    total = arr.length;
    /1/g.test(array) ? col1 = array.match(/1/g).length : col1 = 0;
    /2/g.test(array) ? col2 = array.match(/2/g).length : col2 = 0;
    /3/g.test(array) ? col3 = array.match(/3/g).length : col3 = 0;
}


let cutCount = 0;

let sliceArr1;
let sliceArr2;
let sliceArr3;

let slice1;
let slice2;
let slice3;

let cuts = [];
let chooseSlice;


function onSlice(event) {
    cutCount++;
    let cut = Number(event.target.parentNode.id)+1;
    
    if(cuts.includes(cut)) {
        cutCount = cutCount - 2;
        //remove cut from cuts array:
        cuts = cuts.filter(c => c != cut);
        //change style:
        event.target.setAttribute('class','between');
        //change the arrays:
        
    }else if (cutCount < 3) {
        cuts.push(cut);
        event.target.setAttribute('class', 'betweenClicked');
    }
    
    if(cutCount == 1) {
        sliceArr1 = colors.slice(0, cut);
        objectValues(sliceArr1);
        slice1 = new Slice(total,col1,col2,col3);
        
        sliceArr2 = colors.slice(cut, 10);
        objectValues(sliceArr2);
        slice2 = new Slice(total,col1,col2,col3);
        
    }else if(cutCount == 2) {
        if(cut < sliceArr1.length-1) {
            sliceArr3 = colors.slice(cut, sliceArr1.length);
            objectValues(sliceArr3);
            slice3 = new Slice(total,col1,col2,col3);
            
            sliceArr1 = colors.slice(0, cut);
            objectValues(sliceArr1);
            slice1 = new Slice(total,col1,col2,col3);
            
        }
        else {
            sliceArr3 = colors.slice(cut, colors.length);
            objectValues(sliceArr3);
            slice3 = new Slice(total,col1,col2,col3);
            
            sliceArr2 = colors.slice(sliceArr1.length, cut);
            objectValues(sliceArr2);
            slice2 = new Slice(total,col1,col2,col3);
        }
        //if (it's something that's already been cut) {do this}
    }else if (cutCount > 2) {
        cutCount = cutCount - 1;
        alert("Too many cuts!");
    }
    
    chooseSlice = document.getElementById('slice');
    if(cutCount == 0) {
        chooseSlice.options.length = 1
        chooseSlice.options.add(new Option('Slice 1'))
    }else if(cutCount == 1) {
        chooseSlice.options.length = 1
        chooseSlice.options.add(new Option('Slice 1'))
        chooseSlice.options.add(new Option('Slice 2'))
    }else if(cutCount == 2) {
        chooseSlice.options.length = 1
        chooseSlice.options.add(new Option('Slice 1'))
        chooseSlice.options.add(new Option('Slice 2'))
        chooseSlice.options.add(new Option('Slice 3'))
    }
}


function edibilityCheck() {
    let person = document.getElementById('person').value;
    let slice = document.getElementById('slice').value;
    let sliceObj;
    let col;
    
    function check() {
        sliceObj = eval(`slice${slice[6]}`);
        if(sliceObj[col]/sliceObj.total == 0.5) {
            document.getElementById('answer').innerHTML = `${person} will eat ${slice} :)`;
        }else {
            document.getElementById('answer').innerHTML = `${person} will not eat ${slice} :(`;
        }
    }
    
    switch(person) {
        case "Mr. Purple": 
            col = "col1";
            check();
            break;
        case "Ms. Yellow":
            col = "col2";
            check();
            break;
        case "Ms. Green":
            col = "col3";
            check();
            break;
    }
}

//click id 3:
// slice1 {
  //total: sliceArr1.length;
  //col1: sliceArr1.toString().match(/1/g).length;
  //col2: sliceArr1.toString().match(/2/g).length;
  //col3: sliceArr1.toString().match(/3/g).length;
//}
// slice2 {
//     total:sliceArr2.length;
//     col1: sliceArr2.toString().match(/1/g).length;
//     col2: sliceArr2.toString().match(/2/g).length;
//     col3: sliceArr2.toString().match(/3/g).length;
// }


//slice {
    //totalNumber:
    //greenNumber:
    //yellowNumber:
    //purpleNumber:
    //}
//<button onClick=true/false>
//if (slice.greenNumber / slice.totalNumber = 0.5) {ms. green will eat this} 
