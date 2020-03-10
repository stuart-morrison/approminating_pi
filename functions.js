let canvas, ctx, page_width, page_height, global_radius, block_size, number_within, number_without, pi, circle_slide, box_slide, centre_x, centre_y

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
    centre_x = Math.floor(page_width / 2);
    centre_y = Math.floor(page_height / 2);
    global_radius = Math.floor((page_width + page_height) / 15);
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

    document.getElementById('pi_calc_lower').innerHTML = calculate_pi_bottom()
    document.getElementById('pi_calc_upper').innerHTML = calculate_pi_upper()
    
}


// Function to draw a dot
function draw_circle() {
    // Draw a circle path and fill
    ctx.beginPath()
    ctx.arc(centre_x, centre_y, global_radius, 0, 2 * Math.PI, false) 
    ctx.lineWidth = 3;
    ctx.stroke()
    ctx.restore()
  
}

function fill_block_in(x, y) {

    selection = ["#E1BD6D", "#EABE94", "#0B775E", "#35274A", "#F2300F"][random_int(5)]

    ctx.beginPath()
    ctx.rect(x, y, block_size, block_size)
    ctx.fillStyle = selection;
    ctx.fill()
    ctx.lineWidth = 0.2;
    ctx.stroke()
    ctx.restore()
}

function fill_block_out(x, y) {

    selection = "#666257"

    ctx.beginPath()
    ctx.rect(x, y, block_size, block_size)
    ctx.fillStyle = selection;
    ctx.fill()
    ctx.lineWidth = 0.2;
    ctx.stroke()
    ctx.restore()
}

function random_int(max) {  
    return Math.floor(Math.random() * max);  
} 

function blocks_within() {

    // Set the number of blocks in the circle to zero
    number_within = 0
    number_without = 0

    x_start = centre_x  - (Math.floor(global_radius / block_size) + 1) * block_size;
    x_end = centre_x + Math.floor(global_radius / block_size) * block_size;
    y_start = centre_y - (Math.floor(global_radius / block_size) + 1) * block_size;
    y_end = centre_y + Math.floor(global_radius / block_size) * block_size;
    
    for (i = x_start; i <= x_end; i += block_size) {
        for (j = y_start; j <= y_end; j += block_size) {

            x_q1_sq = (i - centre_x + block_size) ** 2
            y_q1_sq = (j - centre_y) ** 2

            x_q2_sq = (i - centre_x) ** 2
            y_q2_sq = (j - centre_y) ** 2

            x_q3_sq = (i - centre_x) ** 2
            y_q3_sq = (j - centre_y + block_size) ** 2

            x_q4_sq = (i - centre_x + block_size) ** 2
            y_q4_sq = (j - centre_y + block_size) ** 2

            if (((x_q1_sq + y_q1_sq) ** 0.5 <= global_radius) &
            ((x_q2_sq + y_q2_sq) ** 0.5 <= global_radius) &
            ((x_q3_sq + y_q3_sq) ** 0.5 <= global_radius) &
            ((x_q4_sq + y_q4_sq) ** 0.5 <= global_radius)) {
                fill_block_in(i, j);
                number_within += 1;
            } else if (((x_q1_sq + y_q1_sq) ** 0.5 <= global_radius) |
            ((x_q2_sq + y_q2_sq) ** 0.5 <= global_radius) |
            ((x_q3_sq + y_q3_sq) ** 0.5 <= global_radius) |
            ((x_q4_sq + y_q4_sq) ** 0.5 <= global_radius)){
                fill_block_out(i, j);
                number_without += 1

            }
        }
    }
}


function calculate_pi_bottom() {
    pi = (number_within * (block_size ** 2)) / (global_radius ** 2)
    return pi
}

function calculate_pi_upper() {
    pi = ((number_within + number_without) * (block_size ** 2)) / (global_radius ** 2)
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
    document.getElementById('pi_calc_lower').innerHTML = calculate_pi_bottom()
    document.getElementById('pi_calc_upper').innerHTML = calculate_pi_upper()
}
