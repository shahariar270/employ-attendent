import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editable, setEditable] = useState(null);

  const presentHandle = (employId) => {
    setAttend(
      attend.map((item) => {
        if (item.id === employId) {
          if (item.isPresent === true) {
            alert("The student is already marked as present.");
          } else {
            return { ...item, isPresent: true };
          }
        }
        return item;
      })
    );
  };

  const absentHandle = (employId) => {
    setAttend(
      attend.map((item) => {
        if (item.id === employId) {
          if (item.isPresent === false) {
            alert("The student is already marked as absent.");
          } else {
            return { ...item, isPresent: false };
          }
        }
        return item;
      })
    );
  };

  const editHandle = (id) => {
    const editedEmploy = attend.find((item) => item.id === id);
    setEdit(true);
    setEditable(id);
    setName(editedEmploy.title);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (name) {
      const employer = {
        id: Date.now(),
        title: name,
        isPresent: undefined,
      };
      setAttend([...attend, employer]);
      setName("");
    } else {
      alert("Please enter your name");
    }
  };

  const deleteHandle = (id) => {
    const newStudents = attend.filter((item) => item.id !== id);
    setAttend(newStudents);
  };

  const updateHandle = (e) => {
    e.preventDefault();
    setAttend(
      attend.map((item) => {
        if (item.id === editable) {
          return { ...item, title: name };
        }
        return item;
      })
    );
    setEdit(false);
    setName("");
    setEditable(null);
  };

  return (
    <main className="">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
        <div className="flex flex-col items-center justify-center p-4 pt-6 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Please Enter Name For Confirm Employee Attendance
          </h1>

          <form
            className="my-7"
            onSubmit={(e) => (edit ? updateHandle(e) : submitHandle(e))}
          >
            <input
              type="text"
              placeholder="Enter Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">{edit ? "Update Employ" : "Add Employ"}</button>
          </form>
        </div>
      </div>
      <div className="m-auto text-center">
        {/* All Students */}
        <div className="" id="allStudent">
          <h1 className="text-2xl text-sky-500">All Students</h1>
          <ul className="list-disc">
            {attend.map((item) => (
              <li className="flex justify-evenly items-center w-[250px] my-3" key={item.id}>
                <span>{item.title}</span>
                <div className="m-auto flex items-center justify-between">
                  <button className="m-2 edit" onClick={() => editHandle(item.id)}>Edit</button>
                  <button className="m-2 delete" onClick={() => deleteHandle(item.id)}>Delete</button>
                  <button className="m-2 present" onClick={() => presentHandle(item.id)}>Present</button>
                  <button className="m-2 absent" onClick={() => absentHandle(item.id)}>Absent</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Present students */}
        <div className="" id="present">
          <h1 className="text-2xl text-green-500">Present</h1>
          <ul className="list-disc">
            {attend.filter((item) => item.isPresent === true).map((employ) => (
              <li key={employ.id}>
                <span>{employ.title}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Absent students */}
        <div className="" id="absent">
          <h1 className="text-2xl text-gray-600 ">Absent</h1>
          <ul className="list-disc">
            {attend.filter((item) => item.isPresent === false).map((employ) => (
              <li key={employ.id}>
                <span>{employ.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
