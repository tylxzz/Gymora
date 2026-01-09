import React, { useState } from "react";

const AdminLocations = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: "Main Gym", address: "123 Fitness St, NY", capacity: 250 },
    { id: 2, name: "Studio A", address: "123 Fitness St, NY", capacity: 40 },
    { id: 3, name: "Studio B", address: "123 Fitness St, NY", capacity: 30 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [form, setForm] = useState({
    name: "",
    address: "",
    capacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", address: "", capacity: "" });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.address.trim()) return;

    if (editingId) {
      setLocations((prev) =>
        prev.map((loc) =>
          loc.id === editingId
            ? { ...loc, ...form, capacity: Number(form.capacity) || 0 }
            : loc
        )
      );
    } else {
      setLocations((prev) => [
        ...prev,
        {
          id: nextId,
          name: form.name.trim(),
          address: form.address.trim(),
          capacity: Number(form.capacity) || 0,
        },
      ]);
      setNextId((id) => id + 1);
    }
    resetForm();
  };

  const handleEdit = (loc) => {
    setEditingId(loc.id);
    setForm({
      name: loc.name,
      address: loc.address,
      capacity: String(loc.capacity),
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <div className="dash-grid">
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>{editingId ? "Edit Location" : "Add Location"}</h2>
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
                placeholder="Main Gym"
              />
            </div>
            <div className="inline-form-group">
              <label>Address</label>
              <input
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Fitness St, NY"
              />
            </div>
          </div>

          <div className="inline-form-row">
            <div className="inline-form-group small">
              <label>Capacity</label>
              <input
                name="capacity"
                type="number"
                min="0"
                value={form.capacity}
                onChange={handleChange}
                placeholder="250"
              />
            </div>
          </div>

          <div className="inline-form-actions">
            <button type="submit" className="btn btn-auth-primary">
              {editingId ? "Save changes" : "Add location"}
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

      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>Locations</h2>
        </div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Capacity</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.name}</td>
                <td>{loc.address}</td>
                <td>{loc.capacity}</td>
                <td>
                  <div className="table-actions">
                    <button
                      type="button"
                      className="btn-table-link"
                      onClick={() => handleEdit(loc)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-table-link btn-table-danger"
                      onClick={() => handleDelete(loc.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {locations.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                  No locations yet. Use the form above to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLocations;
