import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import type { Guest } from "../../type";

const isGuestType = (guest: unknown): guest is Guest => {
  const { guestName, content, entryID } = guest as Guest;
  if (
    typeof guestName === "string" &&
    typeof content === "string" &&
    typeof entryID === "number"
  ) {
    return true;
  }
  return false;
};

type Props = {
  guest: Guest;
};

const GuestRow = ({ guest }: Props) => {
  return (
    <div>
      <td>{guest.entryID}</td>
      <td>{guest.guestName}</td>
      <td>{guest.content}</td>
    </div>
  );
};

function App() {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const fetchGuests = async (): Promise<Guest[]> => {
      const guests: Guest[] = await axios.get(process.env.BACKEND_URL + "/");
      if (guests.every((guest) => isGuestType(guest))) {
        throw Error("invalid guest type");
      }
      setGuests(guests);
      return guests;
    };
    fetchGuests();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <th>enrtyID</th>
          <th>guestName</th>
          <th>content</th>
          {guests.map((guest) => {
            return <GuestRow guest={guest} />;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
