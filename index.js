// importing Sound Effect
const introMusic =new Audio("./music/introSong.mp3");
const shootingSound =new Audio("./music/music_shoooting.mp3");
const killEnemySound =new Audio("./music/music_killEnemy.mp3");
const gameOverSound =new Audio("./music/music_gameOver.mp3");
const heavyWeaponSound =new Audio("./music/music_heavyWeapon.mp3");
const hugeWeaponSound =new Audio("./music/music_hugeWeapon.mp3");

introMusic.play();
//  basic environment setup
const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
const lightWeaponDamage = 10;
const HeavyWeaponDamage = 20;
let highScore = 0;

let difficulty = 2;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
let playerScore = 0;


// Basic Functions



//   Event listener for Difffculty form 
document.querySelector("input").addEventListener("click", (e) => {
    e.preventDefault();   // to avoid reload

    // stop music 
    introMusic.pause();

    // making form invisible
    form.style.display = "none";
    // making scoreboard visible
    scoreBoard.style.display = "block";

    // gettting difficulty selected by user
    const userValue = document.getElementById("difficulty").value;
    // alert(userValue);
    if (userValue === "Easy") {
        setInterval(spawnEnemy, 2000);
        return (difficulty = 3);
    }
    if (userValue === "Medium") {
        setInterval(spawnEnemy, 1700);
        return (difficulty = 5);

    }
    if (userValue === "Hard") {
        setInterval(spawnEnemy, 1500);
        return (difficulty = 7);

    }
    if (userValue === "Insane") {
        setInterval(spawnEnemy, 1000);
        return (difficulty = 9);

    }
});

// EndScreen 
const gameoverLoader = () => {
    // creating endscreen div and play again button and high score element
    // const gameOverBanner=document.createElement("div");
    const gameOverBanner = document.querySelector(".gameOverBanner");
    gameOverBanner.style.display = "flex";
    document.querySelector(".YourScore").innerHTML = `YourScore : ${playerScore
        }`;
    const oldHighScore =
        localStorage.getItem("highScore") && localStorage.getItem("highScore");
    if (oldHighScore < playerScore) {
        localStorage.setItem("highScore", playerScore);
    }
    const highScore = document.querySelector(".highScore");
    highScore.innerHTML = `HighScore : ${localStorage.getItem("highScore")
        ? localStorage.getItem("highScore")
        : playerScore
        }`;

    const gameoverbtn = document.querySelector(".gameOverBtn");
    gameoverbtn.addEventListener("click", () => {
        window.location.reload();
    });
};



// -----------Create Player ,Enemy , Weapon Etc Classes



// setting player position to center
const PlayerPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2,

};


// creating player class
class Player {
    // use of class to avoid define similar object 
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, 0);
        context.fillStyle = this.color;
        //add color to the player
        // context.stroke();

        context.fill();
    }
    // update()
    // {
    //      this.x+=Math.random()*10;
    //      this.y+=Math.random()*10;

    // }
};

// const ankit = new Player(PlayerPosition.x, PlayerPosition.y, 15, "red");
// ankit.draw();






// function animation(){
//     requestAnimationFrame(animation);
//     const ankit=new Player(PlayerPosition.x+Math.random()*100,PlayerPosition.y+Math.random()*100,20,"blue");
//     ankit.draw();
// }
// animation();
// function call using recursion by requestanimationframe every time create new object/ player and print by filled color



// just create and draw colorful players

// function animation() {
//     requestAnimationFrame(animation);
//     const ankit = new Player(PlayerPosition.x + Math.random() * 100, PlayerPosition.y + Math.random() * 200, 20,
//         `rgb(${Math.random() * 250},${Math.random() * 250},${Math.random() * 250})`

//     );
//     ankit.draw();
// }
// animation();








// creating weapon class
// ----------------------for Weapons----------------//
class Weapon {
    // use of class to avoid define similar object 
    constructor(x, y, radius, color, velocity, damage) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.damage = damage;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, 0);
        context.fillStyle = this.color;
        //add color to the player
        // context.stroke();
        context.fillStyle = this.color;
        context.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x,
            this.y += this.velocity.y
    }
};


// ----------------------for huge Weapons----------------//
class HugeWeapon {
    // use of class to avoid define similar object 
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = "rgba(47,255,0,1)";
        
    }
    draw() {
        context.beginPath();
        //add color to the weapon
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 100, canvas.height);
    }
    update() {
        this.draw();
        this.x += 20;
        // this.y += 10;
    }
};


//-------------------------for enemy-------------->

// creating enemy class
class Enemy {
    // use of class to avoid define similar object 
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, 0);
        context.fillStyle = this.color;
        //add color to the player
        // context.stroke();

        context.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x,
            this.y += this.velocity.y
    }
};


// -----------------Creating particle class
const fraction = 0.98;
class Particle {
    // use of class to avoid define similar object 
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw() {
        context.save();
        context.globalAlpha = this.alpha;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, 0);
        context.fillStyle = this.color;
        //add color to the player
        // context.stroke();

        context.fill();
        context.restore();
    }
    update() {
        this.draw();
        this.velocity.x *= fraction;
        this.velocity.y *= fraction;
        this.x += this.velocity.x,
            this.y += this.velocity.y,
            this.alpha -= 0.01;

    }
};
// ----------------main logic here---------------------------


// Creating Player Object Weapons array and Enemy Array
const ankit = new Player(PlayerPosition.x, PlayerPosition.y, 20, "white");
// ankit.draw();
const weapons = [];
const enemies = [];
const particles = [];
const hugeweapons = [];

//---------------function to spawn enemies at random location-------------------------------------
const spawnEnemy = () => {

    // -------------- generating  random size for enemy
    const enemySize = Math.random() * (40 - 5) + 5;
    // generating  random color for enemy
    const enemyColor = `hsl(${Math.random() * 360},100%,50%)`;
    // hsl :higher saturated lighter colors 0->360

    // random is enemy spawn position
    let random;

    // making enemy location random but only from outside of screen
    if (Math.random() < 0.5) {
        // aadhi screen se pehle aur baad mein (screen splitting)
        random = {
            x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,   // ya to 0 se thoda sa pehle banega ya to screen ke thoda banega ,,, -ememysize isliye kiya hai ki screen par form na ho screen ke side mein bne
            //    .             .
            //    .             .
            //    .             .
            //    .             .
            //    .             .  
            // abhi inke liye bna hai 

            y: Math.random() * canvas.height,
        };
    }
    else {
        random = "#FF2511", {
            x: Math.random() * canvas.width,
            y: Math.random() < 0.5 ? canvas.height
                + enemySize : 0 - enemySize,
            //<0.5 then niche se aayega 
        };
    }



    // finding angle between center (means player position) and enemy position
    const myAngle = Math.atan2(
        canvas.height / 2 - random.y,
        canvas.width / 2 - random.x
        // center tk aana from randome.x same with y
    );




    // making velocity or speed of enemy by multiplying chosen difficulty to radian
    const velocity = {
        x: Math.cos(myAngle) * difficulty,  // multiply more to get more speed ,  used for velocity
        y: Math.sin(myAngle) * difficulty,
    };
    //object hai ye
    // console.log(myAngle);


    // adding enemy to enemies array

    enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
}






//------------------creating animation function
let animationid;
function animation() {
    //making recursion
    animationid = requestAnimationFrame(animation);

    // rendering player score in score board html element
    scoreBoard.innerHTML = `Score : ${playerScore}`


    context.fillStyle = "rgba(49,49,49,0.2)";
    // using this some path prints is left out when new rect with less obesity is put on another  
    context.fillRect(0, 0, canvas.width, canvas.height);



    // clearing canvas on each frames
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // to clear whole screen with size of rect before creating another beam


    //drawing player
    ankit.draw();



    // genrating particles -----------
    particles.forEach((particle, particleIndex) => {
        if (particle.alpha <= 0) {
            particles.splice(particleIndex, 1);
        }
        else {
            particle.update();
        }


    });


    // Generating Huge Weapons
    hugeweapons.forEach((hugeweapon, hugeweaponIndex) => {
        if (hugeweapon.x > canvas.width) {
            hugeweapons.splice(hugeweaponIndex, 1);
        }
        else {
            hugeweapon.update();
        }

    });
    // console.log(hugeweapons);


    // generating bullets
    weapons.forEach((weapon, weaponIndex) => {
        weapon.update();


        // removing weapons if they are off screen
        if (
            weapon.x + weapon.radius < 1 ||
            weapon.y + weapon.radius < 1 ||
            weapon.x - weapon.radius > canvas.width ||
            weapon.y - weapon.radius > canvas.height
        ) {
            // console.log("yes : ",weapons.length);
            weapons.splice(weaponIndex, 1);
        }

    });
    // generating enemies
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();

        // finding distance between player and enemy
        const DistanceBetweenPlayerAndEnemy = Math.hypot
            (
                ankit.x - enemy.x,
                ankit.y - enemy.y
            );
        // stopping game if enemy hit player
        if (DistanceBetweenPlayerAndEnemy - ankit.radius - enemy.radius < 1) {
            // console.log("GameOver");
            cancelAnimationFrame(animationid);
            gameOverSound.play();
            return gameoverLoader();
        }

        hugeweapons.forEach((hugeweapon) => {
            const DistanceBetweenHugeWeaponAndEnemy = hugeweapon.x - enemy.x;
            if (DistanceBetweenHugeWeaponAndEnemy <= 100 && DistanceBetweenHugeWeaponAndEnemy >= -100) {
                playerScore += 10;
                setTimeout(() => {
                    killEnemySound.play();
                    enemies.splice(enemyIndex, 1);
                }, 0);
                // console.log("finsh");
            }

        });
        // console.log(playerScore);
        weapons.forEach((weapon, weaponIndex) => {

            // finding distance between weapon and enemy
            const DistanceBetweenWeaponAndEnemy = Math.hypot
                (
                    weapon.x - enemy.x,
                    weapon.y - enemy.y
                );
            if (DistanceBetweenWeaponAndEnemy - weapon.radius - enemy.radius < 1) {
                // console.log("kill enemy");


                if (enemy.radius > weapon.damage + 8) {  // pehle yaha 18 tha
                    // 18 choosed because of 18-10  that is 8 not very small for next attack
                    gsap.to(enemy, {
                        radius: enemy.radius - weapon.damage,
                    })
                    setTimeout(() => {
                        weapons.splice(weaponIndex, 1);
                    }, 0);
                    //using gsap smooth look to reducing the size of enemies
                }
                //removing enemy on hit their size below <18
                else {
                    for (let i = 0; i < enemy.radius * 5; i++) {
                        particles.push(
                            new Particle(
                                weapon.x, weapon.y,
                                Math.random() * 2, enemy.color,
                                {
                                    x: (Math.random() - 0.5) * (Math.random() * 7),
                                    y: (Math.random() - 0.5) * (Math.random() * 7),
                                }))
                    }

                    // /playerscore increase by 10;
                    playerScore += 10;
                    // rendering player score in score board html element
                    scoreBoard.innerHTML = `Score : ${playerScore}`
                    setTimeout(() => {
                        killEnemySound.play();
                        enemies.splice(enemyIndex, 1);
                        weapons.splice(weaponIndex, 1);
                    }, 0);
                }





            }
        });
    });
}

// setInterval(spawnEnemy,1000);




//    ------------------adding eventlistener



// event listener for light weapon aka left click
canvas.addEventListener("click", (e) => {

    shootingSound.play();

    // console.log(e.clientX,e.clientY);   
    // just show the clicked coordinate on canvas by mouse



    // finding angle between player postion (center) and click co-ordinates
    const myAngle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);


    // making cnst speed for light weapon
    const velocity = {
        x: Math.cos(myAngle) * 6,  // multiply more to get more speed ,  used for velocity
        y: Math.sin(myAngle) * 6
    }; //object
    // console.log(myAngle);






    // adding light weapons array
    weapons.push(
        new Weapon(
            canvas.width / 2, // yaha se create and niklega 
            canvas.height / 2,
            6,
            "white",
            velocity, lightWeaponDamage //x,y large value . . . .  diff badh jayega y/x angle decide karega
        )
        // just created new weapons "golis" using clicked x,y coordinates
    );
});




// event listener for heavy weapon aka right click
canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    
    // condition not use less score
    if (playerScore <= 0) return;
    heavyWeaponSound.play();
    // decreasing player score by 2;
    playerScore -= 2;
    // same time rendering else it will render after the shoot
    scoreBoard.innerHTML = `Score : ${playerScore}`;

    // console.log(e.clientX,e.clientY);   
    // just show the clicked coordinate on canvas by mouse



    // finding angle between player postion (center) and click co-ordinates
    const myAngle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);


    // making cnst speed for light weapon
    const velocity = {
        x: Math.cos(myAngle) * 3.5,  // multiply more to get more speed ,  used for velocity
        y: Math.sin(myAngle) * 3.5
    }; //object
    // console.log(myAngle);






    // adding heavy weapons array
    weapons.push(
        new Weapon(
            canvas.width / 2, // yaha se create and niklega 
            canvas.height / 2,
            30,
            "cyan",
            velocity, HeavyWeaponDamage //x,y large value . . . .  diff badh jayega y/x angle decide karega
        )
        // just created new weapons "golis" using clicked x,y coordinates
    );
});


addEventListener("keypress", (e) => {
    // console.log(`key:${e.key}`);// key btayega
    if (e.key === " ") {
        // condition not use less score
        if (playerScore < 20) return;
        hugeWeaponSound.play();
        // decreasing player score by 2;
        playerScore -= 20;
        // same time rendering else it will render after the shoot
        scoreBoard.innerHTML = `Score : ${playerScore}`;
        hugeweapons.push(
            new HugeWeapon(
                0, // yaha se create and niklega 
                0 //x,y large value . . . .  diff badh jayega y/x angle decide karega
            )
            // just created new weapons "golis" using clicked x,y coordinates
        );
        //     console.log("spacebar");
    }


});
addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
addEventListener("resize", () => {
    // yeh canvas ki problem hai 
    // canvas.width=innerWidth;
    // canvas.height=innerHeight;
    window.location.reload();
});
animation();