var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Within this variable we are creating a super object passing a tonne of 
// methods and functions to use to draw within our canvas
// Specifically 2d elements that can be manipulated within a 2d space
var c = canvas.getContext('2d');

// Animate

var mouse = {
    x: undefined,
    y: undefined
}
// Add a mouse move listener to the canvas
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse)
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Circle(x = 200, y = 200, dx = 5, dy = 5, radius = 5, color = blue){
    this.minRadius = radius
    this.draw = function(){
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.stroke();
        c.fillStyle = color;
        c.fill()
    }
    this.update = function(){
        if (x + radius > canvas.width || x - radius < 0){
            dx = -dx
        }
        // Add dx to the x value every call
        x += dx

        if (y + radius > canvas.height || y - radius < 0){
            dy = -dy
        }
        y += -dy

        // Interactivity

        // Changing the circle radius based on their proximity to the cursor
        if (mouse.x - x < 50 && mouse.x - x > -50 && mouse.y - y < 50 && mouse.y - y > -50) {
            if (x + radius + 5 < canvas.width && x - radius - 5 > 0 && y + radius + 5 < canvas.width && y - radius - 5 > 0 && radius < 50){
                radius += 1
            }
        } else if (radius > this.minRadius){
            radius -= 1
        }

        // This is gonna draw a new circle with every function call
        this.draw()
    }
}

var circleArray = []

for (var i=0; i < 1000; i++){
    var maxRadius = 20
    const radius = Math.random() * (20 - 1) + 1
    // Create a variable that holds the starting x value
    var x = Math.random() * (canvas.width - 2 * maxRadius ) + maxRadius;
    // Store the change in x value (delta x) i.e. the objects velocity
    // Generate a random number between 0 and 1, -0.5 to return a value
    // between -0.5 and 0.5, then times this by 10 to get a velocity between
    // -5 and 5.
    var dx = (Math.random() - 0.5)  * 5;
    // Doing the same with y
    var y = Math.random() * (canvas.height  - 2 * maxRadius ) + maxRadius;
    var dy = (Math.random() - 0.5) * 5;
    var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    circleArray.push(new Circle(x, y, dx, dy, radius, color))
}

function animate(){
    requestAnimationFrame(animate);
    // Clear the entire canvas with every iteration
    // c.clearRect(x, y, width, height)
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach(circle => circle.update())
}
// By doing this the animation works through refreshing the page over and over
// moving the object by a vector with every refresh
animate()
