import React, { useState } from "react";
import { AddButton } from "@components/ui/project";

export default function Notes({ project, children }) {
  const [newNote, setNewNote] = useState(""); // State to store the new note
  const [notes, setNotes] = useState(project.notes || []); // State to store all notes (assuming project.notes is an array)

  // Function to handle text input change
  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  // Function to handle note submission
  const handleSubmit = () => {
    if (newNote.trim() !== "") {
      // Add the new note to the existing notes array
      setNotes([...notes, newNote]);
      // Clear the text box
      setNewNote("");
    }
  };

  return (
    <>
      {/* Container Div */}
      <div className="rounded-3xl bg-white px-8 pt-8 pb-2 mx-10 mb-4">
        {/* Display Notes */}
        <div className="pb-8">
          {/* Title Div */}
          <div className="text-3xl font-semibold underline mb-4">Notes</div>
          {/* List Div */}
          <div className="text-xl">{project.notes}</div>
        </div>
        {/* Add Note */}
        <div className="bg-gray-400 rounded-3xl mx-2 h-1/4 mb-4">
          {/* Text Box */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Add a new note..."
              value={newNote}
              onChange={handleInputChange}
              className="w-full rounded-md p-2"
            />
          </div>
          {/* Submit Button */}
          <div className="text-center pb-4">
            <AddButton handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
