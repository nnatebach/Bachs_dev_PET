interface HasId {
    id: Id; // declare this type!
}

interface User extends HasId {
    // complete me!
};


interface Event extends HasId {
    // complete me!
}


const EVENTS: Event[] = [];
const USERS: User[] = [];

function createNextId<T extends HasId>(data: T[]): Id {
    const lastItem = data[data.length - 1];
    if (!lastItem) {
        return 1;
    } else {
        return lastItem.id + 1;
    }
}


function createUser(username: string, name: string, email?: string): User {
    const user: User = {
        id: createNextId<User>(USERS),
        username,
        name,
    };
    if (email) { user.email = email };
    USERS.push(user);
    return user;
}

// declare the missing EventDetailsWithoutIds type!
function createEvent(host: User, eventDetails: EventDetailsWithoutIds): Event {
    const { date, title, image_url, description } = eventDetails;
    const eventDate = new Date(date);

    const event: Event = {
        id: createNextId<Event>(EVENTS),
        host_id: host.id,
        date: eventDate,
        title,
    };
    if (image_url) { event.image_url = image_url };
    if (description) { event.description = description };

    EVENTS.push(event);
    return event;
}


export { createEvent, createUser }

