"use client";

import { useRef, useState, type FormEvent } from "react";
import ReactDatePicker from "react-datepicker";
import { toast } from "react-toastify";

interface DataType {
  btnClass?: string;
}

const WHATSAPP_NUMBER = "96171592971"; // 00961 71 592 971

type Option = { value: string; label: string };

const generateTimeOptions = (): Option[] => {
  // Open 9:00 AM → 1:00 AM, BUT last reservation is 12:00 AM
  // So we offer 9:00 AM → 12:00 AM
  const options: Option[] = [];

  // 9 AM to 11 PM
  for (let h = 9; h <= 23; h++) {
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h < 12 ? "AM" : "PM";
    options.push({ value: `${h}:00`, label: `${hour12}:00 ${ampm}` });
  }

  // 12:00 AM (midnight)
  options.push({ value: "0:00", label: "12:00 AM" });

  return options;
};

const ReservationForm = ({ btnClass }: DataType) => {
  const personOptions: Option[] = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 Person" },
    { value: "3", label: "3 Person" },
    { value: "4", label: "4 Person" },
    { value: "5", label: "5 Person" },
    { value: "more", label: "More than 5 (type)" },
  ];

  const scheduleOptions = generateTimeOptions();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const datePickerRef = useRef<ReactDatePicker | null>(null);

  // Native selects (guaranteed to work)
  const [personValue, setPersonValue] = useState<string>("2");
  const [customPersons, setCustomPersons] = useState<string>("");

  const [timeValue, setTimeValue] = useState<string>(scheduleOptions[0].value); // 9:00 AM

  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const fd = new FormData(form);

    const customerName = String(fd.get("name") ?? "").trim();
    const customerPhone = String(fd.get("phone") ?? "").trim();

    if (!startDate) {
      toast.error("Please choose a date.");
      return;
    }

    // Persons text
    let personsText =
      personOptions.find((p) => p.value === personValue)?.label ?? "";

    if (personValue === "more") {
      const n = Number(customPersons);
      if (!Number.isFinite(n) || n < 6) {
        toast.error("Please enter a valid number of persons (6 or more).");
        return;
      }
      personsText = `${n} Persons`;
    }

    // Time label
    const timeLabel =
      scheduleOptions.find((t) => t.value === timeValue)?.label ?? "";

    const dateText = startDate.toLocaleDateString("en-GB"); // dd/mm/yyyy

    const message =
      `New Table Reservation\n` +
      `Name: ${customerName}\n` +
      `Phone: ${customerPhone}\n` +
      `Persons: ${personsText}\n` +
      `Date: ${dateText}\n` +
      `Time: ${timeLabel}\n` +
      `Note: Last reservation at 12:00 AM`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");

    // Reset form + state
    form.reset();
    setStartDate(null);
    setPersonValue("2");
    setCustomPersons("");
    setTimeValue(scheduleOptions[0].value);

    toast.success("Thanks For Booking");
  };

  return (
    <>
      <form onSubmit={handleBooking} className="with-label">
        {/* Name */}
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                placeholder="Your name"
                type="text"
                autoComplete="name"
                required
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                className="form-control"
                id="phone"
                name="phone"
                placeholder="+961..."
                type="text"
                autoComplete="tel"
                required
              />
            </div>
          </div>
        </div>

        {/* Person */}
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="persons">Person</label>
              <select
                id="persons"
                name="persons"
                className="form-control"
                value={personValue}
                onChange={(e) => setPersonValue(e.target.value)}
                required
              >
                {personOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* If more than 5 */}
        {personValue === "more" && (
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="customPersons">How many persons?</label>
                <input
                  className="form-control"
                  id="customPersons"
                  name="customPersons"
                  placeholder="e.g. 8"
                  type="number"
                  min={6}
                  value={customPersons}
                  onChange={(e) => setCustomPersons(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Date */}
        <div className="row">
          <div className="col-lg-12">
            <div className="input-group date date-picker-one">
              <label htmlFor="date">Date</label>
              <ReactDatePicker
                id="date"
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                placeholderText="Date"
                ref={datePickerRef}
                required
              />
              <span
                className="input-group-addon"
                onClick={() => datePickerRef.current?.setFocus()}
              >
                <i className="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <select
                id="time"
                name="time"
                className="form-control"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                required
              >
                {scheduleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <small style={{ display: "block", marginTop: 6, opacity: 0.8 }}>
                Open 9:00 AM – 1:00 AM (last reservation at 12:00 AM)
              </small>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="row">
          <div className="col-lg-12">
            <button
              type="submit"
              name="submit"
              id="submit"
              className={`${btnClass}`}
            >
              Book A Table
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
