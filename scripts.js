const data = 
`Princess Nails Combo;Combo;Royal pampering with luxurious manicure and pedicure!;90;60
Ryan Friends Combo;Combo;Enjoy your discount by being my special friend!;90;50
Mani Regular Polish;Manicure;Cozy up your nails with our classic colors!;20;19
Mani Gel Polish;Manicure;Stronger than your ex's resolve. Shiny nails for days!;15;33
Mani w/Regular Design;Manicure;Nail art that's VIP. Your fingertips, the life of the party!;25;31
Mani w/Gel Design;Manicure;Red carpet nails. Shine brighter than your future!;35;40
Mani w/Paraffin Wax Reg;Manicure;Soft hands, Bahama vacation. Bye-bye dry skin!;18;26
Mani w/Paraffin Wax Gel;Manicure;Bubble bath for your nails. Luxurious and smooth!;28;40
Pedi Reg Polish;Pedicure;Toe party time. Sparkle like you mean it!;18;25
Pedi Gel Polish;Pedicure;Armor for your toes. Say no to chipped nails!;25;39
Pedi Acrylic Reg;Pedicure;Queen-worthy toes. Fabulous makeover included!;22;35
Pedi Acrylic Gel;Pedicure;Glamorous toes with their own entourage. Ready to shine!;35;49
Pedi Design Reg;Pedicure;Toe art masterpiece. Unique and fabulous!;27;32
Pedi Design Gel;Pedicure;Fashion show for your toes. Style that stands out!;35;46`;

const introductionText = 'Hello Santa Monica folks! Had your fill of the same old beaches? Give Long Beach a shot, and while you\'re at it, swing by my mom\'s nail salon. I guarantee you the full set of killer nails to show off afterward and a great experience. If you had enough of Snapchat chats, how about a chat with my mom while having your nails done? I bet if my mom knew English better, she could have been a stand-up comedian. But as a nail worker, she can still make you laugh by tickling your funny bone (and maybe your feet too)!'
const headerPicture = "https://i.postimg.cc/QMGy1LKh/IMG-7776.avif";

class NailService {
    constructor(title, type, description, time_duration, price) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.time_duration = time_duration;
        this.price = price;
    }
}

const lines = data.split('\n');

const services = lines.map(line => {
    const properties = line.split(';');
    const [title, type, description, time_duration, price] = properties;
    const service = new NailService(title, type, description, parseInt(time_duration), parseFloat(price));
    return service;
});

function displayServices(servicesToDisplay) {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';

    servicesToDisplay.forEach(service => {
        const serviceElem = document.createElement('div');
        serviceElem.classList.add('service');
        serviceElem.innerHTML = `
            <h3>${service.title}</h3>
            <p>Description: ${service.description}</p>
            <p>Time duration: ${service.time_duration} minutes</p>
            <p>Price: $${service.price.toFixed(2)}</p>
            <button onclick="selectService('${service.title}', ${service.price}, ${service.time_duration})">Select</button>
        `;
        servicesList.appendChild(serviceElem);
    });
}

function selectService(title, price, time_duration) {
    const selectedServicesList = document.getElementById('selected-services-list');
    const totalPriceElem = document.getElementById('total-price');
    const taxElem = document.getElementById('tax');
    const totalElem = document.getElementById('total');
    const totalDurationElem = document.getElementById('total-duration');

    const listItem = document.createElement('li');
    listItem.textContent = `${title} - $${price.toFixed(2)}`;
    selectedServicesList.appendChild(listItem);

    const totalPrice = parseFloat(totalPriceElem.textContent.replace('$', ''));
    totalPriceElem.textContent = `$${(totalPrice + price).toFixed(2)}`;

    const tax = parseFloat(totalPriceElem.textContent.replace('$', '')) * 0.1025;
    taxElem.textContent = `$${tax.toFixed(2)}`;

    totalElem.textContent = `$${(totalPrice + price + tax).toFixed(2)}`;

    const totalDuration = parseInt(totalDurationElem.textContent.replace(' minutes', ''));
    totalDurationElem.textContent = `${totalDuration + time_duration} minutes`;
}


function sortServices(sortBy) {
    let sortedServices = [];

    switch (sortBy) {
        case 'menu':
            sortedServices = services.slice();
            break;
        case 'price':
            sortedServices = services.slice().sort((a, b) => a.price - b.price);
            break;
        case 'time':
            sortedServices = services.slice().sort((a, b) => a.time_duration - b.time_duration);
            break;
        case 'manicure':
            sortedServices = services.filter(service => service.type === 'Manicure');
            break;
        case 'pedicure':
            sortedServices = services.filter(service => service.type === 'Pedicure');
            break;
        default:
            sortedServices = services.slice();
            break;
    }
    displayServices(sortedServices);
}

function searchServices() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchTerms = searchInput.split(' ').filter(term => term.trim() !== '');

    const filteredServices = services.filter(service => {
        return searchTerms.every(term => service.title.toLowerCase().includes(term));
    });

    const resultMessage = document.getElementById('search-result');
    if (filteredServices.length > 0) {
        resultMessage.textContent = '';
    } else {
        resultMessage.textContent = 'No services match your search.';
    }

    displayServices(filteredServices);
}

window.onload = function() {
    const introductionElement = document.getElementById('introduction-text');
    introductionElement.textContent = introductionText;

    const headerPictureElement = document.querySelector('.mom-picture');
    const momImgage = document.createElement('img');
    momImgage.src = headerPicture;
    momImgage.alt = "My Mom's Picture";
    headerPictureElement.appendChild(momImgage);

    displayServices(services);
};
