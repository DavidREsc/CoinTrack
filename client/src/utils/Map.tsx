import { ITransaction } from "../types"
import Decimal from 'decimal.js'
import { lessThan } from "./calculations";

interface MapVal {
    amount: string;
    price: string;
    t: ITransaction
}
class Node {
    val: MapVal
    next: Node | null
    constructor(val: MapVal) {
        this.val = val
        this.next = null
    }
}

class Queue {
    start: Node | null
    end: Node | null
    length: number

    constructor() {
        this.start = null
        this.end = null
        this.length = 0
    }

    enqueue(val: MapVal) {
        let node = new Node(val)
        if (!this.end) {
            this.end = node
            this.start = this.end
        }
        else {
            this.end.next = node
            this.end = this.end.next
        }
        this.length++
    }

    dequeue() {
        let node = this.start
        if (!node) return null
        this.start = this.start!.next
        if (node === this.end) this.end = null
        this.length--
        return node
    }

    next() {
        return this.next
    }

    update(val: MapVal) {
        let node = new Node(val)
        if (this.length === 1) {
            this.end = node
            this.start = this.end
        }
        else {
            node.next = this.start!.next
            this.start = node
        }
    }

    peek() {
        return !this.start ? null : this.start.val
    }

    print() {
        let node = this.start
        while (node) {
            console.log(node.val)
            node = node.next
        }
    }
}

interface IMap {
    [prop: string]: Queue
}
interface ST {
    amount: string;
    price: string;
    date: Date;
}

class Map {
    map: IMap;

    constructor() {
        this.map = {}
    }

    set(key: string, val: MapVal) {
        if (!this.map[key]) {
            let queue = new Queue()
            queue.enqueue(val)
            this.map[key] = queue
        }
        else {
            this.map[key].enqueue(val)
        }
    }

    sell(key: string, val: ST) {
        // No buy transaction for this asset, sell transaction is entirely profit
        if (!this.map[key]) return Decimal.mul(val.price, val.amount).toFixed()
        // Get earliest transaction value
        let originalVal = this.map[key].peek()
        // No more buy transactions left, sell transaction is entirely profit
        if (!originalVal) return  Decimal.mul(val.price, val.amount).toFixed()
        let newVal = {} as MapVal;
        let profit = '0'
        while (originalVal) {
            if (originalVal.t.transaction_date > val.date) {
                break;
            }
            // if sell transaction amount is larger than the buy transaction amount
            else if (lessThan(originalVal.amount, val.amount)) {
                // subtract buy amount from sell amount
                val.amount = Decimal.sub(val.amount, originalVal.amount).toFixed()
                originalVal.t.amount_sold = originalVal.t.coin_amount
                // remove earliest buy transaction from queue
                this.map[key].dequeue()
                // calculate profit
                profit = Decimal.sum(profit, Decimal.mul(Decimal.sub(val.price, originalVal.price), originalVal.amount)).toFixed()
                // get next earliest buy transaction
                originalVal = this.map[key].peek()
            }
            else {
                newVal.amount = Decimal.sub(originalVal.amount, val.amount).toFixed()
                originalVal.t.amount_sold = Decimal.sum(val.amount, (originalVal.t.amount_sold || 0)).toFixed()
                newVal.price = originalVal.price
                newVal.t = originalVal.t
                profit = Decimal.sum(profit, Decimal.mul(Decimal.sub(val.price, originalVal.price), val.amount)).toFixed()
                val.amount = '0'
                if (!lessThan(newVal.amount, '0')) this.map[key].update(newVal)
                else this.map[key].dequeue()
                break;
            } 
        }
        if (!lessThan(val.amount, '0')) profit = Decimal.sum(profit, Decimal.mul(val.price, val.amount)).toFixed()
        return profit
    }

    print(key: string) {
        if (!this.map[key]) return
        this.map[key].print()
    }
}

export default Map