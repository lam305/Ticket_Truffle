const Tickets = artifacts.require('Tickets');
const assert = require('assert');


contract('Tickets', (accounts) => {
    const BUYER = accounts[1];
     it('should allower a user to buy a ticket', async () => {
        const instance = await  Tickets.deployed();
        const originalTicket = await instance.tickets(0);

        await instance.buyTicket(0, {from: BUYER, value: await originalTicket.price});

        const updatedTicket = await instance.tickets(0);
        assert.equal(updatedTicket.owner, BUYER);
     })
})
    
    
    
