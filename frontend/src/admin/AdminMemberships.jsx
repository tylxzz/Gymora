import React, { useState } from "react";

const AdminMemberships = () => {
  const [memberships, setMemberships] = useState([
    { id: 1, name: "Basic", billing: "Monthly", price: 19, activeMembers: 86 },
    { id: 2, name: "Standard", billing: "Monthly", price: 39, activeMembers: 204 },
    { id: 3, name: "Premium", billing: "Monthly", price: 59, activeMembers: 138 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [form, setForm] = useState({
    name: "",
    billing: "Monthly",
    price: "",
    activeMembers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      billing: "Monthly",
      price: "",
      activeMembers: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const payload = {
      name: form.name.trim(),
      billing: form.billing,
      price: Number(form.price) || 0,
      activeMembers: Number(form.activeMembers) || 0,
    };

    if (editingId) {
      setMemberships((prev) =>
        prev.map((m) => (m.id === editingId ? { ...m, ...payload } : m))
      );
    } else {
      setMemberships((prev) => [
        ...prev,
        {
          id: nextId,
          ...payload,
        },
      ]);
      setNextId((id) => id + 1);
    }

    resetForm();
  };

  const handleEdit = (m) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      billing: m.billing,
      price: String(m.price),
      activeMembers: String(m.activeMembers),
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this membership type?"))
      return;
    setMemberships((prev) => prev.filter((m) => m.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <div className="dash-grid">
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>{editingId ? "Edit Membership Type" : "Add Membership Type"}</h2>
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
                placeholder="Premium"
              />
            </div>

            <div className="inline-form-group small">
              <label>Billing</label>
              <select
                name="billing"
                value={form.billing}
                onChange={handleChange}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="inline-form-row">
            <div className="inline-form-group small">
              <label>Price ($)</label>
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="59"
              />
            </div>
            <div className="inline-form-group small">
              <label>Active Members</label>
              <input
                name="activeMembers"
                type="number"
                min="0"
                value={form.activeMembers}
                onChange={handleChange}
                placeholder="138"
              />
            </div>
          </div>

          <div className="inline-form-actions">
            <button type="submit" className="btn btn-auth-primary">
              {editingId ? "Save changes" : "Add membership"}
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
          <h2>Membership Types</h2>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Billing</th>
              <th>Price</th>
              <th>Active Members</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.billing}</td>
                <td>${m.price}</td>
                <td>{m.activeMembers}</td>
                <td>
                  <div className="table-actions">
                    <button
                      type="button"
                      className="btn-table-link"
                      onClick={() => handleEdit(m)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-table-link btn-table-danger"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {memberships.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
                  No membership types yet. Use the form above to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMemberships;
