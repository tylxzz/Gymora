import React, { useState } from "react";

const AdminTrainers = () => {
  const [trainers, setTrainers] = useState([
    { id: 1, name: "Sarah Lee", specialty: "Yoga", classesPerWeek: 8, status: "Active" },
    { id: 2, name: "James Cole", specialty: "HIIT", classesPerWeek: 10, status: "Active" },
    { id: 3, name: "Anna Fox", specialty: "Pilates", classesPerWeek: 6, status: "On leave" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    classesPerWeek: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      specialty: "",
      classesPerWeek: "",
      status: "Active",
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.specialty.trim()) return;

    if (editingId) {
      // update
      setTrainers((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, ...form, classesPerWeek: Number(form.classesPerWeek) || 0 } : t
        )
      );
    } else {
      // add new
      setTrainers((prev) => [
        ...prev,
        {
          id: nextId,
          name: form.name.trim(),
          specialty: form.specialty.trim(),
          classesPerWeek: Number(form.classesPerWeek) || 0,
          status: form.status,
        },
      ]);
      setNextId((id) => id + 1);
    }

    resetForm();
  };

  const handleEdit = (trainer) => {
    setEditingId(trainer.id);
    setForm({
      name: trainer.name,
      specialty: trainer.specialty,
      classesPerWeek: String(trainer.classesPerWeek),
      status: trainer.status,
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;
    setTrainers((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <div className="dash-grid">
      {/* Űrlap blokk */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>{editingId ? "Edit Trainer" : "Add Trainer"}</h2>
        </div>

        <form className="inline-form" onSubmit={handleSubmit}>
          <div className="inline-form-row">
            <div className="inline-form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Sarah Lee"
              />
            </div>
            <div className="inline-form-group">
              <label>Specialty</label>
              <input
                name="specialty"
                type="text"
                value={form.specialty}
                onChange={handleChange}
                placeholder="Yoga, HIIT..."
              />
            </div>
          </div>

          <div className="inline-form-row">
            <div className="inline-form-group small">
              <label>Classes / Week</label>
              <input
                name="classesPerWeek"
                type="number"
                min="0"
                value={form.classesPerWeek}
                onChange={handleChange}
                placeholder="8"
              />
            </div>
            <div className="inline-form-group small">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="On leave">On leave</option>
              </select>
            </div>
          </div>

          <div className="inline-form-actions">
            <button type="submit" className="btn btn-auth-primary">
              {editingId ? "Save changes" : "Add trainer"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-ghost-small"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista / tábla */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>Trainers</h2>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Classes / Week</th>
              <th>Status</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.specialty}</td>
                <td>{t.classesPerWeek}</td>
                <td
                  className={
                    "status-pill " +
                    (t.status === "Active" ? "status-success" : "status-pending")
                  }
                >
                  {t.status}
                </td>
                <td>
                  <div className="table-actions">
                    <button
                      type="button"
                      className="btn-table-link"
                      onClick={() => handleEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-table-link btn-table-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {trainers.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
                  No trainers yet. Use the form above to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTrainers;
