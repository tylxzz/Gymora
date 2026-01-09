import React from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["07:00", "09:00", "12:00", "17:00", "19:00"];

const AdminSchedule = () => {
  return (
    <div className="dash-panel">
      <div className="dash-panel-header">
        <h2>Class Schedule</h2>
      </div>
      <div className="schedule-grid">
        <div className="schedule-row schedule-header-row">
          <div className="schedule-cell schedule-time-cell" />
          {days.map((d) => (
            <div key={d} className="schedule-cell schedule-day-cell">
              {d}
            </div>
          ))}
        </div>

        {times.map((t) => (
          <div key={t} className="schedule-row">
            <div className="schedule-cell schedule-time-cell">{t}</div>
            {days.map((d) => (
              <div key={d} className="schedule-cell">
                {/* demo órák */}
                {t === "07:00" && d === "Mon" && (
                  <div className="schedule-pill">Morning HIIT</div>
                )}
                {t === "09:00" && d === "Wed" && (
                  <div className="schedule-pill schedule-pill-secondary">
                    Yoga
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSchedule;
