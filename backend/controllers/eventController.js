const calendar = require("../models/events");
const mongoose = require("mongoose");

//get all events
const getEvents = async (req, res) => {
  const events = await calendar.find({}).sort({ createdAt: -1 });

  res.status(200).json(events);
};

//get a single event
const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await calendar.findById(id);

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

//create new event
const createEve = async (req, res) => {
  const { eventName, eventDate, comment, eventType } = req.body;

  //add doc to db
  try {
    const newEve = await calendar.create({
      eventName: eventName,
      eventDate: eventDate,
      comment: comment,
      eventType: eventType,
    });
    res.status(200).json(newEve);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await calendar.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

//update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await calendar.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!event) {
    return res.status(404).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

module.exports = {
  getEvents,
  getEvent,
  createEve,
  deleteEvent,
  updateEvent,
};
