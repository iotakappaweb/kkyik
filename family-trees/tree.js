/*
This program will be used to create a family tree

The family tree will consist of nodes, which will be the people
and edges, which will be the relationships between the people

Each node is a person, and will have the following attributes:
    - name (including nickname)
    - class (level)
    - big (parent) node
    - littles (children) nodes

Each edge is a relationship, which will represent big/little relationships.

The tree will be a directed graph, with the root node being the chapter as a whole (Iota Kappa)
each level of the tree will be a class, and each node will be a person in that class

At the end we are going to export the tree as a .json file, which will be used to create a family tree in css/html
*/

// we basically have to make a family tree abstract data type

// let's make a dictionary containing the greek alphabet
const greekAlphabet = {
    "Alpha": "Α",
    "Beta": "Β",
    "Gamma": "Γ",
    "Delta": "Δ",
    "Epsilon": "Ε",
    "Zeta": "Ζ",
    "Eta": "Η",
    "Theta": "Θ",
    "Iota": "Ι",
    "Kappa": "Κ",
    "Lambda": "Λ",
    "Mu": "Μ",
    "Nu": "Ν",
    "Xi": "Ξ",
    "Omicron": "Ο",
    "Pi": "Π",
    "Rho": "Ρ",
    "Sigma": "Σ",
    "Tau": "Τ",
    "Upsilon": "Υ",
    "Phi": "Φ",
    "Chi": "Χ",
    "Psi": "Ψ",
    "Omega": "Ω"
};

// let's make the node class first
class Node {
    constructor(name, family = null, initiateClass = null, big = null, littles = []) {
        this.name = name;
        this.initiateClass = initiateClass;
        this.big = big;
        this.littles = littles;
    }

    // add a little to the littles array
    addLittle(little) {
        this.littles.push(little);
    }

    // add a big to the big attribute
    addBig(big) {
        this.big = big;
    }

    // get the name of the node
    getName() {
        return this.name;
    }

    // get the family of the node
    getFamily() {
        return this.family;
    }

    // get the initiate class of the node
    getInitiateClass() {
        return this.initiateClass;
    }

    // get the big of the node
    getBig() {
        return this.big;
    }

    // get the littles of the node
    getLittles() {
        return this.littles;
    }

    // tostring
    toString() {
        return this.name + ":" + this.initiateClass + "\nbig:" + this.big + "\nlittles:" + this.littles;
    }
}

// let's make the main tree class
class Tree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    // add a node to the tree
    addNode(node) {
        // if the tree is empty, make the node the root
        if (this.root == null) {
            this.root = node;
            this.size++;
        } else {
            // otherwise, find the node's big and add the node to the big's littles
            let big = this.findNode(node.getBig());
            big.addLittle(node);
            this.size++;
        }
    }

    // find a node in the tree, returns null if not found
    findNode(name) {
        // if the tree is empty, return null
        if (this.root == null) {
            return null;
        } else {
            // otherwise, traverse the tree and find the node
            let queue = [];
            queue.push(this.root);
            while (queue.length > 0) {
                let current = queue.shift();
                if (current.getName() == name) {
                    return current;
                } else {
                    for (let i = 0; i < current.getLittles().length; i++) {
                        queue.push(current.getLittles()[i]);
                    }
                }
            }
            return null;
        }
    }

    // get the size of the tree
    getSize() {
        return this.size;
    }

    // get the root of the tree
    getRoot() {
        return this.root;
    }
}

// let's make the main function
function main() {
    // create root node
    let root = new Node("Iota Kappa");

    // create tree
    let tree = new Tree();
    tree.addNode(root);

    // take 
}