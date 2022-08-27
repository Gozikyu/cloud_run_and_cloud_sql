import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

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

const isSameGuestsObject = (
  currentGuests: Guest[],
  incomingGuests: Guest[]
) => {
  if (currentGuests.toString() === incomingGuests.toString()) {
    return true;
  }
  return false;
};

type Guest = { guestName: string; content: string; entryID: number };

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
    const fetchAndSetGuests = async (): Promise<void> => {
      const fetchedData = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/"
      );
      if (isSameGuestsObject(guests, fetchedData.data)) {
        return;
      }
      setGuests(fetchedData.data);
      if (guests.every((guest) => !isGuestType(guest))) {
        console.log("type guard error");
        return;
      }
    };

    fetchAndSetGuests();
  }, [guests]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <th>entryID</th>
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
