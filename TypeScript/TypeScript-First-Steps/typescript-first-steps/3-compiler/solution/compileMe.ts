type Id = number;

interface HasId {
    id: Id;
}

interface User extends HasId {
    username: string;
    name: string;
    email?: string;
};


interface Event extends HasId {
    host_id: Id,
    title: string,
    date: Date,
    image_url?: string,
    description?: string,
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

type EventDetailsWithoutIds = Omit<Event, 'id' | 'host_id'>;

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

