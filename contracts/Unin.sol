// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Unin is ERC721,ERC721Burnable,ERC721Enumerable,ERC721URIStorage,Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint private _balance = 0;
    uint public currentPrice = 0.5 ether;
    uint public maxSupply = 10000;

    constructor() ERC721("Unin", "UNIN") {}

    function getPrice() public view returns (uint) {
        return currentPrice;
    }

    function updatePrice(uint newPrice)
        public
        onlyOwner
    {
        currentPrice = newPrice;
    }

    function updateMaxSupply(uint newMaxSupply)
        public
        onlyOwner
    {
        maxSupply = newMaxSupply;
    }

    event MintEvent(address addr, uint256 tokenId);

    function mint(address addr, uint[] calldata attrs)
        public
        payable
    {
        require(totalSupply() < maxSupply, "Insufficient supply.");

        string memory uri = "";

        uint sum = 0;
        uri = Strings.toString(attrs[0]);
        for (uint i = 1; i < attrs.length; i++) {
            if (i > 0) sum += attrs[i];
            uri = string(abi.encodePacked(uri, ",", Strings.toString(attrs[i])));
        }

        require((attrs[0] >= 1 && attrs[0] <= 5), "Invalid type.");
        require(sum == 100, "Invalid attributes.");
        require(msg.value >= currentPrice, "Insufficient funds.");

        _balance += msg.value;

        uint256 tokenId = _tokenIds.current();
        _safeMint(addr, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenIds.increment();

        emit MintEvent(addr, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view virtual override(ERC721, ERC721Enumerable)
        returns (bool) {
            return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 token)
        public view virtual override(ERC721, ERC721URIStorage)
        returns (string memory) {
        return super.tokenURI(token);
    }

    function transfer(address payable to, uint amount)
        public
        payable
        onlyOwner
    {
        require(_balance >= amount, "Insufficient funds");
        _balance -= amount;
        to.transfer(amount);
    }
}
