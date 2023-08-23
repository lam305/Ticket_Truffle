// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Tickets {
    address public owner = msg.sender;
    uint256 public totalTicket = 10;

    struct Ticket {
        address owner;
        uint256 price;
    }
    Ticket[10] public tickets;
    event TicketPurchased(address indexed purchaser, uint256 ticketIndex, uint256 price);

    constructor() {
        for (uint256 i = 0; i < totalTicket; i++) {
            tickets[i].price = 1e16;
            tickets[i].owner = address(0x0000000000000000000000000000000000000000);
        }
    }


    function buyTicket(uint256 _index) external payable {
        require(_index < totalTicket && _index >= 0 );
        require(tickets[_index].owner == address(0x0000000000000000000000000000000000000000));
        require(msg.value >= tickets[_index].price);
        tickets[_index].owner = msg.sender;
        emit TicketPurchased(msg.sender, _index, tickets[_index].price);

    }


}