import React from 'react';
import '../css/TimeSlotSelector.css';

const TimeSlotSelector = ({ slots, selectedSlots = [], onSelectSlots, bookedSlots = [], selectedDate }) => {
  const isSlotInPast = (slotStr) => {
    if (!selectedDate) return false;
    
    const today = new Date();
    // Use local time for YYYY-MM-DD
    const todayStr = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    
    if (selectedDate > todayStr) return false;
    if (selectedDate < todayStr) return true;
    
    // It's today, check time
    const startStr = slotStr.split(' - ')[0];
    const [time, modifier] = startStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    const currentHours = today.getHours();
    const currentMinutes = today.getMinutes();
    
    if (hours < currentHours) return true;
    if (hours === currentHours && parseInt(minutes, 10) <= currentMinutes) return true;
    
    return false;
  };

  const toggleSlot = (slot) => {
    if (bookedSlots.includes(slot) || isSlotInPast(slot)) return; // prevent clicking
    if (selectedSlots.includes(slot)) {
      // Remove slot
      onSelectSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      // Add slot
      onSelectSlots([...selectedSlots, slot].sort()); // sort to keep them in order if needed
    }
  };

  return (
    <div className="time-slot-selector">
      <label className="slot-label">Select Time Slot(s)</label>
      <div className="slots-grid">
        {slots.map((slot, index) => {
          const isSelected = selectedSlots.includes(slot);
          const isBooked = bookedSlots.includes(slot);
          const isPast = isSlotInPast(slot);
          const isDisabled = isBooked || isPast;
          return (
            <button
              key={index}
              type="button"
              className={`slot-btn ${isSelected ? 'selected' : ''} ${isBooked ? 'booked disabled' : ''} ${isPast && !isBooked ? 'past disabled' : ''}`}
              onClick={() => toggleSlot(slot)}
              disabled={isDisabled}
              title={isPast ? "This time slot has already passed" : isBooked ? "Already booked" : ""}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
