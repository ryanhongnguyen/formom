/*
* Data Catalog Website Project Submission - SEA Stage 2
* 
* Author: Ryan (Hong) Nguyen
* Date created: Saturday, 4/6/2024
*
* Project description: This project makes a website to show the nail services menu of the nail salon where my mom works. 
* The data was created by me from the actual menu at the salon. I made a class of ‘NailService’ for each menu item, each 
* service includes 6 things: title, type (manicure/pedicure/combo), description, average time duration, price, and image illustrated. 
* The .js program below has all the data at the top. First, I input the data to objects, then push them into an array named ‘services’. 
* Below that are the 4 functions, including: 
* …….[1] Displaying the array of objects of services.
* …….[2] Selecting services and display them on the right side along with calculating total price (with tax) and expected time duration.
* …….[3] Filtering and sorting service for showing: the whole menu, manicures only, pedicures only, sorting price or time ascendingly.
* …….[4] Searching a service and displaying the search results.
*/

const data = 
`Princess Nails Combo;Combo;Royal pampering with luxurious manicure and pedicure!;90;60;https://i.postimg.cc/QCDwcSLk/combo1.png
Ryan Friends Combo;Combo;Enjoy your discount by being my special friend!;90;50;https://i.postimg.cc/Pr3VqdqM/combo2.png
Mani Regular Polish;Manicure;Cozy up your nails with our classic colors!;20;19;https://i.postimg.cc/HssPHrTx/mani1.png
Mani Gel Polish;Manicure;Stronger than your ex's resolve. Shiny nails for days!;15;33;https://i.postimg.cc/kGw1Kmvq/mani2.png
Mani w/Regular Design;Manicure;Doing nails is an art. Your fingertips, the life of the party!;25;31;https://i.postimg.cc/3rZbPX5V/mani3.png
Mani w/Gel Design;Manicure;Green pearl nails. Shine brighter than your future!;35;40;https://i.postimg.cc/wM941vJw/mani4.png
Mani w/Paraffin Wax Reg;Manicure;Soft hands, Bahama vacation. Bye-bye dry skin!;18;26;https://i.postimg.cc/c4X28QFw/mani5.png
Mani w/Paraffin Wax Gel;Manicure;Bubble bath for your nails. Luxurious and smooth!;28;40;https://i.postimg.cc/tCX8TrN9/mani6.png
Pedi Reg Polish;Pedicure;Toe party time. Sparkle like you mean it!;18;25;https://i.postimg.cc/1tGYR6gg/pedi1.png
Ped i Gel Polish;Pedicure;Armor for your toes. Say no to chipped nails!;25;39;https://i.postimg.cc/DzbMDRnP/pedi2.png
Pedi Acrylic Reg;Pedicure;Queen-worthy toes. Fabulous makeover included!;22;35;https://i.postimg.cc/K8jV7RWV/pedi3.png
Pedi Acrylic Gel;Pedicure;Glamorous toes with their own entourage. Ready to shine!;35;49;https://i.postimg.cc/VkhhKzQN/pedi4.png
Pedi Design Reg;Pedicure;Toe art masterpiece. Unique and fabulous!;27;32;https://i.postimg.cc/yxT5j9sq/pedi5.png
Pedi Design Gel;Pedicure;Fashion show for your toes. Style that stands out!;35;46;https://i.postimg.cc/qBc9pfnm/pedi6.png`;

// Intro text in the deader
const introductionText = 'Hello Santa Monica folks! Had your fill of the same old beaches? Give Long Beach a shot, and while you\'re at it, swing by my mom\'s nail salon. I guarantee you the full set of killer nails to show off afterward and a great experience. If you had enough of Snapchat chats, how about a chat with my mom while having your nails done? I bet if my mom knew English better, she could have been a stand-up comedian. But as a nail worker, she can still make you laugh by tickling your feet!'
// My mom image on top left of header
const headerPicture = "https://i.postimg.cc/Gtc4sJ9Z/momheader.png";

class NailService {
    constructor(title, type, description, timeDuration, price, image) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.timeDuration = timeDuration;
        this.price = price;
        this.image = image;
    }
}

const lines = data.split('\n');

const services = lines.map(line => {
    const properties = line.split(';');
    const [title, type, description, timeDuration, price, image] = properties;
    //This is in case the data is not int or float then it take the 0
    const t = parseInt(timeDuration) || 0;
    const p = parseFloat(price) || 0;
    const service = new NailService(title, type, description, t, p, image);
    return service;
});

const displayServices = (servicesToDisplay) => {
    // Function to display the array of services
    // Parameter: an array
    // Return: none
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';

    servicesToDisplay.forEach(service => {
        // The look of each card in menu
        const serviceElem = document.createElement('div');
        serviceElem.classList.add('service');
        
        // Left side (take 70% width) is the infomation like title, description, time, price
        const serviceInfoElem = document.createElement('div');
        serviceInfoElem.classList.add('service-info');
        serviceInfoElem.innerHTML = `
            <h3>${service.title}</h3>
            <p>Description: ${service.description}</p>
            <p>Time duration: ${service.timeDuration} minutes</p>
            <p>Price: $${service.price.toFixed(2)}</p>
            <button onclick="selectService('${service.title}', ${service.price}, ${service.timeDuration})">Select</button>`;
        
        // Right side (take 30% width) is an image of sample work by my mom
        const serviceImageElem = document.createElement('div');
        serviceImageElem.classList.add('service-image');
        const img = document.createElement('img');
        img.src = service.image;
        img.alt = "Service Sample Image";
        serviceImageElem.appendChild(img);
        
        // Then combine 2 parts together and display as one card
        serviceElem.appendChild(serviceInfoElem);
        serviceElem.appendChild(serviceImageElem);
        servicesList.appendChild(serviceElem);
    });
};

const selectService = (title, price, timeDuration) => {
    // Function to select item in menu and show them on the right with sumary also
    // Parameter: the title as string, the price and time as float
    // Return: none
    const selectedServicesList = document.getElementById('selected-services-list');
    const totalPriceElem = document.getElementById('total-price');
    const taxElem = document.getElementById('tax');
    const totalElem = document.getElementById('total');
    const totalDurationElem = document.getElementById('total-duration');

    // This to display the selected items
    const listItem = document.createElement('li');
    listItem.textContent = `${title} - $${price.toFixed(2)}`;
    selectedServicesList.appendChild(listItem);

    // This summary work by using the previous summary (0 if is the first time) adding with the just selected item
    const totalPrice = parseFloat(totalPriceElem.textContent.replace('$', ''));
    totalPriceElem.textContent = `$${(totalPrice + price).toFixed(2)}`;

    const tax = parseFloat(totalPriceElem.textContent.replace('$', '')) * 0.1025;
    taxElem.textContent = `$${tax.toFixed(2)}`;

    totalElem.textContent = `$${(totalPrice + price + tax).toFixed(2)}`;

    const totalDuration = parseInt(totalDurationElem.textContent.replace(' minutes', ''));
    totalDurationElem.textContent = `${totalDuration + timeDuration} minutes`;
};

const sortServices = (sortBy) => {
    // Function to filter by the whole menu, manicures only, pedicures only, or sort by price or time ascendingly
    // Parameter: the text choice given by html when user press button
    // Return: none
    let sortedServices = [];

    switch (sortBy) {
        case 'menu':
            sortedServices = services.slice();
            break;
        case 'manicure':
            sortedServices = services.filter(service => service.type === 'Manicure');
            break;
        case 'pedicure':
            sortedServices = services.filter(service => service.type === 'Pedicure');
            break;
        case 'price':
            sortedServices = services.slice().sort((a, b) => a.price - b.price);
            break;
        case 'time':
            sortedServices = services.slice().sort((a, b) => a.timeDuration - b.timeDuration);
            break;
        default:
            sortedServices = services.slice();
    }
    displayServices(sortedServices);
};

const searchServices = () => {
    // Function to search a service and display the search results.
    // Parameter: none pass directly to function, just from take input from the #id in html
    // Return: none
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchTerms = searchInput.split(' ').filter(term => term.trim() !== '');

    const filteredServices = services.filter(service => {
        return searchTerms.every(term => service.title.toLowerCase().includes(term));
    });

    // This display results of search
    const resultMessage = document.getElementById('search-result');
    if (filteredServices.length > 0) {
        resultMessage.textContent = '';
    } else {
        resultMessage.textContent = 'No services match your search.';
    }

    displayServices(filteredServices);
};

window.onload = () => {
    // This set up the initial display
    const introductionElement = document.getElementById('introduction-text');
    introductionElement.textContent = introductionText;

    const headerPictureElement = document.querySelector('.mom-picture');
    const momImgage = document.createElement('img');
    momImgage.src = headerPicture;
    momImgage.alt = "My Mom's Picture";
    headerPictureElement.appendChild(momImgage);

    displayServices(services);
};
