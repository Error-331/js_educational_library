class IsraeliQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        if (this.queue.length === 0) {
            this.queue.unshift(item);
            return;
        }

        const { group } = item;

        let lastPersonGroupIdx = null;

        for (let idx = this.queue.length - 1; idx > -1; idx--) {
            const currentPerson = this.queue[idx];

            if (currentPerson.group === group) {
                lastPersonGroupIdx = idx;
            }
        }

        if (lastPersonGroupIdx !== null) {
            this.queue.splice(lastPersonGroupIdx, 0, item);
        } else {
            this.queue.unshift(item);
        }
    }

    dequeue() {
        return this.queue.pop();
    }
}

const queue = new IsraeliQueue();

queue.enqueue({ name: "Ben", group: 25 });
queue.enqueue({ name: "John", group: 25 });
queue.enqueue({ name: "Alex", group: 20 });
queue.enqueue({ name: "Tom", group: 30 });
queue.enqueue({ name: "Bob", group: 25 });

console.log(queue.dequeue()); // Ben
console.log(queue.dequeue()); // John
console.log(queue.dequeue()); // < Bob
console.log(queue.dequeue()); // Alex
console.log(queue.dequeue()); // Tom

const queueMap = new Map();

queue.set(25, {
    members: [],
    idx: 0
});

queue.set(20, {
    members: ["Alex"],
    idx: 1
});

queue.set(30, {
    members: ["Tom"],
    idx: 2
});

const someQueue = [
    { members: ["Ben", "John", "Bob"], group: 25 },
    { members: ["Alex"], group: 20 },
    { members: ["Tom"], group: 30 }
];
