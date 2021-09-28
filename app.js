const startBtn = document.querySelector('#start'),
        screens = document.querySelectorAll('.screen'),
        timeList = document.querySelector('#time-list'),
        timeSpan = document.querySelector('#time'),
        board = document.querySelector('#board');
        
timeList.insertAdjacentHTML('beforeend','<li><button class="user-btn time-btn"">Ввести свое время</button></li>');
        
let time = 0,
    score = 0;
startBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('time-btn') && !e.target.classList.contains('user-btn')){
        time = +e.target.getAttribute('data-time');
        screens[1].classList.add('up');
        startGame();
    }else if(e.target.classList.contains('user-btn')){
        do{
            time = +prompt('Введите таймер игры до 60 секунд');
        } while(time>60);
            screens[1].classList.add('up');
            startGame();      
        
    }
})

board.addEventListener('click',(e)=>{
    if(e.target.classList.contains('circle')){
        score++;
        e.target.remove();
        createRandCircle();
    };
})


function startGame() {
    setInterval(() => {
        decreaseTime();
    }, 1000);
    createRandCircle();
    setTime(time)
}

function decreaseTime() {
    if(time===0){
        finishGame()
    }else{
        let current = --time;
         if(current<10){
           current = `0${current}`
        }
     setTime(current)
    }
}

function setTime(val) {
    timeSpan.innerHTML = `00:${val}`;
}

function finishGame() {
    timeSpan.parentElement.style.opacity = 0;
    board.innerHTML = `<h1>Счёт:<span class="primary">${score}</span></h1>`;
}

function createRandCircle(){
    const circle = document.createElement('div'),
            size = getRandNum(10,60),
            {width,height} = board.getBoundingClientRect(),
            x = getRandNum(0,width-size),
            y = getRandNum(0,height-size);

    circle.classList.add('circle');
    circle.style.height = `${size}px`;
    circle.style.width = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `rgb(${getRandNum(0,255)},${getRandNum(0,255)},${getRandNum(0,255)})`
    
    board.append(circle);
}

function getRandNum(min,max){
    return Math.round(Math.random()*(max-min)+min);
}