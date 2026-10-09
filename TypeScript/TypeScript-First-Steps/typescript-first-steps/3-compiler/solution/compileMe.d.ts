type Id = number;
interface HasId {
    id: Id;
}
interface User extends HasId {
    username: string;
    name: string;
    email?: string;
}
interface Event extends HasId {
    host_id: Id;
    title: string;
    date: Date;
    image_url?: string;
    description?: string;
}
declare function createUser(username: string, name: string, email?: string): User;
type EventDetailsWithoutIds = Omit<Event, 'id' | 'host_id'>;
declare function createEvent(host: User, eventDetails: EventDetailsWithoutIds): Event;
export { createEvent, createUser };
//# sourceMappingURL=compileMe.d.ts.map