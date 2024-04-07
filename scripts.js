/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */


class NailService {
    constructor(title, type, description, time_duration, price) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.time_duration = time_duration;
        this.price = price;
    }
}

const services = [
    new NailService("Mani Regular Polish", "Manicure", "Cozy up your nails with our classic colors. Like a warm hug for your fingertips!", 20, 19),
    new NailService("Mani Gel Polish", "Manicure", "Stronger than your ex's resolve. Shiny nails for days!", 15, 33),
    new NailService("Mani w/Regular Design", "Manicure", "Nail art that's VIP. Your fingertips, the life of the party!", 25, 31),
    new NailService("Mani w/Gel Design", "Manicure", "Red carpet nails. Shine brighter than your future!", 35, 40),
    new NailService("Mani w/Paraffin Wax Reg", "Manicure", "Soft hands, Bahama vacation. Bye-bye dry skin!", 18, 26),
    new NailService("Mani w/Paraffin Wax Gel", "Manicure", "Bubble bath for your nails. Luxurious and smooth!", 28, 40),
    new NailService("Pedi Reg Polish", "Pedicure", "Toe party time. Sparkle like you mean it!", 18, 25),
    new NailService("Pedi Gel Polish", "Pedicure", "Armor for your toes. Say no to chipped nails!", 25, 39),
    new NailService("Pedi Acrylic Reg", "Pedicure", "Queen-worthy toes. Fabulous makeover included!", 22, 35),
    new NailService("Pedi Acrylic Gel", "Pedicure", "Glamorous toes with their own entourage. Ready to shine!", 35, 49),
    new NailService("Pedi Design Reg", "Pedicure", "Toe art masterpiece. Unique and fabulous!", 27, 32),
    new NailService("Pedi Design Gel", "Pedicure", "Fashion show for your toes. Style that stands out!", 35, 46),
];

function displayServices(servicesToDisplay) {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';

    servicesToDisplay.forEach(service => {
        const serviceElem = document.createElement('div');
        serviceElem.classList.add('service');
        serviceElem.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.type}</p>
            <p>${service.description}</p>
            <p>Time duration: ${service.time_duration} minutes</p>
            <p>Price: $${service.price}</p>
            <button onclick="selectService('${service.title}', ${service.price}, ${service.time_duration})">Select</button>
        `;
        servicesList.appendChild(serviceElem);
    });
}
