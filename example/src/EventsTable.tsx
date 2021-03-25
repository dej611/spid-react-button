import React from 'react';

export const EventsTable = ({ events }: { events: { type: string, name: string, arg?: string }[] }) => {
  return <div className="tableFixHead">
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">Event</th>
          <th scope="col">Arg</th>
        </tr>
      </thead>
      <tbody>
        {events.map(({ type, name, arg }, i) => <tr key={name + i}>
          <th scope="row">{events.length - i}</th>
          <td>{type}</td>
          <td>{name}</td>
          <td>{arg || ''}</td>
        </tr>)}

      </tbody>
    </table>
  </div>
}