let canvas, ctx, page_width, page_height, global_radius, block_size, number_within, pi, circle_slide, box_slide

// Function to get the window width
function get_width() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
}

// Function to get the window height
function get_height() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

// Listeners for loading and resize
document.addEventListener('DOMContentLoaded', init)

// Initialise that bad boi
function init () {

    // Get page width and so, dot radius
    page_width = get_width();
    page_height = get_height();
    global_radius = (page_width + page_height) / 15;
    block_size = 10;

    document.getElementById('circle').value = global_radius
    document.getElementById('box').value = block_size
        
    // Identify the canvas
    canvas = document.getElementById('backCanvas');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  
    // Initialise the dots
    blocks_within();
    draw_circle();

    document.getElementById('pi_calc').innerHTML = calculate_pi()
    
}


// Function to draw a dot
function draw_circle() {
    // Draw a circle path and fill
    ctx.beginPath()
    ctx.arc(page_width / 2, page_height / 2, global_radius, 0, 2 * Math.PI, false) 
    ctx.lineWidth = 3;
    ctx.stroke()
    ctx.restore()
  
}

function fill_block(x, y) {

    selection = ["#E1BD6D", "#EABE94", "#0B775E", "#35274A", "#F2300F"][random_int(5)]

    ctx.beginPath()
    ctx.rect(x - (block_size / 2), y - (block_size / 2), block_size, block_size)
    ctx.fillStyle = selection;
    ctx.fill()
    ctx.lineWidth = 0.3;
    ctx.stroke()
    ctx.restore()
}

function random_int(max) {  
    return Math.floor(Math.random() * max);  
} 

function blocks_within() {

    number_within = 0

    x_start = (page_width / 2) - Math.floor(global_radius / block_size) * block_size;
    x_end = (page_width / 2) + Math.floor(global_radius / block_size) * block_size;

    y_start = (page_height / 2) - Math.floor(global_radius / block_size) * block_size;
    y_end = (page_height / 2) + Math.floor(global_radius / block_size) * block_size;

    for (i = x_start; i <= x_end; i += block_size) {
        for (j = y_start; j <= y_end; j += block_size) {

            if ((((((i - page_width / 2) ** 2) + (j - page_height / 2) ** 2) ** 0.5) <= global_radius)) {
                fill_block(i, j);
                number_within += 1;
            }
        }
    }
}

function calculate_pi() {
    pi = (number_within * (block_size ** 2)) / (global_radius ** 2)
    return pi
}

document.getElementById('circle').onchange = function() {
    global_radius = parseInt(document.getElementById('circle').value);
    update_draw();
}

document.getElementById('box').onchange = function() {
    block_size = parseInt(document.getElementById('box').value);
    update_draw();
}

function update_draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    blocks_within();
    draw_circle();
    document.getElementById('pi_calc').innerHTML = calculate_pi()
}
