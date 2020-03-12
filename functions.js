let box_canvas, gon_canvas, ctx_box, ctx_gon,
page_width, page_height, 
global_radius_box, global_radius_gon, 
block_size, number_within, number_without, 
box_circle,  
gon_circle, gon_n,
centre_x_box, centre_x_gon, centre_y

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

    centre_x_box = Math.floor(page_width / 4);
    centre_x_gon = Math.floor(page_width / 4);
    centre_y = Math.floor(page_height / 2);

    global_radius_box = Math.floor((page_width + page_height) / 15);
    global_radius_gon = Math.floor((page_width + page_height) / 15);

    document.getElementById('box_circle').max = Math.floor(page_width / 5)
    document.getElementById('gon_circle').max = Math.floor(page_width / 5)

    block_size = 10;
    gon_n = 4;

    document.getElementById('box_circle').value = global_radius_box
    document.getElementById('box').value = block_size

    document.getElementById('gon_circle').value = global_radius_gon
    document.getElementById('gon').value = gon_n
        
    // Identify the canvas
    box_canvas = document.getElementById('box_canvas');
    ctx_box = box_canvas.getContext('2d');
    ctx_box.canvas.width = Math.floor(window.innerWidth / 2.05);
    ctx_box.canvas.height = Math.floor(window.innerHeight / 1.05);

    gon_canvas = document.getElementById('gon_canvas');
    ctx_gon = gon_canvas.getContext('2d');
    ctx_gon.canvas.width = Math.floor(window.innerWidth / 2.05);
    ctx_gon.canvas.height = Math.floor(window.innerHeight / 1.05);
  
    update_draw("box")   
    update_draw("gon")

}


// Function to draw a dot
function draw_circle(where) {

    if (where == "box"){
        // Draw a circle path and fill
        ctx_box.beginPath()
        ctx_box.arc(centre_x_box, centre_y, global_radius_box, 0, 2 * Math.PI, false) 
        ctx_box.lineWidth = 3;
        ctx_box.stroke()
        ctx_box.restore()
    } else {
        // Draw a circle path and fill
        ctx_gon.strokeStyle = "black";
        ctx_gon.lineWidth = 3;
        ctx_gon.beginPath()
        ctx_gon.arc(centre_x_gon, centre_y, global_radius_gon, 0, 2 * Math.PI, false) 
        ctx_gon.stroke()
        ctx_gon.restore()

    }

  
}

function fill_block_in(x, y) {

    selection = ["#E1BD6D", "#EABE94", "#0B775E", "#35274A", "#F2300F"][random_int(5)]

    ctx_box.beginPath()
    ctx_box.rect(x, y, block_size, block_size)
    ctx_box.fillStyle = selection;
    ctx_box.fill()
    ctx_box.lineWidth = 0.2;
    ctx_box.stroke()
    ctx_box.restore()
}

function fill_block_out(x, y) {

    selection = "#666257"

    ctx_box.beginPath()
    ctx_box.rect(x, y, block_size, block_size)
    ctx_box.fillStyle = selection;
    ctx_box.fill()
    ctx_box.lineWidth = 0.2;
    ctx_box.stroke()
    ctx_box.restore()
}

function random_int(max) {  
    return Math.floor(Math.random() * max);  
} 

function blocks_within() {

    // Set the number of blocks in the circle to zero
    number_within = 0
    number_without = 0

    x_start = centre_x_box  - (Math.floor(global_radius_box / block_size) + 1) * block_size;
    x_end = centre_x_box + Math.floor(global_radius_box / block_size) * block_size;
    y_start = centre_y - (Math.floor(global_radius_box / block_size) + 1) * block_size;
    y_end = centre_y + Math.floor(global_radius_box / block_size) * block_size;
    
    for (i = x_start; i <= x_end; i += block_size) {
        for (j = y_start; j <= y_end; j += block_size) {

            x_q1_sq = (i - centre_x_box + block_size) ** 2
            y_q1_sq = (j - centre_y) ** 2

            x_q2_sq = (i - centre_x_box) ** 2
            y_q2_sq = (j - centre_y) ** 2

            x_q3_sq = (i - centre_x_box) ** 2
            y_q3_sq = (j - centre_y + block_size) ** 2

            x_q4_sq = (i - centre_x_box + block_size) ** 2
            y_q4_sq = (j - centre_y + block_size) ** 2

            if (((x_q1_sq + y_q1_sq) ** 0.5 <= global_radius_box) &
            ((x_q2_sq + y_q2_sq) ** 0.5 <= global_radius_box) &
            ((x_q3_sq + y_q3_sq) ** 0.5 <= global_radius_box) &
            ((x_q4_sq + y_q4_sq) ** 0.5 <= global_radius_box)) {
                fill_block_in(i, j);
                number_within += 1;
            } else if (((x_q1_sq + y_q1_sq) ** 0.5 <= global_radius_box) |
            ((x_q2_sq + y_q2_sq) ** 0.5 <= global_radius_box) |
            ((x_q3_sq + y_q3_sq) ** 0.5 <= global_radius_box) |
            ((x_q4_sq + y_q4_sq) ** 0.5 <= global_radius_box)){
                fill_block_out(i, j);
                number_without += 1

            }
        }
    }
}

function draw_gon() {
    
    ctx_gon.beginPath();
    ctx_gon.moveTo (centre_x_gon + global_radius_gon * Math.cos(0), centre_y +  global_radius_gon *  Math.sin(0));          
    
    for (var i = 1; i <= gon_n; i += 1) {
        ctx_gon.lineTo (centre_x_gon + global_radius_gon * Math.cos(i * 2 * Math.PI / gon_n), centre_y + global_radius_gon * Math.sin(i * 2 * Math.PI / gon_n));
    }
    
    ctx_gon.strokeStyle = "red";
    ctx_gon.lineWidth = 2;
    ctx_gon.stroke();
}

function draw_gon_outer() {
    
    internal_angle = Math.PI * (gon_n - 2)

    outer_radius = global_radius_gon / Math.sin(internal_angle / gon_n / 2)

    ctx_gon.beginPath();
    ctx_gon.moveTo (centre_x_gon + outer_radius * Math.cos(0), centre_y +  outer_radius *  Math.sin(0));          
    
    for (var i = 1; i <= gon_n; i += 1) {
        ctx_gon.lineTo (centre_x_gon + outer_radius * Math.cos(i * 2 * Math.PI / gon_n), centre_y + outer_radius * Math.sin(i * 2 * Math.PI / gon_n));
    }
    
    ctx_gon.strokeStyle = "blue";
    ctx_gon.lineWidth = 2;
    ctx_gon.stroke();
}


function calculate_pi_bottom_box() {
    pi = (number_within * (block_size ** 2)) / (global_radius_box ** 2)
    return pi
}

function calculate_pi_upper_box() {
    pi = ((number_within + number_without) * (block_size ** 2)) / (global_radius_box ** 2)
    return pi
}

function calculate_pi_bottom_gon() {
    return ((global_radius_gon ** 2) * gon_n * Math.sin(Math.PI * 2 / gon_n)) / 2 / (global_radius_box ** 2)
}

function calculate_pi_upper_gon() {    

    outer_radius = Math.PI * (gon_n - 2) / Math.sin(internal_angle / gon_n / 2)
    return  ((outer_radius ** 2) * gon_n * Math.sin(Math.PI * 2 / gon_n)) / 2 / (global_radius_box ** 2)
}

document.getElementById('box_circle').onchange = function() {
    global_radius_box = parseInt(document.getElementById('box_circle').value);
    update_draw("box");
}

document.getElementById('gon_circle').onchange = function() {
    global_radius_gon = parseInt(document.getElementById('gon_circle').value);
    update_draw("gon");
}

document.getElementById('box').onchange = function() {
    block_size = parseInt(document.getElementById('box').value);
    update_draw("box");
}

document.getElementById('gon').onchange = function() {
    gon_n = parseInt(document.getElementById('gon').value);
    update_draw("gon");
}

function update_draw(where) {
    if (where == "box") {
        ctx_box.clearRect(0, 0, ctx_box.canvas.width, ctx_box.canvas.height);
        blocks_within();
        draw_circle(where);
        document.getElementById('box_pi_calc_lower').innerHTML = "Pi approximation lower: " + calculate_pi_bottom_box().toFixed(4)
        document.getElementById('box_pi_calc_upper').innerHTML = "Pi approximation upper: " + calculate_pi_upper_box().toFixed(4)
    } else {
        ctx_gon.clearRect(0, 0, ctx_gon.canvas.width, ctx_gon.canvas.height);
        draw_circle(where);
        draw_gon()
        draw_gon_outer()
        document.getElementById('gon_pi_calc_lower').innerHTML = "Pi approximation lower: " + calculate_pi_bottom_gon().toFixed(4)
        document.getElementById('gon_pi_calc_upper').innerHTML = "Pi approximation upper: " + calculate_pi_upper_gon().toFixed(4)
    }
}
