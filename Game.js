// Function to calculate the distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Game objects
let police = { x: 100, y: 100, speed: 2 };
let thief = { x: 400, y: 300, speed: 3 };
let airports = [
    { x: 50, y: 50 },
    { x: 200, y: 150 },
    { x: 350, y: 250 },
    { x: 600, y: 400 },
];
let coins = 0;
let fuel = 100;

// Function to update the thief's position based on input
function moveThief(direction) {
    switch (direction) {
        case "up":
            thief.y -= thief.speed;
            break;
        case "down":
            thief.y += thief.speed;
            break;
        case "left":
            thief.x -= thief.speed;
            break;
        case "right":
            thief.x += thief.speed;
            break;
    }
    fuel -= 1; // Decrease fuel with each move
}

// Function to move police closer to thief
function movePolice() {
    if (police.x < thief.x) police.x += police.speed;
    if (police.x > thief.x) police.x -= police.speed;
    if (police.y < thief.y) police.y += police.speed;
    if (police.y > thief.y) police.y -= police.speed;
}

// Function to check for collisions with airports
function checkAirports() {
    airports = airports.filter((airport) => {
        const distance = calculateDistance(thief.x, thief.y, airport.x, airport.y);
        if (distance < 20) {
            coins += 1; // Collect coin if near an airport
            return false; // Remove this airport from the list
        }
        return true;
    });
}

// Function to check if the game is over
function checkGameOver() {
    const distance = calculateDistance(police.x, police.y, thief.x, thief.y);
    if (distance < 20) {
        console.log("Game Over: Police caught the thief!");
        return true;
    }
    if (fuel <= 0) {
        console.log("Game Over: Thief ran out of fuel!");
        return true;
    }
    return false;
}

// Game loop (simulated here with a setInterval)
function gameLoop() {
    // Update positions
    movePolice();
    checkAirports();

    // Check game over conditions
    if (checkGameOver()) {
        clearInterval(interval);
    }
     / Log game state (can be replaced with rendering logic)
    console.log(Thief: (${thief.x}, ${thief.y}), Police: (${police.x}, ${police.y}), Coins: ${coins}, Fuel: ${fuel});
}

// Start the game loop
const interval = setInterval(gameLoop, 1000);

// Example manual movement for thief
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            moveThief("up");
            break;
        case "ArrowDown":
            moveThief("down");
            break;
        case "ArrowLeft":
            moveThief("left");
            break;
        case "ArrowRight":
            moveThief("right");
            break;
    }
});

// Start the game loop
const interval = setInterval(gameLoop, 1000);

// Example manual movement for thief
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            moveThief("up");
            break;
        case "ArrowDown":
            moveThief("down");
            break;
        case "ArrowLeft":
            moveThief("left");
            break;
        case "ArrowRight":
            moveThief("right");
            break;
    }