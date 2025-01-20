import React, { useState } from "react";
import ReactQuill from "react-quill"; // Use ReactQuill for rich text editing
import "react-quill/dist/quill.snow.css"; // Quill styles
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for modal and buttons

const TaskEditor = ({ onClose, onSave, existingTaskContent }) => {
  const [editorContent, setEditorContent] = useState(existingTaskContent || ""); // State to store editor content

  // Handle editor content change
  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  // Save the content and close the modal
  const saveContent = () => {
    onSave(editorContent); // Call the onSave function to pass the updated content
    onClose(); // Close the modal after saving
  };

  return (
    <div>
      {/* Modal */}
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        aria-labelledby="taskEditorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taskEditorModalLabel">
                Task Editor
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {/* ReactQuill editor */}
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange} // Handle content change
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    [{ align: [] }],
                    ["link", "image"],
                    ["blockquote"],
                    ["clean"],
                  ],
                }}
              />
            </div>
            <div className="modal-footer">
              {/* Cancel button */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              {/* Save button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveContent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditor;
