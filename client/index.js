import Web3 from 'web3';
import "bootstrap/dist/css/bootstrap.css";
import configuration from "../build/contracts/Tickets.json";
import ticketImg from "./img/ticket.jpeg"

const contractAddress = configuration.networks['5777'].address;
const contractAbi = configuration.abi;

const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');

const contract = new web3.eth.Contract(contractAbi, contractAddress);
const totalTicket = 10;
let account;

const accountEl = document.querySelector('.address');
const ticketsEL = document.getElementById('tickets');

const buyTicket = async (ticket) => {
    await contract.methods.buyTicket(ticket.id).send({
        from: account,
        value: ticket.price
    });
    await refreshTickets();
}
const refreshTickets = async () => {
    ticketsEL.innerHTML = '';
    for (let i = 0; i < totalTicket; i++) {
        const ticket = await contract.methods.tickets(i).call();
        console.log(ticket);
        ticket.id = i;
        if (ticket.owner === '0x0000000000000000000000000000000000000000') {
            const ticketEl = `
                <div class="card" style="width: 18rem;">
                    <img src=${ticketImg} class="card-img-top" alt="ticket">
                    <div class="card-body">
                        <h5 class="card-title">Ticket</h5>
                        <p class="card-text">${ticket.price / 1e17} ETH</p>
                        <button data-ticket-id="${ticket.id}" class="btn btn-primary buy-button">Buy Ticket</button>
                    </div>
                </div>
            `;

            ticketsEL.innerHTML += ticketEl;
             // Bind click event to Buy Ticket buttons
            const buyButtons = document.querySelectorAll('.buy-button');
            buyButtons.forEach(button => {
            const ticketId = button.getAttribute('data-ticket-id');
            button.addEventListener('click', () => buyTicket(ticket));
    });
        }
    }

   
};



const main = async ()=>{
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    accountEl.innerText = account;
    await refreshTickets();


}
main();